<template>
  <c-popup
    :maskCloseAble="maskCloseAble"
    :popup="false"
    v-model="value"
    length="auto"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    @close="close"
    :z-index="uZIndex"
  >
    <view class="c-datetime-picker">
      <view class="c-picker-header" @touchmove.stop.prevent="">
        <view
          class="c-btn-picker c-btn-picker--tips"
          :style="{ color: cancelColor }"
          hover-class="c-opacity"
          :hover-stay-time="150"
          @tap="getResult('cancel')"
          >{{ cancelText }}</view
        >
        <view class="c-picker__title">{{ title }}</view>
        <view
          class="c-btn-picker c-btn-picker--primary"
          :style="{ color: moving ? cancelColor : confirmColor }"
          hover-class="c-opacity"
          :hover-stay-time="150"
          @touchmove.stop=""
          @tap.stop="getResult('confirm')"
        >
          {{ confirmText }}
        </view>
      </view>
      <view class="c-picker-body">
        <picker-view
          :value="valueArr"
          @change="change"
          class="c-picker-view"
          @pickstart="pickstart"
          @pickend="pickend"
        >
          <picker-view-column v-if="!reset && dateParams.year">
            <view
              class="c-column-item"
              v-for="(item, index) in years"
              :key="index"
            >
              {{ item }}
              <text class="c-text" v-if="showTimeTag">年</text>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && dateParams.month">
            <view
              class="c-column-item"
              v-for="(item, index) in months"
              :key="index"
            >
              {{ formatNumber(item) }}
              <text class="c-text" v-if="showTimeTag">月</text>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && dateParams.day">
            <view
              class="c-column-item"
              v-for="(item, index) in days"
              :key="index"
            >
              {{ formatNumber(item) }}
              <text class="c-text" v-if="showTimeTag">日</text>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && dateParams.hour">
            <view
              class="c-column-item"
              v-for="(item, index) in hours"
              :key="index"
            >
              {{ formatNumber(item) }}
              <text class="c-text" v-if="showTimeTag">时</text>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && dateParams.minute">
            <view
              class="c-column-item"
              v-for="(item, index) in minutes"
              :key="index"
            >
              {{ formatNumber(item) }}
              <text class="c-text" v-if="showTimeTag">分</text>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && dateParams.second">
            <view
              class="c-column-item"
              v-for="(item, index) in seconds"
              :key="index"
            >
              {{ formatNumber(item) }}
              <text class="c-text" v-if="showTimeTag">秒</text>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </c-popup>
</template>

<script>
export default {
  name: 'c-picker',
  props: {
    // picker中需要显示的参数
    params: {
      type: Object,
      default() {
        return null
      }
    },

    // 当mode=selector或者mode=multiSelector时，提供的默认选中的下标
    defaultSelector: {
      type: Array,
      default() {
        return [0]
      }
    },
    // 年份开始时间
    startYear: {
      type: [String, Number],
      default: 1950
    },
    // 年份结束时间
    endYear: {
      type: [String, Number],
      default: 2050
    },
    cancelColor: {
      type: String,
      default: uni.$c.color.tips
    },
    confirmColor: {
      type: String,
      default: uni.$c.color.primary
    },
    // 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
    defaultTime: {
      type: String,
      default: ''
    },

    // 时间模式时，是否显示后面的年月日中文提示
    showTimeTag: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    // 是否允许通过点击遮罩关闭Picker
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    // 通过双向绑定控制组件的弹出与收起
    value: {
      type: Boolean,
      default: false
    },
    // 弹出的z-index值
    zIndex: {
      type: [String, Number],
      default: 0
    },
    // 顶部标题
    title: {
      type: String,
      default: ''
    },
    // 取消按钮的文字
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确认按钮的文字
    confirmText: {
      type: String,
      default: '确认'
    },
    mode: {
      type: String,
      default: 'date'
    },
    date: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    },
    datetime: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      reset: false,
      startDate: '',
      endDate: '',
      valueArr: [],
      dateParams: {
        year: false,
        month: false,
        day: false,
        hour: false,
        minute: false,
        second: false
      },
      moving: false // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    calcMode() {
      if (this.date) return 'date'
      else if (this.time) return 'time'
      else if (this.datetime) return 'datetime'
      else return this.mode
    },
    propsChange() {
      // 引用这几个变量，是为了监听其变化
      return `${this.defaultTime}-${this.startYear}-${this.endYear}`
    },
    yearAndMonth() {
      return `${this.year}-${this.month}`
    },
    uZIndex() {
      // 如果用户有传递z-index值，优先使用
      return this.zIndex ? this.zIndex : this.$c.zIndex.popup
    }
  },
  watch: {
    propsChange() {
      this.reset = true
      setTimeout(() => this.init(), 10)
    },
    // watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
    // 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
    yearAndMonth(val) {
      if (this.dateParams.year) this.setDays()
    },
    // 微信和QQ小程序由于一些奇怪的原因(故同时对所有平台均初始化一遍)，需要重新初始化才能显示正确的值
    value(n) {
      if (n) {
        this.reset = true
        setTimeout(() => this.init(), 10)
      }
    }
  },
  methods: {
    // 标识滑动开始，只有微信小程序才有这样的事件
    pickstart() {
      // #ifdef MP-WEIXIN
      this.moving = true
      // #endif
    },
    // 标识滑动结束
    pickend() {
      // #ifdef MP-WEIXIN
      this.moving = false
      // #endif
    },

    // 小于10前面补0，用于月份，日期，时分秒等
    formatNumber(num) {
      return +num < 10 ? '0' + num : String(num)
    },
    // 生成递进的数组
    generateArray: function (start, end) {
      // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
      start = Number(start)
      end = Number(end)
      end = end > start ? end : start
      // 生成数组，获取其中的索引，并剪出来
      return [...Array(end + 1).keys()].slice(start)
    },
    getIndex: function (arr, val) {
      let index = arr.indexOf(val)
      // 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0，导致条件不成立
      return ~index ? index : 0
    },
    //日期时间处理
    initTimeValue() {
      // 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
      let fdate = this.defaultTime.replace(/\-/g, '/')
      fdate = fdate && fdate.indexOf('/') == -1 ? `2020/01/01 ${fdate}` : fdate
      let time = null
      if (fdate) time = new Date(fdate)
      else time = new Date()
      // 获取年日月时分秒
      this.year = time.getFullYear()
      this.month = Number(time.getMonth()) + 1
      this.day = time.getDate()
      this.hour = time.getHours()
      this.minute = time.getMinutes()
      this.second = time.getSeconds()
    },
    init() {
      this.valueArr = []
      this.reset = false
      this.initTimeValue()
      console.log(this.calcMode)
      if (this.params) {
        this.dateParams = this.params
        if (this.dateParams.year) {
          this.valueArr.push(0)
          this.setYears()
        }
        if (this.dateParams.month) {
          this.valueArr.push(0)
          this.setMonths()
        }
        if (this.dateParams.day) {
          this.valueArr.push(0)
          this.setDays()
        }
        if (this.dateParams.hour) {
          this.valueArr.push(0)
          this.setHours()
        }
        if (this.dateParams.minute) {
          this.valueArr.push(0)
          this.setMinutes()
        }
        if (this.dateParams.second) {
          this.valueArr.push(0)
          this.setSeconds()
        }
      } else {
        if (this.calcMode === 'date') {
          Object.assign(this.dateParams, {
            year: true,
            month: true,
            day: true
          })
          this.valueArr.push(0)
          this.setYears()
          this.valueArr.push(0)
          this.setMonths()
          this.valueArr.push(0)
          this.setDays()
        } else if (this.calcMode === 'time') {
          Object.assign(this.dateParams, {
            hour: true,
            minute: true,
            second: true
          })
          this.valueArr.push(0)
          this.setHours()
          this.valueArr.push(0)
          this.setMinutes()
          this.valueArr.push(0)
          this.setSeconds()
        } else if (this.calcMode === 'datetime') {
          Object.assign(this.dateParams, {
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
            second: true
          })
          this.valueArr.push(0)
          this.setYears()
          this.valueArr.push(0)
          this.setMonths()
          this.valueArr.push(0)
          this.setDays()
          this.valueArr.push(0)
          this.setHours()
          this.valueArr.push(0)
          this.setMinutes()
          this.valueArr.push(0)
          this.setSeconds()
        }
      }

      console.log(this.valueArr, '---')
      this.$forceUpdate()
    },
    // 设置picker的某一列值
    setYears() {
      // 获取年份集合
      this.years = this.generateArray(this.startYear, this.endYear)
      // 设置this.valueArr某一项的值，是为了让picker预选中某一个值
      this.valueArr.splice(
        this.valueArr.length - 1,
        1,
        this.getIndex(this.years, this.year)
      )
    },
    setMonths() {
      this.months = this.generateArray(1, 12)
      this.valueArr.splice(
        this.valueArr.length - 1,
        1,
        this.getIndex(this.months, this.month)
      )
    },
    setDays() {
      let totalDays = new Date(this.year, this.month, 0).getDate()
      this.days = this.generateArray(1, totalDays)
      let index = 0
      // 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
      // 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
      if (this.dateParams.year && this.dateParams.month) index = 2
      else if (this.dateParams.month) index = 1
      else if (this.dateParams.year) index = 1
      else index = 0
      // 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
      // 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
      if (this.day > this.days.length) this.day = this.days.length
      this.valueArr.splice(index, 1, this.getIndex(this.days, this.day))
    },
    setHours() {
      this.hours = this.generateArray(0, 23)
      this.valueArr.splice(
        this.valueArr.length - 1,
        1,
        this.getIndex(this.hours, this.hour)
      )
    },
    setMinutes() {
      this.minutes = this.generateArray(0, 59)
      this.valueArr.splice(
        this.valueArr.length - 1,
        1,
        this.getIndex(this.minutes, this.minute)
      )
    },
    setSeconds() {
      this.seconds = this.generateArray(0, 59)
      this.valueArr.splice(
        this.valueArr.length - 1,
        1,
        this.getIndex(this.seconds, this.second)
      )
    },
    close() {
      this.$emit('input', false)
    },
    // 用户更改picker的列选项
    change(e) {
      this.valueArr = e.detail.value
      let i = 0
      // 这里使用i++，是因为this.valueArr数组的长度是不确定长度的，它根据this.params的值来配置长度
      // 进入if规则，i会加1，保证了能获取准确的值
      if (this.dateParams.year) this.year = this.years[this.valueArr[i++]]
      if (this.dateParams.month) this.month = this.months[this.valueArr[i++]]
      if (this.dateParams.day) this.day = this.days[this.valueArr[i++]]
      if (this.dateParams.hour) this.hour = this.hours[this.valueArr[i++]]
      if (this.dateParams.minute) this.minute = this.minutes[this.valueArr[i++]]
      if (this.dateParams.second) this.second = this.seconds[this.valueArr[i++]]
    },
    // 用户点击确定按钮
    getResult(event = null) {
      // #ifdef MP-WEIXIN
      if (this.moving) return
      // #endif
      let result = {}
      // 只返回用户在this.params中配置了为true的字段
      if (this.dateParams.year) result.year = this.formatNumber(this.year || 0)
      if (this.dateParams.month)
        result.month = this.formatNumber(this.month || 0)
      if (this.dateParams.day) result.day = this.formatNumber(this.day || 0)
      if (this.dateParams.hour) result.hour = this.formatNumber(this.hour || 0)
      if (this.dateParams.minute)
        result.minute = this.formatNumber(this.minute || 0)
      if (this.dateParams.second)
        result.second = this.formatNumber(this.second || 0)

      if (this.calcMode === 'date') {
				result.date = 
					this.year + '-' + this.month + '-' + this.day
      } else if(this.calcMode === 'time') {
				result.time = 
					this.hour + ':' + this.minute + ':' + this.second
			} else if(this.calcMode === 'datetime') {
				result.datetime = 
					this.year + '-' + this.month + '-' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second
			}
      result.timestamp = this.getTimestamp()
      if (event) this.$emit(event, result)
      this.close()
    },
    // 获取时间戳
    getTimestamp() {
      // yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
      let time =
        this.year +
        '/' +
        this.month +
        '/' +
        this.day +
        ' ' +
        this.hour +
        ':' +
        this.minute +
        ':' +
        this.second
      return new Date(time).getTime() / 1000
    }
  }
}
</script>

<style lang="scss" scoped>
.c-datetime-picker {
  position: relative;
  z-index: 999;
}

.c-picker-view {
  height: 100%;
  box-sizing: border-box;
}

.c-picker-header {
  width: 100%;
  height: 90rpx;
  padding: 0 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  font-size: 30rpx;
  background: #fff;
  position: relative;
}

.c-picker-header::after {
  content: '';
  position: absolute;
  border-bottom: 1rpx solid #eaeef1;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  bottom: 0;
  right: 0;
  left: 0;
}

.c-picker__title {
  color: $c-content;
}

.c-picker-body {
  width: 100%;
  height: 500rpx;
  overflow: hidden;
  background-color: #fff;
}

.c-column-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: $c-main;
  padding: 0 8rpx;
}

.c-text {
  font-size: 24rpx;
  padding-left: 8rpx;
}

.c-btn-picker {
  padding: 16rpx;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
}

.c-opacity {
  opacity: 0.5;
}

.c-btn-picker--primary {
  color: $c-primary;
}

.c-btn-picker--tips {
  color: $c-tips;
}
</style>
