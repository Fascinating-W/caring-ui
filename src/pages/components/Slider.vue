<!--
 * @Author: Wanko
 * @Date: 2024-03-18 10:33:15
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-18 10:48:47
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-slider v-model="value"></c-slider>
    </div>
    <div class="p">
      <c-slider v-model="value" height="15"></c-slider>
    </div>
    <c-section>滑动范围</c-section>
    <div class="p">
      <c-slider v-model="value" min="30" max="80"></c-slider>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 30
    }
  }
}
</script>
