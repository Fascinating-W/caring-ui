/*
 * @Author: Wanko
 * @Date: 2022-03-25 21:23:51
 * @LastEditors: Wanko
 * @LastEditTime: 2023-02-10 17:26:23
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import caringUi from "./caring-ui" //开发使用
import uView from "uview-ui"
import requestInterceptor from './utils/request'



import color from './uni.scss'
uni.$c.color = color


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})

Vue.use(uView).use(caringUi).use(requestInterceptor, app)

app.$mount()
