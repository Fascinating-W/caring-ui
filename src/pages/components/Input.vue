<!--
 * @Author: Wanko
 * @Date: 2024-03-07 17:31:22
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-17 18:09:27
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-input/>
    </div>
    <c-section>基本使用 带border</c-section>
    <div class="p">
      <c-input border/>
      <c-input border :customStyle="{padding: '0 20px'}"/>
    </div>
    <c-section>password</c-section>
    <div class="p">
      <c-input border type="password"/>
    </div>
    <c-section>textarea</c-section>
    <div class="p">
      <c-input border type="textarea"/>
    </div>
     <c-section>type:select</c-section>
    <div class="p">
      <c-input  type="select" border/>
    </div>
    <c-section>自定义placeholderClass</c-section>
    <div class="p">
      <c-input border placeholderClass="text-red"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ''
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>