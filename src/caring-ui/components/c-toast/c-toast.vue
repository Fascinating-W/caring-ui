<template>
  <view
    class="c-toast"
    :class="[
      isShow ? 'c-show' : '',
      'c-type-' + tmpConfig.type,
      'c-position-' + tmpConfig.position
    ]"
    :style="{
      zIndex: uZIndex
    }"
  >
    <view class="c-icon-wrap">
      <c-icon
        v-if="tmpConfig.icon"
        class="c-icon"
        :name="iconName"
        :size="15"
        :color="tmpConfig.type"
      ></c-icon>
    </view>
    <text class="c-text">{{ title }}</text>
  </view>
</template>

<script>
/**
 * toast 消息提示
 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
 * @tutorial https://www.uviewui.com/components/toast.html
 * @property {String} z-index toast展示时的z-index值
 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
 * @example <c-toast ref="uToast" />
 */
export default {
  name: 'c-toast',
  props: {
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      timer: null, // 定时器
      title: '',
      config: {
        title: '', // 显示文本
        type: '', // 主题类型，primary，success，error，warning，black
        duration: 2000, // 显示的时间，毫秒
        icon: true, // 显示的图标
        position: 'center' // toast出现的位置
      },
      tmpConfig: {} // 将用户配置和内置配置合并后的临时配置变量
    }
  },
  computed: {
    iconName() {
      // 只有不为none，并且type为error|warning|succes|info时候，才显示图标
      if (
        ['error', 'warning', 'success', 'info'].indexOf(this.tmpConfig.type) >=
          0 &&
        this.tmpConfig.icon
      ) {
        let icon = this.$c.type2icon(this.tmpConfig.type)
        return icon
      }
    },
    uZIndex() {
      // 显示toast时候，如果用户有传递z-index值，有限使用
      return this.isShow
        ? this.zIndex
          ? this.zIndex
          : this.$c.zIndex.toast
        : '999999'
    }
  },
  methods: {
    show(options) {
      // 不降结果合并到this.config变量，避免多次条用c-toast，前后的配置造成混论

      console.log(this.tmpConfig, '000', options)
      if (typeof options === 'string') {
        this.title = options
        options = {
          title: options
        }
      } else if (typeof options === 'object' && options !== null) {
        this.title = options.title
      }
      this.tmpConfig = this.$c.deepMerge(this.config, options)
      return new Promise((resolve, reject) => {
        if (this.timer) {
          // 清除定时器
          clearTimeout(this.timer)
          this.timer = null
        }
        this.isShow = true
        this.timer = setTimeout(() => {
          // 倒计时结束，清除定时器，隐藏toast组件
          this.isShow = false
          clearTimeout(this.timer)
          this.timer = null
          // 判断是否存在callback方法，如果存在就执行
          resolve()
        }, this.tmpConfig.duration)
      })
    },
    // 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
    hide() {
      this.isShow = false
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-toast {
  position: fixed;
  z-index: -1;
  transition: opacity 0.3s;
  text-align: center;
  color: #fff;
  border-radius: 8rpx;
  background: #585858;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  opacity: 0;
  pointer-events: none;
  padding: 18rpx 40rpx;
}

.c-toast.c-show {
  opacity: 1;
}

.c-icon {
  margin-right: 10rpx;
  display: flex;
  align-items: center;
  line-height: normal;
}

.c-position-center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* #ifndef APP-NVUE */
  max-width: 70%;
  /* #endif */
}

.c-position-top {
  left: 50%;
  top: 20%;
  transform: translate(-50%, -50%);
}

.c-position-bottom {
  left: 50%;
  bottom: 20%;
  transform: translate(-50%, -50%);
}

.c-type-primary {
  color: $c-primary;
  background-color: $c-primary-light;
  border: 1px solid rgb(215, 234, 254);
}

.c-type-success {
  color: $c-success;
  background-color: $c-success-light;
  border: 1px solid #bef5c8;
}

.c-type-error {
  color: $c-error;
  background-color: $c-error-light;
  border: 1px solid #fde2e2;
}

.c-type-warning {
  color: $c-warning;
  background-color: $c-warning-light;
  border: 1px solid #faecd8;
}

.c-type-info {
  color: $c-info;
  background-color: $c-info-light;
  border: 1px solid #ebeef5;
}

.c-type-default {
  color: #fff;
  background-color: #585858;
}
</style>
