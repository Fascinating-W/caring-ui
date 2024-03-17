<template>
	<view @tap="backToTop" class="c-back-top" :class="['c-back-top--mode--' + mode, customClass]" :style="[{
		bottom: bottom + 'px',
		right: right + 'px',
		borderRadius: mode == 'circle' ? '10000px' : '4px',
		zIndex: uZIndex,
		opacity: opacity
	}, customStyle]">
		<view class="c-back-top__content" v-if="!$slots.default && !$slots.$default">
			<c-icon @click="backToTop" :name="icon" :custom-style="iconStyle"></c-icon>
			<view class="c-back-top__content__tips">
				{{tips}}
			</view>
		</view>
		<slot v-else />
	</view>
</template>

<script>
  import {customStyle, customClass, zIndex} from '../../libs/props/common.js'
	export default {
		name: 'c-back-top',
		props: {
      customClass,
      customStyle,
			mode: {
				type: String,
				default: 'circle'
			},
			icon: {
				type: String,
				default: 'arrow-upward'
			},
			tips: {
				type: String,
				default: ''
			},
			duration: {
				type: [Number, String],
				default: 100
			},
			// 滚动距离
			scrollTop: {
				type: [Number, String],
				default: 0
			},
			top: {
				type: [Number, String],
				default: 200
			},
			bottom: {
				type: [Number, String],
				default: 100
			},
			right: {
				type: [Number, String],
				default: 40
			},
			// 层级
			zIndex: {
				type: [Number, String],
				default: '9'
			},
			// 图标的样式，对象形式
			iconStyle: {
				type: Object,
				default() {
					return {
						color: '#909399',
						fontSize: '19px'
					}
				}
			}
		},
		watch: {
			showBackTop(nVal, oVal) {
				// 当组件的显示与隐藏状态发生跳变时，修改组件的层级和不透明度
				// 让组件有显示和消失的动画效果，如果用v-if控制组件状态，将无设置动画效果
				if(nVal) {
					this.uZIndex = this.zIndex;
					this.opacity = 1;
				} else {
					this.uZIndex = -1;
					this.opacity = 0;
				}
			}
		},
		computed: {
			showBackTop() {
				// 由于scrollTop为页面的滚动距离，默认为px单位，这里将用于传入的top(rpx)值
				// 转为px用于比较，如果滚动条到顶的距离大于设定的距离，就显示返回顶部的按钮
				return this.scrollTop > this.top;
			},
		},
		data() {
			return {
				// 不透明度，为了让组件有一个显示和隐藏的过渡动画
				opacity: 0,
				// 组件的z-index值，隐藏时设置为-1，就会看不到
				uZIndex: -1
			}
		},
		methods: {
			backToTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: this.duration
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-back-top {
		width: 80rpx;
		height: 80rpx;
		position: fixed;
		z-index: 9;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #E1E1E1;
		color: $c-content-color;
		align-items: center;
		transition: opacity 0.4s;
		
		&__content {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			&__tips {
				font-size: 24rpx;
				transform: scale(0.8);
				line-height: 1;
			}
		}
	}
</style>
