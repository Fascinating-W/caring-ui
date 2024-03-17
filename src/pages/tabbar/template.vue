<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 18:22:43
 * @Description: 
-->
<template>
  <view class="bg-f8 p">
    <c-collapse
      :headStyle="{
        padding: '20px',
        color: '#666',
        fontSize: '15px'
      }"
      :itemStyle="{
        background: '#fff',
        'margin-bottom': '10px',
        borderRadius: '12px',
        overflow: 'hidden'
      }"
    >
      <c-collapse-item
        :title="i.groupName"
        v-for="(i, index) in list"
        :key="index"
      >
        <div class="p">
          <c-cell-group>
            <c-cell-item
              :title="j.title"
              :key="jdx"
              v-for="(j, jdx) in i.list"
              @click="$c.route(j.path)"
              arrow
            />
          </c-cell-group>
        </div>
      </c-collapse-item>
    </c-collapse>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          groupName: '常见布局',
          list: [
            { title: '顶部背景块', path: '/pages/template/one' },
            { title: '底部按钮', path: '/pages/template/two' },
            { title: '头部固定下部区域滚动', path: '/pages/template/three' }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
</style>
