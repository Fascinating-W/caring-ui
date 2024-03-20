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
          <picker-view-column v-if="!reset && params.province">
            <view
              class="c-column-item"
              v-for="(item, index) in provinces"
              :key="index"
            >
              <view class="line-1">{{ item.label }}</view>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && params.city">
            <view
              class="c-column-item"
              v-for="(item, index) in citys"
              :key="index"
            >
              <view class="line-1">{{ item.label }}</view>
            </view>
          </picker-view-column>
          <picker-view-column v-if="!reset && params.area">
            <view
              class="c-column-item"
              v-for="(item, index) in areas"
              :key="index"
            >
              <view class="line-1">{{ item.label }}</view>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </c-popup>
</template>

<script>
import provinces from '../../libs/util/province.js'
import citys from '../../libs/util/city.js'
import areas from '../../libs/util/area.js'
export default {
  name: 'c-picker',
  props: {
    // picker中需要显示的参数
    params: {
      type: Object,
      default() {
        return {
          province: true,
          city: true,
          area: true
        }
      }
    },
    // "取消"按钮的颜色
    cancelColor: {
      type: String,
      default: uni.$c.color.tips
    },
    // "确定"按钮的颜色
    confirmColor: {
      type: String,
      default: uni.$c.color.primary
    },
    // 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
    defaultRegion: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
    areaCode: {
      type: Array,
      default() {
        return []
      }
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
    }
  },
  data() {
    return {
      reset: false,
      valueArr: [],
      provinces: provinces,
      citys: citys[0],
      areas: areas[0][0],
      province: 0,
      city: 0,
      area: 0,
      moving: false // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    propsChange() {
      // 引用这几个变量，是为了监听其变化
      return `${this.defaultRegion}-${this.areaCode}`
    },
    regionChange() {
      // 引用这几个变量，是为了监听其变化
      return `${this.province}-${this.city}`
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
    // 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
    regionChange(val) {
      this.citys = citys[this.province]
      this.areas = areas[this.province][this.city]
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
    init() {
      this.valueArr = []
      this.reset = false
      if (this.params.province) {
        this.valueArr.push(0)
        this.setProvinces()
      }
      if (this.params.city) {
        this.valueArr.push(0)
        this.setCitys()
      }
      if (this.params.area) {
        this.valueArr.push(0)
        this.setAreas()
      }
      this.$forceUpdate()
    },
    setProvinces() {
      // 判断是否需要province参数
      if (!this.params.province) return
      let tmp = ''
      let useCode = false
      // 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
      if (this.areaCode.length) {
        tmp = this.areaCode[0]
        useCode = true
      } else if (this.defaultRegion.length) tmp = this.defaultRegion[0]
      else tmp = 0
      // 历遍省份数组匹配
      provinces.map((v, k) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
          tmp = k
        }
      })
      this.province = tmp
      this.provinces = provinces
      // 设置默认省份的值
      this.valueArr.splice(0, 1, this.province)
    },
    setCitys() {
      if (!this.params.city) return
      let tmp = ''
      let useCode = false
      if (this.areaCode.length) {
        tmp = this.areaCode[1]
        useCode = true
      } else if (this.defaultRegion.length) tmp = this.defaultRegion[1]
      else tmp = 0
      citys[this.province].map((v, k) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
          tmp = k
        }
      })
      this.city = tmp
      this.citys = citys[this.province]
      this.valueArr.splice(1, 1, this.city)
    },
    setAreas() {
      if (!this.params.area) return
      let tmp = ''
      let useCode = false
      if (this.areaCode.length) {
        tmp = this.areaCode[2]
        useCode = true
      } else if (this.defaultRegion.length) tmp = this.defaultRegion[2]
      else tmp = 0
      areas[this.province][this.city].map((v, k) => {
        if (useCode ? v.value == tmp : v.label == tmp) {
          tmp = k
        }
      })
      this.area = tmp
      this.areas = areas[this.province][this.city]
      this.valueArr.splice(2, 1, this.area)
    },
    close() {
      this.$emit('input', false)
    },
    // 用户更改picker的列选项
    change(e) {
      this.valueArr = e.detail.value
      let i = 0
      if (this.params.province) this.province = this.valueArr[i++]
      if (this.params.city) this.city = this.valueArr[i++]
      if (this.params.area) this.area = this.valueArr[i++]
    },
    // 用户点击确定按钮
    getResult(event = null) {
      // #ifdef MP-WEIXIN
      if (this.moving) return
      // #endif
      let result = {}
      // 只返回用户在this.params中配置了为true的字段
      if (this.params.province) result.province = provinces[this.province]
      if (this.params.city) result.city = citys[this.province][this.city]
      if (this.params.area)
        result.area = areas[this.province][this.city][this.area]
      if (event) this.$emit(event, result)
      this.close()
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
