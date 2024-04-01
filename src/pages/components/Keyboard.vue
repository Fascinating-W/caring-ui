<!--
 * @Author: Wanko
 * @Date: 2024-03-22 18:18:16
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-22 18:28:15
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>数字键盘</c-section>
    <div class="p">
      <c-keyboard ref="uKeyboard" v-model="show"></c-keyboard>
      <c-button @click="show = true">打开数字键盘</c-button>
    </div>
    <c-section>车牌号键盘</c-section>
    <div class="p">
      <c-keyboard ref="uKeyboard" v-model="show1" mode="car"></c-keyboard>
      <c-button @click="show1 = true">打开车牌号键盘</c-button>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show1: false
    }
  }
}
</script>
