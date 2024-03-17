<!--
 * @Author: Wanko
 * @Date: 2024-03-16 14:56:00
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-16 15:45:43
 * @Description: 
-->
<template>
  <div>
    <c-navbar :title="title" :backText="backText" :isBack="isBack"></c-navbar>
    <div class="p">
      <c-section>基本使用</c-section>
      <div class="my">
        <c-subsection :list="list" @change="change"></c-subsection>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '初始化'
        },
        {
          name: '设置标题'
        },
        {
          name: '不展示左侧'
        }
      ],
      title:'',
      backText:'',
      isBack:true
    }
  },
  methods: {
    change(idx) {
      console.log(idx);
      if(idx === 0){
        this.title = ''
        this.backText = ''
        this.isBack = true
      } else if(idx === 1) {
        this.backText = '返回'
        this.title='标题'
      } else if(idx === 2) {
        this.isBack = false
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
