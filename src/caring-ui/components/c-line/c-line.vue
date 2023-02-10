<!--
 * @Author: Wanko
 * @Date: 2022-10-20 16:38:18
 * @LastEditors: Wanko
 * @LastEditTime: 2022-12-03 17:53:38
 * @Description: 
-->
<template>
  <view :style="[lineStyle]"> </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-line',
  props: {
    // 支持主题色
    color: {
      type: String,
      default: uni.$c.color.border
    },
    length: {
      type: String,
      default: ''
    },
    // 是否竖边框
    col: {
      type: Boolean,
      default: false
    },
    // 是否显示细边框 默认false
    hairLine: {
      type: Boolean,
      default: false
    },
    // 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
    dashed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lineStyle() {
      let style = {}
      if (this.col) {
        style.borderLeftWidth = '1px'
        if (this.dashed) {
          style.borderLeftStyle = 'dashed'
        } else {
          style.borderLeftStyle = 'solid'
        }
        style.height = this.$c.addUnit(this.length)
        if (this.hairLine) style.transform = 'scaleX(0.5)'
      } else {
        style.borderBottomWidth = '1px'
        if (this.dashed) {
          style.borderBottomStyle = 'dashed'
        } else {
          style.borderBottomStyle = 'solid'
        }
        style.width = this.$c.addUnit(this.length)
        if (this.hairLine) style.transform = 'scaleY(0.5)'
      }

      style.borderColor = calcColor(this.color)
      return style
    }
  }
}
</script>

<style lang="scss" scoped></style>
