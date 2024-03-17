<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:46:06
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 10:26:50
 * @Description: 
-->
<template>
  <div class="p">
    <c-section title="基础使用"></c-section>
    <div class="p">
      <c-line></c-line>
    </div>
    <c-section title="设置颜色"></c-section>
    <div class="p">
      <c-line color="primary"></c-line>
    </div>
    <c-section title="设置长度"></c-section>
    <div class="p">
      <c-line length="50"></c-line>
    </div>
    <c-section title="设置虚线"></c-section>
    <div class="p">
      <c-line color="warning" dashed></c-line>
    </div>
    <c-section title="设置百分比长度"></c-section>
    <div class="p">
      <c-line length="50%"></c-line>
    </div>
    <c-section title="设置 hairLine"></c-section>
    <div class="p">
      <c-line hairLine></c-line>
    </div>
    <c-section title="设置竖向"></c-section>
    <div class="p">
       <c-line length="50" col></c-line>
    </div>
    <c-section title="customClass"></c-section>
    <div class="p">
       <c-line length="50" customClass="mt"/>
    </div>

     <c-section title="父元素控制居中"></c-section>
    <div class="p flex-cc">
       <c-line length="50" customClass="mt"/>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
