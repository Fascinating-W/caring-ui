<template>
	<c-popup class="" :mask="mask" :maskCloseAble="maskCloseAble" mode="bottom" :popup="false" v-model="value" length="auto"
	 :safeAreaInsetBottom="safeAreaInsetBottom" @close="popupClose" :zIndex="uZIndex">
		<slot />
		<view class="c-tooltip" v-if="tooltip">
			<view class="c-tooltip-item c-tooltip-cancel" hover-class="c-tooltip-cancel-hover" @tap="onCancel">
				{{cancelBtn ? cancelText : ''}}
			</view>
			<view v-if="showTips" class="c-tooltip-item c-tooltip-tips">
				{{tips ? tips : mode == 'number' ? '数字键盘' : mode == 'card' ? '身份证键盘' : '车牌号键盘'}}
			</view>
			<view v-if="confirmBtn" @tap="onConfirm" class="c-tooltip-item c-tooltips-submit" hover-class="c-tooltips-submit-hover">
				{{confirmBtn ? confirmText : ''}}
			</view>
		</view>
		<block v-if="mode == 'number' || mode == 'card'">
			<c-number-keyboard :random="random" @backspace="backspace" @change="change" :mode="mode" :dotEnabled="dotEnabled"></c-number-keyboard>
		</block>
		<block v-else>
			<c-car-keyboard :random="random" @backspace="backspace" @change="change"></c-car-keyboard>
		</block>
	</c-popup>
</template>

<script>
	export default {
		name: "c-keyboard",
		props: {
			// 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
			mode: {
				type: String,
				default: 'number'
			},
			// 是否显示键盘的"."符号
			dotEnabled: {
				type: Boolean,
				default: true
			},
			// 是否显示顶部工具条
			tooltip: {
				type: Boolean,
				default: true
			},
			// 是否显示工具条中间的提示
			showTips: {
				type: Boolean,
				default: true
			},
			// 工具条中间的提示文字
			tips: {
				type: String,
				default: ''
			},
			// 是否显示工具条左边的"取消"按钮
			cancelBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示工具条右边的"完成"按钮
			confirmBtn: {
				type: Boolean,
				default: true
			},
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: false
			},
			// 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否允许通过点击遮罩关闭键盘
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 通过双向绑定控制键盘的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			// 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
			mask: {
				type: Boolean,
				default: true
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: '确认'
			}
		},
		data() {
			return {
				//show: false
			}
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$c.zIndex.popup;
			}
		},
		methods: {
			change(e) {
				this.$emit('change', e);
			},
			// 键盘关闭
			popupClose() {
				// 通过发送input这个特殊的事件名，可以修改父组件传给props的value的变量，也即双向绑定
				this.$emit('input', false);
			},
			// 输入完成
			onConfirm() {
				this.popupClose();
				this.$emit('confirm');
			},
			// 取消输入
			onCancel() {
				this.popupClose();
				this.$emit('cancel');
			},
			// 退格键
			backspace() {
				this.$emit('backspace');
			},
			// 关闭键盘
			// close() {
			// 	this.show = false;
			// },
			// // 打开键盘
			// open() {
			// 	this.show = true;
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.c-keyboard {
		position: relative;
		z-index: 1003;
	}

	.c-tooltip {
		display: flex;
		justify-content: space-between;
	}

	.c-tooltip-item {
		color: #333333;
		flex: 0 0 33.333333%;
		text-align: center;
		padding: 20rpx 10rpx;
		font-size: 28rpx;
	}

	.c-tooltips-submit {
		text-align: right;
		flex-grow: 1;
		flex-wrap: 0;
		padding-right: 40rpx;
		color: $c-primary;
	}

	.c-tooltip-cancel {
		text-align: left;
		flex-grow: 1;
		flex-wrap: 0;
		padding-left: 40rpx;
		color: #888888;
	}

	.c-tooltips-submit-hover {
		color: $c-success;
	}

	.c-tooltip-cancel-hover {
		color: #333333;
	}
</style>
