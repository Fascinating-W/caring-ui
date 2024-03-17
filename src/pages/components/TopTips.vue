<!--
 * @Author: Wanko
 * @Date: 2024-03-13 16:26:36
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:11:44
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-top-tips ref="cTips"></c-top-tips>
      <c-button @click="showTopTips">显示TopTips</c-button>
    </div>
  </div>
</template>

<script>
export default {
  onLoad(query) {
    console.log(query)
  },
  methods: {
    showTopTips() {
      this.$refs.cTips.show({
        title: '铁马冰河入梦来',
      })
    }
  }
}
</script>
