<template>
  <div class="caring-loading padding">
    <u-loading :color="color"></u-loading>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: uni.$c.color.primary
    }
  }
}
</script>

<style lang="scss" scoped>
</style>