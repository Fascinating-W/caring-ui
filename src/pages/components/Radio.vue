<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-radio-group v-model="value" @change="radioGroupChange">
        <c-radio
          @change="radioChange"
          v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          :disabled="item.disabled"
        >
          {{ item.name }}
        </c-radio>
      </c-radio-group>
    </div>
    <c-section>基本使用</c-section>
    <div class="p">
      <c-radio-group v-model="value1" >
        <c-radio
        >
        </c-radio>
      </c-radio-group>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value1: 1,
      list: [
        {
          name: 'apple',
          disabled: true
        },
        {
          name: 'banner',
          disabled: false
        },
        {
          name: 'orange',
          disabled: false
        }
      ],
      // c-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
      value: 'orange'
    }
  },
  methods: {
    // 选中某个单选框时，由radio时触发
    radioChange(e) {
      console.log(e)
    },
    // 选中任一radio时，由radio-group触发
    radioGroupChange(e) {
      console.log(e)
    }
  }
}
</script>
