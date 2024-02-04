<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:29:29
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-04 16:01:43
 * @Description: 
-->
<template>
  <div>
    <u-mask :show="show" @click="show = false"  ></u-mask>
    <c-mask v-model="showMask" @click="onClick" :maskClickAble="false"/>
    <button @click="show = true">打开</button>
    <button @click="showMask = true">打开</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showMask: false
    }
  },
  methods: {
    onClick() {
      this.showMask = false
    }
  },
}
</script>

<style lang="scss" scoped></style>
