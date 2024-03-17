<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:46:06
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-15 09:31:55
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-section title="section" />
    </div>
    <c-section>显示右侧内容</c-section>
    <div class="p">
      <c-section title="section" value="右侧" />
    </div>
    <c-section>左侧大小</c-section>
    <div class="p">
      <c-section title="section" value="右侧" size="30" />
    </div>
    <c-section>右侧箭头</c-section>
    <div class="p">
      <c-section title="section" value="右侧" arrow />
    </div>
    <c-section>设置颜色</c-section>
    <div class="p">
      <c-section title="section" value="右侧" arrow color="success"/>
    </div>
    <c-section>设置线条颜色</c-section>
    <div class="p">
      <c-section title="section" value="右侧" arrow color="success"  lineColor="error"/>
    </div>
    <c-section>不展示线条</c-section>
    <div class="p">
      <c-section title="section" value="右侧" arrow color="success"  lineColor="error" :line="false"/>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
