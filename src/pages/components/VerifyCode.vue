<!--
 * @Author: Wanko
 * @Date: 2024-03-21 15:27:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-21 16:01:49
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <c-verify-code
      :seconds="seconds"
      @end="end"
      @start="start"
      ref="cCode"
      @change="codeChange"
    ></c-verify-code>
    <c-button @click="getCode">{{ tips }}</c-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tips: '',
      seconds: 10
    }
  },
  methods: {
    codeChange(text) {
      this.tips = text
    },
    getCode() {
      if (this.$refs.cCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        setTimeout(() => {
          uni.hideLoading()
          // 这里此提示会被this.start()方法中的提示覆盖
          this.$c.toast('验证码已发送')
          // 通知验证码组件内部开始倒计时
          this.$refs.cCode.start()
        }, 2000)
      } else {
        this.$c.toast('倒计时结束后再发送')
      }
    },
    end() {
      this.$c.toast('倒计时结束')
    },
    start() {
      this.$c.toast('倒计时开始')
    }
  }
}
</script>
