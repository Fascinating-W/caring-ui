<!--
 * @Author: Wanko
 * @Date: 2024-03-13 16:48:05
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:09:38
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-button @click="showToast">显示提示，效果同showToast</c-button>
      <c-toast ref="cToast" />
    </div>
    <c-section>带回调的提示</c-section>
    <div class="p">
      <c-button @click="showToast1">打开带回调的提示</c-button>
      <c-toast ref="cToast" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$refs.cToast.show('一个简单的提示')
    },
    showToast1() {
      this.$refs.cToast
        .show({
          title: '提示',
          type: 'success',
          duration: 3000,
          icon: false,
          position: 'top'
        })
        .then(() => {
          this.$c.route('/pages/components/TopTips', {
            id: 1,
            menu: 3,
            list: [
              {
                name: '2333',
                hobby: 'guitar'
              }
            ]
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
