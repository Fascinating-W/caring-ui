<!--
 * @Author: Wanko
 * @Date: 2024-03-04 16:18:59
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:27:18
 * @Description: 
-->
<!--
 * @Author: Wanko
 * @Date: 2024-03-04 16:18:59
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 15:24:01
 * @Description: 
-->
<template>
	<view class="c-collapse" :class="[customClass]" :style="[customStyle]">
		<slot />
	</view>
</template>

<script>
	import {customClass, customStyle} from '../../libs/props/common.js'
	export default {
		name:"c-collapse",
		props: {
			customClass,
			customStyle,
			// 是否手风琴模式
			accordion: {
				type: Boolean,
				default: true
			},
			// 头部的样式
			headStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 主体的样式
			bodyStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 每一个item的样式
			itemStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否显示右侧的箭头
			arrow: {
				type: Boolean,
				default: true
			},
			// 箭头的颜色
			arrowColor: {
				type: String,
				default: '#909399'
			},
			// 标题部分按压时的样式类，"none"为无效果
			hoverClass: {
				type: String,
				default: 'hover'
			}
		},
		created() {
			this.childrens = []
		},
		methods: {
			// 重新初始化一次内部的所有子元素的高度计算，用于异步获取数据渲染的情况
			init() {
				this.childrens.forEach((vm, index) => {
					vm.init();
				})
			},
			// collapse item被点击，由collapse item调用父组件方法
			onChange() {
				let activeItem = [];
				this.childrens.forEach((vm, index) => {
					if (vm.isShow) {
						activeItem.push(vm.nameSync);
					}
				})
				// 如果是手风琴模式，只有一个匹配结果，也即activeItem长度为1，将其转为字符串
				if (this.accordion) activeItem = activeItem.join('');
				this.$emit('change', activeItem);
			}
		}
	}
</script>
