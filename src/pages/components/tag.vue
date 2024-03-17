<!--
 * @Author: Wanko
 * @Date: 2024-03-03 13:21:41
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-16 16:15:17
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用，默认primary</c-section>
    <div class="p">
      <c-tag text="传入text"></c-tag>
      <c-tag>传入slot</c-tag>
    </div>
    <c-section title="设置不同主题" />
    <div class="p">
      <c-tag text="primary" primary />
      <c-tag text="success" type="success" />
    </div>
    <c-section title="info的mode类型" />
    <div class="p">
      <c-tag text="dark" mode="dark" primary />
      <c-tag text="light" primary light />
      <c-tag text="plain" primary plain />
    </div>
    <c-section title="不同sizedefault、mini" />
    <div class="p">
      <c-tag text="默认size:default" primary size="default" />
      <c-tag text="mini" primary mini />
    </div>
    <c-section title="设置shape" />
    <div class="p">
      <c-tag primary round>round</c-tag>
      <c-tag primary roundLeft>roundLeft</c-tag>
      <c-tag primary roundRight>roundRight</c-tag>
    </div>
    <c-section title="设置disabled、closeable" />
    <div class="p">
      <c-tag text="disabled" disabled primary />
      <c-tag text="closeable" closeable primary />
    </div>
    <c-section title="自定义文字颜色" />
    <c-tag text="自定义" color="red" bgColor="yellow" borderColor="blue" />
    <c-section title="自定义class style" />

    <c-tag
      text="自定义style"
      :customStyle="{ width: '150px', textAlign: 'center', color: 'yellow' }"
      color="blue"
    />
    <c-tag
      text="自定义style"
      customClass="w-150 text-center text-red"
      color="blue"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    tagClick() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
