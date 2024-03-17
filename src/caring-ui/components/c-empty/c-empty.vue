<!--
 * @Author: Wanko
 * @Date: 2022-11-21 17:17:27
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-03 15:42:21
 * @Description: 
-->
<template>
  <view class="flex-col flex-cc">
    <c-icon
      :name="'empty-' + mode"
      :size="iconSize"
      :color="emptyIconColor"
    ></c-icon>

    <view :style="emptyTextStyle">
      <slot>{{ tipText }}</slot>
    </view>
  </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-empty',
  props: {
    // 选择预置的图标类型
    mode: {
      type: String,
      default: 'data'
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: uni.$c.color.light
    },
    // 图标的大小 默认60px
    iconSize: {
      type: [String, Number],
      default: 60
    },
    // 提示文字
    text: {
      type: String,
      default: ''
    },
    // 文字颜色
    color: {
      type: String,
      default: uni.$c.color.light
    },
    // 文字大小，单位rpx
    fontSize: {
      type: [String, Number],
      default: 13
    }
  },
  computed: {
    tipText() {
      if (this.text) {
        return this.text
      } else {
        return this.icons[this.mode]
      }
    },
    emptyIconColor() {
      return calcColor(this.iconColor)
    },
    emptyTextStyle() {
      return {
        color: calcColor(this.color),
        fontSize: this.$c.addUnit(this.fontSize)
      }
    }
  },
  data() {
    return {
      icons: {
        car: '购物车为空',
        page: '页面不存在',
        search: '没有搜索结果',
        address: '没有收货地址',
        wifi: '没有WiFi',
        order: '订单为空',
        coupon: '没有优惠券',
        favor: '暂无收藏',
        permission: '无权限',
        history: '无历史记录',
        news: '无新闻列表',
        message: '消息列表为空',
        list: '列表为空',
        data: '数据为空'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
