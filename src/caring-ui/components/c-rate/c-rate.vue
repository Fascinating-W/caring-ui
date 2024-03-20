<template>
	<view class="c-rate" :id="elId" @touchmove.stop.prevent="touchMove">
		<view class="c-star-wrap" v-for="(item, index) in count" :key="index" :class="[elClass]">
			<c-icon
				:name="activeIndex > index ? elActiveIcon : inactiveIcon"
				@click="click(index + 1, $event)"
				:color="activeIndex > index ? elActiveColor : inactiveColor"
				:custom-style="{
					fontSize: size + 'px',
					padding: `0 ${gutter / 2 + 'px'}`
				}"
				:custom-prefix="customPrefix"
				:show-decimal-icon="showDecimalIcon(index)"
				:percent="decimal"
				:inactive-color="inactiveColor"
			></c-icon>
		</view>
	</view>
</template>

<script>

export default {
	name: 'c-rate',
	props: {
		// 用于v-model双向绑定选中的星星数量
		// 1.4.5版新增
		value: {
			type: [Number, String],
			default: -1
		},
		// 要显示的星星数量
		count: {
			type: [Number, String],
			default: 5
		},
		// 是否不可选中
		disabled: {
			type: Boolean,
			default: false
		},
		// 星星的大小，单位px
		size: {
			type: [Number, String],
			default: 16
		},
		// 未选中时的颜色
		inactiveColor: {
			type: String,
			default: '#b2b2b2'
		},
		// 选中的颜色
		activeColor: {
			type: String,
			default: uni.$c.color.primary
		},
		// 星星之间的间距，单位px
		gutter: {
			type: [Number, String],
			default: 5
		},
		// 最少能选择的星星个数
		minCount: {
			type: [Number, String],
			default: 0
		},
		// 是否允许半星(功能尚未实现)
		allowHalf: {
			type: Boolean,
			default: false
		},
		// 选中时的图标(星星)
		activeIcon: {
			type: String,
			default: 'star-fill'
		},
		// 未选中时的图标(星星)
		inactiveIcon: {
			type: String,
			default: 'star'
		},
		// 自定义扩展前缀，方便用户扩展自己的图标库
		customPrefix: {
			type: String,
			default: 'cicon'
		},
		colors: {
			type: Array,
			default() {
				return []
			}
		},
		icons: {
			type: Array,
			default() {
				return []
			}
		},
    allowHalf: {
      type: Boolean,
      default: false
    }
	},
	data() {
		return {
			// 生成一个唯一id，否则一个页面多个评分组件，会造成冲突
			elId: uni.$c.guid(),
			elClass: uni.$c.guid(),
			starBoxLeft: 0, // 评分盒子左边到屏幕左边的距离，用于滑动选择时计算距离
			// 当前激活的星星的index，如果存在value，优先使用value，因为它可以双向绑定(1.4.5新增)
			activeIndex: this.value,
			starWidth: 0, // 每个星星的宽度
			starWidthArr: [] //每个星星最右边到组件盒子最左边的距离
		}
	},
	watch: {
		value(val) {
			this.activeIndex = val
		}
	},
	computed: {
		decimal() {
			if (this.disabled) {
				return this.activeIndex * 100 % 100
			} else if (this.allowHalf) {
				return 50
			}
		},
		elActiveIcon() {
			const len = this.icons.length
			// 此处规则类似于下方的elActiveColor参数，都是根据一定的规则，显示不同的图标
			// 结果可能如此：icons参数传递了3个图标，当选中两个时，用第一个图标，4个时，用第二个图标
			// 第三个时，用第三个图标作为激活的图标
			if (len && len <= this.count) {
				const step = Math.round(this.activeIndex / Math.round(this.count / len))
				if (step < 1) return this.icons[0]
				if (step > len) return this.icons[len - 1]
				return this.icons[step - 1]
			}
			return this.activeIcon
		},
		elActiveColor() {
			const len = this.colors.length
			// 如果有设置colors参数(此参数用于将图标分段，比如一共5颗星，colors传3个颜色值，那么根据一定的规则，2颗星可能为第一个颜色
			// 4颗星为第二个颜色值，5颗星为第三个颜色值)
			if (len && len <= this.count) {
				const step = Math.round(this.activeIndex / Math.round(this.count / len))
				if (step < 1) return this.colors[0]
				if (step > len) return this.colors[len - 1]
				return this.colors[step - 1]
			}
			return this.activeColor
		}
	},
	methods: {
		// 获取评分组件盒子的布局信息
		getElRectById() {
			// uView封装的获取节点的方法，详见文档
			this.$cGetRect('#' + this.elId).then(res => {
				this.starBoxLeft = res.left
			})
		},
		// 获取单个星星的尺寸
		getElRectByClass() {
			// uView封装的获取节点的方法，详见文档
			this.$cGetRect('.' + this.elClass).then(res => {
				this.starWidth = res.width
				// 把每个星星右边到组件盒子左边的距离放入数组中
				for (let i = 0; i < this.count; i++) {
					this.starWidthArr[i] = (i + 1) * this.starWidth
				}
			})
		},
		// 手指滑动
		touchMove(e) {
			if (this.disabled) {
				return
			}
			if (!e.changedTouches[0]) {
				return
			}
			const movePageX = e.changedTouches[0].pageX
			// 滑动点相对于评分盒子左边的距离
			const distance = movePageX - this.starBoxLeft

			// 如果滑动到了评分盒子的左边界，就设置为0星
			if (distance <= 0) {
				this.activeIndex = 0
			}
			// 滑动的距离，相当于多少颗星星
			let index = Math.ceil(distance / this.starWidth)
			this.activeIndex = index > this.count ? this.count : index
			// 对最少颗星星的限制
			if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
			this.emitEvent()
		},
		// 通过点击，直接选中
		click(index, e) {
			if (this.disabled) {
				return
			}
			// 半星选择，尚未实现
			if (this.allowHalf) {
			}
			// 对第一个星星特殊处理，只有一个的时候，点击可以取消，否则无法作0星评价
			if (index == 1) {
				if (this.activeIndex == 1) {
					this.activeIndex = 0
				} else {
					this.activeIndex = 1
				}
			} else {
				this.activeIndex = index
			}
			// 对最少颗星星的限制
			if (this.activeIndex < this.minCount) this.activeIndex = this.minCount
			this.emitEvent()
		},
		// 发出事件
		emitEvent() {
			// 发出change事件
			this.$emit('change', this.activeIndex)
			// 同时修改双向绑定的value的值
			if (this.value != -1) {
				this.$emit('input', this.activeIndex)
			}
		},
		showDecimalIcon(index) {
			return this.disabled && parseInt(this.activeIndex) === index
		}
	},
	mounted() {
		this.getElRectById()
		this.getElRectByClass()
	}
}
</script>

<style scoped lang="scss">

.c-rate {
	display: -webkit-inline-flex;
	display: inline-flex;
	align-items: center;
	margin: 0;
	padding: 0;
}

.c-icon {
	box-sizing: border-box;
}
</style>
