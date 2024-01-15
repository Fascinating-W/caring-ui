<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-01-15 18:19:52
 * @Description: 
-->
<template>
  <view>
    <button @click="get">get请求</button>
  </view>
</template>

<script>
export default {
  methods: {
    async get() {
      const res =  await this.$c.request('http://jsonplaceholder.typicode.com/todos/1')
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped></style>
