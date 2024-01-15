/*
 * @Author: Wanko
 * @Date: 2023-02-10 17:21:59
 * @LastEditors: Wanko
 * @LastEditTime: 2023-05-17 14:00:51
 * @Description: 
 */
import {INTERFACE} from './interface'

const install = (Vue, vm) => {
  Vue.prototype.$c.request.setConfig({
    loadingText: '努力加载中~',
    // loadingTime: 100,
    baseUrl: 'http://jsonplaceholder.typicode.com'
    // raw: false
    // 设置自定义头部content-type
    // header: {
    //   不能出现中文
    // 	'custome-herder': 'xxx'
    // }
    // ......
  })
  // 请求拦截器
  Vue.prototype.$c.request.interceptor.request = (config) => {
    config.url = INTERFACE[config.url]
    // config.header.Token = 'xxxxxx'
    return config
  }

  // 响应拦截器
  Vue.prototype.$c.request.interceptor.response = (res) => {
    // res.message = '响应成功'
    return res
  }
}

export default {
  install
}