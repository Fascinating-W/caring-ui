<template>
  <div class="page bg-f8">
    <u-cell-group title="基础组件">
      <u-cell-item title="颜色" @click="$c.route('/pages/components/color')"></u-cell-item>
      <u-cell-item title="caring-loading" @click="$c.route('/pages/components/loading')"></u-cell-item>
      <u-cell-item title="caring-title" @click="$c.route('/pages/components/title')"></u-cell-item>
      <u-cell-item title="caring-nodata" @click="$c.route('/pages/components/nodata')"></u-cell-item>
    </u-cell-group>
    	<u-alert-tips type="warning" :title="title" show-icon></u-alert-tips>

      <view class="bg-white margin padding radius shadow hover">
        aaaa
      </view>
      <view class="bg-white margin padding radius shadow">
        aaaa
      </view>
    <view class="bg-white padding flex">
      <view class="bg-blue">元素1</view>
      <view class="bg-red">元素2</view>
      <view class="bg-purple">元素3</view>

    </view>

    
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '登高望远',
			description: '欲穷千里目，更上一层楼',
      list: [
        {
          groupName: '布局组件',
          list: [
            {
              path: '/pages/components/line',
              icon: 'line',
              title: 'Line 线条',
            }
          ]
        },
        {
          groupName: '导航组件',
          list: [
            {
              path: '/pages/components/section',
              icon: 'section',
              title: 'Section 查看更多',
            }
          ]
        }
      ]
    }
  },
  onLoad () {

  },
  methods: {
    modal() {
      this.$c.showModal()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>