/*
 * @Author: Wanko
 * @Date: 2024-03-15 13:54:12
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-15 13:56:30
 * @Description: 
 */
module.exports = {
  onLoad() {
    this.$c.mpShare = {
      title: '', // 默认为小程序名称
      path: '', // 默认为当前页面路径
      imageUrl: '' // 默认为当前页面的截图
    }
  },
  onShareAppMessage() {
    return this.$c.mpShare
  },
  // #ifdef MP-WEIXIN
  onShareTimeline() {
    return this.$c.mpShare
  }
  // #endif
}
