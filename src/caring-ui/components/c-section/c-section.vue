<template>
  <view class="c-section" :class="customClass">
    <view
      class="c-section__title"
      :style="sectionStyle"
      :class="{
        'c-section--line': line
      }"
    >
      <view
        class="c-section__title__icon-wrap c-flex"
        :style="[lineStyle]"
        v-if="line"
      >
        <c-icon
          top="0"
          name="column-line"
          :size="size * 1.25"
          bold
          :color="lineColor ? lineColor : color"
        ></c-icon>
      </view>
      <text class="c-flex c-section__title__text">
        <slot>{{ title }}</slot>
      </text>
    </view>
    <view
      class="c-section__right-info"
      :style="{
        color: valueColor
      }"
      @tap="rightClick"
    >
      <slot name="right" v-if="$slots.right" />
      <block v-else-if="value">
        {{ value }}
        <view class="c-section__right-info__icon-arrow c-flex" v-if="arrow">
          <c-icon name="arrow-right" size="12" :color="valueColor"></c-icon>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'
import { customClass, customStyle } from '../../libs/props/common.js'
export default {
  name: 'c-section',
  props: {
    
    customClass,
    customStyle,
    title: {
      type: String,
      default: ''
    },
    // 右边value内容
    value: {
      type: String,
      default: ''
    },
    // title size
    size: {
      type: [Number, String],
      default: 14
    },
    // 主标题是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // 主标题的颜色
    color: {
      type: String,
      default: uni.$c.color.primary
    },
    // 右边副标题的颜色
    valueColor: {
      type: String,
      default: '#909399'
    },
    // 是否显示左边的竖条
    line: {
      type: Boolean,
      default: true
    },
    // 左边竖线的颜色
    lineColor: {
      type: String,
      default: ''
    },
    // 是否显示右边箭头
    arrow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionStyle() {
      let style = {}
      style = {
        fontSize: this.$c.addUnit(this.size),
        fontWeight: this.bold ? 'bold' : 'normal',
        color: calcColor(this.color),
        paddingLeft: this.line ? this.size * 0.7 + 'px' : 0
      }
      return style
    },
    // 左边竖条的样式
    lineStyle() {
      // 由于安卓和iOS的，需要稍微调整绝对定位的top值，才能让左边的竖线和右边的文字垂直居中
      return {
        // 由于竖线为字体图标，具有比实际线宽更宽的宽度，所以也需要根据字体打下动态调整
        left: -(Number(this.size) * 0.9) + 'px',
        top: -(Number(this.size) * (this.$c.os() == 'ios' ? 0.14 : 0.15)) + 'px'
      }
    }
  },
  methods: {
    rightClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.c-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    position: relative;
    font-size: 14px;
    padding-left: 10px;
    display: flex;
    align-items: center;

    &__icon-wrap {
      position: absolute;
    }

    &__text {
      line-height: 1;
    }
  }

  &__right-info {
    color: $c-tips;
    font-size: 13px;
    display: flex;
    align-items: center;

    &__icon-arrow {
      margin-left: 3px;
    }
  }
}
</style>
