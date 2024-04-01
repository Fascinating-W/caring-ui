<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:46:06
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-01 15:48:46
 * @Description: ✅
-->
<template>
  <div class="p">
    <c-section title="基础使用" customClass="my" />
    <c-line />
    <c-gap />
    <c-line hairLine />
    <c-section title="设置颜色color" customClass="my" />
    <c-line color="primary" />
    <c-section title="设置绝对长度length" customClass="my" />
    <c-line length="50" />
    <c-section title="设置百分比length" customClass="my" />
    <c-line length="50%" />
    <c-section title="设置虚线dashed" customClass="my" />
    <c-line color="warning" dashed />

    <c-section title="设置竖向" customClass="my" />
    <c-line length="50" col />

    <c-section title="customClass" customClass="my" />
    <c-line length="50" customClass="mt" />

    <c-section title="父元素控制居中" customClass="my"/>
    <div class="flex-cc">
      <c-line length="50" customClass="mt" />
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
