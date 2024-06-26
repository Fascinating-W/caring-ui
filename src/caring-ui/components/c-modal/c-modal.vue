<template>
	<view>
		<c-popup :zoom="zoom" mode="center" :popup="false" :z-index="uZIndex" v-model="value" :length="width"
		:filter="filter"
		 :mask-close-able="maskCloseAble" :rounded="rounded" @close="popupClose" :negative-top="negativeTop">
			<view class="c-model">
				<view v-if="showTitle" class="c-model__title line-1" :style="[titleStyle]">{{ title }}</view>
				<view class="c-model__content">
					<view :style="[contentStyle]" v-if="$slots.default  || $slots.$default">
						<slot />
					</view>
					<view v-else class="c-model__content__message" :style="[contentStyle]">{{ content }}</view>
				</view>
				<view class="c-model__footer border-t" v-if="showCancel || showConfirm">
					<view v-if="showCancel" :hover-stay-time="100" hover-class="c-model__btn--hover" class="c-model__footer__button "
          :class="[cancelBorder?'border-r':'']"
					 :style="[cancelBtnStyle]" @tap="cancel">
						{{cancelText}}
					</view>
					<view v-if="showConfirm || $slots['confirm-button']" :hover-stay-time="100" :hover-class="asyncClose ? 'none' : 'c-model__btn--hover'"
					 class="c-model__footer__button hairline-left" :style="[confirmBtnStyle]" @tap="confirm">
						<slot v-if="$slots['confirm-button']" name="confirm-button"></slot>
						<block v-else>
							<c-loading mode="circle" :color="confirmColor" v-if="loading"></c-loading>
							<block v-else>
								{{confirmText}}
							</block>
						</block>
					</view>
				</view>
			</view>
		</c-popup>
	</view>
</template>

<script>
import {value, zIndex,filter} from '../../libs/props/common.js'
	export default {
		name: 'c-modal',
		props: {
			value,
			zIndex,
			filter,
			// 标题
			title: {
				type: [String],
				default: '提示'
			},
			// 弹窗宽度，可以是数值(px)，百分比，auto等
			width: {
				type: [Number, String],
				default: 300
			},
			// 弹窗内容
			content: {
				type: String,
				default: '内容'
			},
			// 是否显示标题
			showTitle: {
				type: Boolean,
				default: true
			},
			// 是否显示确认按钮
			showConfirm: {
				type: Boolean,
				default: true
			},
			// 是否显示取消按钮
			showCancel: {
				type: Boolean,
				default: true
			},
			// 确认文案
			confirmText: {
				type: String,
				default: '确认'
			},
      cancelBorder: {
        type: Boolean,
				default: true
      },
			// 取消文案
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮颜色
			confirmColor: {
				type: String,
				default: uni.$c.color.primary
			},
			// 取消文字颜色
			cancelColor: {
				type: String,
				default: uni.$c.color.content
			},
			// 圆角值
			rounded: {
				type: [Number, String],
				default: 8
			},
			// 标题的样式
			titleStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 内容的样式
			contentStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 取消按钮的样式
			cancelStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 确定按钮的样式
			confirmStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否开启缩放效果
			zoom: {
				type: Boolean,
				default: true
			},
			// 是否异步关闭，只对确定按钮有效
			asyncClose: {
				type: Boolean,
				default: false
			},
			// 是否允许点击遮罩关闭modal
			maskCloseAble: {
				type: Boolean,
				default: false
			},
			// 给一个负的margin-top，往上偏移，避免和键盘重合的情况
			negativeTop: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				loading: false, // 确认按钮是否正在加载中
			}
		},
		computed: {
			cancelBtnStyle() {
				return Object.assign({
					color: this.cancelColor
				}, this.cancelStyle);
			},
			confirmBtnStyle() {
				return Object.assign({
					color: this.confirmColor
				}, this.confirmStyle);
			},
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$c.zIndex.popup;
			}
		},
		watch: {
			// 如果是异步关闭时，外部修改v-model的值为false时，重置内部的loading状态
			// 避免下次打开的时候，状态混乱
			value(n) {
				if (n === true) this.loading = false;
			}
		},
		methods: {
			confirm() {
				// 异步关闭
				if (this.asyncClose) {
					this.loading = true;
				} else {
					this.$emit('input', false);
				}
				this.$emit('confirm');
			},
			cancel() {
				this.$emit('cancel');
				this.$emit('input', false);
				// 目前popup弹窗关闭有一个延时操作，此处做一个延时
				// 避免确认按钮文字变成了"确定"字样，modal还没消失，造成视觉不好的效果
				setTimeout(() => {
					this.loading = false;
				}, 300);
			},
			// 点击遮罩关闭modal，设置v-model的值为false，否则无法第二次弹起modal
			popupClose() {
				this.$emit('input', false);
			},
			// 清除加载中的状态
			clearLoading() {
				this.loading = false;
			}
		}
	};
</script>

<style lang="scss" scoped>

	.c-model {
		height: auto;
		overflow: hidden;
		font-size: 32rpx;
		background-color: #fff;

		&__btn--hover {
			background-color: rgb(230, 230, 230);
		}

		&__title {
			padding-top: 48rpx;
			font-weight: 500;
			text-align: center;
			color: $c-main;
		}

		&__content {
			&__message {
				padding: 48rpx;
				font-size: 30rpx;
				text-align: center;
				color: $c-content;
			}
		}

		&__footer {
			display: flex;

			&__button {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				box-sizing: border-box;
				cursor: pointer;
				text-align: center;
				border-radius: 4rpx;
			}
		}
	}
</style>
