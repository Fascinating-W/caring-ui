<template>
	<view class="c-grid-item" :hover-class="parentData.hoverClass"
	 :hover-stay-time="200" @tap="click" :style="{
			background: bgColor,
			width: width,
		}">
		<view class="c-grid-item-box" :style="[customStyle]" :class="[parentData.border ? 'border-r border-b' : '']">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-grid-item",
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// 点击时返回的index
			index: {
				type: [Number, String],
				default: ''
			},
			// 自定义样式，对象形式
			customStyle: {
				type: Object,
				default() {
					return {
						padding: '15px 0'
					}
				}
			}
		},
		data() {
			return {
				parentData: {
					hoverClass: '', // 按下去的时候，是否显示背景灰色
					col: 3, // 父组件划分的宫格数
					border: true, // 是否显示边框，根据父组件决定
				}
			};
		},
		created() {
			// 父组件的实例
			this.updateParentData();
			// this.parent在updateParentData()中定义
			this.parent.children.push(this);
		},
		computed: {
			// 每个grid-item的宽度
			width() {
				return 100 / Number(this.parentData.col) + '%';
			},
		},
		methods: {
			// 获取父组件的参数
			updateParentData() {
				// 此方法写在mixin中
				this.getParentData('c-grid');
			},
			click() {
				this.$emit('click', this.index);
				this.parent && this.parent.click(this.index);
			}
		}
	};
</script>

<style scoped lang="scss">
	.c-grid-item {
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-direction: column;
		
		/* #ifdef MP */
		position: relative;
		float: left;
		/* #endif */
	}

	.c-grid-item-hover {
		background: #f7f7f7 !important;
	}

	.c-grid-marker-box {
		position: absolute;
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		line-height: 0;
	}

	.c-grid-marker-wrap {
		position: absolute;
	}

	.c-grid-item-box {
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>
