<!--
 * @Author: Wanko
 * @Date: 2022-11-22 14:15:18
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-29 15:04:43
 * @Description: 
-->
<template>
  <div class="p">
    <div>
      <image class="w-40 h-40" :src="src" />
      <image class="w-40 h-40" :src="src" />
      <image class="w-40 h-40" :src="src" />
    </div>

    <c-section customClass="my">基本使用，设置width, height</c-section>
    不设置width，width将默认铺满父容器
    <div>
      <c-image width="40" height="40" :src="src" />
      <c-image width="40" height="40" :src="src" />
      <c-image width="40" height="40" :src="src" />
    </div>
    <c-section customClass="my">通过父容器限定大小</c-section>
    <div class="w-100 h-40">
      <c-image :src="src" mode="aspectFill" />
    </div>
    <image class="w-40 h-80" :src="src" mode="aspectFill" />
    <!-- <c-image :src="src" height="100"></c-image> -->
    <image mode="aspectFit" :src="src" />
    <image mode="aspectFill" :src="src" />
    <div class="p m border">
      <div>基本使用，宽高</div>
      <image :src="src" />
      <c-image :src="src"></c-image>
      <view class="w-50 h-50">
        <c-image :src="src"></c-image>
      </view>
      <c-image :src="src" width="50" height="50"></c-image>
      <c-image :src="src" width="50" height="50"></c-image>
    </div>
    <c-section customClass="my">设置圆形</c-section>
    <c-image :src="src" width="50" height="50" round></c-image>
    <c-section customClass="my">设置圆角值</c-section>
    <c-image :src="src" width="50" height="50" rounded="12"></c-image>
    <c-section customClass="my">设置不过渡</c-section>
    <c-image :src="src" width="50" height="50" :fade="false"></c-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: '/static/logo.png'
    }
  }
}
</script>

<style lang="scss" scoped></style>
