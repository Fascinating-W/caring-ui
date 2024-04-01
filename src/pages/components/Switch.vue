<!--
 * @Author: Wanko
 * @Date: 2024-03-18 10:51:23
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-01 18:42:54
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-switch v-model="checked"></c-switch>
      <u-switch v-model="checked"></u-switch>
    </div>
    <c-section>禁用</c-section>
    <div class="p">
      <c-switch v-model="checked" disabled></c-switch>
    </div>
     <c-section>loading</c-section>
    <div class="p">
      <c-switch v-model="checked3" loading></c-switch>
      <u-switch v-model="checked3" loading></u-switch>
    </div>
     <c-section>主题颜色</c-section>
    <div class="p">
      <c-switch v-model="checked1" activeColor="success"></c-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      checked1: true,
      checked3: false,
    }
  },
  methods: {
    // switch打开或者关闭时触发，值为true或者false
    // 即使不监听此事件，this.checked此时也会相应的变成true或者false
    change(status) {
      // console.log(status);
    }
  }
}
</script>
