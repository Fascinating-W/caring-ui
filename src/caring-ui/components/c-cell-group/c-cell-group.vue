<!--
 * @Author: Wanko
 * @Date: 2024-03-01 17:39:35
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-01 18:00:37
 * @Description: 
-->
<template>
  <view class="c-cell-box">
    <view class="c-cell-title" v-if="title" :style="[titleStyle]">
      {{ title }}
    </view>
    <view class="c-cell-item-box" :class="{ 'border-b border-t': border }">
      <slot />
    </view>

    <div cl></div>
  </view>
</template>

<script>
export default {
  name: 'c-cell-group',
  props: {
    // 分组标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示分组list上下边框
    border: {
      type: Boolean,
      default: true
    },
    // 分组标题的样式，对象形式，注意驼峰属性写法
    // 类似 {'font-size': '24rpx'} 和 {'fontSize': '24rpx'}
    titleStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      index: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.c-cell-title {
  padding: 15px 15px 5px;
  font-size: 15px;
  text-align: left;
  color: $c-tips-color;
}
.c-cell-item-box {
  background-color: #ffffff;
}
</style>
