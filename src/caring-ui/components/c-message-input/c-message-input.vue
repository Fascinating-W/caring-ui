<template>
	<view class="c-char-box">
		<view class="c-char-flex">
			<input :disabled="disabledKeyboard" :value="valueModel" type="number" :focus="focus" :maxLength="maxLength" class="c-input" @input="getVal"/>
			<view v-for="(item, index) in loopCharArr" :key="index">
				<view :class="[breathe && charArrLength == index ? 'c-breathe' : '', 'c-char-item',
				charArrLength === index && mode == 'box' ? 'c-box-active' : '',
				mode === 'box' ? 'c-box' : '']" :style="{
					fontWeight: bold ? 'bold' : 'normal',
					fontSize: size + 'px',
					width: width + 'px',
					height: width + 'px',
					color: inactiveColor,
					borderColor: charArrLength === index && mode == 'box' ? activeColor : inactiveColor
				}">
					<view class="c-placeholder-line" :style="{
							display: charArrLength === index ? 'block' : 'none',
							height: width * 0.5 +'px'
						}"
						v-if="mode !== 'middleLine'"
					></view>
					<view v-if="mode === 'middleLine' && charArrLength <= index" :class="[breathe && charArrLength == index ? 'c-breathe' : '', charArrLength === index ? 'c-middle-line-active' : '']"
					 class="c-middle-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></view>
					<view v-if="mode === 'bottomLine'" :class="[breathe && charArrLength == index ? 'c-breathe' : '', charArrLength === index ? 'c-buttom-line-active' : '']"
					 class="c-bottom-line" :style="{height: bold ? '4px' : '2px', background: charArrLength === index ? activeColor : inactiveColor}"></view>
					<block v-if="!dotFill"> {{ charArr[index] ? charArr[index] : ''}}</block>
					<block v-else>
						<text class="c-dot">{{ charArr[index] ? '●' : ''}}</text>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-message-input",
		props: {
			// 最大输入长度
			maxlength: {
				type: [Number, String],
				default: 4
			},
			// 是否用圆点填充
			dotFill: {
				type: Boolean,
				default: false
			},
			// 显示模式，box-盒子模式，bottomLine-横线在底部模式，middleLine-横线在中部模式
			mode: {
				type: String,
				default: "box"
			},
			// 预置值
			value: {
				type: [String, Number],
				default: ''
			},
			// 当前激活输入item，是否带有呼吸效果
			breathe: {
				type: Boolean,
				default: true
			},
			// 是否自动获取焦点
			focus: {
				type: Boolean,
				default: false
			},
			// 字体是否加粗
			bold: {
				type: Boolean,
				default: false
			},
			// 字体大小
			size: {
				type: [String, Number],
				default: 30
			},
			// 激活样式
			activeColor: {
				type: String,
				default: uni.$c.color.primary
			},
			// 未激活的样式
			inactiveColor: {
				type: String,
				default: uni.$c.color.content
			},
			// 输入框的大小，单位px，宽等于高
			width: {
				type: [Number, String],
				default: '40'
			},
			// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
			disabledKeyboard: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			// maxLength: {
			// 	// 此值设置为true，会在组件加载后无需maxlength变化就会执行一次本监听函数，无需再created生命周期中处理
			// 	immediate: true,
			// 	handler(val) {
			// 		this.maxLength = Number(val);
			// 	}
			// }, 
			value: {
				immediate: true,
				handler(val) {
					// 转为字符串
					val = String(val);
					// 超出部分截掉
					this.valueModel = val.substring(0, this.maxLength);
				}
			},
		},
		data() {
			return {
				valueModel: ""
			}
		},
		computed: {
      maxLength() {
        return +this.maxlength;
      },
			// 是否显示呼吸灯效果
			animationClass() {
				return (index) => {
					if (this.breathe && this.charArr.length == index) return 'c-breathe';
					else return '';
				}
			},
			// 用于显示字符
			charArr() {
				return this.valueModel.split('');
			},
			charArrLength() {
				return this.charArr.length;
			},
			// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
			loopCharArr() {
				return new Array(this.maxLength);
			}
		},
		methods: {
			getVal(e) {
				let {
					value
				} = e.detail
				this.valueModel = value;
				// 判断长度是否超出了maxlength值，理论上不会发生，因为input组件设置了maxlength属性值
				if (String(value).length > this.maxLength) return;
				// 未达到maxlength之前，发送change事件，达到后发送finish事件
				this.$emit('change', value);
				if (String(value).length == this.maxLength) {
					this.$emit('finish', value);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@keyframes breathe {
		0% {
			opacity: 0.3;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0.3;
		}
	}

	.c-char-box {
		text-align: center;
	}

	.c-char-flex {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}

	.c-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 0;
		background: none;
	}

	.c-char-item {
		position: relative;
		width: 90rpx;
		height: 90rpx;
		margin: 10rpx 10rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: $c-main;
		line-height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.c-middle-line {
		border: none;
	}

	.c-box {
		box-sizing: border-box;
		border: 2rpx solid #cccccc;
		border-radius: 6rpx;
	}

	.c-box-active {
		overflow: hidden;
		animation-timing-function: ease-in-out;
		animation-duration: 1500ms;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		border: 2rpx solid $c-primary;
	}

	.c-middle-line-active {
		background: $c-primary;
	}

	.c-breathe {
		animation: breathe 2s infinite ease;
	}

	.c-placeholder-line {
		/* #ifndef APP-NVUE */
		display: none;
		/* #endif */
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2rpx;
		height: 40rpx;
		background: #333333;
		animation: twinkling 1.5s infinite ease;
	}

	.c-animation-breathe {
		animation-name: breathe;
	}

	.c-dot {
		font-size: 34rpx;
		line-height: 34rpx;
	}

	.c-middle-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.c-buttom-line-active {
		background: $c-primary;
	}

	.c-bottom-line {
		height: 4px;
		background: #000000;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}
</style>
