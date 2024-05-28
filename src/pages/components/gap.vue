<!--
 * @Author: Wanko
 * @Date: 2022-10-24 15:42:19
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-30 10:32:47
 * @Description: 
-->
<template>
  <view class="p">
    <c-section title="Gap 默认间距15px"></c-section>
    <div class="p">
      <c-gap />
    </div>
    <c-section title="通过color设置颜色、支持主题色"></c-section>
    <div class="p">
      <c-gap color="primary" />
    </div>
    <c-section title="设置height"></c-section>
    <div class="p">
      <c-gap color="success" height="40" />
    </div>
    <c-section title="通过 width 属性设置横向间隔"></c-section>
    <div class="p flex">
      <div class="bg-red-light">右侧间隙由gap产生</div>
      <c-gap width="30" />
      <div class="bg-red-light">左侧间隙由gap产生</div>
    </div>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
