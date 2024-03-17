<template>
  <view
    :style="[customStyle]"
    class="c-icon"
    @tap="click"
    :class="['c-icon--' + labelPos, customClass]"
  >
    <image
      class="c-icon__img"
      v-if="isImg"
      :src="name"
      :mode="imgMode"
      :style="[imgStyle]"
    ></image>
		
    <view
      v-else
      class="c-icon__icon"
      :class="iconClass"
      :style="[iconStyle]"
      :hover-class="hoverClass"
      @touchstart="touchstart"
    >
      <view
        v-if="decimal"
        :style="[decimalIconStyle]"
        :class="decimalIconClass"
        :hover-class="hoverClass"
        class="c-icon__decimal"
      >
      </view>
    </view>
    <!-- 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示 -->
    <view
      v-if="label !== ''"
      class="c-icon__label"
      :style="{
        color: labelColor,
        fontSize: $c.addUnit(labelSize),
        marginLeft: labelPos == 'right' ? $c.addUnit(marginLeft) : 0,
        marginTop: labelPos == 'bottom' ? $c.addUnit(marginTop) : 0,
        marginRight: labelPos == 'left' ? $c.addUnit(marginRight) : 0,
        marginBottom: labelPos == 'top' ? $c.addUnit(marginBottom) : 0
      }"
      >{{ label }}
    </view>
  </view>
</template>

<script>
import {customClass, customStyle} from '../../libs/props/common.js'
export default {
	name: 'c-icon',
	props: {
		name: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: ''
		},
		size: {
			type: [Number, String],
			default: 'inherit'
		},
		bold: {
			type: Boolean,
			default: false
		},
		// 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
		index: {
			type: [Number, String],
			default: ''
		},
		// 触摸图标时的类名
		hoverClass: {
			type: String,
			default: ''
		},
		// 自定义扩展前缀，方便用户扩展自己的图标库
		customPrefix: {
			type: String,
			default: 'cicon'
		},
		// 图标右边或者下面的文字
		label: {
			type: [String, Number],
			default: ''
		},
		// label的位置，只能右边或者下边
		labelPos: {
			type: String,
			default: 'right'
		},
		// label的大小
		labelSize: {
			type: [String, Number],
			default: '14'
		},
		// label的颜色
		labelColor: {
			type: String,
			default: '#606266'
		},
		// label与图标的距离(横向排列)
		marginLeft: {
			type: [String, Number],
			default: '6'
		},
		// label与图标的距离(竖向排列)
		marginTop: {
			type: [String, Number],
			default: '6'
		},
		// label与图标的距离(竖向排列)
		marginRight: {
			type: [String, Number],
			default: '6'
		},
		// label与图标的距离(竖向排列)
		marginBottom: {
			type: [String, Number],
			default: '6'
		},
		// 图片的mode
		imgMode: {
			type: String,
			default: 'widthFix'
		},
		// 自定义样式
		customStyle,
    customClass,
		// 用于显示图片小图标时，图片的宽度
		width: {
			type: [String, Number],
			default: ''
		},
		// 用于显示图片小图标时，图片的高度
		height: {
			type: [String, Number],
			default: ''
		},
		// 用于解决某些情况下，让图标垂直居中的用途
		top: {
			type: [String, Number],
			default: 0
		},
		// 是否为DecimalIcon
		decimal: {
			type: Boolean,
			default: false
		},
		// 背景颜色，可接受主题色，仅Decimal时有效
		inactiveColor: {
			type: String,
			default: '#ececec'
		},
		// 显示的百分比，仅Decimal时有效
		percent: {
			type: [Number, String],
			default: '50'
		}
	},
	computed: {

		iconClass() {
			let classes = []
			classes.push(this.customPrefix + '-' + this.name)
			// uView的自定义图标类名为c-iconfont
			if (this.customPrefix == 'cicon') {
				classes.push('c-iconfont')
			} else {
				classes.push(this.customPrefix)
			}
			// 主题色，通过类配置
			if (this.decimal && this.inactiveColor && this.$c.config.type.includes(this.inactiveColor)) {
				classes.push('c-icon__icon--' + this.inactiveColor)
			} else if (this.color && this.$c.config.type.includes(this.color)) classes.push('c-icon__icon--' + this.color)
			// 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
			// 故需将其拆成一个字符串的形式，通过空格隔开各个类名
			//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
			classes = classes.join(' ')
			//#endif
			return classes
		},
     
		iconStyle() {
			let style = {}
			style = {
				fontSize: this.size == 'inherit' ? 'inherit' : this.$c.addUnit(this.size),
				fontWeight: this.bold ? 'bold' : 'normal',
				// 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
				top: this.$c.addUnit(this.top)
			}
			// 非主题色值时，才当作颜色值
			if (this.decimal && this.inactiveColor && !this.$c.config.type.includes(this.inactiveColor)) {
				style.color = this.inactiveColor
			} else if (this.color && !this.$c.config.type.includes(this.color)) style.color = this.color

			return style
		},
		// 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
		isImg() {
			return this.name.indexOf('/') !== -1
		},
		imgStyle() {
			let style = {}
      const size = this.size === 'inherit'?'16':this.size

			// 如果设置width和height属性，则优先使用，否则使用size属性
			style.width = this.width ? this.$c.addUnit(this.width) : this.$c.addUnit(size)
			style.height = this.height ? this.$c.addUnit(this.height) : this.$c.addUnit(size)
			return style
		},
		decimalIconStyle() {
			let style = {}
			style = {
				fontSize: this.size == 'inherit' ? 'inherit' : this.$c.addUnit(this.size),
				fontWeight: this.bold ? 'bold' : 'normal',
				// 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
				top: this.$c.addUnit(this.top),
				width: this.percent + '%'
			}
			// 非主题色值时，才当作颜色值
			if (this.color && !this.$c.config.type.includes(this.color)) style.color = this.color
			return style
		},
		decimalIconClass() {
			let classes = []
			classes.push(this.customPrefix + '-' + this.name)
			// uView的自定义图标类名为c-iconfont
			if (this.customPrefix == 'cicon') {
				classes.push('c-iconfont')
			} else {
				classes.push(this.customPrefix)
			}
			// 主题色，通过类配置
			if (this.color && this.$c.config.type.includes(this.color)) classes.push('c-icon__icon--' + this.color)
			else classes.push('c-icon__icon--primary')
			// 阿里，头条，百度小程序通过数组绑定类名时，无法直接使用[a, b, c]的形式，否则无法识别
			// 故需将其拆成一个字符串的形式，通过空格隔开各个类名
			//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
			classes = classes.join(' ')
			//#endif
			return classes
		}
	},
	mounted(){
	},
	methods: {
		click() {
			this.$emit('click', this.index)
		},
		touchstart() {
			this.$emit('touchstart', this.index)
		}
	}
}
</script>

<style scoped lang="scss">
@import './iconfont.css';
@import './custom.css';

.c-icon {
  display: inline-flex;
  align-items: center;

  &--left {
    flex-direction: row-reverse;
    align-items: center;
  }

  &--right {
    flex-direction: row;
    align-items: center;
  }

  &--top {
    flex-direction: column-reverse;
    justify-content: center;
  }

  &--bottom {
    flex-direction: column;
    justify-content: center;
  }

  &__icon {
    position: relative;

    &--primary {
      color: $c-primary;
    }

    &--success {
      color: $c-success;
    }

    &--error {
      color: $c-error;
    }

    &--warning {
      color: $c-warning;
    }

    &--info {
      color: $c-info;
    }
  }

  &__decimal {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    overflow: hidden;
  }

  &__img {
    height: auto;
    will-change: transform;
  }

  &__label {
    line-height: 1;
  }
}
</style>../../libs/props/common.js
