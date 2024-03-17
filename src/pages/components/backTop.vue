<!--
 * @Author: Wanko
 * @Date: 2024-02-27 18:14:10
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-07 15:22:19
 * @Description: 
-->
<template>
  <div style="height: 2000px" class="p">
    <c-button @click="onClick">滚到底部</c-button>
    <c-back-top :scrollTop="scrollTop" 
    ></c-back-top>
    <c-back-top :scrollTop="scrollTop" 
    icon="arrow-up" tips="返回"
    right="80"
    ></c-back-top>
    <c-back-top :scrollTop="scrollTop" icon="arrow-up" tips="返回"
    right="120"
    :iconStyle="{color:'red'}"
    :customStyle="{backgroundColor:'blue', color:'red'}"
    ></c-back-top>
     <c-back-top :scrollTop="scrollTop" icon="arrow-up" tips="返回"
    right="160"
    :iconStyle="{color:'red'}"
    customClass="bg-purple text-yellow"
    ></c-back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0
    }
  },
  methods: {
    onClick() {
      const {screenHeight} = uni.getSystemInfoSync()
      uni.pageScrollTo({ scrollTop: screenHeight })
    }
  },
  onLoad(options) {
    console.log(uni.getSystemInfoSync());
  },
  onPageScroll(e) {
    console.log(e);
    this.scrollTop = e.scrollTop
  }
}
</script>

<style lang="scss" scoped></style>
