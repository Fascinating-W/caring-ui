<template>
	<view class="c-keyboard" @touchmove.stop.prevent="() => {}">
		<view class="c-keyboard-grids">
			<block>
				<view class="c-keyboard-grids-item" v-for="(group, i) in abc ? EngKeyBoardList : areaList" :key="i">
					<view :hover-stay-time="100" @tap="carInputClick(i, j)" hover-class="c-carinput-hover" class="c-keyboard-grids-btn"
					 v-for="(item, j) in group" :key="j">
						{{ item }}
					</view>
				</view>
				<view @touchstart="backspaceClick" @touchend="clearTimer" :hover-stay-time="100" class="c-keyboard-back"
				 hover-class="hover">
					<c-icon :size="19" name="backspace" :bold="true"></c-icon>
				</view>
				<view :hover-stay-time="100" class="c-keyboard-change" hover-class="c-carinput-hover" @tap="changeCarInputMode">
					<text class="zh" :class="[!abc ? 'active' : 'inactive']">中</text>
					/
					<text class="en" :class="[abc ? 'active' : 'inactive']">英</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "c-keyboard",
		props: {
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
				abc: false
			};
		},
		computed: {
			areaList() {
				let data = [
					'京',
					'沪',
					'粤',
					'津',
					'冀',
					'豫',
					'云',
					'辽',
					'黑',
					'湘',
					'皖',
					'鲁',
					'苏',
					'浙',
					'赣',
					'鄂',
					'桂',
					'甘',
					'晋',
					'陕',
					'蒙',
					'吉',
					'闽',
					'贵',
					'渝',
					'川',
					'青',
					'琼',
					'宁',
					'挂',
					'藏',
					'港',
					'澳',
					'新',
					'使',
					'学'
				];
				let tmp = [];
				// 打乱顺序
				if (this.random) data = this.$c.randomArray(data);
				// 切割成二维数组
				tmp[0] = data.slice(0, 10);
				tmp[1] = data.slice(10, 20);
				tmp[2] = data.slice(20, 30);
				tmp[3] = data.slice(30, 36);
				return tmp;
			},
			EngKeyBoardList() {
				let data = [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					0,
					'Q',
					'W',
					'E',
					'R',
					'T',
					'Y',
					'U',
					'I',
					'O',
					'P',
					'A',
					'S',
					'D',
					'F',
					'G',
					'H',
					'J',
					'K',
					'L',
					'Z',
					'X',
					'C',
					'V',
					'B',
					'N',
					'M'
				];
				let tmp = [];
				if (this.random) data = this.$c.randomArray(data);
				tmp[0] = data.slice(0, 10);
				tmp[1] = data.slice(10, 20);
				tmp[2] = data.slice(20, 30);
				tmp[3] = data.slice(30, 36);
				return tmp;
			}
		},
		methods: {
			// 点击键盘按钮
			carInputClick(i, j) {
				let value = '';
				// 不同模式，获取不同数组的值
				if (this.abc) value = this.EngKeyBoardList[i][j];
				else value = this.areaList[i][j];
				this.$emit('change', value);
			},
			// 修改汽车牌键盘的输入模式，中文|英文
			changeCarInputMode() {
				this.abc = !this.abc;
			},
			// 点击退格键
			backspaceClick() {
				this.$emit('backspace');
				clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
				this.timer = null;
				this.timer = setInterval(() => {
					this.$emit('backspace');
				}, 250);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
		}
	};
</script>

<style lang="scss" scoped>

	.c-keyboard-grids {
		background: rgb(215, 215, 217);
		padding: 24rpx 0;
		position: relative;
	}

	.c-keyboard-grids-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.c-keyboard-grids-btn {
		text-decoration: none;
		width: 62rpx;
		flex: 0 0 64rpx;
		height: 80rpx;
		/* #ifndef APP-NVUE */
		display: inline-flex;		
		/* #endif */
		font-size: 36rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #fff;
		margin: 8rpx 5rpx;
		border-radius: 8rpx;
		box-shadow: 0 2rpx 0rpx #888992;
		font-weight: 500;
		justify-content: center;
	}

	.c-carinput-hover {
		background-color: rgb(185, 188, 195) !important;
	}

	.c-keyboard-back {
		position: absolute;
		width: 96rpx;
		right: 22rpx;
		bottom: 32rpx;
		height: 80rpx;
		background-color: rgb(185, 188, 195);
		display: flex;
		align-items: center;
		border-radius: 8rpx;
		justify-content: center;
		box-shadow: 0 2rpx 0rpx #888992;
	}

	.c-keyboard-change {
		font-size: 24rpx;
		box-shadow: 0 2rpx 0rpx #888992;
		position: absolute;
		width: 96rpx;
		left: 22rpx;
		line-height: 1;
		bottom: 32rpx;
		height: 80rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		border-radius: 8rpx;
		justify-content: center;
	}

	.c-keyboard-change .inactive.zh {
		transform: scale(0.85) translateY(-10rpx);
	}

	.c-keyboard-change .inactive.en {
		transform: scale(0.85) translateY(10rpx);
	}

	.c-keyboard-change .active {
		color: rgb(237, 112, 64);
		font-size: 30rpx;
	}

	.c-keyboard-change .zh {
		transform: translateY(-10rpx);
	}

	.c-keyboard-change .en {
		transform: translateY(10rpx);
	}
</style>
