import {test} from 'caring-utils'


/**
 * 用于获取用户传递值的px值
 * 如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 */
const getPx = (value, unit = false) => {
  if (test.number(value)) {
    return unit ? `${value}px` : value
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(parseInt(value))}px` : uni.upx2px(parseInt(value))
  }
  return unit ? `${parseInt(value)}px` : parseInt(value)
}


// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent (name = undefined) {
  let parent = this.$parent
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent
    } else {
      return parent
    }
  }
  return false
}

/**
 * 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {Object | String} 需要转换的目标
 * @param {String} 转换的目的，object-转为对象，string-转为字符串
 */
function addStyle (customStyle, target = 'object') {
  // 字符串转字符串，对象转对象情形，直接返回
  if (test.empty(customStyle) || typeof (customStyle) === 'object' && target === 'object' || target === 'string' &&
    typeof (customStyle) === 'string') {
    return customStyle
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle)
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(';')
    const style = {}
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(':')
        style[trim(item[0])] = trim(item[1])
      }
    }
    return style
  }
  // 这里为对象转字符串形式
  let string = ''
  for (const i in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
    string += `${key}:${customStyle[i]};`
  }
  // 去除两端空格
  return trim(string)
}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
function addUnit (value = 'auto', unit = 'px') {
  value = String(value)
  // 用内置验证规则中的number判断是否为数值
  return test.number(value) ? `${value}${unit}` : value
}


// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength, fillString = ' ') {
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError(
        'fillString must be String'
      )
    }
    const str = this
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str)

    const fillLength = maxLength - str.length
    let times = Math.ceil(fillLength / fillString.length)
    while (times >>= 1) {
      fillString += fillString
      if (times === 1) {
        fillString += fillString
      }
    }
    return fillString.slice(0, fillLength) + str
  }
}



/**
 * 根据主题type值,获取对应的图标
 * @param String type 主题名称,primary|info|error|warning|success
 * @param String fill 是否使用fill填充实体的图标
 */
function type2icon (type = 'success', fill = false) {
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success'
  let iconName = ''
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle'
      break
    case 'info':
      iconName = 'info-circle'
      break
    case 'error':
      iconName = 'close-circle'
      break
    case 'warning':
      iconName = 'error-circle'
      break
    case 'success':
      iconName = 'checkmark-circle'
      break
    default:
      iconName = 'checkmark-circle'
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill'
  return iconName
}



// 获取duration值，如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
// 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
function getDuration (value, unit = true) {
  const valueNum = parseInt(value)
  if (unit) {
    if (/s$/.test(value)) return value
    return value > 30 ? `${value}ms` : `${value}s`
  }
  if (/ms$/.test(value)) return valueNum
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000
  return valueNum
}


// 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
function formValidate (instance, event) {
  const formItem = uni.$u.$parent.call(instance, 'u-form-item')
  const form = uni.$u.$parent.call(instance, 'u-form')
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, () => { }, event)
  }
}

export default {
  getPx,
  $parent,
  addStyle,
  addUnit,
  type2icon,
  getDuration,
  formValidate,
}
