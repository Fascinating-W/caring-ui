<!--
 * @Author: Wanko
 * @Date: 2022-10-24 15:42:10
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-11 17:47:14
 * @Description: 
-->
<template>
  <div :style="[gapStyle]" :class="[width ? 'inline-block' : '']"></div>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'
export default {
  name: 'c-gap',
  props: {
    // 默认透明背景
    color: {
      type: String,
      default: 'transparent ' //
    },
    width: {
      type: [String, Number],
      default: 0
    },
    // 高度
    height: {
      type: [String, Number],
      default: 15
    }
  },
  computed: {
    gapStyle() {
      return {
        backgroundColor: calcColor(this.color),
        height: this.width ? this.$c.addUnit(0) : this.$c.addUnit(this.height),
        width: this.width ? this.$c.addUnit(this.width) : '100%'
      }
    }
  }
}
</script>
