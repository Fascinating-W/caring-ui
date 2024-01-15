<!--
 * @Author: Wanko
 * @Date: 2022-04-06 11:29:29
 * @LastEditors: Wanko
 * @LastEditTime: 2024-01-09 11:55:44
 * @Description: 
-->
<!--
 * @Author: Wanko
 * @Date: 2022-04-06 11:29:29
 * @LastEditors: Wanko
 * @LastEditTime: 2024-01-09 11:55:43
 * @Description: 
-->
<template>
  <div class="caring-title flex-center">
    <span class="caring-title__icon" :style="{ 'background-color': color }"></span>
    <span class="caring-title__text m-l-5" :style="{ color: color }">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'caring-title',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    color: {
      type: String,
      default: uni.$c.color.primary
    }
  }
}
</script>

<style lang="scss" scoped>
.caring-title {
  // padding: 10px 15px;
  &__icon {
    display: inline-block;
    width: 4px;
    height: 16px;
    // margin-top: 4rpx;
    border-radius: 2px;
  }
}
</style>