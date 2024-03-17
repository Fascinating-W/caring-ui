<!--
 * @Author: Wanko
 * @Date: 2022-11-21 17:17:48
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-03 15:28:30
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-empty />
    </div>
    <c-section>设置模式</c-section>
    <div class="p">
      <c-empty mode="search" />
    </div>
    <c-section>设置图标大小 默认60px</c-section>
    <div class="p">
      <c-empty iconSize="100"/>
    </div>
    <c-section>设置图标颜色 支持主题色</c-section>
    <div class="p">
      <c-empty iconColor="success"/>
    </div>
    <c-section>设置字体大小</c-section>
    <div class="p">
      <c-empty fontSize="20"/>
    </div>
    <c-section>设置字体颜色，支持主题色</c-section>
    <div class="p">
      <c-empty color="pink" />
    </div>
    

    <!-- 修改图标和文字颜色 -->
    <c-empty mode="search" color="primary" icon-color="primary"></c-empty>

    <!-- 自定义文字，两种写法 -->
    <c-empty text="自定义文字" />
    <c-empty>自定义文字</c-empty>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
