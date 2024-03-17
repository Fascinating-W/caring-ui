<!--
 * @Author: Wanko
 * @Date: 2024-03-17 15:03:36
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-17 15:57:56
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-loadmore status="nomore" />
      <c-loadmore status="loadmore" />
      <c-loadmore status="loading" />
      <c-loadmore status="loading" flower />
      <c-loadmore status="nomore" dot class="h-40" />
      <c-loadmore status="nomore" dot customClass="h-80" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: 15,
      page: 0,
      status: 'loadmore'
    }
  },
  onReachBottom() {
    console.log('到底')
    this.status = 'loading'
    setTimeout(() => {
      this.list += 10
      if (this.page >= 3) this.status = 'nomore'
      else this.status = 'loading'
    }, 2000)
  }
}
</script>

<style lang="scss" scoped></style>
