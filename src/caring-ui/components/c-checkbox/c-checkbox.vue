<template>
	<view class="c-checkbox" :style="[checkboxStyle]">
		<view class="c-checkbox__icon-wrap" @tap="toggle" :class="[iconClass]" :style="[iconStyle]">
			<c-icon class="c-checkbox__icon-wrap__icon" name="checkbox-mark" :size="checkboxIconSize" :color="iconColor"/>
		</view>
		<view class="c-checkbox__label" @tap="onClickLabel" :style="{
			fontSize: $c.addUnit(labelSize)
		}">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-checkbox",
		props: {
			// checkbox的名称
			name: {
				type: [String, Number],
				default: ''
			},
			round: {
				type: Boolean,
				default: false
			},
			// 是否为选中状态
			value: {
				type: Boolean,
				default: false
			},
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: ''
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: [String, Boolean],
				default: ''
			},
			// 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值
			activeColor: {
				type: String,
				default: ''
			},
			// 图标的大小，单位rpx
			iconSize: {
				type: [String, Number],
				default: ''
			},
			// label的字体大小，rpx单位
			labelSize: {
				type: [String, Number],
				default: ''
			},
			// 组件的整体大小
			size: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				parentDisabled: false,
				newParams: {},
			};
		},
		created() {
			// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环应用
			this.parent = this.$c.$parent.call(this, 'c-checkbox-group');
			// 如果存在c-checkbox-group，将本组件的this塞进父组件的children中
			this.parent && this.parent.children.push(this);
		},
		computed: {
			// 是否禁用，如果父组件c-checkbox-group禁用的话，将会忽略子组件的配置
			isDisabled() {
				return this.disabled !== '' ? this.disabled : this.parent ? this.parent.disabled : false;
			},
			// 是否禁用label点击
			isLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
			},
			// 组件尺寸，对应size的值，默认值为17px
			checkboxSize() {
				return this.size ? this.size : (this.parent ? this.parent.size : 17);
			},
			// 组件的勾选图标的尺寸，默认10
			checkboxIconSize() {
				return this.iconSize ? this.iconSize : (this.parent ? this.parent.iconSize : 10);
			},
			// 组件选中激活时的颜色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parent ? this.parent.activeColor : 'primary');
			},
			// 组件的形状
			elShape() {
        if(this.round) {
          return 'round';
        } else {
          if(this.parent && this.parent.round) {
            return 'round';
          } else {
            return 'square';
          }
        }
			},
			iconStyle() {
				let style = {};
				// 既要判断是否手动禁用，还要判断用户v-model绑定的值，如果绑定为false，那么也无法选中
				if (this.elActiveColor && this.value && !this.isDisabled) {
					style.borderColor = this.elActiveColor; 
					style.backgroundColor = this.elActiveColor;
				}
				style.width = this.$c.addUnit(this.checkboxSize);
				style.height = this.$c.addUnit(this.checkboxSize);
				return style;
			},
			// checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
			iconColor() {
				return this.value ? '#ffffff' : 'transparent';
			},
			iconClass() {
				let classes = [];
        console.log(this.elShape)
				classes.push('c-checkbox__icon-wrap--' + this.elShape);
				if (this.value == true) classes.push('c-checkbox__icon-wrap--checked');
				if (this.isDisabled) classes.push('c-checkbox__icon-wrap--disabled');
				if (this.value && this.isDisabled) classes.push('c-checkbox__icon-wrap--disabled--checked');
				// 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
				return classes.join(' ');
			},
			checkboxStyle() {
				let style = {};
				if(this.parent && this.parent.width) {
					style.width = this.parent.width;
					// #ifdef MP
					// 各家小程序因为它们特殊的编译结构，使用float布局
					style.float = 'left';
					// #endif
					// #ifndef MP
					// H5和APP使用flex布局
					style.flex = `0 0 ${this.parent.width}`;
					// #endif
				}
				if(this.parent && this.parent.wrap) {
					style.width = '100%';
					// #ifndef MP
					// H5和APP使用flex布局，将宽度设置100%，即可自动换行
					style.flex = '0 0 100%';
					// #endif
				}
				return style;
			}
		},
		methods: {
			onClickLabel() {
				if (!this.isLabelDisabled && !this.isDisabled) {
					this.setValue();
				}
			},
			toggle() {
				if (!this.isDisabled) {
					this.setValue();
				}
			},
			emitEvent() {
				this.$emit('change', {
					value: !this.value,
					name: this.name
				})
				// 执行父组件c-checkbox-group的事件方法
				// 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
				setTimeout(() => {
					if(this.parent && this.parent.emitEvent) this.parent.emitEvent();
				}, 80);
			},
			// 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
			setValue() {
				// 判断是否超过了可选的最大数量
				let checkedNum = 0;
				if(this.parent && this.parent.children) {
					// 只要父组件的某一个子元素的value为true，就加1(已有的选中数量)
					this.parent.children.map(val => {
						if (val.value) checkedNum++;
					})
				}
				// 如果原来为选中状态，那么可以取消
				if (this.value == true) {
					this.emitEvent();
					this.$emit('input', !this.value);
				} else {
					// 如果超出最多可选项，提示
					if(this.parent && checkedNum >= this.parent.max) {
						return this.$c.toast(`最多可选${this.parent.max}项`);
					}
					// 如果原来为未选中状态，需要选中的数量少于父组件中设置的max值，才可以选中
					this.emitEvent();
					this.$emit('input', !this.value);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.c-checkbox {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		/* #endif */
		align-items: center;
		overflow: hidden;
		user-select: none;
		line-height: 1.8;
		
		&__icon-wrap {
			color: $c-content;
			flex: none;
			display: -webkit-flex;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			width: 42rpx;
			height: 42rpx;
			color: transparent;
			text-align: center;
			transition-property: color, border-color, background-color;
			font-size: 20px;
			border: 1px solid #c8c9cc;
			transition-duration: 0.2s;
			
			/* #ifdef MP-TOUTIAO */
			// 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
			&__icon {
				line-height: 0;
			}
			/* #endif */
      &__icon {
				display: flex;
			}
			
			&--round {
				border-radius: 100%;
			}
			
			&--square {
				border-radius: 6rpx;
			}
			
			&--checked {
				color: #fff;
				background-color: $c-primary;
				border-color: $c-primary;
			}
			
			&--disabled {
				background-color: #ebedf0;
				border-color: #c8c9cc;
			}
			
			&--disabled--checked {
				color: #c8c9cc !important;
			}
		}
	
		&__label {
			word-wrap: break-word;
			margin-left: 10rpx;
			margin-right: 24rpx;
			color: $c-content;
			font-size: 30rpx;
			
			&--disabled {
				color: #c8c9cc;
			}
		}
	}
</style>
