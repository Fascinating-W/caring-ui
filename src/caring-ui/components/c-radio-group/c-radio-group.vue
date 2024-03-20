<template>
	<view class="c-radio-group c-clearfix">
		<slot></slot>
	</view>
</template>

<script>
	import Emitter from '../../libs/mixin/emitter.js';
	export default {
		name: "c-radio-group",
		mixins: [Emitter],
		props: {
			// 是否禁用所有单选框
			disabled: {
				type: Boolean,
				default: false
			},
			// 匹配某一个radio组件，如果某个radio的name值等于此值，那么这个radio就被会选中
			value: {
				type: [String, Number],
				default: ''
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
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: Boolean,
				default: false
			},
			// 形状，square为方形，circle为原型
			shape: {
				type: String,
				default: 'circle'
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: 10
			},
			// 每个checkbox占u-checkbox-group的宽度
			width: {
				type: [String, Number],
				default: 'auto'
			},
			// 是否每个checkbox都换行
			wrap: {
				type: Boolean,
				default: false
			}
		},
		created() {
			// 如果将children定义在data中，在微信小程序会造成循环引用而报错
			this.children = [];
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
		computed: {
			// 这里computed的变量，都是子组件u-radio需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
			// 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(c-radio-group)
			// 拉取父组件新的变化后的参数
			parentData() {
				return [this.value, this.disabled, this.activeColor, this.size, this.labelDisabled, this.shape, this.iconSize, this.width, this.wrap];
			}
		},
		methods: {
			// 该方法有子组件radio调用，当一个radio被选中的时候，给父组件设置value值(props传递的value)
			setValue(val) {
				// 通过子组件传递过来的val值(此被选中的子组件内部已将parentValue设置等于val的值)，将其他
				// c-radio设置未选中的状态
				this.children.map(child => {
					if(child.parentData.value != val) child.parentData.value = '';
				})
				// 通过emit事件，设置父组件通过v-model双向绑定的值
				this.$emit('input', val);
				this.$emit('change', val);
				// 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
				// 由于头条小程序执行迟钝，故需要用几十毫秒的延时
				setTimeout(() => {
					// 将当前的值发送到 c-form-item 进行校验
					this.dispatch('c-form-item', 'on-form-change', val);
				}, 60)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.c-radio-group {
		/* #ifndef MP || APP-NVUE */
		display: inline-flex;
		flex-wrap: wrap;
		/* #endif */
	}
</style>
