<!--
 * @Author: Wanko
 * @Date: 2022-11-22 14:15:18
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-04 18:37:12
 * @Description: 
-->
<template>
  <div>
    <div class="p m border">
      <div>基本使用，宽高</div>
      <image
        :src="src"
      />
      <c-image :src="src"></c-image>
      <view class="w-50 h-50">
        <c-image :src="src"></c-image>
      </view>
      <c-image :src="src" width="50" height="50"></c-image>
      <c-image :src="src" width="50" height="50"></c-image>
    </div>
    <div class="p m border">
      <div>circle 设置圆形</div>
      <c-image :src="src" width="50" height="50" circle></c-image>
    </div>
    <div class="p m border">
      <div>radius 设置圆角</div>
      <c-image :src="src" width="50" height="50" radius="12"></c-image>
    </div>
    <div class="p m border">
      <div>fade="false" 不过渡</div>
      <c-image :src="src" width="50" height="50" :fade="false"></c-image>
    </div>
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
