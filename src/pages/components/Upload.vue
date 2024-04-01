<!--
 * @Author: Wanko
 * @Date: 2024-03-21 17:47:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-22 17:18:58
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>上传</c-section>
    <div class="p">
      <c-upload :action="action" :fileList="fileList"/>
      <c-button @click="onClk">fileList</c-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: 'https://www.wanko.top/api/static/upload',
      fileList: [],
      fileList1:[]
    }
  },
  methods: {
    onClk() {
      console.log(this.fileList);
    },
    onClk1() {
      console.log(this.fileList1);
    }
  },
}
</script>

<style lang="scss" scoped></style>
