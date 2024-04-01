/*
 * @Author: Wanko
 * @Date: 2024-03-22 16:50:23
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-23 12:18:48
 * @Description:
 */
export default {
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  
  computed: {
    calcType() {
      if (this.primary) {
        return 'primary'
      } else if (this.success) {
        return 'success'
      } else if (this.warning) {
        return 'warning'
      } else if (this.error) {
        return 'error'
      } else if (this.info) {
        return 'info'
      } else {
        return this.type
      }
    }
  }
}
