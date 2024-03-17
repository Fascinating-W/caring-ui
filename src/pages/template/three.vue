<!--
 * @Author: Wanko
 * @Date: 2024-03-12 09:53:12
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-12 09:53:30
 * @Description: 
-->
<template>
  <div class="bg-f8 h-screen flex-col">
    <div class="bg-white h-50 text-14 flex-cc border-b">全部</div>
    <scroll-view scroll-y class="bg-f8 h-0 flex-1">
      <div class="overflow-hidden">
        <div v-for="i in 100" class="m p bg-white rounded">{{ i }}</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
