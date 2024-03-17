<!--
 * @Author: Wanko
 * @Date: 2024-03-14 16:18:25
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 16:21:09
 * @Description: 
-->
<template>
	<view class="c-grid" :class="{'border-t border-l': border}" :style="[gridStyle]"><slot /></view>
</template>

<script>
export default {
	name: 'c-grid',
	props: {
		col: {
			type: [Number, String],
			default: 3
		},
		border: {
			type: Boolean,
			default: true
		},
		align: {
			type: String,
			default: 'left'
		},
		hoverClass: {
			type: String,
			default: 'hover'
		}
	},
	data() {
		return {
			index: 0,
		}
	},
	watch: {
		// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
		parentData() {
			if(this.children.length) {
				this.children.map(child => {
					// 判断子组件(c-radio)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
					typeof(child.updateParentData) == 'function' && child.updateParentData();
				})
			}
		},
	},
	created() {
		// 如果将children定义在data中，在微信小程序会造成循环引用而报错
		this.children = [];
	},
	computed: {
		// 计算父组件的值是否发生变化
		parentData() {
			return [this.hoverClass, this.col, this.size, this.border];
		},
		// 宫格对齐方式
		gridStyle() {
			let style = {};
			switch(this.align) {
				case 'left':
					style.justifyContent = 'flex-start';
					break;
				case 'center':
					style.justifyContent = 'center';
					break;
				case 'right':
					style.justifyContent = 'flex-end';
					break;
				default: style.justifyContent = 'flex-start';
			};
			return style;
		}
	},
	methods: {
		click(index) {
			this.$emit('click', index);
		}
	}
};
</script>

<style scoped lang="scss">
.c-grid {
	width: 100%;
	/* #ifdef MP */
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	/* #endif */
	
	/* #ifndef MP */
  display: flex;
	flex-wrap: wrap;
	align-items: center;
	/* #endif */
}
</style>
