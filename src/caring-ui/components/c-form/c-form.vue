<template>
  <view class="c-form"><slot /></view>
</template>

<script>
export default {
  name: 'c-form',
  props: {
    // 当前form的需要验证字段的集合
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    // 验证规则
    // rules: {
    // 	type: [Object, Function, Array],
    // 	default() {
    // 		return {};
    // 	}
    // },
    // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
    // border-bottom-下边框呈现红色，none-无提示
    errorType: {
      type: Array,
      default() {
        return ['message', 'toast']
      }
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: Boolean,
      default: true
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: 'left'
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: 45
    },
    // lable字体的对齐方式
    labelAlign: {
      type: String,
      default: 'left'
    },
    // lable的样式，对象形式
    labelStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  provide() {
    return {
      uForm: this
    }
  },
  data() {
    return {
      rules: {}
    }
  },
  created() {
    // 存储当前form下的所有c-form-item的实例
    // 不能定义在data中，否则微信小程序会造成循环引用而报错
    this.fields = []
  },
  methods: {
    setRules(rules) {
      this.rules = rules
    },
    // 清空所有c-form-item组件的内容，本质上是调用了c-form-item组件中的resetField()方法
    resetFields() {
      this.fields.map((field) => {
        field.resetField()
      })
    },
    // 校验全部数据
    validate(callback) {
      return new Promise((resolve) => {
        // 对所有的c-form-item进行校验
        let valid = true // 默认通过
        let count = 0 // 用于标记是否检查完毕
        let errorArr = [] // 存放错误信息
        this.fields.map((field) => {
          // 调用每一个c-form-item实例的validation的校验方法
          field.validation('', (error) => {
            // 如果任意一个c-form-item校验不通过，就意味着整个表单不通过
            if (error) {
              valid = false
              errorArr.push(error)
            }
            // 当历遍了所有的c-form-item时，调用promise的then方法
            if (++count === this.fields.length) {
              resolve(valid) // 进入promise的then方法
              // 判断是否设置了toast的提示方式，只提示最前面的表单域的第一个错误信息
              if (
                this.errorType.indexOf('none') === -1 &&
                this.errorType.indexOf('toast') >= 0 &&
                errorArr.length
              ) {
                this.$c.toast(errorArr[0])
              }
              // 调用回调方法
              if (typeof callback == 'function') callback(valid)
            }
          })
        })
      })
    }
  }
}
</script>
