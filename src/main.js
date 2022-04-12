import Vue from 'vue'
import App from './App'
import caringUi from "./caring-ui" //开发使用
import uView from "uview-ui"

Vue.use(uView).use(caringUi)

import color from './uni.scss'
uni.$c.color = color

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
