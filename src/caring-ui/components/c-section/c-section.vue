<!--
 * @Author: Wanko
 * @Date: 2022-12-03 17:18:11
 * @LastEditors: Wanko
 * @LastEditTime: 2022-12-03 18:12:54
 * @Description: 
-->
<template>
  <div class="c-section flex-center justify-between">
    <div :style="[titleStyle]">{{ title }}</div>
    <div>right</div>
  </div>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-section',
  props: {
    // 标题信息
    title: {
      type: String,
      default: ''
    },
    // 主标题的颜色
    color: {
      type: String,
      default: '#303133'
    },
    size: {
      type: [Number, String],
      default: 14
    },
    // 主标题是否加粗
    bold: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleStyle() {
      return {
        color: calcColor(this.color),
        fontSize: this.$c.addUnit(this.size),
        fontWeight: this.bold ? 'bold' : 'normal'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
