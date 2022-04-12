<template>
  <div class="caring-nodata" :style="{ 'padding-top': '50%' }">
    <u-empty :text="text" :mode="mode"></u-empty>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无相关数据'
    },
    mode: {
      type: String,
      default: 'data'
    },
    top: {
      type: String,
      default: '50%'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>