<!--
 * @Author: Wanko
 * @Date: 2024-03-14 10:14:23
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 16:51:28
 * @Description: 
-->
<template>
  <div class="p">
    <c-section> 基本使用 </c-section>
    <div class="p">
      <c-divider>大漠孤烟直</c-divider>
      <c-divider text="长河落日圆" />
    </div>
    <c-section>设置长度 </c-section>
    <div class="p">
      <c-divider length="100">大漠孤烟直</c-divider>
      <c-divider length="20%">大漠孤烟直</c-divider>
    </div>
    <c-section> 设置divider颜色 </c-section>
    <div class="p">
      <c-divider borderColor="error">大漠孤烟直</c-divider>
    </div>
    <c-section> 设置text颜色 </c-section>
    <div class="p">
      <c-divider color="error">大漠孤烟直</c-divider>
    </div>
    <c-section> customStyle </c-section>
    <div class="p">
      <c-divider
        width="100"
        :customStyle="{
          height: '100px',
          background: 'pink',
          fontSize: '20px'
        }"
        >大漠孤烟直</c-divider
      >
    </div>
    <c-section> customClass</c-section>
    <div class="p">
      <c-divider customClass="my">大漠孤烟直</c-divider>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
