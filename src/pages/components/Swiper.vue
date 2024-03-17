<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="py">
      <c-swiper :list="list" rounded="0"></c-swiper>
    </div>
    <c-section>不显示指示器</c-section>
    <div class="py">
      <c-swiper :list="list" mode="none"></c-swiper>
    </div>
    <c-section>开启3D效果</c-section>
    <div class="py">
      <c-swiper :list="list" effect3d></c-swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        'https://www.wanko.top/public/be77bd5a59a4330637ca90200.jpg',
        'https://www.wanko.top/public/be77bd5a59a4330637ca90203.jpg',
        'https://www.wanko.top/public/be77bd5a59a4330637ca90204.webp'
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
