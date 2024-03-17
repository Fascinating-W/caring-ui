<template>
  <view
    class="c-load-more-wrap"
    :style="customStyle"
    :class="customClass"
  >
    <c-line length="25"></c-line>
    <!-- 加载中和没有更多的状态才显示两边的横线 -->
    <view
      :class="status == 'loadmore' || status == 'nomore' ? 'c-more' : ''"
      class="c-load-more-inner"
    >
      <view class="c-loadmore-icon-wrap">
        <c-loading
          class="c-loadmore-icon"
          :color="iconColor"
          :flower="flower"
          :show="status == 'loading' && icon"
        ></c-loading>
      </view>
      <!-- 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 -->
      <view
        class="line-1"
        :style="[loadTextStyle]"
        :class="[
          status == 'nomore' && dot == true ? 'c-dot-text' : 'c-more-text'
        ]"
        @tap="loadMore"
      >
        {{ showText }}
      </view>
    </view>
    <c-line color="#d4d4d4" length="25"></c-line>
  </view>
</template>

<script>
import { customStyle, customClass } from '../../libs/props/common.js'

export default {
  name: 'c-loadmore',

  props: {
    customStyle,
    customClass,
    // 组件背景色
    bgColor: {
      type: String,
      default: 'transparent'
    },
    // 是否显示加载中的图标
    icon: {
      type: Boolean,
      default: true
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '13'
    },
    // 字体颜色
    color: {
      type: String,
      default: uni.$c.color.tips
    },
    // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
    status: {
      type: String,
      default: 'loadmore'
    },
    flower: {
      type: Boolean,
      default: false
    },
    // 显示的文字
    loadText: {
      type: Object,
      default() {
        return {
          loadmore: '加载更多',
          loading: '正在加载...',
          nomore: '没有更多了'
        }
      }
    },
    // 在“没有更多”状态下，是否显示粗点
    dot: {
      type: Boolean,
      default: false
    },
    // 加载中显示圆圈动画时，动画的颜色
    iconColor: {
      type: String,
      default: uni.$c.color.disable
    }
  },
  data() {
    return {
      // 粗点
      dotText: '●'
    }
  },
  computed: {
    // 加载的文字显示的样式
    loadTextStyle() {
      const style = {
        color: this.color,
        fontSize: this.fontSize + 'px',
        position: 'relative',
        zIndex: 1
        // 如果是加载中状态，动画和文字需要距离近一点
      }
      if (this.status === 'nomore' && this.dot) {
        style.fontSize = this.fontSize - 6 + 'px'
        style.color = uni.$c.color.light
      }
      return style
    },
    // 加载中圆圈动画的样式
    cricleStyle() {
      return {
        borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
      }
    },
    // 加载中花朵动画形式
    // 动画由base64图片生成，暂不支持修改
    flowerStyle() {
      return {}
    },
    // 显示的提示文字
    showText() {
      let text = ''
      if (this.status == 'loadmore') text = this.loadText.loadmore
      else if (this.status == 'loading') text = this.loadText.loading
      else if (this.status == 'nomore' && this.dot) text = this.dotText
      else text = this.loadText.nomore
      return text
    }
  },
  methods: {
    loadMore() {
      // 只有在“加载更多”的状态下才发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
      if (this.status == 'loadmore') this.$emit('loadmore')
    }
  }
}
</script>

<style scoped lang="scss">
/* #ifdef MP */
// 在mp.scss中，赋予了c-line为flex: 1，这里需要一个明确的长度，所以重置掉它
// 在组件内部，把组件名(c-line)当做选择器，在微信开发工具会提示不合法，但不影响使用
c-line {
  flex: none;
}
/* #endif */

.c-load-more-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-load-more-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12rpx;
}

.c-more {
  position: relative;
  display: flex;
  justify-content: center;
}

.c-dot-text {
  font-size: 28rpx;
}

.c-loadmore-icon-wrap {
  margin-right: 8rpx;
}

.c-loadmore-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
