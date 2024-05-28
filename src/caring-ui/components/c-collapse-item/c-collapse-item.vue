<template>
  <view class="c-collapse-item" :style="[itemStyle]">
    <view
      :hover-stay-time="200"
      class="c-collapse-head"
      @tap.stop="headClick"
      :hover-class="hoverClass"
      :style="[headStyle]"
    >
      <block v-if="!$slots['title-all']">
        <view
          v-if="!$slots['title']"
          class="c-collapse-title c-line-1"
          :style="[
            { textAlign: align ? align : 'left' },
            isShow && activeStyle && !arrow ? activeStyle : ''
          ]"
        >
          {{ title }}
        </view>
        <slot v-else name="title" />
        <view class="c-icon-wrap">
          <c-icon
            v-if="arrow"
            :color="arrowColor"
            :class="{ 'c-arrow-down-icon-active': isShow }"
            class="c-arrow-down-icon"
            name="arrow-down"
          ></c-icon>
        </view>
      </block>
      <slot v-else name="title-all" />
    </view>
    <view
      class="c-collapse-body"
      :style="[
        {
          height: isShow ? height + 'px' : '0'
        }
      ]"
    >
      <view class="c-collapse-content" :id="elId" :style="[bodyStyle]">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'c-collapse-item',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 标题的对齐方式
    align: {
      type: String,
      default: 'left'
    },
    // 是否可以点击收起
    disabled: {
      type: Boolean,
      default: false
    },
    // collapse显示与否
    open: {
      type: Boolean,
      default: false
    },
    // 唯一标识符
    name: {
      type: [Number, String],
      default: ''
    },
    //活动样式
    activeStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 标识当前为第几个
    index: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      elId: '',
      height: 0, // body内容的高度
      headStyle: {}, // 头部样式，对象形式
      bodyStyle: {}, // 主体部分样式
      itemStyle: {}, // 每个item的整体样式
      arrowColor: '', // 箭头的颜色
      hoverClass: '', // 头部按下时的效果样式类
      arrow: true // 是否显示右侧箭头
    }
  },
  watch: {
    open(val) {
      this.isShow = val
    }
  },
  created() {
    this.parent = false
    // 获取u-collapse的信息，放在u-collapse是为了方便，不用每个u-collapse-item写一遍
    this.elId = this.$c.guid()
    this.isShow = this.open
  },
  methods: {
    // 异步获取内容，或者动态修改了内容时，需要重新初始化
    init() {
      this.parent = this.$c.$parent.call(this, 'c-collapse')
      if (this.parent) {
        this.nameSync = this.name ? this.name : this.parent.childrens.length
        // 不存在时才添加本实例
        !this.parent.childrens.includes(this) &&
          this.parent.childrens.push(this)
        this.headStyle = this.parent.headStyle
        this.bodyStyle = this.parent.bodyStyle
        this.arrowColor = this.parent.arrowColor
        this.hoverClass = this.parent.hoverClass
        this.arrow = this.parent.arrow
        this.itemStyle = this.parent.itemStyle
      }
      this.$nextTick(() => {
        this.queryRect()
      })
    },
    // 点击collapsehead头部
    headClick() {
      if (this.disabled) return
      if (this.parent && this.parent.accordion == true) {
        this.parent.childrens.map((val) => {
          // 自身不设置为false，因为后面有this.isShow = !this.isShow;处理了
          if (this != val) {
            val.isShow = false
          }
        })
      }

      this.isShow = !this.isShow
      // 触发本组件的事件
      this.$emit('change', {
        index: this.index,
        show: this.isShow
      })
      // 只有在打开时才发出事件
      if (this.isShow) this.parent && this.parent.onChange()
      this.$forceUpdate()
    },
    GetRect(selector, all) {
      return new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    // 查询内容高度
    queryRect() {
      // $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
      // 组件内部一般用this.$uGetRect，对外的为this.$c.getRect，二者功能一致，名称不同
      this.GetRect('#' + this.elId).then((res) => {
        this.height = res.height
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.c-collapse-head {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $c-main;
  font-size: 30rpx;
  line-height: 1;
  padding: 24rpx 0;
  text-align: left;
}

.c-collapse-title {
  flex: 1;
  overflow: hidden;
}

.c-arrow-down-icon {
  transition: all 0.3s;
  margin-right: 20rpx;
  margin-left: 14rpx;
}

.c-arrow-down-icon-active {
  transform: rotate(180deg);
  transform-origin: center center;
}

.c-collapse-body {
  overflow: hidden;
  transition: all 0.3s;
}

.c-collapse-content {
  overflow: hidden;
  font-size: 28rpx;
  color: $c-tips;
  text-align: left;
}
</style>
