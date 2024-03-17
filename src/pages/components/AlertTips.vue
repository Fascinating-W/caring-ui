<!--
 * @Author: Wanko
 * @Date: 2024-03-13 17:30:26
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:05:52
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用,默认warning</c-section>
    <div class="p">
      <c-alert-tips
        :title="title"
        :show="show"
        :description="description"
        showIcon
        closabled
        @close="show = false"
      ></c-alert-tips>
    </div>
    <c-section>不同主题</c-section>
    <div class="p">
      <c-alert-tips
        :title="title"
        :show="show"
        type="success"
        :description="description"
        showIcon
        icon="photo"
        closabled
        @close="show = false"
      ></c-alert-tips>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '登高望远',
      description: '欲穷千里目，更上一层楼',
      show: true
    }
  }
}
</script>
