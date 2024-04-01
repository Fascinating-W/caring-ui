<!--
 * @Author: Wanko
 * @Date: 2024-03-21 18:22:36
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-23 12:45:45
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>直线进度条</c-section>
    <div class="p">
      <c-line-progress :percent="70"></c-line-progress>
      <c-line-progress :percent="70" activeColor="primary"></c-line-progress>
    </div>
    <c-section>没有圆角</c-section>
    <div class="p">
      <c-line-progress :percent="70" :round="false" />
    </div>
    <c-section>stripe</c-section>
    <div class="p">
      <c-line-progress :percent="70" striped stripedActive />
    </div>
    <c-section>环形进度条</c-section>
    <div class="p">
      <!-- <c-circle-progress :percent="80"> </c-circle-progress>
      <c-circle-progress :percent="80" primary> </c-circle-progress>
      <c-circle-progress :percent="80" error> </c-circle-progress>
      <c-circle-progress primary :percent="30" duration="2000"></c-circle-progress> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
