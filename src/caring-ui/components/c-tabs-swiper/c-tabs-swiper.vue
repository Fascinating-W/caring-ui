<template>
  <view
    class="c-tabs"
    :style="{
      zIndex: zIndex,
      background: bgColor
    }"
  >
    <scroll-view
      scroll-x
      class="c-scroll-view"
      :scroll-left="scrollLeft"
      scroll-with-animation
      :style="{ zIndex: zIndex + 1 }"
    >
      <view
        class="c-tabs-scroll-box"
        :class="{ 'c-tabs-scorll-flex': !scroll }"
      >
        <view
          class="c-tabs-item"
          :style="[tabItemStyle(index)]"
          v-for="(item, index) in getTabs"
          :key="index"
          :class="[preId + index]"
          @tap="emit(index)"
        >
          <c-badge
            :count="item[count] || item['count'] || 0"
            :offset="offset"
            size="mini"
          ></c-badge>

          {{ item[name] || item['name'] }}
        </view>
        <view v-if="showBar" class="c-scroll-bar" :style="[tabBarStyle]"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import colorGradient from '../../libs/function/colorGradient'
let color = colorGradient
const { windowWidth } = uni.getSystemInfoSync()
const preId = 'UEl_'
export default {
  name: 'c-tabs-swiper',
  props: {
    // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
    scroll: {
      type: Boolean,
      default: false
    },
    //需循环的标签列表
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前活动tab的索引
    current: {
      type: [Number, String],
      default: 0
    },
    // 导航栏的高度和行高，单位px
    height: {
      type: [Number, String],
      default: 40
    },
    // 字体大小，单位px
    fontSize: {
      type: [Number, String],
      default: 15
    },
    // 过渡动画时长, 单位s
    // duration: {
    // 	type: [Number, String],
    // 	default: 0.5
    // },
    swiperWidth: {
      //line3生效, 外部swiper的宽度, 单位px
      type: [String, Number],
      default: 375
    },
    // 选中项的主题颜色
    activeColor: {
      type: String,
      default: uni.$c.color.primary
    },
    // 未选中项的颜色
    inactiveColor: {
      type: String,
      default: uni.$c.color.content
    },
    // 菜单底部移动的bar的宽度，单位px
    barWidth: {
      type: [Number, String],
      default: 20
    },
    // 移动bar的高度
    barHeight: {
      type: [Number, String],
      default: 3
    },
    // 单个tab的左或右内边距（各占一半），单位px
    gutter: {
      type: [Number, String],
      default: 20
    },
    // 如果是绝对定位，添加z-index值
    zIndex: {
      type: [Number, String],
      default: 1
    },
    // 导航栏的背景颜色
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    //滚动至中心目标类型
    autoCenterMode: {
      type: String,
      default: 'window'
    },
    // 读取传入的数组对象的属性(tab名称)
    name: {
      type: String,
      default: 'name'
    },
    // 读取传入的数组对象的属性(徽标数)
    count: {
      type: String,
      default: 'count'
    },
    // 徽标数位置偏移
    offset: {
      type: Array,
      default: () => {
        return [2, 10]
      }
    },
    // 活动tab字体是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // 当前活动tab item的样式
    activeItemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否显示底部的滑块
    showBar: {
      type: Boolean,
      default: true
    },
    // 底部滑块的自定义样式
    barStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      scrollLeft: 0, // 滚动scroll-view的左边滚动距离
      tabQueryInfo: [], // 存放对tab菜单查询后的节点信息
      windowWidth: 0, // 屏幕宽度，单位为px
      //scrollBarLeft: 0, // 移动bar需要通过translateX()移动的距离
      animationFinishCurrent: this.current,
      componentsWidth: 0,
      line3AddDx: 0,
      line3Dx: 0,
      preId,
      sW: 0,
      tabsInfo: [],
      colorGradientArr: [],
      colorStep: 100 // 两个颜色之间的渐变等分
    }
  },
  computed: {
    // 获取当前活跃的current值
    getCurrent() {
      const current = Number(this.current)
      // 判断是否超出边界
      if (current > this.getTabs.length - 1) {
        return this.getTabs.length - 1
      }
      if (current < 0) return 0
      return current
    },
    getTabs() {
      return this.list
    },
    // 滑块需要移动的距离
    scrollBarLeft() {
      return Number(this.line3Dx) + Number(this.line3AddDx)
    },
    // 滑块的宽度转为px单位
    barWidthPx() {
      return this.barWidth
    },
    // tab的样式
    tabItemStyle() {
      return (index) => {
        let style = {
          height: this.height + 'px',
          lineHeight: this.height + 'px',
          padding: `0 ${this.gutter / 2}px`,
          color:
            this.tabsInfo.length > 0
              ? this.tabsInfo[index]
                ? this.tabsInfo[index].color
                : this.activeColor
              : this.inactiveColor,
          fontSize: this.fontSize + 'px',
          zIndex: this.zIndex + 2,
          fontWeight: index == this.getCurrent && this.bold ? 'bold' : 'normal'
        }
        if (index == this.getCurrent) {
          // 给选中的tab item添加外部自定义的样式
          style = Object.assign(style, this.activeItemStyle)
        }
        return style
      }
    },
    // 底部滑块的样式
    tabBarStyle() {
      let style = {
        width: this.barWidthPx + 'px',
        height: this.barHeight + 'px',
        borderRadius: '100px',
        backgroundColor: this.activeColor,
        left: this.scrollBarLeft + 'px'
      }
      return Object.assign(style, this.barStyle)
    }
  },
  watch: {
    current(n, o) {
      this.change(n)
      this.setFinishCurrent(n)
    },
    list() {
      this.$nextTick(() => {
        this.init()
      })
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.countPx()
      await this.getTabsInfo()
      this.countLine3Dx()
      this.getQuery(() => {
        this.setScrollViewToCenter()
      })
      // 颜色渐变过程数组
      this.colorGradientArr = color.colorGradient(
        this.inactiveColor,
        this.activeColor,
        this.colorStep
      )
    },
    // 获取各个tab的节点信息
    getTabsInfo() {
      return new Promise((resolve, reject) => {
        let view = uni.createSelectorQuery().in(this)
        for (let i = 0; i < this.list.length; i++) {
          view.select('.' + preId + i).boundingClientRect()
        }
        view.exec((res) => {
          const arr = []
          for (let i = 0; i < res.length; i++) {
            // 给每个tab添加其文字颜色属性
            res[i].color = this.inactiveColor
            // 当前tab直接赋予activeColor
            if (i == this.getCurrent) res[i].color = this.activeColor
            arr.push(res[i])
          }
          this.tabsInfo = arr
          resolve()
        })
      })
    },
    // 当swiper滑动结束，计算滑块最终要停留的位置
    countLine3Dx() {
      const tab = this.tabsInfo[this.animationFinishCurrent]
      // 让滑块中心点和当前tab中心重合
      if (tab)
        this.line3Dx =
          tab.left + tab.width / 2 - this.barWidthPx / 2 - this.tabsInfo[0].left
    },
    countPx() {
      // swiper宽度由px转为px单位，因为dx等，都是px单位
      this.sW = Number(this.swiperWidth)
    },
    emit(index) {
      this.$emit('change', index)
    },
    change() {
      this.setScrollViewToCenter()
    },
    getQuery(cb) {
      try {
        let view = uni.createSelectorQuery().in(this).select('.c-tabs')
        view
          .fields(
            {
              size: true
            },
            (data) => {
              if (data) {
                this.componentsWidth = data.width
                if (cb && typeof cb === 'function') cb(data)
              } else {
                this.getQuery(cb)
              }
            }
          )
          .exec()
      } catch (e) {
        this.componentsWidth = windowWidth
      }
    },
    // 把活动tab移动到屏幕中心点
    setScrollViewToCenter() {
      let tab
      tab = this.tabsInfo[this.animationFinishCurrent]
      if (tab) {
        let tabCenter = tab.left + tab.width / 2
        let fatherWidth
        // 活动tab移动到中心时，以屏幕还是tab组件为宽度为基准
        if (this.autoCenterMode === 'window') {
          fatherWidth = windowWidth
        } else {
          fatherWidth = this.componentsWidth
        }
        this.scrollLeft = tabCenter - fatherWidth / 2
      }
    },
    setDx(dx) {
      let nextTabIndex =
        dx > 0
          ? this.animationFinishCurrent + 1
          : this.animationFinishCurrent - 1
      // 判断索引是否超出边界
      nextTabIndex = nextTabIndex <= 0 ? 0 : nextTabIndex
      nextTabIndex =
        nextTabIndex >= this.list.length ? this.list.length - 1 : nextTabIndex
      const tab = this.tabsInfo[nextTabIndex]
      // 当前tab中心点x轴坐标
      let nowTab = this.tabsInfo[this.animationFinishCurrent]
      let nowTabX = nowTab.left + nowTab.width / 2
      // 下一个tab
      let nextTab = this.tabsInfo[nextTabIndex]
      let nextTabX = nextTab.left + nextTab.width / 2
      // 两个tab之间的距离，因为下一个tab可能在当前tab的左边或者右边，取绝对值即可
      let distanceX = Math.abs(nextTabX - nowTabX)
      this.line3AddDx = (dx / this.sW) * distanceX
      this.setTabColor(this.animationFinishCurrent, nextTabIndex, dx)
    },
    // 设置tab的颜色
    setTabColor(nowTabIndex, nextTabIndex, dx) {
      let colorIndex = Math.abs(Math.ceil((dx / this.sW) * 100))
      let colorLength = this.colorGradientArr.length
      // 处理超出索引边界的情况
      colorIndex =
        colorIndex >= colorLength
          ? colorLength - 1
          : colorIndex <= 0
          ? 0
          : colorIndex
      // 设置下一个tab的颜色
      this.tabsInfo[nextTabIndex].color = this.colorGradientArr[colorIndex]
      // 设置当前tab的颜色
      this.tabsInfo[nowTabIndex].color =
        this.colorGradientArr[colorLength - 1 - colorIndex]
    },
    // swiper结束滑动
    setFinishCurrent(current) {
      // 如果滑动的索引不一致，修改tab颜色变化，因为可能会有直接点击tab的情况
      this.tabsInfo.map((val, index) => {
        if (current == index) val.color = this.activeColor
        else val.color = this.inactiveColor
        return val
      })
      this.line3AddDx = 0
      this.animationFinishCurrent = current
      this.countLine3Dx()
    }
  }
}
</script>

<style scoped lang="scss">
view,
scroll-view {
  box-sizing: border-box;
}

.c-tabs {
  width: 100%;
  transition-property: background-color, color;
}

/* #ifndef APP-NVUE */
::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::v-deep ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

/* #endif */

.c-scroll-view {
  width: 100%;
  white-space: nowrap;
  position: relative;
}

.c-tabs-scroll-box {
  position: relative;
}

.c-tabs-scorll-flex {
  display: flex;
  justify-content: space-between;
}

.c-tabs-scorll-flex .c-tabs-item {
  flex: 1;
}

.c-tabs-item {
  position: relative;
  display: inline-block;
  text-align: center;
  transition-property: background-color, color, font-weight;
}

.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.boxStyle {
  pointer-events: none;
  position: absolute;
  transition-property: all;
}

.boxStyle2 {
  pointer-events: none;
  position: absolute;
  bottom: 0;
  transition-property: all;
  transform: translateY(-100%);
}

.itemBackgroundBox {
  pointer-events: none;
  position: absolute;
  top: 0;
  transition-property: left, background-color;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.itemBackground {
  height: 100%;
  width: 100%;
  transition-property: all;
}

.c-scroll-bar {
  position: absolute;
  bottom: 4rpx;
}
</style>
