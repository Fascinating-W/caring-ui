<!--
 * @Author: Wanko
 * @Date: 2024-03-18 10:10:45
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-18 10:30:55
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-rate :count="count" v-model="value"></c-rate>
    </div>
    <c-section>设置size</c-section>
    <div class="p">
      <c-rate :count="count" v-model="value" size="24"></c-rate>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 4,
      value: 2
    }
  }
}
</script>
