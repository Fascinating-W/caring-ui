<!--
 * @Author: Wanko
 * @Date: 2024-03-02 11:47:45
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-28 17:52:21
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>默认按钮 type=default</c-section>
    <div class="p">
      <c-button>默认按钮</c-button>
      <c-button text="默认按钮text">1111</c-button>
      <c-button disabled>默认按钮disabled</c-button>
    </div>
    <c-section>设置主题</c-section>
    <div class="p">
      <c-button type="primary">primary按钮</c-button>
      <c-button success>success按钮</c-button>
      <c-button error>error按钮</c-button>
      <c-button warning>warning按钮</c-button>
      <c-button info>info按钮</c-button>
    </div>
    <c-section>设置mode=light</c-section>
    <div class="p">
      <c-button primary light disabled>light按钮</c-button>
      <c-button success light>light按钮</c-button>
      <c-button error light>light按钮</c-button>
      <c-button warning light>light按钮</c-button>
      <c-button info light>light按钮</c-button>
    </div>
    <c-section>设置mode=plain</c-section>
    <div class="p">
      <c-button primary plain>light按钮</c-button>
      <c-button success plain>light按钮</c-button>
      <c-button error plain>light按钮</c-button>
      <c-button warning plain>light按钮</c-button>
      <c-button info plain>light按钮</c-button>
    </div>
    <c-section>设置大小size</c-section>
    <div class="p">
      <c-button medium>medium</c-button>
      <c-button mini>mini</c-button>
    </div>
    <c-section>设置形状shape</c-section>
    <div class="p">
      <c-button type="primary" round>主要按钮</c-button>
    </div>
    <c-section>设置点击水波纹</c-section>
    <div class="p">
      <c-button primary round ripple>主要按钮</c-button>
    </div>

    <c-section>自定义customStyle、customClass</c-section>
    <div class="p">
      <c-button
        primary
        round
        ripple
        :customStyle="{ background: 'purple', width: '150px', height: '50px' }"
        >主要按钮</c-button
      >
      <c-button primary round ripple customClass="my-button">主要按钮</c-button>
    </div>
    <c-section>设置loading</c-section>
    <div class="p">
      <c-button primary round loading>主要按钮</c-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.my-button {
  background: pink;
}
</style>
