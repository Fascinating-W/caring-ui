/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2023-02-10 11:27:11
 * @Description: 
 */
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
import uniApi from './libs/function/uni.js'

// 防抖方法
import debounce from './libs/function/debounce.js'
// 节流方法
import throttle from './libs/function/throttle.js'

// 路由方法
import route from './libs/function/route'

import color from './theme.scss'

import request from './libs/request'

const $c = {
  ...index,
  config,
  is,
  props,
  color,
  ...uniApi,
  debounce,
  throttle,

  route,
  request
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