<!--
 * @Author: Wanko
 * @Date: 2024-03-14 15:50:52
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 16:23:22
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>实现方式1</c-section>
    <div class="py">
      <c-grid :col="3">
        <c-grid-item v-for="(i, idx) in list" :key="idx">
          <c-icon :name="i.icon" :size="24"></c-icon>
          <view class="mt-2 text-14 c-info">{{ i.name }}</view>
        </c-grid-item>
      </c-grid>
    </div>
    <c-section>实现方式2</c-section>
    <div class="py">
      <view class="border-l border-t flex-wrap">
        <view
          v-for="(i, idx) in list" :key="idx"
          class="py flex-cc flex-col border-b border-r w-1-3"
          ><c-icon :name="i.icon"></c-icon>
          <view class="mt-2 text-14 c-info">{{ i.name }}</view>
        </view>
      </view>
    </div>
    <c-section>实现方式3</c-section>
    <div class="py">
      <view class="border-l border-t grid-3">
        <view
          v-for="(i, idx) in list" :key="idx"
          class="py flex-cc flex-col border-b border-r"
          ><c-icon :name="i.icon"></c-icon>
          <view class="mt-2 text-14 c-info">{{ i.name }}</view>
        </view>
      </view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.list = Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      name: `名称${i + 1}`,
      icon: 'photo'
    }))
  }
}
</script>

<style lang="scss" scoped>
.grid-text {
  font-size: 28rpx;
  margin-top: 4rpx;
  color: $u-type-info;
}
</style>
