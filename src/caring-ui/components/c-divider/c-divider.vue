<template>
  <view
    class="c-divider"
    :style="[customStyle]"
		:class="[customClass]"
    @tap="click"
  >
    <view
      class="c-divider-line "
      :class="[length?'':'flex-1' ]"
      :style="[lineStyle]"
    ></view>
    <view
      class="c-divider-text"
      :style="{
        color: TextColor,
      }"
      ><slot
    >{{ text }}</slot></view>
    <view
      class="c-divider-line"
      :class="[length?'':'flex-1']"
      :style="[lineStyle]"
    ></view>
  </view>
</template>

<script>
import {customStyle, customClass} from '../../libs/props/common.js'
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-divider',
  props: {
		customStyle,
		customClass,
		text: {
      type: [String, Number],
      default: ''
    },
    // 单一边divider横线的宽度(数值)，单位px。或者百分比
    length: {
      type: [Number, String],
      default: 0
    },
    // divider横线的颜色，如设置，
    borderColor: {
      type: String,
      default: '#dcdfe6'
    },
    // 文字颜色
    color: {
      type: String,
      default: 'inherit'
    },
  },
  computed: {
		TextColor() {
			return calcColor(this.color)
		},
    lineStyle() {
      let style = {}
      if (String(this.length).indexOf('%') != -1)
        style.width = this.length
      else style.width = this.length + 'px'
      // borderColor优先级高于type值
      if (this.borderColor) style.borderColor = 
			calcColor(this.borderColor)
      return style
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-divider {
  width: 100%;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: row;
	font-size: 13px;
	color: $c-tips-color
}

.c-divider-line {
  border-bottom: 1px solid $c-border-color;
  transform: scale(1, 0.5);
  transform-origin: center;
}

.c-divider-text {
  white-space: nowrap;
  padding: 0 16rpx;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
}
</style>
