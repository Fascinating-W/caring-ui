<template>
	<view class="c-notice-bar-wrap" v-if="isShow" :style="{
		borderRadius: rounded + 'px',
	}">
		<block v-if="!col && isCircular">
			<c-row-notice
				:type="type"
				:color="color"
				:bgColor="bgColor"
				:list="list"
				:volumeIcon="volumeIcon"
				:moreIcon="moreIcon"
				:volumeSize="volumeSize"
				:closeIcon="closeIcon"
				:col="col"
				:fontSize="fontSize"
				:speed="speed"
				:playState="playState"
				:padding="padding"
				@getMore="getMore"
				@close="close"
				@click="click"
			></c-row-notice>
		</block>
		<block v-if="col || (!col && !isCircular)">
			<c-column-notice
				:type="type"
				:color="color"
				:bgColor="bgColor"
				:list="list"
				:volumeIcon="volumeIcon"
				:moreIcon="moreIcon"
				:closeIcon="closeIcon"
				:col="col"
				:volumeSize="volumeSize"
				:disable-touch="disableTouch"
				:fontSize="fontSize"
				:duration="duration"
				:playState="playState"
				:padding="padding"
				@getMore="getMore"
				@close="close"
				@click="click"
				@end="end"
			></c-column-notice>
		</block>
	</view>
</template>
<script>
export default {
	name: "c-notice-bar",
	props: {
		// 显示的内容，数组
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		type: {
			type: String,
			default: 'warning'
		},
		// 是否显示左侧的音量图标
		volumeIcon: {
			type: Boolean,
			default: true
		},
		// 音量喇叭的大小
		volumeSize: {
			type: [Number, String],
			default: 17
		},
		// 是否显示右侧的右箭头图标
		moreIcon: {
			type: Boolean,
			default: false
		},
		// 是否显示右侧的关闭图标
		closeIcon: {
			type: Boolean,
			default: false
		},
		// 是否自动播放
		autoplay: {
			type: Boolean,
			default: true
		},
		// 文字颜色，各图标也会使用文字颜色
		color: {
			type: String,
			default: ''
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: ''
		},
		col: {
			type: Boolean,
			default: false
		},
		// 是否显示
		show: {
			type: Boolean,
			default: true
		},
		// 字体大小，单位px
		fontSize: {
			type: [Number, String],
			default: 14
		},
		// 滚动一个周期的时间长，单位ms
		duration: {
			type: [Number, String],
			default: 2000
		},
		// 水平滚动时的滚动速度，即每秒滚动多少px，这有利于控制文字无论多少时，都能有一个恒定的速度
		speed: {
			type: [Number, String],
			default: 160
		},
		// 水平滚动时，是否采用衔接形式滚动
		// 水平衔接模式，采用的是swiper组件，水平滚动
		isCircular: {
			type: Boolean,
			default: true
		},
		// 播放状态，play-播放，paused-暂停
		playState: {
			type: String,
			default: 'play'
		},
		// 是否禁止用手滑动切换
		// 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
		disableTouch: {
			type: Boolean,
			default: true
		},
		// 滚动通知设置圆角
		rounded: {
			type: [Number, String],
			default: 0
		},
		// 通知的边距
		padding: {
			type: [Number, String],
			default: '18rpx 24rpx'
		},
		// list列表为空时，是否显示组件
		noListHidden: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		// 如果设置show为false，或者设置了noListHidden为true，且list长度又为零的话，隐藏组件
		isShow() {
			if(this.show == false || (this.noListHidden == true && this.list.length == 0)) return false;
			else return true;
		}
	},
	methods: {
		// 点击通告栏
		click(index) {
			this.$emit('click', index);
		},
		// 点击关闭按钮
		close() {
			this.$emit('close');
		},
		// 点击更多箭头按钮
		getMore() {
			this.$emit('getMore');
		},
		// 滚动一个周期结束，只对垂直，或者水平步进形式有效
		end() {
			this.$emit('end');
		}
	}
};
</script>

<style lang="scss" scoped>
.c-notice-bar-wrap {
	overflow: hidden;
}

.c-notice-bar {
	padding: 18rpx 24rpx;
	overflow: hidden;
}

.c-direction-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.c-left-icon {
	display: flex;
	align-items: center;
}

.c-notice-box {
	flex: 1;
	display: flex;
	overflow: hidden;
	margin-left: 12rpx;
}

.c-right-icon {
	margin-left: 12rpx;
	display: flex;
	align-items: center;
}

.c-notice-content {
	line-height: 1;
	white-space: nowrap;
	font-size: 26rpx;
	animation: c-loop-animation 10s linear infinite both;
	text-align: right;
	// 这一句很重要，为了能让滚动左右连接起来
	padding-left: 100%;
}

@keyframes c-loop-animation {
	0% {
		transform: translate3d(0, 0, 0);
	}

	100% {
		transform: translate3d(-100%, 0, 0);
	}
}
</style>
