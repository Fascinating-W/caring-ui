<!--
 * @Author: Wanko
 * @Date: 2022-10-19 15:31:29
 * @LastEditors: Wanko
 * @LastEditTime: 2024-02-26 15:57:43
 * @Description: 
-->
<template>
  <view class="inline-flex">
    <text :class="customClass" :style="[iconStyle]"></text>
  </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'

export default {
  name: 'c-icon',
  props: {
    // 图标类名
    name: {
      type: String,
      default: ''
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: 'inherit'
    },
    // 字体大小，单位px
    size: {
      type: [Number, String],
      // 默认继承父元素大小
      default: 'inherit'
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
		customPrefix: {
			type: String,
			default: 'cicon'
		},
  },
  computed: {
    customClass() {
      let classes = []
			classes.push(this.customPrefix + '-' + this.name)
			// uView的自定义图标类名为u-iconfont
			if (this.customPrefix == 'cicon') {
				classes.push('c-iconfont')
			} else {
				classes.push(this.customPrefix)
			}

      if (this.color && this.$c.config.type.includes(this.color))
        classes.push(`c-${this.color}`)
      return classes
    },
    iconStyle() {
      let style = {}
      style = {
        fontSize:
          this.size == 'inherit' ? 'inherit' : this.$c.addUnit(this.size),
        fontWeight: this.bold ? 'bold' : 'normal'
      }
      style.color = calcColor(this.color)
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
@import './iconfont.css';
@import './custom.css';
</style>
