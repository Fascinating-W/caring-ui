<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2024-01-10 11:32:37
 * @Description: 
-->
<template>
  <div class="h-screen bg-f8">
    <button
      @click="modal"
    >
      showModal
    </button>
    <div class="p m bg-red-light rounded c-primary">{{ $c.color.primary }}</div>
    <div
      v-for="(i, index) in list"
      :key="index"
      class="m p bg-white flex justify-between rounded clearfix"
      @click="$c.route(i.path)"
    >
      <span>{{ i.title }}</span>
      <c-icon name="arrow-right" class="c-primary" color="primary"></c-icon>
    </div>
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
          title: '颜色'
        },
        {
          path: '/pages/components/icon',
          title: 'icon'
        },
        {
          path: '/pages/components/line',
          title: 'line'
        },
        {
          path: '/pages/components/gap',
          title: 'gap'
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
          path: '/pages/components/image',
          title: 'image'
        },
        {
          path: '/pages/components/section',
          title: 'section'
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
