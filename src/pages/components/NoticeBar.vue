<!--
 * @Author: Wanko
 * @Date: 2024-03-14 14:24:55
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 14:58:32
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-notice-bar :list="list"></c-notice-bar>
    </div>
    <c-section>设置不同主题</c-section>
    <div class="p">
      <c-notice-bar :list="list" type="primary"></c-notice-bar>
    </div>
    <c-section>设置圆角rounded</c-section>
    <div class="p">
      <c-notice-bar :list="list" type="success" rounded="12"></c-notice-bar>
    </div>
    <c-section>水平步进滚动</c-section>
    <div class="p">
      <c-notice-bar
        :list="list"
        type="error"
        :is-circular="false"
      ></c-notice-bar>
    </div>
    <c-section>垂直滚动</c-section>
    <div class="p">
      <c-notice-bar col :list="list"></c-notice-bar>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        '寒雨连江夜入吴',
        '平明送客楚山孤',
        '洛阳亲友如相问',
        '一片冰心在玉壶'
      ]
    }
  }
}
</script>
