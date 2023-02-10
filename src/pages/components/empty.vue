<!--
 * @Author: Wanko
 * @Date: 2022-11-21 17:17:48
 * @LastEditors: Wanko
 * @LastEditTime: 2022-11-21 18:07:01
 * @Description: 
-->
<template>
  <div>
    <!-- 基本使用，默认颜色 light -->
    <c-empty/>
    
    <!-- 通过mode设置不同图标 -->
    <c-empty mode="search"/>

    <!-- icon-size：改变大小图标，默认60px -->
    <c-empty icon-size="80"/>

    <!-- 改图标颜色 -->
    <c-empty icon-color="pink"/>
    <c-empty icon-color="success"/>

    <!-- 改字体大小 -->
    <c-empty font-size="20"/>

    <!-- 改字体颜色 -->
    <c-empty color="pink"/>
    <c-empty color="success"/>

    <!-- 修改图标和文字颜色 -->
    <c-empty mode="search" color="primary" icon-color="primary"></c-empty>

    <!-- 自定义文字，两种写法 -->
    <c-empty text="自定义文字"/>
    <c-empty>自定义文字</c-empty>

    
  </div>
</template>

<script>
  export default {
    

  }
</script>

<style lang="scss" scoped>

</style>