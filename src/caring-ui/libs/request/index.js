/*
 * @Author: Wanko
 * @Date: 2023-02-10 11:23:47
 * @LastEditors: Wanko
 * @LastEditTime: 2023-02-10 17:01:43
 * @Description:
 */
import { deepMerge } from '../function/index'
import { url } from '../function/test'
export default new (class Request {
  // 设置全局默认配置
  setConfig(customConfig) {
    // 深度合并对象，否则会造成对象深层属性丢失
    this.config = deepMerge(this.config, customConfig)
  }

  constructor() {
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'GET',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',

      showLoading: true,
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      timer: null, // 定时器,
      raw: false, // 是否在拦截器中返回服务端的原始数据
      error: false
    }
  }

  request(options = {}) {
    console.log(options)
    console.log(this.interceptor)
    // 如果有请求拦截
    if (
      this.interceptor.request &&
      typeof this.interceptor.request === 'function'
    ) {
      let interceptorRequest = this.interceptor.request(options)
      if (interceptorRequest === false) {
        // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
        return new Promise(() => {})
      }
      // 将请求拦截后的配置赋值给实例的options属性上
      this.options = interceptorRequest
    }

    options.method = options.method || this.config.method
    options.url = options.url || ''
    options.header = Object.assign({}, this.config.header, options.header)

    options.dataType = options.dataType || this.config.dataType
    options.responseType = options.responseType || this.config.responseType
    // 手动处理错误
    options.error = options.error || this.config.error
    options.raw = options.raw || this.config.raw

    // 删除config
    Reflect.deleteProperty(options, 'config')
    console.log(options)

    return new Promise((resolve, reject) => {
      options.complete = (response) => {
        // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
        uni.hideLoading()
        // 清除定时器，如果loadingTime内请求回来了，就无需loading
        clearTimeout(this.config.timer)
        this.config.timer = null

        // 判断是否服务端返回成功
        if (response.statusCode === 200) {
          // 判断用户对拦截返回数据的要求，如果raw为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (options.raw) {
            // 判断是否存在响应拦截器
            if (
              this.interceptor.response &&
              typeof this.interceptor.response === 'function'
            ) {
              // resInterceptors: 拦截器处理过后的响应对象
              let resInterceptors = this.interceptor.response(response)
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$c.request的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors)
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response)
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response)
            }
          } else {
            // 不返回原始数据
            if (
              this.interceptor.response &&
              typeof this.interceptor.response === 'function'
            ) {
              let resInterceptors = this.interceptor.response(response.data)
              if (resInterceptors !== false) {
                resolve(resInterceptors)
              } else {
                reject(response.data)
              }
            } else {
              // 如果不是返回原始数据(raw=false)，且没有拦截器的情况下，返回纯数据给then回调
              resolve(response.data)
            }
          }
        } else {
          // 处理错误
          console.warn('服务端状态码不为200')
          // 是否需要手动处理
          if (options.error) {
            console.error('抛出错误由用户自定义处理')
            reject(response)
          } else {
            // 统一处理错误
            uni.showModal({
              title: response.errMsg,
              showCancel: false
            })
          }
        }
      }
      // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
      // TODO url中带/的情况需要进一步处理
      options.url = url(options.url)
        ? options.url
        : this.config.baseUrl +
          (options.url.indexOf('/') == 0 ? options.url : '/' + options.url)

      // 是否显示loading
      // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
      // 而没有清除前者的定时器，导致前者超时，一直显示loading
      if (this.config.showLoading && !this.config.timer) {
        this.config.timer = setTimeout(() => {
          uni.showLoading({
            title: this.config.loadingText,
            mask: this.config.loadingMask
          })
          this.config.timer = null
        }, this.config.loadingTime)
      }

      uni.request(options)
    })
  }
  // 拦截器
  interceptor = {
    // 请求前的拦截
    request: null,
    // 请求后的拦截
    response: null
  }

  get(url, data = {}, config = {}) {
    return this.request({
      url,
      data,
      ...config
    })
  }

  // post请求
  post = (url, data = {}, config = {}) => {
    return this.request({
      url,
      method: 'POST',
      ...config,
      data
    })
  }

  // put请求，不支持支付宝小程序(HX2.6.15)
  put = (url, data = {}, config = {}) => {
    return this.request({
      url,
      method: 'PUT',
      ...config,
      data
    })
  }

  // delete请求，不支持支付宝和头条小程序(HX2.6.15)
  delete = (url, data = {}, config = {}) => {
    return this.request({
      url,
      method: 'DELETE',
      ...config,
      data
    })
  }
})()
