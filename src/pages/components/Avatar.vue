<!--
 * @Author: Wanko
 * @Date: 2024-03-07 16:14:47
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-25 16:37:37
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p flex-center">
      <c-avatar src="https://www.wanko.top/public/image/caringui.jpg" />
      <c-avatar text="wanko" />
    </div>
    <c-section>展示性别sex</c-section>
    <div class="p flex-center">
      <c-avatar
        src="https://www.wanko.top/public/be77bd5a59a4330637ca90200.jpg"
        sex
      ></c-avatar>
    </div>
    <c-section>展示等级level</c-section>
    <div class="p">
      <c-avatar
        src="https://www.wanko.top/public/be77bd5a59a4330637ca90200.jpg"
        level
      ></c-avatar>
      <div>11111</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '无头像'
    }
  }
}
</script>

<style lang="scss" scoped></style>
