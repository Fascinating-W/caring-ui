<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:24:00
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-13 18:16:39
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用,默认底部弹出mode="bottom"</c-section>
    <div class="p">
      <c-button @click="show = true">打开弹窗</c-button>
    </div>
    <c-section>中间弹出,内容滚动</c-section>
    <div class="p">
      <c-button @click="show2 = true">打开弹窗</c-button>
    </div>
    <c-popup v-model="show">
      <view>出淤泥而不染，濯清涟而不妖</view>
    </c-popup>
    <c-popup v-model="show2" mode="center" height="50%" rounded="12">
      <scroll-view scroll-y="true" class="h-full">
        <view>
          <view v-for="index in 100" :key="index"> 第{{ index }}个Item </view>
        </view>
      </scroll-view>
    </c-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
