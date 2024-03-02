<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-02 17:41:53
 * @Description: 
-->
<template>
  <div class="h-screen bg-f8">
    <button @click="modal">showModal</button>
    <div class="p m bg-red-light rounded c-primary">{{ $c.color.primary }}</div>
    <!-- <div
      v-for="(i, index) in list"
      :key="index"
      class="m p bg-white justify-between rounded"
      @click="$c.route(i.path)"
    >
      <span>{{ i.title }}</span>
      <c-icon name="arrow-right" class="c-primary" color="primary"></c-icon>
    </div> -->
    <c-cell-group title="标题">
      <c-cell-item
        :title="i.title"
        :key="index"
        v-for="(i, index) in list"
        @click="$c.route(i.path)"
        arrow
      />
    </c-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          path: '/pages/components/color',
          icon: 'line',
          title: 'Color 色彩'
        },
        {
          path: '/pages/components/icon',
          title: 'Icon 图标'
        },
         {
          path: '/pages/components/image',
          title: 'Image 图片'
        },
        {
          path: '/pages/components/cell',
          icon: 'cell',
          title: 'Cell 单元格'
        },
        {
          path: '/pages/components/button',
          icon: 'button',
          title: 'Button 按钮'
        },
        {
          path: '/pages/components/line',
          title: 'line'
        },
        {
          path: '/pages/components/gap',
          title: 'Gap 间隔'
        },
        {
          path: '/pages/components/loading',
          title: 'loading'
        },
        {
          path: '/pages/components/empty',
          title: 'empty'
        },
       
        {
          path: '/pages/components/section',
          title: 'Section 章节'
        },
        {
          path: '/pages/components/popup',
          title: 'popup'
        },
        {
          path: '/pages/components/mask',
          title: 'mask'
        },
        {
          path: '/pages/components/backTop',
          title: 'backTop-返回顶部'
        }
      ]
    }
  },
  onLoad() {
    console.log(this.$c.color)
  },
  methods: {
    clickImg() {
      console.log('1111')
    },
    modal() {
      this.$c.showModal('111111')
    }
  }
}
</script>

<style lang="scss" scoped></style>
