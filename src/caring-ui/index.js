/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2024-01-15 18:22:30
 * @Description: 
 */
import route from 'caring-route'
import utils from 'caring-utils'
import uniApi from 'caring-uni'
import request from 'caring-request'


import index from './libs/function/index.js'
import config from './libs/config'
// 全局mixin
import mixin from './libs/mixin'
// 引入主题色
import color from './theme.scss'

// 引入主题样式
import './index.scss'

const $c = {
  ...index,
  ...utils,
  color,
  config,
  ...uniApi,
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