<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:29:29
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-01 15:58:26
 * @Description: ✅
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <button @click="showMask = true">打开mask</button>
      <c-mask v-model="showMask"/>
    </div>
    <c-section>高斯模糊遮罩</c-section>
    <div class="p">
      <button @click="showMask3 = true">打开mask</button>
      <c-mask v-model="showMask3" filter />
    </div>
    <c-section>设置自定义背景色</c-section>
    <div class="p">
      <button @click="showMask1 = true">打开mask</button>
      <c-mask
        v-model="showMask1"
        :customStyle="{ background: 'rgba(0, 0, 0, 0.2)' }"
      />
    </div>
    <c-section>手动关闭</c-section>
    <div class="p">
      <button @click="showMask2 = true">打开mask</button>
      <c-mask v-model="showMask2" :maskClickAble="false">
        <div class="h-full flex-cc">
          <c-button @click="onClick">关闭</c-button>
        </div>
      </c-mask>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMask: false,
      showMask1: false,
      showMask2: false,
      showMask3: false
    }
  },
  methods: {
    onClick() {
      this.showMask2 = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
