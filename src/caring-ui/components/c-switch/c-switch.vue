<template>
  <view
    class="c-switch"
    :class="[
      value == true ? 'c-switch--on' : '',
      disabled ? 'c-switch--disabled' : ''
    ]"
    @tap="onClick"
    :style="[switchStyle]"
  >
    <view
      class="c-switch__node node-class"
      :style="{
        width: $c.addUnit(this.size),
        height: $c.addUnit(this.size)
      }"
    >
      <c-loading
        :show="loading"
        class="c-switch__loading"
        :size="size * 0.6"
        :color="loadingColor"
      />
    </view>
  </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-switch',
  props: {
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: false
    },
    // 开关尺寸，单位px
    size: {
      type: [Number, String],
      default: 25
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: uni.$c.color.primary
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: '#ffffff'
    },
    // 通过v-model双向绑定的值
    value: {
      type: Boolean,
      default: false
    },
    // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
    vibrateShort: {
      type: Boolean,
      default: false
    },
    // 打开选择器时的值
    activeValue: {
      type: [Number, String, Boolean],
      default: true
    },
    // 关闭选择器时的值
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    switchStyle() {
      let style = {}
      style.fontSize = this.size + 'px'
      style.backgroundColor = this.value
        ? calcColor(this.activeColor)
        : this.inactiveColor
      return style
    },
    loadingColor() {
      return this.value ? this.activeColor : '#c8c9cc'
    }
  },
  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        // 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
        if (this.vibrateShort) uni.vibrateShort()
        this.$emit('input', !this.value)
        // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
        this.$nextTick(() => {
          this.$emit(
            'change',
            this.value ? this.activeValue : this.inactiveValue
          )
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-switch {
  position: relative;
  /* #ifndef APP-NVUE */
  display: inline-block;
  /* #endif */
  box-sizing: initial;
  width: 2em;
  height: 1em;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  transition: background-color 0.3s;
  font-size: 50rpx;
}

.c-switch__node {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  z-index: 1;
  background-color: #fff;
  background-color: #fff;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1),
    0 3px 3px 0 rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05),
    -webkit-transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform cubic-bezier(0.3, 1.05, 0.4, 1.05);
  transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
}

.c-switch__loading {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.c-switch--on {
  background-color: $c-primary;
}

.c-switch--on .c-switch__node {
  transform: translateX(100%);
}

.c-switch--disabled {
  opacity: 0.4;
}
</style>
