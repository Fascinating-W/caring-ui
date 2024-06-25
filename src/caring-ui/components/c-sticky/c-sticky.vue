<template>
	<view class="">
		<view class="c-sticky-wrap" :class="[elClass]" :style="{
			height: fixed ? height + 'px' : 'auto',
			backgroundColor: bgColor
		}">
			<view class="c-sticky" :style="{
				position: fixed ? 'fixed' : 'static',
				top: stickyTop + 'px',
				left: left + 'px',
				width: width == 'auto' ? 'auto' : width + 'px',
				zIndex: uZIndex
			}">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
import {guid} from 'caring-utils'

	export default {
		name: "c-sticky",
		props: {
			// 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
			offsetTop: {
				type: [Number, String],
				default: 0
			},
			//列表中的索引值
			index: {
				type: [Number, String],
				default: ''
			},
			// 是否开启吸顶功能
			enable: {
				type: Boolean,
				default: true
			},
			// h5顶部导航栏的高度
			h5NavHeight: {
				type: [Number, String],
				default: 44
			},
			// 吸顶区域的背景颜色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				fixed: false,
				height: 'auto',
				stickyTop: 0,
				elClass: guid(),
				left: 0,
				width: 'auto',
			};
		},
		watch: {
			offsetTop(val) {
				this.initObserver();
			},
			enable(val) {
				if (val == false) {
					this.fixed = false;
					this.disconnectObserver('contentObserver');
				} else {
					this.initObserver();
				}
			}
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$c.zIndex.sticky;
			}
		},
		mounted() {
			this.initObserver();
		},
		methods: {
			initObserver() {
        const h5NavHeight = +this.h5NavHeight
				if (!this.enable) return;
				// #ifdef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) + h5NavHeight : h5NavHeight;
				// #endif
				
				// #ifndef H5
				this.stickyTop = this.offsetTop != 0 ? uni.upx2px(this.offsetTop) : 0;
				// #endif
				this.disconnectObserver('contentObserver');
				this.$cGetRect('.' + this.elClass).then((res) => {
					this.height = res.height;
					this.left = res.left;
					this.width = res.width;
					this.$nextTick(() => {
						this.observeContent();
					});
				});
			},
			observeContent() {
				this.disconnectObserver('contentObserver');
				const contentObserver = this.createIntersectionObserver({
					thresholds: [0.95, 0.98, 1]
				});
				contentObserver.relativeToViewport({
					top: -this.stickyTop
				});
				contentObserver.observe('.' + this.elClass, res => {
					if (!this.enable) return;
					this.setFixed(res.boundingClientRect.top);
				});
				this.contentObserver = contentObserver;
			},
			setFixed(top) {
				const fixed = top < this.stickyTop;
				if (fixed) this.$emit('fixed', this.index);
				else if(this.fixed) this.$emit('unfixed', this.index);
				this.fixed = fixed;
			},
			disconnectObserver(observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			},
		},
		beforeDestroy() {
			this.disconnectObserver('contentObserver');
		}
	};
</script>

<style scoped lang="scss">
	.c-sticky {
		z-index: 9999999999;
	}
</style>
