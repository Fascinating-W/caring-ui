<!--
 * @Author: Wanko
 * @Date: 2022-10-20 16:38:18
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-01 15:42:42
 * @Description: 
-->
<template>
  <view :style="[lineStyle]" :class="[customClass]"> </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'
import {customClass} from '../../libs/props/common.js'
export default {
  name: 'c-line',
  props: {
    customClass,
    color: {
      type: String,
      default: uni.$c.color.border
    },
    length: {
      type: String,
      default: ''
    },
    col: {
      type: Boolean,
      default: false
    },
    hairLine: {
      type: Boolean,
      default: true
    },
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
