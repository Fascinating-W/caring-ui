<!--
 * @Author: Wanko
 * @Date: 2024-03-07 15:29:32
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-16 13:53:15
 * @Description: 
-->
<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-subsection :list="list" :current="0"></c-subsection>
    </div>
    <c-section>设置圆角值</c-section>
    <div class="p">
      <c-subsection :list="list" :current="0" rounded="24"></c-subsection>
    </div>
    <c-section>设置subsection</c-section>
    <div class="p">
      <c-subsection :list="list" :current="0" subsection></c-subsection>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '待发货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价'
        }
      ],
      current: 1
    }
  }
}
</script>
