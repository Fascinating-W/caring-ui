<template>
  <div class="padding text-center">
    <caring-title title="基础使用"/>
    <caring-loading></caring-loading>
    <caring-title title="修改颜色"/>
    <caring-loading color="red"></caring-loading>
    <caring-title title="修改为内置颜色"/>
    <caring-loading :color="$c.color.success"></caring-loading>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>