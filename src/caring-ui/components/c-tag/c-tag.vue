<!--
 * @Author: Wanko
 * @Date: 2024-03-03 13:22:03
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-22 18:36:00
 * @Description: 
-->
<template>
  <view
    v-if="show"
    :class="[
      disabled ? 'c-disabled' : '',
      'c-size-' + calcSize,
      'c-shape-' + calcShape,
      calcType === 'default'
        ? 'c-mode-default'
        : 'c-mode-' + calcMode + '-' + calcType,

      customClass
    ]"
    class="c-tag"
    :style="[tagStyle, customStyle]"
    @tap="clickTag"
  >
    <slot>{{ text }}</slot>
    <view class="c-icon-wrap" @tap.stop>
      <c-icon
        @click="close"
        size="11"
        v-if="closeable"
        :color="closeIconColor"
        name="close"
        class="c-close-icon"
        :style="[iconStyle]"
      ></c-icon>
    </view>
  </view>
</template>

<script>
import { customClass, customStyle } from '../../libs/props/common.js'
import themeProps from '../../libs/props/theme.js'
import typeProps from '../../libs/props/type.js'
export default {
  name: 'c-tag',
  // 是否禁用这个标签，禁用的话，会屏蔽点击事件
  mixins: [typeProps],
  props: {
    ...typeProps,
    ...themeProps,
    customClass,
    customStyle,
    // 标签类型info、primary、success、warning、error
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    // 标签的大小，分为default（默认），mini（较小）
    size: {
      type: String,
      default: 'default'
    },
    shape: {
      type: String,
      default: 'square'
    },
    text: {
      type: [String, Number],
      default: ''
    },
    // 背景颜色，默认为空字符串，即不处理
    bgColor: {
      type: String,
      default: ''
    },
    // 标签字体颜色，默认为空字符串，即不处理
    color: {
      type: String,
      default: ''
    },
    // 镂空形式标签的边框颜色
    borderColor: {
      type: String,
      default: ''
    },
    // 关闭按钮图标的颜色
    closeColor: {
      type: String,
      default: ''
    },
    // 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
    index: {
      type: [Number, String],
      default: ''
    },
    // 模式选择，dark|light|plain
    mode: {
      type: String,
      default: 'light'
    },
    // 是否可关闭
    closeable: {
      type: Boolean,
      default: false
    },
    // 是否显示
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    calcShape() {
      if (this.round) {
        return 'round'
      } else if (this.roundLeft) {
        return 'roundLeft'
      } else if (this.roundRight) {
        return 'roundRight'
      } else {
        return this.shape
      }
    },
    
    calcMode() {
      if (this.dark) {
        return 'dark'
      } else if (this.light) {
        return 'light'
      } else if (this.plain) {
        return 'plain'
      } else {
        return this.mode
      }
    },
    calcSize() {
      if (this.mini) {
        return 'mini'
      } else {
        return this.size
      }
    },

    tagStyle() {
      let style = {}
      // 文字颜色（如果有此值，会覆盖type值的颜色）
      if (this.color) style.color = this.color
      // tag的背景颜色（如果有此值，会覆盖type值的颜色）
      if (this.bgColor) style.backgroundColor = this.bgColor
      // 如果是镂空型tag，没有传递边框颜色（borderColor）的话，使用文字的颜色（color属性）

      if (this.calcMode == 'plain' && this.color && !this.borderColor)
        style.borderColor = this.color
      else style.borderColor = this.borderColor
      return style
    },
    iconStyle() {
      if (!this.closeable) return
      let style = {}
      if (this.calcSize == 'mini') style.fontSize = '20rpx'
      else style.fontSize = '22rpx'
      if (this.calcMode == 'plain' || this.calcMode == 'light')
        style.color = this.calcType
      else if (this.calcMode == 'dark') style.color = '#ffffff'
      if (this.closeColor) style.color = this.closeColor

			console.log(style, 'style');
      return style
    },
    // 关闭图标的颜色
    closeIconColor() {
      // 如果定义了关闭图标的颜色，就用此值，否则用字体颜色的值
      // 如果上面的二者都没有，如果是dark深色模式，图标就为白色
      // 最后如果上面的三者都不合适，就返回type值给图标获取颜色
      let color = ''
      if (this.closeColor) return this.closeColor
      else if (this.color) return this.color
      else if (this.calcMode == 'dark') return '#ffffff'
      else return this.calcType
    }
  },
  methods: {
    // 标签被点击
    clickTag() {
      // 如果是disabled状态，不发送点击事件
      if (this.disabled) return
      this.$emit('click', this.index)
    },
    // 点击标签关闭按钮
    close() {
      this.$emit('close', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-tag {
  box-sizing: border-box;
  align-items: center;
  border-radius: 6rpx;
  /* #ifndef APP-NVUE */
  display: inline-block;
  /* #endif */
  line-height: 1;
}

.c-size-default {
  font-size: 22rpx;
  padding: 12rpx 22rpx;
}

.c-size-mini {
  font-size: 20rpx;
  padding: 6rpx 12rpx;
}
.c-mode-default {
  color: $c-content;
  border: 1px solid #c0c4cc;
  background-color: #ffffff;
}
.c-mode-light-primary {
  background-color: $c-primary-light;
  color: $c-primary;
  border: 1px solid $c-primary-disabled;
}

.c-mode-light-success {
  background-color: $c-success-light;
  color: $c-success;
  border: 1px solid $c-success-disabled;
}

.c-mode-light-error {
  background-color: $c-error-light;
  color: $c-error;
  border: 1px solid $c-error-disabled;
}

.c-mode-light-warning {
  background-color: $c-warning-light;
  color: $c-warning;
  border: 1px solid $c-warning-disabled;
}

.c-mode-light-info {
  background-color: $c-info-light;
  color: $c-info;
  border: 1px solid $c-info-disabled;
}

.c-mode-dark-primary {
  background-color: $c-primary;
  color: #ffffff;
}

.c-mode-dark-success {
  background-color: $c-success;
  color: #ffffff;
}

.c-mode-dark-error {
  background-color: $c-error;
  color: #ffffff;
}

.c-mode-dark-warning {
  background-color: $c-warning;
  color: #ffffff;
}

.c-mode-dark-info {
  background-color: $c-info;
  color: #ffffff;
}

.c-mode-plain-primary {
  background-color: #ffffff;
  color: $c-primary;
  border: 1px solid $c-primary;
}

.c-mode-plain-success {
  background-color: #ffffff;
  color: $c-success;
  border: 1px solid $c-success;
}

.c-mode-plain-error {
  background-color: #ffffff;
  color: $c-error;
  border: 1px solid $c-error;
}

.c-mode-plain-warning {
  background-color: #ffffff;
  color: $c-warning;
  border: 1px solid $c-warning;
}

.c-mode-plain-info {
  background-color: #ffffff;
  color: $c-info;
  border: 1px solid $c-info;
}

.c-disabled {
  opacity: 0.55;
}

.c-shape-round {
  border-radius: 100rpx;
}

.c-shape-roundRight {
  border-radius: 0 100rpx 100rpx 0;
}

.c-shape-roundLeft {
  border-radius: 100rpx 0 0 100rpx;
}

.c-close-icon {
  margin-left: 14rpx;
  font-size: 22rpx;
  color: $c-success;
}

.c-icon-wrap {
  display: inline-flex;
  transform: scale(0.86);
}
</style>
../../libs/props/common.js
