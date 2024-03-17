<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <c-time-line borderColor="red">
        <c-time-line-item
          v-for="(i, idx) in list"
          :key="idx"
          :nodeTop="i.icon ? 2 : 0"
        >
          <div slot="node">
            <view
              class="w-20 h-20 flex-cc rounded-full"
              style="background: #19be6b"
              v-if="i.icon"
            >
              <c-icon :name="i.icon" color="#fff"></c-icon>
            </view>
            <view class="w-8 h-8 rounded-full bg-ccc" v-else> </view>
          </div>

          <div slot="content">
            <view>
              <view class="text-333 font-medium text-16">{{ i.title }}</view>
              <view class="text-999 text-14 mb-3">{{ i.content }}</view>
              <view class="text-ccc text-13">{{ i.time }}</view>
            </view>
          </div>
        </c-time-line-item>
      </c-time-line>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          icon: 'pushpin-fill',
          title: '待取件',
          content:
            '[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。',
          time: '2019-05-08 12:12'
        },
        {
          title: '',
          content:
            '【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。',
          time: '2019-12-06 22:30'
        }
      ]
    }
  }
}
</script>
