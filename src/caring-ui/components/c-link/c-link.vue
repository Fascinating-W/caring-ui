<template>
  <text
    class="c-link"
    @tap.stop="openLink"
    :class="customClass"
    :style="[{
      color: color,
      fontSize: fontSize + 'px',
      borderBottom: line
        ? `1px solid ${lineColor ? lineColor : color}`
        : 'none',
      paddingBottom: line ? '0px' : '0'
    }, customStyle]"
  >
    <slot>{{ text }}</slot>
  </text>
</template>

<script>
import {customStyle, customClass} from '../../libs/props/common.js'
export default {
  name: 'c-link',
  props: {
    customStyle,
    customClass,
    color: {
      type: String,
      default: uni.$c.color.primary
    },
    text: {
      type: [String, Number],
      default: ''
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: 14
    },
    // 是否显示下划线
    line: {
      type: Boolean,
      default: false
    },
    // 要跳转的链接
    href: {
      type: String,
      default: ''
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
      type: String,
      default: '链接已复制，请在浏览器打开'
    },
    // 下划线颜色
    lineColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    openLink() {
      // #ifdef APP-PLUS
      plus.runtime.openURL(this.href)
      // #endif
      // #ifdef H5
      window.open(this.href)
      // #endif
      // #ifdef MP
      uni.setClipboardData({
        data: this.href,
        success: () => {
          uni.hideToast()
          this.$nextTick(() => {
            this.$c.toast(this.mpTips)
          })
        }
      })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.c-link {
  line-height: 1;
}
</style>
