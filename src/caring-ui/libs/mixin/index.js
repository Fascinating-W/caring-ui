export default {
  computed: {
    // 微信小程序平台无法在模版中访问$c（h5可以）
    // 所以这里通过computed计算属性将其附加到this.$c上，就可以在模板或者js中使用this.$c.xxx
    $c () {
      return uni.$c
    }
  },
  methods: {
    // 阻止事件冒泡
    preventEvent (e) {
      e && typeof (e.stopPropagation) === 'function' && e.stopPropagation()
    }
  },
}