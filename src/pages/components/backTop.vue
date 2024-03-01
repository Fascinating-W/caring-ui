<!--
 * @Author: Wanko
 * @Date: 2024-02-27 18:14:10
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-27 18:16:47
 * @Description: 
-->
<template>
  <div style="height: 2000px"></div>
</template>

<script>
export default {
  onPageScroll(e) {
    console.log(e);
    this.scrollTop = e.scrollTop
  }
}
</script>

<style lang="scss" scoped></style>
