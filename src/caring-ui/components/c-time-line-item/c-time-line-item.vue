<!--
 * @Author: Wanko
 * @Date: 2024-03-14 17:25:50
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 17:26:36
 * @Description: 
-->
<template>
	<view class="c-time-axis-item">
		<slot name="content" />
		<view class="c-time-axis-node" :style="[nodeStyle]">
			<slot name="node">
				<view class="c-dot">
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-time-line-item",
		props: {
			// 节点的背景颜色
			bgColor: {
				type: String,
				default: "#ffffff"
			},
			// 节点左边图标绝对定位的top值
			nodeTop: {
				type: [String, Number],
				default: ""
			}
		},
		data() {
			return {

			}
		},
		computed: {
			nodeStyle() {
				let style = {
					backgroundColor: this.bgColor,
				};
				if (this.nodeTop != "") style.top = this.nodeTop + 'rpx';
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-time-axis-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;
		margin-bottom: 32rpx;
	}

	.c-time-axis-node {
		position: absolute;
		top: 12rpx;
		left: -40rpx;
		transform-origin: 0;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		font-size: 24rpx;
	}

	.c-dot {
		height: 16rpx;
		width: 16rpx;
		border-radius: 100rpx;
		background: #ddd;
	}
</style>
