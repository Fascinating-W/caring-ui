<!--
 * @Author: Wanko
 * @Date: 2024-02-04 15:12:40
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-25 18:53:12
 * @Description: 
-->
<template>
  <div
    v-if="visibleSync"
    class="c-drawer"
    hover-stop-propagation
    :style="[
      customStyle,
      {
        zIndex: uZindex - 1
      }
    ]"
  >
    <c-mask
      :duration="duration"
      :custom-style="maskCustomStyle"
      :maskClickAble="false"
      v-model="showMask"
      @click="maskClick"
      :filter="filter"
    />
    <view
      class="c-drawer-content"
      @tap="modeCenterClose(mode)"
      :class="[
        safeAreaInsetBottom ? 'safe-area-inset-bottom' : '',
        'c-drawer-' + mode,
        zoom && mode == 'center' ? 'c-animation-zoom' : ''
      ]"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :style="[style, showDrawer ? drawerContentVisible : '']"
      ref="drawer"
    >
      <view
        class="c-mode-center-box"
        @tap.stop.prevent
        @touchmove.stop.prevent
        v-if="mode == 'center'"
        :style="[centerStyle]"
      >
        <c-icon
          @click="close"
          v-if="closeable"
          class="c-close"
          :class="['c-close--' + closeIconPos]"
          :name="closeIcon"
          :color="closeIconColor"
          :size="closeIconSize"
        ></c-icon>
        <scroll-view class="c-drawer__scroll-view" scroll-y="true">
          <slot />
        </scroll-view>
      </view>
      <scroll-view class="c-drawer__scroll-view" scroll-y="true" v-else>
        <slot />
      </scroll-view>
      <view @tap="close" class="c-close" :class="['c-close--' + closeIconPos]">
        <c-icon
          v-if="mode != 'center' && closeable"
          :name="closeIcon"
          :color="closeIconColor"
          :size="closeIconSize"
        ></c-icon>
      </view>
    </view>
  </div>
</template>

<script>
import {
  value,
  zIndex,
  customStyle,
  maskClickAble,
  duration,
  safeAreaInsetBottom,
  filter
} from '../../libs/props/common.js'

export default {
  props: {
    value,
    zIndex,
    customStyle,
    maskClickAble,
    duration,
    safeAreaInsetBottom,
    filter,
    /**
     * 弹出方向，left|right|top|bottom|center
     */
    mode: {
      type: String,
      default: 'bottom'
    },
    /**
     * 是否显示遮罩
     */
    mask: {
      type: Boolean,
      default: true
    },
    // 遮罩的样式，一般用于修改遮罩的透明度
    maskCustomStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否可以通过点击遮罩进行关闭
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 此为内部参数，不在文档对外使用，为了解决Picker和keyboard等融合了弹窗的组件
    // 对v-model双向绑定多层调用造成报错不能修改props值的问题
    popup: {
      type: Boolean,
      default: true
    },
    // 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度
    length: {
      type: [Number, String],
      default: 'auto'
    },
    // 是否开启缩放动画，只在mode=center时有效
    zoom: {
      type: Boolean,
      default: true
    },
    // 显示显示弹窗的圆角，单位px
    rounded: {
      type: [Number, String],
      default: 0
    },
    // 是否显示关闭图标
    closeable: {
      type: Boolean,
      default: false
    },
    // 关闭图标的名称，只能uView的内置图标
    closeIcon: {
      type: String,
      default: 'close'
    },
    // 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
    closeIconPos: {
      type: String,
      default: 'top-right'
    },
    // 关闭图标的颜色
    closeIconColor: {
      type: String,
      default: uni.$c.color.tips
    },
    // 关闭图标的大小，单位px
    closeIconSize: {
      type: [String, Number],
      default: '15'
    },
    // 宽度，只对左，右，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    width: {
      type: String,
      default: ''
    },
    // 高度，只对上，下，中部弹出时起作用，单位rpx，或者"auto"
    // 或者百分比"50%"，表示由内容撑开高度或者宽度，优先级高于length参数
    height: {
      type: String,
      default: 'auto'
    },
    // 给一个负的margin-top，往上偏移，避免和键盘重合的情况，仅在mode=center时有效
    negativeTop: {
      type: [String, Number],
      default: 0
    },
    touch: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: [String, Number],
      default: 50
    }
  },
  computed: {
    drawerContentVisible() {
      return {
        transform: `translate3D(${this.left}px, 0px, 0px) !important`
      }
    },
    // 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
    style() {
      let style = {}
      // 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
      if (this.mode == 'left' || this.mode == 'right') {
        style = {
          width: this.width
            ? this.getUnitValue(this.width)
            : this.getUnitValue(this.length),
          height: '100%',
          transform: `translate3D(${
            this.mode == 'left' ? '-100%' : '100%'
          },0px,0px)`
        }
      } else if (this.mode == 'top' || this.mode == 'bottom') {
        style = {
          width: '100%',
          height: this.height
            ? this.getUnitValue(this.height)
            : this.getUnitValue(this.length),
          transform: `translate3D(0px,${
            this.mode == 'top' ? '-100%' : '100%'
          },0px)`
        }
      }
      style.zIndex = this.uZindex
      // 如果用户设置了rounded值，添加弹窗的圆角
      if (this.rounded) {
        switch (this.mode) {
          case 'left':
            style.borderRadius = `0 ${this.rounded}px ${this.rounded}px 0`
            break
          case 'top':
            style.borderRadius = `0 0 ${this.rounded}px ${this.rounded}px`
            break
          case 'right':
            style.borderRadius = `${this.rounded}px 0 0 ${this.rounded}px`
            break
          case 'bottom':
            style.borderRadius = `${this.rounded}px ${this.rounded}px 0 0`
            break
          default:
        }
        // 不加可能圆角无效
        style.overflow = 'hidden'
      }
      if (this.duration)
        style.transition = `all ${this.duration / 1000}s linear`
      return style
    },
    // 中部弹窗的特有样式
    centerStyle() {
      let style = {}
      style.width = this.width
        ? this.getUnitValue(this.width)
        : this.getUnitValue(this.length)
      // 中部弹出的模式，如果没有设置高度，就用auto值，由内容撑开高度
      style.height = this.height ? this.getUnitValue(this.height) : 'auto'
      style.zIndex = this.uZindex
      style.marginTop = `-${this.$c.addUnit(this.negativeTop)}`
      if (this.rounded) {
        style.borderRadius = `${this.rounded}px`
        // 不加可能圆角无效
        style.overflow = 'hidden'
      }
      return style
    },
    // 计算整理后的z-index值
    uZindex() {
      return this.zIndex ? this.zIndex : this.$c.zIndex.popup
    },
    showMask: {
      get() {
        return this.showDrawer && this.mask
      },
      set(val) {
        this.showDrawer = val
      }
    }
  },
  data() {
    return {
      visibleSync: false,
      showDrawer: false,
      timer: null,
      closeFromInner: false, // value的值改变，是发生在内部还是外部
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      left: 0
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.open()
      } else if (!this.closeFromInner) {
        this.close()
      }
      this.closeFromInner = false
    }
  },
  mounted() {
    this.value && this.open()
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.touches[0].clientX
    },
    handleTouchMove(event) {
      this.moveX = event.touches[0].clientX - this.startX

      if (this.mode === 'left' && this.moveX < 0) {
        this.left = this.moveX
      }

      if(this.mode === 'right' && this.moveX > 0) {
        this.left = this.moveX
      }
    },
    handleTouchEnd() {
      if (!this.touch) return
      let threshold = +this.threshold
      if (this.mode === 'left' && this.moveX < 0) {
        if (Math.abs(this.moveX) > threshold) {
          this.close()
        }
      } else if (this.mode === 'right' && this.moveX > 0) {
        // 右侧弹窗从左向右滑动关闭
        if (Math.abs(this.moveX) > threshold) {
          this.close()
        }
      }
      // 重置移动距离
      this.moveX = 0
      this.left = 0
    },
    getUnitValue(val) {
      if (/(%|px|rpx|auto)$/.test(val)) return val
      else return val + 'px'
    },
    modeCenterClose(mode) {
      if (mode != 'center' || !this.maskCloseAble) return
      this.close()
    },
    maskClick() {
      if (this.maskCloseAble) {
        this.close()
      }
    },
    close() {
      this.closeFromInner = true
      this.change('showDrawer', 'visibleSync', false)
    },
    open() {
      this.change('visibleSync', 'showDrawer', true)
      console.log('open')
      this.$nextTick(() => {
        this.$cGetRect('.c-drawer-content').then((res) => {
          console.log(res)
          this.drawerWidth = res.width
        })
      })
    },
    change(param1, param2, status) {
      // 如果this.popup为false，意味着为picker，actionsheet等组件调用了popup组件
      if (this.popup == true) {
        this.$emit('input', status)
      }
      this[param1] = status
      if (status) {
        // #ifdef H5 || MP
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, 50)
        // #endif
        // #ifndef H5 || MP
        this.$nextTick(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        })
        // #endif
      } else {
        this.timer = setTimeout(() => {
          this[param2] = status
          this.$emit(status ? 'open' : 'close')
        }, this.duration)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-drawer {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.c-drawer-content {
  display: block;

  position: absolute;
  z-index: 1003;
  transition: all 0.25s linear;
}
.c-drawer__scroll-view {
  width: 100%;
  height: 100%;
}

.c-drawer-left {
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
}

.c-drawer-right {
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
}

.c-drawer-top {
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}

.c-drawer-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}

.c-drawer-center {
  display: flex;
  flex-direction: row;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  opacity: 0;
  z-index: 99999;
}

.c-mode-center-box {
  min-width: 100rpx;
  min-rounded: 100rpx;
  position: relative;
  background-color: #ffffff;
}

.c-drawer-content-visible.c-drawer-center {
  transform: scale(1);
  opacity: 1;
}

.c-animation-zoom {
  transform: scale(1.15);
}

.c-drawer-content-visible {
  transform: translate3D(0px, 0px, 0px) !important;
}

.c-close {
  position: absolute;
  z-index: 3;
}

.c-close--top-left {
  top: 30rpx;
  left: 30rpx;
}

.c-close--top-right {
  top: 30rpx;
  right: 30rpx;
}

.c-close--bottom-left {
  bottom: 30rpx;
  left: 30rpx;
}

.c-close--bottom-right {
  right: 30rpx;
  bottom: 30rpx;
}
</style>
