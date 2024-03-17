<!--
 * @Author: Wanko
 * @Date: 2024-03-08 11:12:05
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 14:19:42
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-button @click="show = true" >打开ActionSheet</c-button>
      <c-action-sheet :list="list" v-model="show" :tips="tips"  @click="onClick"></c-action-sheet>
    </div>
    
    
  </div>
</template>

<script>
export default {
  methods: {
    onClick(e) {
      console.log(e);
    }
  },
  data() {
    return {
      tips: {
        text: '在水一方',
        color: '#909399',
        fontSize: 12
      },
      list: [
        {
          text: '点赞',
          color: uni.$c.color.primary,
          fontSize: 14,
          subText: '感谢您的点赞'
        },
        {
          text: '分享'
        },
        {
          text: '评论'
        }
      ],
      show: false
    }
  }
}
</script>

