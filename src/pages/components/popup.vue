<!--
 * @Author: Wanko
 * @Date: 2024-02-04 10:24:00
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-25 18:54:03
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用,默认底部弹出mode="bottom"</c-section>
    <div class="p">
      <c-button @click="show = true">打开底部弹窗</c-button>
    </div>
    <c-popup v-model="show">
      <view class="h-100"> 我是底部弹窗 </view>
    </c-popup>
    <!-- <c-section>filter背景弹窗</c-section>
    <div class="p">
      <c-button @click="show = true">打开底部弹窗</c-button>
    </div> -->
    <!-- <c-popup v-model="show">
      <view class="h-100"> 我是底部弹窗 </view>
    </c-popup> -->
    <c-section>中间弹出,内容滚动</c-section>
    <div class="p">
      <c-button @click="show2 = true">打开弹窗</c-button>
    </div>
    <div class="p">
      <c-button @click="show3 = true">打开弹窗3</c-button>
    </div>
    <!-- <u-popup v-model="show">
      <view>
        <button @click="$c.route('/pages/components/gap')">gap</button>
      </view>
    </u-popup> -->
    <c-popup v-model="show2" mode="center" height="50%" rounded="12">
      <scroll-view scroll-y="true" class="h-full">
        <view>
          <view v-for="index in 100" :key="index" @click="onItem(index)">
            第{{ index }}个Item
          </view>
        </view>
      </scroll-view>
    </c-popup>
    <c-popup v-model="show3" mode="center" height="50%" rounded="12">
      <scroll-view scroll-y="true" class="h-full">
        <view>
          <view v-for="index in 100" :key="index" @click="onItem(index)">
            第{{ index }}个Item
          </view>
        </view>
      </scroll-view>
    </c-popup>
    <c-section>设置filter效果</c-section>
    <div class="p">
      <c-button @click="show4 = true">打开filter弹窗</c-button>
    </div>
    <c-popup v-model="show4" filter>
      <view class="h-100"> 我是filter弹窗 </view>
    </c-popup>
    <c-section>滑动弹窗</c-section>
    <div class="p">
      <c-button @click="show5 = true">滑动弹窗</c-button>
    </div>
    <c-popup v-model="show5" filter mode="right" width="50%" touch>
      <scroll-view scroll-y="true" class="h-full">
        <view>
          <view v-for="index in 100" :key="index" @click="onItem(index)">
            第{{ index }}个Item
          </view>
        </view>
      </scroll-view>
    </c-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false
    }
  },
  methods: {
    onItem(i) {
      console.log(i)
    }
  }
}
</script>

<style lang="scss" scoped></style>
