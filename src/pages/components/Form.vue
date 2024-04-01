<template>
  <view class="p">
    <u-form :model="form" ref="uForm">
      <u-form-item label="姓名" prop="name">
        <u-input v-model="form.name" />
      </u-form-item>
      <u-form-item label="简介" prop="intro">
        <u-input v-model="form.intro" />
      </u-form-item>
    </u-form>
    <u-button @click="submit">提交</u-button>
    <c-gap> </c-gap>
    <!-- <c-form :model="form" ref="uForm">
      <c-form-item label="姓名" prop="name">
        <c-input v-model="form.name" />
      </c-form-item>
      <c-form-item label="简介" prop="intro">
        <c-input v-model="form.intro" />
      </c-form-item>
    </c-form>
    <c-button @click="submit">提交</c-button> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        intro: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            // 可以单个或者同时写两个触发验证方式
            trigger: ['change', 'blur']
          }
        ],
        intro: [
          {
            min: 5,
            message: '简介不能少于5个字',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          console.log('验证通过')
        } else {
          console.log('验证失败')
        }
      })
    }
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  }
}
</script>
