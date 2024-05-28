/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-11 17:49:07
 * @Description:
 */
import route from 'caring-route'
import utils from 'caring-utils'
import uniApi from '../caring-uni'
import request from 'caring-request'
import index from './libs/function/index.js'
import config from './libs/config'
// 全局mixin
import mixin from './libs/mixin'
import mpShare from './libs/mixin/mpShare.js'
// 引入主题色
import color from './theme.scss'
import zIndex from './libs/config/zIndex.js'
import $parent from './libs/function/$parent.js'

// 引入主题样式
import './index.scss'

const $c = {
  zIndex,
  ...index,
  ...utils,
  color,
  config,
  ...uniApi,
  route,
  request,
  $parent
}

const baseConfig ={
  mpShare: true
}

// $u挂载到uni对象上
// uni && (uni.$c = $c)
uni.$c = $c
const install = (Vue, config) => {
  const c = Object.assign(baseConfig, config)
  if(c.mpShare) {
    Vue.mixin(mpShare)
  }
  Vue.mixin(mixin)
  Vue.prototype.$c = $c
}


export default {
  install
}
