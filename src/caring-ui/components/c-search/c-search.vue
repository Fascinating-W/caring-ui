<template>
  <view
    class="c-search"
    @tap="clickHandler"
    :style="customStyle"
    :class="customClass"
  >
    <view
      class="c-content"
      :style="{
        backgroundColor: bgColor,
        borderRadius: calcShape == 'round' ? '1000px' : `${rounded}px`,
        border: borderStyle,
        height: height + 'px'
      }"
    >
      <view class="c-icon-wrap">
        <c-icon
          class="c-clear-icon"
          :name="icon"
          :customStyle="iconStyle"
        ></c-icon>
      </view>
      <input
        confirm-type="search"
        @blur="blur"
        :value="value"
        @confirm="search"
        @input="inputChange"
        :disabled="disabled"
        @focus="getFocus"
        :focus="focus"
        :maxlength="maxlength"
        :placeholder-class="`c-placeholder-class ${placeholderClass}`"
        :placeholder="placeholder"
        :placeholder-style="`color: ${placeholderColor}`"
        class="c-input"
        type="text"
        :style="[
          {
            textAlign: inputAlign,
            color: color,
            backgroundColor: bgColor
          },
          inputStyle
        ]"
      />
      <view
        class="c-close-wrap"
        v-if="keyword && clearabled && focused"
        @tap="clear"
      >
        <c-icon
          class="c-clear-icon"
          name="close-circle-fill"
          size="17"
          color="#c0c4cc"
        ></c-icon>
      </view>
    </view>
    <view
      :style="[actionStyle]"
      class="c-action"
      :class="[actionBtn || show ? 'c-action-active' : '']"
      @tap.stop.prevent="custom"
      >{{ actionText }}</view
    >
  </view>
</template>

<script>
import { customStyle, customClass } from '../../libs/props/common.js'
export default {
  name: 'c-search',
  props: {
    customStyle,
    customClass,
    placeholderClass: {
      type: String,
      default: ''
    },
		rounded: {
      type: [Number, String],
      default: 5
    },
    // 搜索框形状，round-圆形，square-方形
    shape: {
      type: String,
      default: 'square'
    },
    round: {
      type: Boolean,
      default: false
    },
    // 搜索框背景色，默认值#f2f2f2
    bgColor: {
      type: String,
      default: '#f2f2f2'
    },
    // 占位提示文字
    placeholder: {
      type: String,
      default: '请输入关键字'
    },
    // 是否启用清除控件
    clearabled: {
      type: Boolean,
      default: true
    },
    // 是否自动聚焦
    focus: {
      type: Boolean,
      default: false
    },
    // 是否在搜索框右侧显示取消按钮
    action: {
      type: Boolean,
      default: false
    },
    // 右边控件的样式
    actionStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 取消按钮文字
    actionText: {
      type: String,
      default: '搜索'
    },
    // 输入框内容对齐方式，可选值为 left|center|right
    inputAlign: {
      type: String,
      default: 'left'
    },
    // 是否启用输入框
    disabled: {
      type: Boolean,
      default: false
    },
    // 开启action时，是否在input获取焦点时才显示
    animation: {
      type: Boolean,
      default: false
    },
    // 边框颜色，只要配置了颜色，才会有边框
    borderColor: {
      type: String,
      default: 'none'
    },
    // 输入框的初始化内容
    value: {
      type: String,
      default: ''
    },
    // 搜索框高度，单位px
    height: {
      type: [Number, String],
      default: 32
    },
    // input输入框的样式，可以定义文字颜色，大小等，对象形式
    inputStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
    maxlength: {
      type: [Number, String],
      default: '-1'
    },
    // 搜索图标的颜色，默认同输入框字体颜色
    iconColor: {
      type: String,
      default: uni.$c.color.content
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: uni.$c.color.content
    },
    // placeholder的颜色
    placeholderColor: {
      type: String,
      default: ''
    },
    // 左边输入框的图标，可以为uView图标名称或图片路径
    icon: {
      type: String,
      default: 'search'
    },
    iconStyle: {
      type: Object,
      default: ()=>({
        color: uni.$c.color.content,
        fontSize: '15px'
      })
    }
  },
  data() {
    return {
      keyword: '',
      showClear: false, // 是否显示右边的清除图标
      show: false,
      // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
      focused: this.focus
      // 绑定输入框的值
      // inputValue: this.value
    }
  },
  watch: {
    keyword(nVal) {
      // 双向绑定值，让v-model绑定的值双向变化
      this.$emit('input', nVal)
      // 触发change事件，事件效果和v-model双向绑定的效果一样，让用户多一个选择
      this.$emit('change', nVal)
    },
    value: {
      immediate: true,
      handler(nVal) {
        this.keyword = nVal
      }
    }
  },
  computed: {
    calcShape() {
      if (this.round) return 'round'
      else return this.shape
    },
    actionBtn() {
      if (!this.animation && this.action) return true
      else return false
    },
    // 样式，根据用户传入的颜色值生成，如果不传入，默认为none
    borderStyle() {
      if (this.borderColor) return `1px solid ${this.borderColor}`
      else return 'none'
    }
  },
  methods: {
    // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
    inputChange(e) {
      this.keyword = e.detail.value
    },
    // 清空输入
    // 也可以作为用户通过this.$refs形式调用清空输入框内容
    clear() {
      this.keyword = ''
      // 延后发出事件，避免在父组件监听clear事件时，value为更新前的值(不为空)
      this.$nextTick(() => {
        this.$emit('clear')
      })
    },
    // 确定搜索
    search(e) {
      this.$emit('search', e.detail.value)
      try {
        // 收起键盘
        uni.hideKeyboard()
      } catch (e) {}
    },
    // 点击右边自定义按钮的事件
    custom() {
      this.$emit('custom', this.keyword)
      try {
        // 收起键盘
        uni.hideKeyboard()
      } catch (e) {}
    },
    // 获取焦点
    getFocus() {
      this.focused = true
      // 开启右侧搜索按钮展开的动画效果
      if (this.animation && this.action) this.show = true
      this.$emit('focus', this.keyword)
    },
    // 失去焦点
    blur() {
      // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
      // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
      setTimeout(() => {
        this.focused = false
      }, 100)
      this.show = false
      this.$emit('blur', this.keyword)
    },
    // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
    clickHandler() {
      if (this.disabled) this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-search {
  display: flex;
  align-items: center;
  flex: 1;
  transition: all 0.3s;
}
.c-placeholder-class  {
  color: $c-light;
}

.c-content {
  display: flex;
  align-items: center;
  padding: 0 18rpx;
  flex: 1;
}

.c-clear-icon {
  display: flex;
  align-items: center;
}

.c-input {
  flex: 1;
  font-size: 28rpx;
  line-height: 1;
  margin: 0 10rpx;
  color: $c-tips;
}

.c-close-wrap {
  width: 40rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}



.c-action {
  font-size: 28rpx;
  color: $c-main;
  width: 0;
  overflow: hidden;
  transition: all 0.3s;
  white-space: nowrap;
  text-align: center;
}

.c-action-active {
  width: 80rpx;
  margin-left: 10rpx;
}
</style>
