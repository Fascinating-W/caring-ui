<template>
	<!-- <view
		class="c-circle-progress"
		:style="{
			width: widthPx + 'px',
			height: widthPx + 'px',
			backgroundColor: bgColor
		}"
	>
		<canvas
			class="c-canvas-bg"
			:canvas-id="elBgId"
			:id="elBgId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
		<canvas
			class="c-canvas"
			:canvas-id="elId"
			:id="elId"
			:style="{
				width: widthPx + 'px',
				height: widthPx + 'px'
			}"
		></canvas>
		<slot></slot>
	</view> -->
</template>

<script>
import typeProps from '../../libs/props/type.js'

export default {
	name: 'c-circle-progress',
  mixins: [typeProps],
	props: {
		// 圆环进度百分比值
		percent: {
			type: Number,
			default: 0,
			// 限制值在0到100之间
			validator: val => {
				return val >= 0 && val <= 100;
			}
		},
		// 底部圆环的颜色（灰色的圆环）
		inactiveColor: {
			type: String,
			default: '#ececec'
		},
		// 圆环激活部分的颜色
		activeColor: {
			type: String,
			default: uni.$c.color.success
		},
		// 圆环线条的宽度，单位px
		borderWidth: {
			type: [Number, String],
			default: 7
		},
		// 整个圆形的宽度，单位px
		width: {
			type: [Number, String],
			default: 100
		},
		// 整个圆环执行一圈的时间，单位ms
		duration: {
			type: [Number, String],
			default: 1500
		},
		// 主题类型
		type: {
			type: String,
			default: ''
		},
		// 整个圆环进度区域的背景色
		bgColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
			// #ifdef MP-WEIXIN
			elBgId: 'cCircleProgressBgId', // 微信小程序中不能使用this.$c.guid()形式动态生成id值，否则会报错
			elId: 'cCircleProgressElId',
			// #endif
			// #ifndef MP-WEIXIN
			elBgId: uni.$c.guid(), // 非微信端的时候，需用动态的id，否则一个页面多个圆形进度条组件数据会混乱
			elId: uni.$c.guid(),
			// #endif
			widthPx: this.width,
			borderWidthPx: this.borderWidth,
			startAngle: -Math.PI / 2, // canvas画圆的起始角度，默认为3点钟方向，定位到12点钟方向
			progressContext: null, // 活动圆的canvas上下文
			newPercent: 0, // 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
			oldPercent: 0 // 当动态修改进度值的时候，保存进度值的变化前后值，用于比较用
		};
	},
	watch: {
		percent(nVal, oVal = 0) {
			if (nVal > 100) nVal = 100;
			if (nVal < 0) oVal = 0;
			// 此值其实等于this.percent，命名一个新
			this.newPercent = nVal;
			this.oldPercent = oVal;
			setTimeout(() => {
				// 无论是百分比值增加还是减少，需要操作还是原来的旧的百分比值
				// 将此值减少或者新增到新的百分比值
				this.drawCircleByProgress(oVal);
			}, 50);
		}
	},
	created() {
		// 赋值，用于加载后第一个画圆使用
		this.newPercent = this.percent;
		this.oldPercent = 0;
	},
	computed: {
		// 有type主题时，优先起作用
		circleColor() {
			if (this.$c.config.type.includes(this.calcType)) return this.$c.color[this.calcType];
			else return this.activeColor;
		}
	},
	mounted() {
		// 在h5端，必须要做一点延时才起作用，this.$nextTick()无效(HX2.4.7)
		setTimeout(() => {
			this.drawProgressBg();
			this.drawCircleByProgress(this.oldPercent);
		}, 50);
	},
	methods: {
		drawProgressBg() {
			let ctx = uni.createCanvasContext(this.elBgId, this);
			ctx.setLineWidth(this.borderWidthPx); // 设置圆环宽度
			ctx.setStrokeStyle(this.inactiveColor); // 线条颜色
			ctx.beginPath(); // 开始描绘路径
			// 设置一个原点(110,110)，半径为100的圆的路径到当前路径
			let radius = this.widthPx / 2;
			ctx.arc(radius, radius, radius - this.borderWidthPx, 0, 2 * Math.PI, false);
			ctx.stroke(); // 对路径进行描绘
			ctx.draw();
		},
		drawCircleByProgress(progress) {
			// 第一次操作进度环时将上下文保存到了this.data中，直接使用即可
			let ctx = this.progressContext;
			if (!ctx) {
				ctx = uni.createCanvasContext(this.elId, this);
				this.progressContext = ctx;
			}
			// 表示进度的两端为圆形
			ctx.setLineCap('round');
			// 设置线条的宽度和颜色
			ctx.setLineWidth(this.borderWidthPx);
			ctx.setStrokeStyle(this.circleColor);
			// 将总过渡时间除以100，得出每修改百分之一进度所需的时间
			let time = Math.floor(this.duration / 100);
			// 结束角的计算依据为：将2π分为100份，乘以当前的进度值，得出终止点的弧度值，加起始角，为整个圆从默认的
			// 3点钟方向开始画图，转为更好理解的12点钟方向开始作图，这需要起始角和终止角同时加上this.startAngle值
			let endAngle = ((2 * Math.PI) / 100) * progress + this.startAngle;
			ctx.beginPath();
			// 半径为整个canvas宽度的一半
			let radius = this.widthPx / 2;
			ctx.arc(radius, radius, radius - this.borderWidthPx, this.startAngle, endAngle, false);
			ctx.stroke();
			ctx.draw();
			// 如果变更后新值大于旧值，意味着增大了百分比
			if (this.newPercent > this.oldPercent) {
				// 每次递增百分之一
				progress++;
				// 如果新增后的值，大于需要设置的值百分比值，停止继续增加
				if (progress > this.newPercent) return;
			} else {
				// 同理于上面
				progress--;
				if (progress < this.newPercent) return;
			}
			setTimeout(() => {
				// 定时器，每次操作间隔为time值，为了让进度条有动画效果
				this.drawCircleByProgress(progress);
			}, time);
		}
	}
};
</script>

<style lang="scss" scoped>
.c-circle-progress {
	position: relative;
	/* #ifndef APP-NVUE */
	display: inline-flex;		
	/* #endif */
	align-items: center;
	justify-content: center;
}

.c-canvas-bg {
	position: absolute;
}

.c-canvas {
	position: absolute;
}
</style>
