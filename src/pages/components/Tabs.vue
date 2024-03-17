<!--
 * @Author: Wanko
 * @Date: 2024-03-15 09:33:14
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-15 11:06:45
 * @Description: 
-->

<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-tabs :list="list" :current="current" @change="change"></c-tabs>
    </div>
    <c-section>贴左展示</c-section>
    <div class="p">
      <c-tabs :list="list" :current="current" @change="change" scroll></c-tabs>
    </div>

    <c-section>允许滚动</c-section>
    <div class="p">
      <c-tabs :list="list1" :current="current" @change="change" scroll></c-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        },
      ],
      list1: [
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        },
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        },
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        }
      ],
      current: 0
    }
  },
  methods: {
    change(index) {
      this.current = index
    }
  }
}
</script>
