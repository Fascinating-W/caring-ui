<!--
 * @Author: Wanko
 * @Date: 2024-03-19 18:03:59
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-20 11:01:32
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>地区选择器</c-section>
    <div class="p">
      <c-region-picker
        v-model="show"
        @confirm="confirm"
        :defaultRegion="['河北省', '秦皇岛市', '北戴河区']"
      ></c-region-picker>
      <c-button @click="show = true">打开c-region-picker</c-button>
    </div>
    <c-section>时间选择器</c-section>
    <div class="p">
      <c-date-picker
        v-model="show1"
        datetime
        @confirm="confirm"
      ></c-date-picker>
      <c-button @click="show1 = true">打开c-date-picker</c-button>
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
  },
  methods: {
    confirm(e) {
      console.log(e)
    }
  }
}
</script>
