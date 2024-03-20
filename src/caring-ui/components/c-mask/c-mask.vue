<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:44:53
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-19 15:36:59
 * @Description: 
-->
<template>
  <div
    class="c-mask"
    :class="{ 'c-mask-zoom': zoom, 'c-mask-filter': filter}"
    :style="[maskStyle, zoomStyle]"
    @tap="onClick"
    @touchmove.stop.prevent="() => {}"
    hover-stop-propagation
  >
    <slot />
  </div>
</template>

<script>
import {
  value,
  zIndex,
  customStyle,
  maskClickAble,
  duration,
  zoom
} from '../../libs/props/common.js'
export default {
  props: {
    value,
    zIndex,
    customStyle,
    duration,
    maskClickAble,
    zoom,
    filter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      zoomStyle: {
        transform: ''
      },
      scale: 'scale(1.2, 1.2)'
    }
  },
  mounted(){
  },
  computed: {
    maskStyle() {
      let style = {}
      style.transition = `all ${this.duration / 1000}s ease-in-out`
      style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
      if (this.value) {
        style.opacity = 1
        style.zIndex = this.zIndex ? this.zIndex : this.$c.zIndex.mask
      } else {
        style.zIndex = -1
      }
      if (Object.keys(this.customStyle).length)
        style = {
          ...style,
          ...this.customStyle
        }
      return style
    }
  },
  methods: {
    onClick() {
      if (this.maskClickAble) {
        this.$emit('input', false)
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: transform 0.3s;
}
.c-mask-filter {
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
}
.c-mask-zoom {
  transform: scale(1.2, 1.2);
}
</style>
