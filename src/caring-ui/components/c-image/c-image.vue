<!--
 * @Author: Wanko
 * @Date: 2022-11-22 14:14:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-29 15:04:33
 * @Description: 
-->
<template>
  <view
    class="c-image inline-flex relative"
    :style="[wrapStyle]"
    @tap="onClick"
  >
    <image
      class="w-full h-full"
      :src="src"
      :mode="mode"
      @load="onLoadHandler"
      @error="onErrorHandler"
      :style="{
        borderRadius: round ? '50%' : $c.addUnit(rounded)
      }"
      :lazy-load="lazyLoad"
      :show-menu-by-longpress="showMenuByLongpress"
    />
    <view
      v-if="showLoading && loading"
      class="c-image__loading"
      :style="{
        borderRadius: round ? '50%' : $c.addUnit(rounded),
        backgroundColor: this.bgColor
      }"
    >
      <slot v-if="$slots.loading" name="loading" />
      <c-icon v-else :name="loadingIcon" />
    </view>

    <view
      v-if="showError && isError && !loading"
      class="c-image__error"
      :style="{
        borderRadius: round ? '50%' : $c.addUnit(rounded)
      }"
    >
      <slot v-if="$slots.error" name="error" />
      <c-icon v-else :name="errorIcon"></c-icon>
    </view>
  </view>
</template>

<script>
export default {
  name: 'c-image',
  props: {
    // 图片地址
    src: {
      type: String,
      default: ''
    },
    // 裁剪模式
    mode: {
      type: String,
      default: 'scaleToFill'
    },
    // 宽度，单位任意
    width: {
      type: [String, Number],
      default: '100%'
    },
    // 高度，单位任意
    height: {
      type: [String, Number],
      default: '100%'
    },
    // 是否圆形
    round: {
      type: Boolean,
      default: false
    },
    // 圆角，单位任意
    rounded: {
      type: [String, Number],
      default: 0
    },
    // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
    lazyLoad: {
      type: Boolean,
      default: true
    },
    // 开启长按图片显示识别微信小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      default: true
    },
    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: true
    },
    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    bgColor: {
      type: String,
      default: '#f3f4f6'
    },
    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: 'photo'
    },
    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: 'error-round'
    },
    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true
    },
    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: true
    },
    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 500
    }
  },
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          // 如果传入null或者''，或者false，或者undefined，标记为错误状态
          this.isError = true
          this.loading = false
        } else {
          this.isError = false
        }
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {}
      // 通过调用addUnit()方法，如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
      style.width = this.$c.addUnit(this.width)
      style.height = this.$c.addUnit(this.height)
      // 如果是配置了圆形，设置50%的圆角，否则按照默认的配置值
      style.borderRadius = this.round ? '50%' : this.$c.addUnit(this.rounded)
      // 如果设置圆角，必须要有hidden，否则可能圆角无效
      style.overflow = this.rounded > 0 ? 'hidden' : 'visible'
      if (this.fade) {
        style.opacity = this.opacity
        style.transition = `opacity ${
          Number(this.durationTime) / 1000
        }s ease-in-out`
      }
      return style
    }
  },
  methods: {
    // 点击图片
    onClick() {
      // 因为自定义组在外部无法直接绑定时间，需要用native参数，所以这里派发出去一个点击事件
      this.$emit('click')
    },
    onLoadHandler() {
      this.loading = false
      this.isError = false
      this.$emit('load')
      if (!this.fade) return this.removeBgColor()
      // 原来opacity为1(不透明，是为了显示占位图)，改成0(透明，意味着该元素显示的是背景颜色，默认的灰色)，再改成1，是为了获得过渡效果
      this.opacity = 0
      // 这里设置为0，是为了图片展示到背景全透明这个过程时间为0，延时之后延时之后重新设置为duration，是为了获得背景透明(灰色)
      // 到图片展示的过程中的淡入效果
      this.durationTime = 0
      // 延时50ms，否则在浏览器H5，过渡效果无效
      setTimeout(() => {
        this.durationTime = this.duration
        this.opacity = 1
        setTimeout(() => {
          this.removeBgColor()
        }, this.durationTime)
      }, 50)
    },
    // 移除图片的背景色
    removeBgColor() {
      // 淡入动画过渡完成后，将背景设置为透明色，否则png图片会看到灰色的背景
      this.backgroundStyle = {
        backgroundColor: 'transparent'
      }
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false
      this.isError = true
      this.$emit('error', err)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-image {
  position: relative;
  transition: opacity 0.5s ease-in-out;

  &__loading,
  &__error {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: $c-bg-color;
    color: $c-tips;
  }
}
</style>
