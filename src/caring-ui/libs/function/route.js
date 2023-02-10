import {queryParams} from './index'
// 可携带参数的路由跳转方式
const PARAMS_ROUTE = ['navigateTo', 'redirectTo', 'reLaunch']

// 放在Route类里也可以
function dispatchNavigate(config) {
  const { url, type = 'navigateTo', delta = 1, events } = config

  return new Promise((resolve, reject) => {
    uni[type]({
      url,
      delta,
      events,
      success: (e) => resolve(e),
      fail: (e) => reject(e)
    })
  })
}

class Route {
  handleParams(params = {}) {
    const obj = {}
    for (let key in params) {
      if (typeof params[key] === 'object') {
        obj[key] = encodeURIComponent(JSON.stringify(params[key]))
      }
      // 如果包含http链接进行编码操作
      if (typeof params[key] === 'string' && params[key].includes('http')) {
        params[key] = encodeURIComponent(params[key])
      }
    }
    return Object.assign(params, obj)
  }
  navigate(url, config) {
    if (typeof url === 'string') {
      // 如果url为字符串，则config为params, 即route(url, params)的形式
      if (!config) {
        config = {}
      }
      config.url = this.mixinParam(url, config)
    } else {
      config = url
      config.url = this.mixinParam(config.url, config.params)
    }
    return dispatchNavigate(config)
  }
  // 整合路由参数
  mixinParam(url, params) {
    url = url && this.addRootPath(url)

    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"

    let query = ''
    if (/.*\/.*\?.*=.*/.test(url)) {
      // object对象转为get类型的参数
      query = queryParams(this.handleParams(params), false) // 如果有url中有get参数，转换后无需带上"?"
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      return (url += '&' + query)
    } else {
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = queryParams(this.handleParams(params))
      return (url += query)
    }
  }

  to(url, params) {
    const config = {
      type: 'navigateTo',
      url,
      params
    }
    this._navigateMethod(config)
  }

  back(delta) {
    const config = {
      type: 'navigateBack',
      delta
    }
    this._navigateMethod(config)
  }

  tab(url) {
    const config = {
      type: 'switchTab',
      url
    }
    this._navigateMethod(config)
  }

  redirect(url, params) {
    const config = {
      type: 'redirectTo',
      url,
      params
    }
    this._navigateMethod(config)
  }

  launch(url, params) {
    const config = {
      type: 'reLaunch',
      url,
      params
    }
    this._navigateMethod(config)
  }
  _navigateMethod(config) {
    if (PARAMS_ROUTE.includes(config.type)) {
      config.url = this.mixinParam(config.url, config.params)
    } else {
      config.url = config.url && this.addRootPath(config.url)
    }
    return dispatchNavigate(config)
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url) {
    return url[0] === '/' ? url : `/${url}`
  }
}

/**
 * @Description: 创建route混合函数
 * @return {*}
 */
function createRoute() {
  const context = new Route()
  const instance = Route.prototype.navigate.bind(context)
  // 关键，将Route的实例context上的原型赋值给instance，从而让instance具备Route的原型方法，instance是一个混合函数，既可以作为函数调用，也可以调用类的方法
  Object.setPrototypeOf(instance, context)
  return instance
}

const route = createRoute()
export default route
