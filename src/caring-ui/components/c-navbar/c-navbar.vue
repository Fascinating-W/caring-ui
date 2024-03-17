<template>
  <view class="">
    <view
      class="c-navbar"
      :style="[navbarStyle]"
      :class="{ 'c-navbar-fixed': isFixed, 'border-b': border }"
    >
      <view
        class="c-status-bar"
        :style="{ height: statusBarHeight + 'px' }"
      ></view>
      <view class="c-navbar-inner" :style="[navbarInnerStyle]">
        <view class="c-back-wrap" v-if="isBack" @tap="goBack">
          <view class="c-icon-wrap">
            <c-icon
              :name="backIconName"
              :color="backIconColor"
              :size="backIconSize"
            ></c-icon>
          </view>
          <view
            class="c-icon-wrap c-back-text line-1"
            v-if="backText"
            :style="[backTextStyle]"
            >{{ backText }}</view
          >
        </view>
        <view class="c-navbar-content-title" v-if="title" :style="[titleStyle]">
          <view
            class="c-title line-1"
            :style="{
              color: titleColor,
              fontSize: titleSize + 'px',
              fontWeight: titleBold ? 'bold' : 'normal'
            }"
          >
            {{ title }}
          </view>
        </view>
        <view class="c-slot-content">
          <slot></slot>
        </view>
        <view class="c-slot-right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <!-- 解决fixed定位后导航栏塌陷的问题 -->
    <view
      class="c-navbar-placeholder"
      v-if="isFixed && !immersive"
      :style="{
        width: '100%',
        height: Number(navbarHeight) + statusBarHeight + 'px'
      }"
    ></view>
  </view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync()
let menuButtonInfo = {}
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

export default {
  name: 'c-navbar',
  props: {
    // 导航栏高度，单位px
    height: {
      type: [String, Number],
      default: ''
    },
    // 返回箭头的颜色
    backIconColor: {
      type: String,
      default: uni.$c.color.content
    },
    // 左边返回的图标
    backIconName: {
      type: String,
      default: 'nav-back'
    },
    // 左边返回图标的大小，px
    backIconSize: {
      type: [String, Number],
      default: '22'
    },
    // 返回的文字提示
    backText: {
      type: String,
      default: ''
    },
    // 返回的文字的 样式
    backTextStyle: {
      type: Object,
      default() {
        return {
          color: uni.$c.color.content
        }
      }
    },
    // 导航栏标题
    title: {
      type: String,
      default: ''
    },
    // 标题的宽度，如果需要自定义右侧内容，且右侧内容很多时，可能需要减少这个宽度，单位px
    titleWidth: {
      type: [String, Number],
      default: '125'
    },
    // 标题的颜色
    titleColor: {
      type: String,
      default: uni.$c.color.content
    },
    // 标题字体是否加粗
    titleBold: {
      type: Boolean,
      default: false
    },
    // 标题的字体大小
    titleSize: {
      type: [String, Number],
      default: 16
    },
    isBack: {
      type: [Boolean, String],
      default: true
    },
    // 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
    background: {
      type: Object,
      default() {
        return {
          background: '#ffffff'
        }
      }
    },
    // 导航栏是否固定在顶部
    isFixed: {
      type: Boolean,
      default: true
    },
    // 是否沉浸式，允许fixed定位后导航栏塌陷，仅fixed定位下生效
    immersive: {
      type: Boolean,
      default: false
    },
    // 是否显示导航栏的下边框
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [String, Number],
      default: ''
    },
    // 自定义返回逻辑
    customBack: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      menuButtonInfo: menuButtonInfo,
      statusBarHeight: systemInfo.statusBarHeight
    }
  },
  computed: {
    // 导航栏内部盒子的样式
    navbarInnerStyle() {
      let style = {}
      // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
      style.height = this.navbarHeight + 'px'
      // // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
      // #ifdef MP
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
      style.marginRight = rightButtonWidth + 'px'
      // #endif
      return style
    },
    // 整个导航栏的样式
    navbarStyle() {
      let style = {}
      style.zIndex = this.zIndex ? this.zIndex : this.$c.zIndex.navbar
      // 合并用户传递的背景色对象
      Object.assign(style, this.background)
      return style
    },
    // 导航中间的标题的样式
    titleStyle() {
      let style = {}
      // #ifndef MP
      style.left =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + 'px'
      style.right =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + 'px'
      // #endif
      // #ifdef MP
      // 此处是为了让标题显示区域即使在小程序有右侧胶囊的情况下也能处于屏幕的中间，是通过绝对定位实现的
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
      style.left =
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + 'px'
      style.right =
        rightButtonWidth -
        (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 +
        rightButtonWidth +
        'px'
      // #endif
      style.width = uni.upx2px(this.titleWidth) + 'px'
      return style
    },
    // 转换字符数值为真正的数值
    navbarHeight() {
      // #ifdef APP-PLUS || H5
      return this.height ? this.height : 44
      // #endif
      // #ifdef MP
      // 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
      // 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
      // return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
      let height = systemInfo.platform == 'ios' ? 44 : 48
      return this.height ? this.height : height
      // #endif
    }
  },
  created() {},
  methods: {
    goBack() {
      // 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
      if (typeof this.customBack === 'function') {
        // 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
        // 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
        this.customBack.bind(this.$c.$parent.call(this))()
      } else {
        uni.navigateBack()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.c-navbar {
  width: 100%;
}

.c-navbar-fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 991;
}

.c-status-bar {
  width: 100%;
}

.c-navbar-inner {
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
}

.c-back-wrap {
  display: flex;
  align-items: center;
  flex: 1;
  flex-grow: 0;
  padding: 14rpx 14rpx 14rpx 24rpx;
}

.c-back-text {
  padding-left: 4rpx;
  font-size: 30rpx;
}

.c-navbar-content-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  height: 60rpx;
  text-align: center;
  flex-shrink: 0;
}

.c-navbar-centent-slot {
  flex: 1;
}

.c-title {
  line-height: 60rpx;
  font-size: 32rpx;
  flex: 1;
}

.c-navbar-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.c-slot-content {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
