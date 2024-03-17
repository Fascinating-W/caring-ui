<template>
  <c-popup
    mode="bottom"
    :rounded="rounded"
    :popup="false"
    v-model="value"
    :maskCloseAble="maskCloseAble"
    length="auto"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    @close="popupClose"
    :z-index="uZIndex"
  >
    <view class="c-tips border-b" v-if="tips.text" :style="[tipsStyle]">
      {{ tips.text }}
    </view>
    <block v-for="(item, index) in list" :key="index">
      <view
        @touchmove.stop.prevent
        @tap="itemClick(index)"
        :style="[itemStyle(index)]"
        class="c-action-sheet-item line-1"
        :class="[index < list.length - 1 ? 'border-b' : '']"
        :hover-stay-time="150"
      >
        <text>{{ item.text }}</text>
        <text class="c-action-sheet-item__subtext line-1" v-if="item.subText">{{
          item.subText
        }}</text>
      </view>
    </block>
    <view class="c-gab" v-if="showCancel"> </view>
    <view
      @touchmove.stop.prevent
      class="c-actionsheet-cancel c-action-sheet-item"
      hover-class="hover"
      :hover-stay-time="150"
      v-if="showCancel"
      @tap="close"
      >{{ cancelText }}</view
    >
  </c-popup>
</template>

<script>
import {maskCloseAble,safeAreaInsetBottom,value, zIndex, rounded} from '../../libs/props/common.js'
export default {
  name: 'c-action-sheet',
  props: {
    maskCloseAble,
    safeAreaInsetBottom,
    value,
    zIndex,
    rounded,
    // 按钮的文字数组，可以自定义颜色和字体大小，字体单位为px
    list: {
      type: Array,
      default() {
        // 如下
        // return [{
        // 	text: '确定',
        // 	color: '',
        // 	fontSize: ''
        // }]
        return []
      }
    },
    // 顶部的提示文字
    tips: {
      type: Object,
      default() {
        return {
          text: '',
          color: '',
          fontSize: '13'
        }
      }
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    // 取消按钮的文字提示
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    // 顶部提示的样式
    tipsStyle() {
      let style = {}
      if (this.tips.color) style.color = this.tips.color
      if (this.tips.fontSize) style.fontSize = this.tips.fontSize + 'px'
      return style
    },
    // 操作项目的样式
    itemStyle() {
      return (index) => {
        let style = {}
        if (this.list[index].color) style.color = this.list[index].color
        if (this.list[index].fontSize)
          style.fontSize = this.list[index].fontSize + 'px'
        // 选项被禁用的样式
        if (this.list[index].disabled) style.color = '#c0c4cc'
        return style
      }
    },
    uZIndex() {
      // 如果用户有传递z-index值，优先使用
      return this.zIndex ? this.zIndex : this.$c.zIndex.popup
    }
  },
  methods: {
    // 点击取消按钮
    close() {
      // 发送input事件，并不会作用于父组件，而是要设置组件内部通过props传递的value参数
      // 这是一个vue发送事件的特殊用法
      this.popupClose()
      this.$emit('close')
    },
    // 弹窗关闭
    popupClose() {
      this.$emit('input', false)
    },
    // 点击某一个item
    itemClick(index) {
      // disabled的项禁止点击
      if (this.list[index].disabled) return
      this.$emit('click', index)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>

.c-tips {
  font-size: 26rpx;
  text-align: center;
  padding: 34rpx 0;
  line-height: 1;
  color: $c-tips-color;
}

.c-action-sheet-item {
  display: flex;
  line-height: 1;
  justify-content: center;
  align-items: center;
  font-size: 32rpx;
  padding: 34rpx 0;
  flex-direction: column;
}

.c-action-sheet-item__subtext {
  font-size: 24rpx;
  color: $c-tips-color;
  margin-top: 20rpx;
}

.c-gab {
  height: 12rpx;
  background-color: rgb(234, 234, 236);
}

.c-actionsheet-cancel {
  color: $c-main-color;
}
</style>
