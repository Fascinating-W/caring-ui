<!--
 * @Author: Wanko
 * @Date: 2024-03-16 12:56:39
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-16 13:17:42
 * @Description: 
-->
<template>
  <view class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-dropdown>
        <c-dropdown-item
          v-model="value1"
          title="距离"
          :options="options1"
        ></c-dropdown-item>
        <c-dropdown-item
          v-model="value2"
          title="温度"
          :options="options2"
        ></c-dropdown-item>
      </c-dropdown>
    </div>
    <c-section>带边框</c-section>
    <div class="p">
      <c-dropdown border>
        <c-dropdown-item
          v-model="value1"
          title="距离"
          :options="options1"
        ></c-dropdown-item>
      </c-dropdown>
    </div>
    <c-section>下拉框圆角</c-section>
    <div class="p">
      <c-dropdown border rounded="8">
        <c-dropdown-item
          v-model="value1"
          title="距离"
          :options="options1"
        ></c-dropdown-item>
      </c-dropdown>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value1: 1,
      value2: 2,
      options1: [
        {
          label: '默认排序',
          value: 1
        },
        {
          label: '距离优先',
          value: 2
        },
        {
          label: '价格优先',
          value: 3
        }
      ],
      options2: [
        {
          label: '去冰',
          value: 1
        },
        {
          label: '加冰',
          value: 2
        }
      ]
    }
  }
}
</script>
