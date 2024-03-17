<template>
	<view
		class="c-notice-bar"
		:style="{
			background: computeBgColor,
			padding: padding
		}"
		:class="[
			type ? `c-${type}-light-bg` : ''
		]"
	>
		<view class="c-icon-wrap">
			<c-icon class="c-left-icon" v-if="volumeIcon" name="volume-fill" :size="volumeSize" :color="computeColor"></c-icon>
		</view>
		<swiper :disable-touch="disableTouch" @change="change" :autoplay="autoplay && playState == 'play'" :vertical="vertical" circular :interval="duration" class="c-swiper">
			<swiper-item v-for="(item, index) in list" :key="index" class="c-swiper-item">
				<view
					class="c-news-item c-line-1"
					:style="[textStyle]"
					@tap="click(index)"
					:class="['c-' + type]"
				>
					{{ item }}
				</view>
			</swiper-item>
		</swiper>
		<view class="c-icon-wrap">
			<c-icon @click="getMore" class="c-right-icon" v-if="moreIcon" name="arrow-right" :size="26" :color="computeColor"></c-icon>
			<c-icon @click="close" class="c-right-icon" v-if="closeIcon" name="close" :size="24" :color="computeColor"></c-icon>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 显示的内容，数组
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		// 显示的主题，success|error|primary|info|warning
		type: {
			type: String,
			default: 'warning'
		},
		// 是否显示左侧的音量图标
		volumeIcon: {
			type: Boolean,
			default: true
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
		// 滚动方向，row-水平滚动，column-垂直滚动
		direction: {
			type: String,
			default: 'row'
		},
		// 是否显示
		show: {
			type: Boolean,
			default: true
		},
		// 字体大小，单位rpx
		fontSize: {
			type: [Number, String],
			default: 13
		},
		// 滚动一个周期的时间长，单位ms
		duration: {
			type: [Number, String],
			default: 2000
		},
		// 音量喇叭的大小
		volumeSize: {
			type: [Number, String],
			default: 17
		},
		speed: {
			type: Number,
			default: 160
		},
		
		// 滚动方向，horizontal-水平滚动，vertical-垂直滚动
		col: {
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
		// 通知的边距
		padding: {
			type: [Number, String],
			default: '18rpx 24rpx'
		}
	},
	computed: {
		// 计算字体颜色，如果没有自定义的，就用uview主题颜色
		computeColor() {
			if (this.color) return this.color;
			// 如果是无主题，就默认使用content-color
			else if(this.type == 'none') return '#606266';
			else return this.type;
		},
		// 文字内容的样式
		textStyle() {
			let style = {};
			if (this.color) style.color = this.color;
			else if(this.type == 'none') style.color = '#606266';
			style.fontSize = this.fontSize + 'px';
			return style;
		},
		// 垂直或者水平滚动
		vertical() {
			if(!this.col) return false;
			else return true;
		},
		// 计算背景颜色
		computeBgColor() {
			if (this.bgColor) return this.bgColor;
			else if(this.type == 'none') return 'transparent';
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
		change(e) {
			let index = e.detail.current;
			if(index == this.list.length - 1) {
				this.$emit('end');
			}
		}
	}
};
</script>

<style lang="scss" scoped>

.c-notice-bar {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	padding: 18rpx 24rpx;
	overflow: hidden;
}

.c-swiper {
	font-size: 26rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	flex: 1;
	margin-left: 12rpx;
}

.c-swiper-item {
	display: flex;
	align-items: center;
	overflow: hidden;
}

.c-news-item {
	overflow: hidden;
}

.c-right-icon {
	margin-left: 12rpx;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
}

.c-left-icon {
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
}
</style>
