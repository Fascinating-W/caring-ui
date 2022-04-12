import config from './libs/config'
// 全局mixin
import mixin from './libs/mixin'

// 规则检验
import is from './libs/function/test.js'

// props配置信息
import props from './libs/config/props.js'

// 公共文件写入的方法
import index from './libs/function/index.js'

// uniAPI二次封装方法
import utils from './libs/function/utils'

// 防抖方法
import debounce from './libs/function/debounce.js'
// 节流方法
import throttle from './libs/function/throttle.js'

import color from './theme.scss'
const $c = {
  ...index,
  config,
  is,
  props,
  color,
  ...utils,
  debounce,
  throttle
}

// $u挂载到uni对象上
uni && (uni.$c = $c)

const install = Vue => {
  Vue.mixin(mixin)
  Vue.prototype.$c = $c
}

export default {
  install
}