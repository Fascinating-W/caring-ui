<!--
 * @Author: Wanko
 * @Date: 2024-03-13 15:15:34
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:14:07
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-button @click="open"> 打开模态框 </c-button>
      <c-modal v-model="show"></c-modal>
    </div>
    <c-section>基本使用</c-section>
    <div class="p">
      <c-button @click="open1"> 打开模态框 </c-button>
      <c-modal v-model="show1" width="50%" maskCloseAble></c-modal>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show1: false,
      content: '东临碣石，以观沧海'
    }
  },
  methods: {
    open() {
      this.show = true
    },
    open1() {
      this.show1 = true
    }
  }
}
</script>
