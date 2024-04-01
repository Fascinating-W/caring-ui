<!--
 * @Author: Wanko
 * @Date: 2024-04-01 17:13:57
 * @LastEditors: Wanko
 * @LastEditTime: 2024-04-01 17:35:12
 * @Description: 
-->
<template>
  <div class="p">
    <c-section title="基本使用" customClass="my" />
    <c-message-input/>
    <c-section title="不同mode" customClass="my" />
    <c-message-input mode="bottomLine" />
    <c-message-input mode="middleLine" />
    <c-section title="最大长度和初始值" customClass="my" />
    <c-message-input maxlength="6" value="1234" />
    <c-message-input dotFill />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
