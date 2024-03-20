<template>
	<view class="c-checkbox-group c-clearfix">
		<slot></slot>
	</view>
</template>

<script>
	import Emitter from '../../libs/mixin/emitter.js';
	export default {
		name: 'c-checkbox-group',
		mixins: [Emitter],
		props: {
			// 最多能选中多少个checkbox
			max: {
				type: [Number, String],
				default: 999
			},
			// 所有选中项的 name
			// value: {
			// 	default: Array,
			// 	default() {
			// 		return []
			// 	}
			// },
			// 是否禁用所有复选框
			disabled: {
				type: Boolean,
				default: false
			},
			// 在表单内提交时的标识符
			name: {
				type: [Boolean, String],
				default: ''
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: Boolean,
				default: false
			},
			round: {
				type: Boolean,
				default: false
			},
			// 选中状态下的颜色
			activeColor: {
				type: String,
				default: uni.$c.color.primary
			},
			// 组件的整体大小
			size: {
				type: [String, Number],
				default: 17
			},
			// 每个checkbox占c-checkbox-group的宽度
			width: {
				type: String,
				default: 'auto'
			},
			// 是否每个checkbox都换行
			wrap: { 
				type: Boolean,
				default: false
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: 10
			},
		},
		data() {
			return {
			}
		},
		created() {
			// 如果将children定义在data中，在微信小程序会造成循环引用而报错
			this.children = [];
		},
		methods: {
			emitEvent() {
				let values = [];
				this.children.map(val => {
					if(val.value) values.push(val.name);
				})
				this.$emit('change', values);
				// 发出事件，用于在表单组件中嵌入checkbox的情况，进行验证
				// 由于头条小程序执行迟钝，故需要用几十毫秒的延时
				setTimeout(() => {
					// 将当前的值发送到 c-form-item 进行校验
					this.dispatch('c-form-item', 'on-form-change', values);
				}, 60)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-checkbox-group {
		/* #ifndef MP || APP-NVUE */
		display: inline-flex;
		flex-wrap: wrap;
		/* #endif */
	}
</style>
