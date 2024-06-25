/*
 * @Author: Wanko
 * @Date: 2022-03-25 21:23:51
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-06 17:17:50
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import caringUi from "./caring-ui" //开发使用
import uView from "uview-ui"
//  自定义主题色覆盖$c.color默认主题色
import color from './uni.scss'
uni.$c.color = color

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})


Vue.use(uView).use(caringUi, {
  // 配置项 
  utils: true,
})

app.$mount()
