<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:24:00
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-04 16:25:19
 * @Description: 
-->
<template>
  <div>
    <c-popup v-model="show">
      <view>出淤泥而不染，濯清涟而不妖</view>
    </c-popup>
    <button @click="show = true">打开</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
}
</script>

<style lang="scss" scoped></style>
