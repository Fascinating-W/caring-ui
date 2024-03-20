<!--
 * @Author: Wanko
 * @Date: 2024-03-04 15:34:10
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-20 10:56:36
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-search placeholder="默认方形"/>
    </div>
    <c-section>设置placeholderClass</c-section>
    <div class="p">
      <c-search placeholder="默认方形" placeholderClass="text-red"/>
    </div>
    <c-section>带右侧按钮 action</c-section>
    <div class="p">
      <c-search action actionText="取消" />
    </div>
    <c-section>shape=round</c-section>
    <div class="p">
      <c-search round />
    </div>
    <c-section>disabled</c-section>
    <div class="p">
      <c-search disabled/>
    </div>
    <c-section>自定义icon</c-section>
    <div class="p">
      <c-search :iconStyle="{
        fontSize: '20px',
        color: 'red'
      }"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ''
    }
  }
}
</script>

<style lang="scss" ></style>
