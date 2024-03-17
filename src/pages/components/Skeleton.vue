<!--
 * @Author: Wanko
 * @Date: 2024-03-14 16:51:50
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 17:02:49
 * @Description: 
-->
<template>
	<view>
		<view class="p c-skeleton">
			<view class="flex-col flex-center">
				<block>
					<image class="w-50 h-50 m rounded-full c-skeleton-circle" :src="userInfo.avatarUrl"></image>
					<text class="c-skeleton-fillet">{{userInfo.nickName}}</text>
				</block>
			</view>
			<view style="margin: 20px 0">
				<view v-for="(item,index) in lists" :key="index" class="py-10">
					<text class="c-skeleton-rect">{{item}}</text>
				</view>
			</view>
		</view>
		<c-skeleton :loading="loading" :animation="true" bgColor="#FFF"></c-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 随意填充一些模拟数据，以撑开元素，供骨架组件查询和模拟块状数据
				userInfo: {
					avatarUrl: 'https://qlogo2.store.qq.com/qzone/1416956117/1416956117/100?1531323520',
					nickName: 'uView'
				},
				lists: [
					'君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
					'人生得意须尽欢，莫使金樽空对月',
					'天生我材必有用，千金散尽还复来',
				],
				loading: true, // 是否显示骨架屏组件
			}
		},
		onLoad() {
			// 通过延时模拟向后端请求数据，调隐藏骨架屏
			setTimeout(() => {
				this.loading = false;
			}, 2000)
		}
	}
</script>
