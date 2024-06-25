/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-25 16:00:18
 * @Description:
 */
import route from 'caring-route'
import utils from 'caring-utils'
import uniApi from 'caring-uni'
import request from 'caring-request'
import test from 'caring-test'
import time from 'caring-time'

import index from './libs/function/index.js'
import config from './libs/config'
// 全局mixin
import mixin from './libs/mixin'
import mpShare from './libs/mixin/mpShare.js'
// 引入主题色
import color from './theme.scss'
import zIndex from './libs/config/zIndex.js'
import $parent from './libs/function/$parent.js'
import log from './libs/util/log.js'

// 引入主题样式
import './index.scss'

const $c = {
  ...index,
  zIndex,
  color,
  config,
  $parent,
  log
}

const baseConfig = {
  mpShare: true,
  utils: true,
  uniApi: true,
  request: true,
  test: true,
  route: true,
  time: true
}



log.primary('version:1.0.0', '欢迎使用caring-ui')
// log.img(
//   'https://fastly.jsdelivr.net/gh/Fascinating-W/picture@master/image/1717119824554caringui.png',
//   0.5
// )
// $u挂载到uni对象上
// uni && (uni.$c = $c)
uni.$c = $c
const install = (Vue, config) => {
  Vue.mixin(mixin)
  const conf = Object.assign(baseConfig, config)

  if (conf.mpShare) {
    Vue.mixin(mpShare)
  }

  if (conf.utils) {
    Object.assign($c, {
      ...utils
    })
  }

  if (conf.uniApi) {
    Object.assign($c, {
      ...uniApi
    })
  }

  if (conf.request) {
    Object.assign($c, {
      request
    })
  }

  if (conf.test) {
    Object.assign($c, {
      ...test
    })
  }
  if (conf.time) {
    Object.assign($c, {
      ...time
    })
  }

  if (conf.route) {
    Object.assign($c, {
      route
    })
  }
  Vue.prototype.$c = $c
}

export default {
  install
}
