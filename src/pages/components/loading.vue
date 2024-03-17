<!--
 * @Author: Wanko
 * @Date: 2022-04-06 15:40:07
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-17 15:27:45
 * @Description: 
-->
<template>
  <div class="p">
    <c-section title="默认颜色" />
    <div class="p">
      <c-loading/>
    </div>
    <c-section title="主题色" />
    <div class="p">
      <c-loading color="success" />
      <c-gap width="5"></c-gap>
      <c-loading color="primary" />
    </div>
    <c-section title="mode:flower" />
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
