<!--
 * @Author: Wanko
 * @Date: 2024-03-15 09:55:54
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-15 10:35:53
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用，默认和右上角重合</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge count="7"></c-badge>
      </div>
    </div>
    <c-section>展示原点</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge  count="7" dot></c-badge>
      </div>
    </div>
    <c-section>offset调整位置</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge  count="7" dot :offset="[10,10]"></c-badge>
      </div>
    </div>
    <c-section>其他颜色</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge  count="7" :offset="[10,10]" bgColor="pink" color="red"></c-badge>
      </div>
    </div>
    <c-section>customClass</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge  count="7" :offset="[10,10]" customClass="bg-blue"></c-badge>
      </div>
    </div>
    <c-section>customStyle</c-section>
    <div class="p">
      <div class="w-60 h-60 rounded-4 bg-ccc relative">
        <c-badge  count="7" :offset="[10,10]" :customStyle="{
          background: 'yellow',
          color: 'skyblue'
        }"></c-badge>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
@import '../../caring-ui/index.scss';

// .bg-blue {
//   background: blue;
// }
</style>