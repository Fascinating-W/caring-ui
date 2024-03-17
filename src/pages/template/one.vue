<!--
 * @Author: Wanko
 * @Date: 2024-03-12 09:36:03
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-12 09:36:52
 * @Description: 
-->
<template>
  <div class="overflow-hidden bg-f8 h-screen">
    <div class="absolute h-100 bg-primary inset-x-0"></div>
    <div class="relative">
      <!-- 空的flex元素防止外边距塌陷 -->
      <div class="flex"></div>
      <div class="m p bg-white rounded shadow h-200">text</div>
    </div>
  </div>
</template>
