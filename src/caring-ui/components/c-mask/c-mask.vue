<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:44:53
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-04 15:30:12
 * @Description: 
-->
<template>
  <div
    class="c-mask"
    :style="[maskStyle, zoomStyle]"
    @tap="onClick"
    @touchmove.stop.prevent="() => {}"
    hover-stop-propagation
  ></div>
</template>

<script>
import {value,zIndex,customStyle, maskClickAble,duration} from '../../libs/porps/common.js'
export default {
  props: {
    value,
    zIndex,
    customStyle,
    duration,
    maskClickAble
  },
  data() {
    return {
      zoomStyle: {
        transform: ''
      },
      scale: 'scale(1.2, 1.2)'
    }
  },
  computed: {
    maskStyle() {
      let style = {}
      style.transition = `all ${this.duration / 1000}s ease-in-out`
      if (this.value) {
        style.opacity = 1
        style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
        style.zIndex = this.zIndex ? this.zIndex : this.$c.zIndex.mask
      } else {
        style.zIndex = -1
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
</style>
