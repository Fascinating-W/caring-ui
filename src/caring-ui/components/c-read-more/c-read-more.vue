<template>
  <view class="">
    <view
      class="c-content"
      :class="[elId]"
      :style="{
        height: isLongContent && !showMore ? height + 'rpx' : 'auto',
        textIndent: textIndent
      }"
    >
      <slot></slot>
    </view>
    <view
      @tap="toggleReadMore"
      v-if="isLongContent"
      class="c-content__showmore-wrap"
      :class="{ 'c-content__show-more': showMore }"
      :style="[innerShadowStyle]"
    >
      <text
        class="c-content__showmore-wrap__readmore-btn"
        :style="{
          fontSize: size + 'px',
          color: color
        }"
      >
        {{ showMore ? openText : closeText }}
      </text>
      <view class="c-content__showmore-wrap__readmore-btn__icon flex-center">
        <c-icon
          :color="color"
          :size="size"
          :name="showMore ? 'arrow-up' : 'arrow-down'"
        ></c-icon>
      </view>
    </view>
  </view>
</template>

<script>
import {guid} from 'caring-utils'
export default {
  name: 'c-read-more',
  props: {
    height: {
      type: [Number, String],
      default: 250
    },
    // 展开后是否显示"收起"按钮
    toggle: {
      type: Boolean,
      default: true
    },
    // 关闭时的提示文字
    closeText: {
      type: String,
      default: '展开阅读全文'
    },
    // 展开时的提示文字
    openText: {
      type: String,
      default: '收起'
    },
    // 提示的文字颜色
    color: {
      type: String,
      default: uni.$c.color.primary
    },
    // 提示文字的大小
    size: {
      type: [String, Number],
      default: 14
    },
    shadow: {
      type: Boolean,
      default: true
    },
    // 是否显示阴影
    shadowStyle: {
      type: Object,
      default() {
        return {
          backgroundImage:
            'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)',
          paddingTop: '150px',
          marginTop: '-150px'
        }
      }
    },
    // 段落首行缩进的字符个数
    textIndent: {
      type: String,
      default: '2em'
    },
    // open和close事件时，将此参数返回在回调参数中
    index: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    paramsChange(val) {
      this.init()
    }
  },
  computed: {
    paramsChange() {
      return `${this.toggle}-${this.height}`
    },
    // 展开后无需阴影，收起时才需要阴影样式
    innerShadowStyle() {
      if (this.showMore) {
        return {}
      } else {
        if (this.shadow) {
          return this.shadowStyle
        } else {
          return { paddingTop: '160px', marginTop: '-150px' }
        }
      }
    }
  },
  data() {
    return {
      isLongContent: false, // 是否需要隐藏一部分内容
      showMore: false, // 当前隐藏与显示的状态，true-显示，false-收起
      elId: guid() // 生成唯一class
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.$cGetRect('.' + this.elId).then((res) => {
        // 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
        if (res.height > this.height) {
          this.isLongContent = true
          this.showMore = false
        }
      })
    },
    // 展开或者收起
    toggleReadMore() {
      this.showMore = !this.showMore
      // 如果toggle为false，隐藏"收起"部分的内容
      if (this.toggle == false) this.isLongContent = false
      // 发出打开或者收齐的事件
      this.$emit(this.showMore ? 'open' : 'close', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.c-content {
  font-size: 30rpx;
  color: $c-content;
  line-height: 1.8;
  text-align: left;
  overflow: hidden;

  &__show-more {
    padding-top: 0;
    background: none;
    margin-top: 20rpx;
  }

  &__showmore-wrap {
    position: relative;
    width: 100%;
    padding-bottom: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    &__readmore-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;

      &__icon {
        margin-left: 14rpx;
      }
    }
  }
}
</style>
