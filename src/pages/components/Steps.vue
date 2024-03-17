<!--
 * @Author: Wanko
 * @Date: 2024-03-15 15:47:30
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-15 18:29:52
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-steps :list="numList"></c-steps>
    </div>
    <c-section>dot模式</c-section>
    <div class="p">
      <c-steps :list="numList" dot/>
    </div>
    <c-section>col</c-section>
    <div class="p">
      <c-steps :list="numList" col dot/>
    </div>
    <c-section>customStyle</c-section>
    <div class="p">
      <c-steps :list="numList" dot :customStyle="{
        fontSize: '20px',
      }"></c-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numList: [
        {
          name: '下单'
        },
        {
          name: '出库'
        },
        {
          name: '运输'
        },
        {
          name: '签收'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
