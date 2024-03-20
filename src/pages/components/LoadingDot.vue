<!--
 * @Author: Wanko
 * @Date: 2024-03-19 14:15:04
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-19 14:55:29
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-loading-dot></c-loading-dot>
    </div>
    <c-section>设置加载文字</c-section>
    <div class="p">
      <c-loading-dot>我正在加载哦</c-loading-dot>
    </div>
    <c-section>设置加载速度duration</c-section>
    <div class="p">
      <c-loading-dot duration="1">我加载的很快</c-loading-dot>
    </div>
    <c-section>设置颜色</c-section>
    <div class="p">
      <c-loading-dot color="red">我是红色的加载</c-loading-dot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
