<template>
	<view class="c-alert-tips" v-if="show" :class="[
		!show ? 'c-close-alert-tips': '',
		type ? 'c-alert-tips--bg--' + type + '-light' : '',
		type ? 'c-alert-tips--border--' + type + '-disabled' : '',
	]" :style="{
		backgroundColor: bgColor,
		borderColor: borderColor
	}">
		<view class="c-icon-wrap">
			<c-icon v-if="showIcon" :name="uIcon" :size="description ? 20 : 16" class="c-icon" :color="uIconType" :custom-style="iconStyle"></c-icon>
		</view>
		<view class="c-alert-content" @tap.stop="click">
			<view class="c-alert-title" :style="[uTitleStyle]">
				{{title}}
			</view>
			<view v-if="description" class="c-alert-desc" :style="[descStyle]">
				{{description}}
			</view>
		</view>
		<view class="c-icon-wrap">
			<c-icon @click="close" v-if="closabled && !closeText" hoverClass="c-type-error-hover-color" name="close" color="#c0c4cc"
			 :size="11" class="c-close-icon" :style="{
				top: description ? '9px' : '12px'
			}"></c-icon>
		</view>
		<text v-if="closabled && closeText" class="c-close-text" :style="{
			top: description ? '9px' : '12px'
		}">{{closeText}}</text>
	</view>
</template>

<script>
	export default {
		name: 'c-alert-tips',
		props: {
			// 显示文字
			title: {
				type: String,
				default: ''
			},
			// 主题，success/warning/info/error
			type: {
				type: String,
				default: 'warning'
			},
			// 辅助性文字
			description: {
				type: String,
				default: ''
			},
			// 是否可关闭
			closabled: {
				type: Boolean,
				default: false
			},
			// 关闭按钮自定义文本
			closeText: {
				type: String,
				default: ''
			},
			// 是否显示图标
			showIcon: {
				type: Boolean,
				default: false
			},
			// 文字颜色，如果定义了color值，icon会失效
			color: {
				type: String,
				default: ''
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: ''
			},
			// 边框颜色
			borderColor: {
				type: String,
				default: ''
			},
			// 是否显示
			show: {
				type: Boolean,
				default: true
			},
			// 左边显示的icon
			icon: {
				type: String,
				default: ''
			},
			// icon的样式
			iconStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			// 标题的样式
			titleStyle: {
				type: Object,
				default() {
					return {}
				}
			},
			// 描述文字的样式
			descStyle: {
				type: Object,
				default() {
					return {}
				}
			},
		},
		data() {
			return {
			}
		},
		computed: {
			uTitleStyle() {
				let style = {};
				// 如果有描述文字的话，标题进行加粗
				style.fontWeight = this.description ? 500 : 'normal';
				// 将用户传入样式对象和style合并，传入的优先级比style高，同属性会被覆盖
				return this.$c.deepMerge(style, this.titleStyle);
			},
			uIcon() {
				// 如果有设置icon名称就使用，否则根据type主题，推定一个默认的图标
				return this.icon ? this.icon : this.$c.type2icon(this.type);
			},
			uIconType() {
				// 如果有设置图标的样式，优先使用，没有的话，则用type的样式
				return Object.keys(this.iconStyle).length ? '' : this.type;
			}
		},
		methods: {
			// 点击内容
			click() {
				this.$emit('click');
			},
			// 点击关闭按钮
			close() {
				this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.c-alert-tips {
    display: flex;
		align-items: center;
		padding: 16rpx 30rpx;
		border-radius: 8rpx;
		position: relative;
		transition: all 0.3s linear;
		border: 1px solid #fff;
		
		&--bg--primary-light {
			background-color: $c-primary-light;
		}
		
		&--bg--info-light {
			background-color: $c-info-light;
		}
		
		&--bg--success-light {
			background-color: $c-success-light;
		}
		
		&--bg--warning-light {
			background-color: $c-warning-light;
		}
		
		&--bg--error-light {
			background-color: $c-error-light;
		}
		
		&--border--primary-disabled {
			border-color: $c-primary-disabled;
		}
		
		&--border--success-disabled {
			border-color: $c-success-disabled;
		}
		
		&--border--error-disabled {
			border-color: $c-error-disabled;
		}
		
		&--border--warning-disabled {
			border-color: $c-warning-disabled;
		}
		
		&--border--info-disabled {
			border-color: $c-info-disabled;
		}
	}

	.c-close-alert-tips {
		opacity: 0;
		visibility: hidden;
	}

	.c-icon {
		margin-right: 16rpx;
	}

	.c-alert-title {
		font-size: 28rpx;
		color: $c-main;
	}

	.c-alert-desc {
		font-size: 26rpx;
		text-align: left;
		color: $c-content;
	}

	.c-close-icon {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.c-close-hover {
		color: red;
	}
	
	.c-close-text {
		font-size: 24rpx;
		color: $c-tips;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		line-height: 1;
	}
</style>
