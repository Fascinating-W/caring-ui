/*
 * @Author: Wanko
 * @Date: 2022-12-03 17:42:51
 * @LastEditors: Wanko
 * @LastEditTime: 2022-12-03 17:45:52
 * @Description:
 */
import config from '../config'

export function calcColor(color) {
  let resultColor
  if (color && config.type.includes(color)) {
    resultColor = uni.$c.color[color]
  } else {
    resultColor = color
  }
  return resultColor
}
