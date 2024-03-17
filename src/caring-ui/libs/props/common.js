/*
 * @Author: Wanko
 * @Date: 2024-02-04 10:48:18
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 14:16:36
 * @Description: 公共props
 */

export const value = {
  type: Boolean,
  default: false
}
export const zIndex = {
  type: [Number, String],
  default: ''
}
export const customStyle = {
  type: Object,
  default() {
    return {}
  }
}
export const customClass = {
  type: String,
  default: ''
}
export const duration = {
  type: [Number, String],
  default: 300
}

export const maskClickAble = {
  type: Boolean,
  default: true
}

export const safeAreaInsetBottom = {
  type: Boolean,
  default: false
}

export const zoom = {
  type: Boolean,
  default: true
}
export const rounded = {
  type: [String, Number],
  default: 8
}
