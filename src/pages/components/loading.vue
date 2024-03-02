<!--
 * @Author: Wanko
 * @Date: 2022-04-06 15:40:07
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-02 17:57:17
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
      <c-loading mode="flower" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
