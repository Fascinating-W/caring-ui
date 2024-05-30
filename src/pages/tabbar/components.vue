<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-29 15:31:00
 * @Description: 
-->
<template>
  <div class="">
    <c-navbar
      :isBack="true"
      backText="CARING UI"
      :background="background"
      :border-bottom="false"
      :backTextStyle="{
        color: '#333',
        fontWeight: 'bold',
        fontSize: '18px',
        opacity: opacity
      }"
      backIconName=""
    ></c-navbar>
    <div class="bgc"></div>

    <div class="relative px-10 z-max">
      <c-sticky
        :offsetTop="offsetTop"
        zIndex="990"
        bg-color="transparent"
        h5NavHeight="0"
      >
        <div :style="{ width: width }" class="search">
          <c-search
            bgColor="#fff"
            borderColor="#f9d7ea"
            v-model="key"
            @input="$c.debounce(onSearch, 500)"
            round
          ></c-search>
        </div>
      </c-sticky>
    </div>

    <div class="relative p">
      <template v-if="key">
        <c-cell
          :customStyle="{ borderRadius: '12px', marginBottom: '10px' }"
          :title="i.title"
          v-for="(i, idx) in searchList"
          @click="$c.route(i.path)"
          :key="idx"
          arrow
        ></c-cell>
      </template>
      <c-collapse
        v-else
        :headStyle="{
          padding: '20px',
          color: '#666',
          fontSize: '15px'
        }"
        :itemStyle="{
          background: '#fff',
          'margin-bottom': '10px',
          borderRadius: '12px',
          overflow: 'hidden'
        }"
      >
        <c-collapse-item
          :title="i.groupName"
          v-for="(i, index) in list"
          :key="index"
        >
          <div class="p">
            <c-cell-group>
              <c-cell
                :title="j.title"
                :key="jdx"
                v-for="(j, jdx) in i.list"
                @click="$c.route(j.path)"
                arrow
              />
            </c-cell-group>
          </div>
        </c-collapse-item>
      </c-collapse>
      <c-gap height="500"></c-gap>
    </div>
  </div>
</template>

<script>
import list from './list.js'
let menuButtonInfo = {}
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

export default {
  data() {
    return {
      key: '',
      searchList: [],
      list,
      menuButtonInfo: menuButtonInfo,
      background: {
        backgroundColor: 'transparent',
        filter: `blur(0px)`
      },
      width: 'auto',
      blurAmount: 0,
      navbarBgColor: 'rgba(0, 0, 0, 0)',
      height: 0,
      opacity: 1,
      offsetTop: 0
    }
  },
  onLoad() {
    console.log(this.$c.sys(), '---')

    let height = uni.getSystemInfoSync().platform == 'ios' ? 44 : 48
    this.maxHeight = uni.getSystemInfoSync().statusBarHeight + height
    // #ifdef MP-WEIXIN
    this.offsetTop = this.maxHeight + 5
    // #endif
    // #ifdef H5
    this.offsetTop = 10
    // #endif

    this.width = menuButtonInfo.left - 20
  },
  onPageScroll(event) {
    // console.log(event)
    this.scrollTop = event.scrollTop || 0
    this.getNavBarBgColor()
  },
  methods: {
    onSearch() {
      console.log(this.key)
      const list = this.list.flatMap((i) => i.list)
      const result = list.filter((i) =>
        i.title.toLowerCase().includes(this.key)
      )
      this.searchList = result
    },
    getNavBarBgColor() {
      // 根据下拉距离，计算导航栏背景颜色
      const width = menuButtonInfo.left - 20
      const initalWidh = uni.getSystemInfoSync().windowWidth - 20
      console.log(width, 'width')
      const scrollTopRatio = this.scrollTop / this.maxHeight // 滚动距离的比例

      // #ifdef MP-WEIXIN
      this.width =
        this.scrollTop >= this.maxHeight
          ? width
          : initalWidh - scrollTopRatio * 100
      // this.width =
      //   this.scrollTop >= this.maxHeight ? this.maxHeight : width / this.scrollTop
      this.width = this.width + 'px'
      // #endif

      const alpha =
        this.scrollTop >= this.maxHeight ? 1 : this.scrollTop / this.maxHeight
      this.opacity = Math.max(0, 1 - this.scrollTop / this.maxHeight)

      this.blurAmount = Math.min(10, Math.round(this.scrollTop / 10)) // 根据需要调整这个计算逻辑
      this.background = {
        backgroundColor: `rgba(255, 255, 255, ${alpha})`
        // filter: `blur(${this.blurAmount}px)`
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.bgc {
  position: fixed;
  top: 0rpx;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, #f9d7ea 0%, #f8f8f8 100%) #e03997;
  // background: linear-gradient(4deg, #f8f8f8 0%, #f8f8f8 0%, #b2c3ff 53%) #5771e7;
}
.search {
  transition: all 0.3s ease;
}
</style>
