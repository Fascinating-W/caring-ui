<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-11 19:59:30
 * @Description: 
-->
<template>
  <view class="bg-f8 overflow-hidden">
    <div class="m p bg-white rounded shadow">
      caring-css
    </div>
    <div class="m p bg-white rounded shadow">
      caring-utils
    </div>
    <div class="m p bg-white rounded shadow" @click="toMini('/pages/article/detail?id=48961101&slug=kt1e14pzeyve52in')">
      caring-route
    </div>
    <div class="m p bg-white rounded shadow" @click="toMini('/pages/article/detail?id=48961101&slug=gy2qul1b4gckakai')">
      caring-uni
    </div>
    <div class="m p bg-white rounded shadow">
      caring-style
    </div>
    <div class="m p bg-white rounded shadow">
      caring-components
    </div>
  </view>
</template>

<script>
export default {
  methods: {
    toMini(path) {
      uni.navigateToMiniProgram({
        appId: 'wxed601e5004cb3e70',
        path
      })
    }
  },
}
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}
</style>
