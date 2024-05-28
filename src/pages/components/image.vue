<!--
 * @Author: Wanko
 * @Date: 2022-11-22 14:15:18
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-28 14:53:09
 * @Description: 
-->
<template>
  <div class="p">
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
    
    <c-section customClass="my">设置圆形</c-section>
    <c-image :src="src" width="50" height="50" round></c-image>
    <c-section customClass="my">设置圆角值</c-section>
    <c-image :src="src" width="50" height="50" rounded="12"></c-image>
    <c-section customClass="my">设置不过渡</c-section>
    <c-image :src="src" width="50" height="50" :fade="false"></c-image>
    <c-section customClass="my">不显示加载中图标</c-section>
    <c-image :src="src" width="50" height="50" :show-loading="false" :fade="false"></c-image>
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
