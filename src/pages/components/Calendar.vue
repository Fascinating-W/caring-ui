<!--
 * @Author: Wanko
 * @Date: 2024-03-22 17:36:21
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-22 18:10:34
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-button @click="show = true">打开日历</c-button>
      <c-calendar v-model="show" :mode="mode"></c-calendar>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
				mode: 'date'
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>