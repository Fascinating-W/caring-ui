<template>
  <view
    v-if="show"
    class="c-badge"
    :class="[
      dot ? 'c-badge-dot' : '',
      size == 'mini' ? 'c-badge-mini' : '',
      type ? 'c-badge--bg--' + type : '',
      customClass
    ]"
    :style="[
      {
        top: offset[0] + 'px',
        right: offset[1] + 'px',
        fontSize: fontSize + 'px',
        position: absolute ? 'absolute' : 'static',
        color: color,
        backgroundColor: bgColor
      },
      boxStyle,
      customStyle
    ]"
  >
    {{ showText }}
  </view>
</template>

<script>
import { customStyle, customClass } from '../../libs/props/common.js'
export default {
  name: 'c-badge',
  props: {
    customStyle,
    customClass,
    type: {
      type: String,
      default: 'error'
    },
    // default, mini
    size: {
      type: String,
      default: 'default'
    },
    //是否是圆点
    dot: {
      type: Boolean,
      default: false
    },
    // 显示的数值内容
    count: {
      type: [Number, String]
    },
    // 展示封顶的数字值
    overflowCount: {
      type: Number,
      default: 99
    },
    // 当数值为 0 时，是否展示 Badge
    showZero: {
      type: Boolean,
      default: false
    },
    // 位置偏移
    offset: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否开启绝对定位，开启了offset才会起作用
    absolute: {
      type: Boolean,
      default: true
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: '12'
    },
    // 字体演示
    color: {
      type: String,
      default: '#ffffff'
    },
    // badge的背景颜色
    bgColor: {
      type: String,
      default: ''
    },
    // 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效
    center: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 是否将badge中心与父组件右上角重合
    boxStyle() {
      let style = {}
      if (this.center && this.offset.length === 0) {
        style.top = 0
        style.right = 0
        // Y轴-50%，意味着badge向上移动了badge自身高度一半，X轴50%，意味着向右移动了自身宽度一半
        style.transform = 'translateY(-50%) translateX(50%)'
      } else {
        style.top = this.offset[0] + 'px'
        style.right = this.offset[1] + 'px'
        style.transform = 'translateY(0) translateX(0)'
      }
      // 如果尺寸为mini，后接上scal()
      if (this.size == 'mini') {
        style.transform = style.transform + ' scale(0.8)'
      }
      return style
    },
    // isDot类型时，不显示文字
    showText() {
      if (this.dot) return ''
      else {
        if (this.count > this.overflowCount) return `${this.overflowCount}+`
        else return this.count
      }
    },
    // 是否显示组件
    show() {
      // 如果count的值为0，并且showZero设置为false，不显示组件
      if (this.count == 0 && this.showZero == false) return false
      else return true
    }
  }
}
</script>

<style lang="scss" scoped>
.c-badge {
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  justify-content: center;
  align-items: center;
  line-height: 24rpx;
  padding: 4rpx 8rpx;
  border-radius: 100rpx;
  z-index: 9;

  &--bg--primary {
    background-color: $c-primary;
  }

  &--bg--error {
    background-color: $c-error;
  }

  &--bg--success {
    background-color: $c-success;
  }

  &--bg--info {
    background-color: $c-info;
  }

  &--bg--warning {
    background-color: $c-warning;
  }
}

.c-badge-dot {
  height: 16rpx;
  width: 16rpx;
  border-radius: 100rpx;
  line-height: 1;
}

.c-badge-mini {
  transform: scale(0.8);
  transform-origin: center center;
}
.c-info {
  background-color: $c-info;
  color: #fff;
}
</style>
