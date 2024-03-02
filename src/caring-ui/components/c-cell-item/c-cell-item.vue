<template>
	<view
		@tap="click"
		class="c-cell"
		:class="{ 'border-b': borderBottom, 'border-t': borderTop, 'flex-center': center, 'c-cell--required': required }"
		hover-stay-time="150"
		:hover-class="hoverClass"
		:style="{
			backgroundColor: bgColor
		}"
	>
		<c-icon :size="iconSize" :name="icon" v-if="icon" :custom-style="iconStyle" class="c-cell__left-icon-wrap"></c-icon>
		<view class="flex-center " v-else>
			<slot name="icon"></slot>
		</view>
		<view
			class="c-cell_title"
			:style="[
				{
					width: titleWidth ? titleWidth + 'rpx' : 'auto'
				},
				titleStyle
			]"
		>
			<block v-if="title !== ''">{{ title }}</block>
			<slot name="title" v-else></slot>

			<view class="c-cell__label" v-if="label || $slots.label" :style="[labelStyle]">
				<block v-if="label !== ''">{{ label }}</block>
				<slot name="label" v-else></slot>
			</view>
		</view>

		<view class="c-cell__value" :style="[valueStyle]">
			<block class="c-cell__value" v-if="value !== ''">{{ value }}</block>
			<slot v-else></slot>
		</view>
		<view class="flex-center c-cell_right" v-if="$slots['right-icon']">
			<slot name="right-icon"></slot>
		</view>
		<c-icon v-if="arrow" name="arrow-right" :style="[arrowStyle]" class="flex-center c-cell__right-icon-wrap"></c-icon>
	</view>
</template>

<script>

export default {
	name: 'c-cell-item',
	props: {
		// 左侧图标名称(只能uView内置图标)，或者图标src
		icon: {
			type: String,
			default: ''
		},
		// 左侧标题
		title: {
			type: [String, Number],
			default: ''
		},
		// 右侧内容
		value: {
			type: [String, Number],
			default: ''
		},
		// 标题下方的描述信息
		label: {
			type: [String, Number],
			default: ''
		},
		// 是否显示下边框
		borderBottom: {
			type: Boolean,
			default: true
		},
		// 是否显示上边框
		borderTop: {
			type: Boolean,
			default: false
		},
		// 多个cell中，中间的cell显示下划线时，下划线是否给一个到左边的距离
		// 1.4.0版本废除此参数，默认边框由border-top和border-bottom提供，此参数会造成干扰
		// borderGap: {
		// 	type: Boolean,
		// 	default: true
		// },
		// 是否开启点击反馈，即点击时cell背景为灰色，none为无效果
		hoverClass: {
			type: String,
			default: 'c-cell-hover'
		},
		// 是否显示右侧箭头
		arrow: {
			type: Boolean,
			default: false
		},
		// 内容是否垂直居中
		center: {
			type: Boolean,
			default: false
		},
		// 是否显示左边表示必填的星号
		required: {
			type: Boolean,
			default: false
		},
		// 标题的宽度，单位rpx
		titleWidth: {
			type: [Number, String],
			default: ''
		},
		// 右侧箭头方向，可选值：right|up|down，默认为right
		arrowDirection: {
			type: String,
			default: 'right'
		},
		// 控制标题的样式
		titleStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 右侧显示内容的样式
		valueStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 描述信息的样式
		labelStyle: {
			type: Object,
			default() {
				return {};
			}
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: 'transparent'
		},
		// 用于识别被点击的是第几个cell
		index: {
			type: [String, Number],
			default: ''
		},
		// 是否使用lable插槽
		useLabelSlot: {
			type: Boolean,
			default: false
		},
		// 左边图标的大小，单位px，只对传入icon字段时有效
		iconSize: {
			type: [Number, String],
			default: 17
		},
		// 左边图标的样式，对象形式
		iconStyle: {
			type: Object,
			default() {
				return {}
			}
		},
	},
	data() {
		return {

		};
	},
	computed: {
		arrowStyle() {
			let style = {};
			if (this.arrowDirection == 'up') style.transform = 'rotate(-90deg)';
			else if (this.arrowDirection == 'down') style.transform = 'rotate(90deg)';
			else style.transform = 'rotate(0deg)';
			return style;
		}
	},
	methods: {
		click() {
			this.$emit('click', this.index);
		}
	}
};
</script>

<style lang="scss" scoped>
.c-cell {
	display: flex;
	align-items: center;
	position: relative;
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	/* #endif */
	width: 100%;
	padding: 26rpx 32rpx;
	font-size: 28rpx;
	line-height: 54rpx;
	color: $c-content-color;
	background-color: #fff;
	text-align: left;
}

.c-cell_title {
	font-size: 28rpx;
}

.c-cell__left-icon-wrap {
	margin-right: 10rpx;
	font-size: 32rpx;
}

.c-cell__right-icon-wrap {
	margin-left: 10rpx;
	color: #969799;
	font-size: 28rpx;
}

.c-cell__left-icon-wrap,
.c-cell__right-icon-wrap {
	display: flex;
	align-items: center;
	height: 48rpx;
}

.c-cell-border:after {
	position: absolute; 
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	content: ' ';
	pointer-events: none;
	border-bottom: 1px solid $c-border-color;
	/* #endif */
	right: 0;
	left: 0;
	top: 0;
	transform: scaleY(0.5);
}

.c-cell-border {
	position: relative;
}

.c-cell__label {
	margin-top: 6rpx;
	font-size: 26rpx;
	line-height: 36rpx;
	color: $c-tips-color;
	/* #ifndef APP-NVUE */
	word-wrap: break-word;
	/* #endif */
}

.c-cell__value {
	overflow: hidden;
	text-align: right;
	/* #ifndef APP-NVUE */
	vertical-align: middle;
	/* #endif */
	color: $c-tips-color;
	font-size: 26rpx;
}

.c-cell__title,
.c-cell__value {
	flex: 1;
}

.c-cell--required {
	/* #ifndef APP-NVUE */
	overflow: visible;
	/* #endif */
	display: flex;
	align-items: center;
}

.c-cell--required:before {
	position: absolute;
	/* #ifndef APP-NVUE */
	content: '*';
	/* #endif */
	left: 8px;
	margin-top: 4rpx;
	font-size: 14px;
	color: $c-error;
}

.c-cell_right {
	line-height: 1;
}
</style>
