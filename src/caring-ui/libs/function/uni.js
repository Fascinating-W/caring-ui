/*
 * @Author: Wanko
 * @Date: 2022-04-06 10:43:39
 * @LastEditors: Wanko
 * @LastEditTime: 2022-11-21 17:00:13
 * @Description: 对uniAPI的二次封装
 */


function showModal (option = {}) {
  const { title = '提示', content = 'content内容', showCancel = true, cancelText = '取消', confirmText = '确定', confirmColor = uni.$c.color.primary } = option
  return new Promise((resolve, reject) => {
    // uni的showModal 默认形式为：title 和 content 为空字符串，同时展示取消和确定按钮
    uni.showModal({
      title,
      content,
      showCancel,
      cancelText,
      confirmText,
      confirmColor,
      success: res => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      },
    })
  })
}

function showLoading (title = '数据加载中') {
  uni.showLoading({
    title,
    mask: true
  })
}

function hideLoading () {
  uni.hideLoading()
}

/**
 * @Description: 设置navBar的标题
 * @param {*} title
 * @return {*}
 */
function setTitle (title) {
  uni.setNavigationBarTitle({
    title
  })
}

/**
 * @Description: 粘贴板
 * @param {*} data
 * @return {*}
 */
function setClipboardData (data) {
  return new Promise((resolve) => {
    uni.setClipboardData({
      data,
      success: () => {
        resolve()
      }
    })
  })
}

/**
 * @Description: toast轻提示
 * @param {*} title
 * @param {*} duration
 * @return {*}
 */
function toast (title = '未知错误信息', duration = 1000) {
  if (title.length <= 20) {
    uni.showToast({
      title: String(title),
      icon: 'none',
      mask: true,
      duration
    })
  } else {
    uni.showModal({
      content: title,
      showCancel: false
    })
  }
}

export default {
  toast,
  showModal,
  showLoading,
  hideLoading,
  setTitle,
  setClipboardData,
}