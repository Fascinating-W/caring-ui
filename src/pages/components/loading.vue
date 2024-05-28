<!--
 * @Author: Wanko
 * @Date: 2022-04-06 15:40:07
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-30 10:35:05
 * @Description: 
-->
<template>
  <div class="p">
    <c-section title="基础使用" />
    <div class="p">
      <c-loading />
    </div>
    <c-section title="color设置颜色、支持主题色值" />
    <div class="p">
      <c-loading color="success" />
      <c-gap width="5"></c-gap>
      <c-loading color="red" />
    </div>
    <c-section title="设置加载形状为flower" />
    <div class="p">
      <c-loading flower />
    </div>
    <c-section title="设置size" />
    <div class="p">
      <c-loading flower size="50"/>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
