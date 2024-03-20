<!--
 * @Author: Wanko
 * @Date: 2024-03-20 17:13:40
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-20 17:27:38
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-checkbox-group @change="checkboxGroupChange" >
        <c-checkbox
          @change="checkboxChange"
          v-model="item.checked"
          v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          >{{ item.name }}</c-checkbox
        >
      </c-checkbox-group>
      <c-button @click="checkedAll">全选</c-button>
    </div>
    <c-section>基本使用</c-section>
    <div class="p">
      <c-checkbox :value="true" round>一个选项</c-checkbox>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      check:false,
      list: [
        {
          name: 'apple',
          checked: false,
          disabled: false
        },
        {
          name: 'banner',
          checked: false,
          disabled: false
        },
        {
          name: 'orange',
          checked: false,
          disabled: false
        }
      ]
    }
  },
  methods: {
    // 选中某个复选框时，由checkbox时触发
    checkboxChange(e) {
      //console.log(e);
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange(e) {
      // console.log(e);
    },
    // 全选
    checkedAll() {
      this.list.map((val) => {
        val.checked = true
      })
    }
  }
}
</script>
