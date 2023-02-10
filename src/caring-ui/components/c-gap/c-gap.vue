<!--
 * @Author: Wanko
 * @Date: 2022-10-24 15:42:10
 * @LastEditors: Wanko
 * @LastEditTime: 2022-12-03 17:51:05
 * @Description: 
-->
<template>
  <view :style="[gapStyle]"></view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'
export default {
  name: 'c-gap',
  props: {
    // 默认透明背景
    bgColor: {
      type: String,
      default: 'transparent ' //
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
        backgroundColor: calcColor(this.bgColor),
        height: this.$c.addUnit(this.height)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
