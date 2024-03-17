/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-05 19:10:31
 * @Description:
 */
export default {
  computed: {
    // 微信小程序平台无法在模版中访问$c（h5可以）
    // 所以这里通过computed计算属性将其附加到this.$c上，就可以在模板或者js中使用this.$c.xxx
    $c() {
      return uni.$c
    }
  },
  onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$c.getRect = this.$cGetRect
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $cGetRect(selector, all) {
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
    getParentData(parentName = '') {
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName)
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key]
        })
      }
    },
    // 阻止事件冒泡
    preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation()
    }
  }
}
