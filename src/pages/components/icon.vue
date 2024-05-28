<template>
  <view class="p">
    <c-section customClass="my">基本使用</c-section>
    <c-icon name="photo" />
    <c-section customClass="my">设置颜色color，支持主题色</c-section>
    <c-icon name="photo" color="primary" />
    <c-icon name="photo" color="red" />
    <c-section customClass="my">设置大小size</c-section>
    <c-icon name="photo" color="green" size="30" />
    <c-section customClass="my">自定义customClass</c-section>
    <c-icon name="photo" customClass="text-red text-h1" />
    <c-icon name="photo" customClass="text-green text-h2" />
    <c-section customClass="my">自定义customStyle</c-section>
    <c-icon
      name="photo"
      :customStyle="{ color: 'yellow', 'font-size': '20px' }"
    />
    <c-icon name="photo" :customStyle="{ color: 'pink', fontSize: '40px' }" />

    <c-section customClass="my">图片icon</c-section>
    <c-icon
      name="https://www.wanko.top/public/be77bd5a59a4330637ca90200.jpg"
      width="40"
      height="40"
    ></c-icon>
    <c-section customClass="my">设置decimal，支持主题色</c-section>
    <c-icon name="photo" decimal />
    <c-icon
      name="photo"
      color="red"
      label="文字"
      hover-class="bg-red text-blue"
      labelColor="red"
    />
    <c-section customClass="my">自定义图标</c-section>
    <div>
    <c-icon name="send" custom-prefix="custom-icon" />
    <c-icon name="copy" custom-prefix="custom-icon" />
    <c-icon name="like" custom-prefix="custom-icon" />
    <c-icon name="collection" custom-prefix="custom-icon" />
    <c-icon name="like-fill" custom-prefix="custom-icon" />
    <c-icon name="collection-fill" custom-prefix="custom-icon" />
    </div>
    <c-section customClass="my">所有图标</c-section>
    <view class="border-l border-t flex-wrap">
      <view
        v-for="(i, index) in iconList"
        class="h-100 flex-cc flex-col border-b border-r w-1-3"
        :key="index"
        ><c-icon :name="i.name"></c-icon>
        <text class="px">{{ i.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        {
          name: 'level'
        },
        {
          name: 'woman'
        },
        {
          name: 'man'
        },
        {
          name: 'arrow-left-double'
        },
        {
          name: 'arrow-right-double'
        },
        {
          name: 'chat'
        },
        {
          name: 'chat-fill'
        },
        {
          name: 'red-packet'
        },
        {
          name: 'red-packet-fill'
        },
        {
          name: 'order'
        },
        {
          name: 'checkbox-mark'
        },
        {
          name: 'arrow-up-fill'
        },
        {
          name: 'arrow-down-fill'
        },
        {
          name: 'backspace'
        },
        {
          name: 'photo'
        },
        {
          name: 'photo-fill'
        },
        {
          name: 'lock'
        },
        {
          name: 'lock-fill'
        },
        {
          name: 'lock-open'
        },
        {
          name: 'lock-opened-fill'
        },
        {
          name: 'hourglass'
        },
        {
          name: 'hourglass-half-fill'
        },
        {
          name: 'home'
        },
        {
          name: 'home-fill'
        },
        {
          name: 'fingerprint'
        },
        {
          name: 'cut'
        },
        {
          name: 'star'
        },
        {
          name: 'star-fill'
        },
        {
          name: 'share'
        },
        {
          name: 'share-fill'
        },
        {
          name: 'volume-up'
        },
        {
          name: 'volume-up-fill'
        },
        {
          name: 'volume-off'
        },
        {
          name: 'volume-off-fill'
        },
        {
          name: 'trash'
        },
        {
          name: 'trash-fill'
        },
        {
          name: 'rewind-right'
        },
        {
          name: 'rewind-right-fill'
        },
        {
          name: 'rewind-left'
        },
        {
          name: 'rewind-left-fill'
        },
        {
          name: 'shopping-cart'
        },
        {
          name: 'shopping-cart-fill'
        },
        {
          name: 'question'
        },
        {
          name: 'question-circle'
        },
        {
          name: 'question-circle-fill'
        },
        {
          name: 'plus'
        },
        {
          name: 'plus-circle'
        },
        {
          name: 'plus-circle-fill'
        },
        {
          name: 'tags'
        },
        {
          name: 'tags-fill'
        },
        {
          name: 'pause'
        },
        {
          name: 'pause-circle'
        },
        {
          name: 'pause-circle-fill'
        },
        {
          name: 'play-circle'
        },
        {
          name: 'play-circle-fill'
        },
        {
          name: 'map'
        },
        {
          name: 'map-fill'
        },
        {
          name: 'phone'
        },
        {
          name: 'phone-fill'
        },
        {
          name: 'list'
        },
        {
          name: 'list-dot'
        },
        {
          name: 'man-delete'
        },
        {
          name: 'man-add'
        },
        {
          name: 'man-add-fill'
        },
        {
          name: 'person-delete-fill'
        },
        {
          name: 'info'
        },
        {
          name: 'info-circle'
        },
        {
          name: 'info-circle-fill'
        },
        {
          name: 'minus'
        },
        {
          name: 'minus-circle'
        },
        {
          name: 'minus-circle-fill'
        },
        {
          name: 'mic'
        },
        {
          name: 'mic-off'
        },
        {
          name: 'grid'
        },
        {
          name: 'grid-fill'
        },
        {
          name: 'eye'
        },
        {
          name: 'eye-fill'
        },
        {
          name: 'eye-off'
        },
        {
          name: 'file-text'
        },
        {
          name: 'file-text-fill'
        },
        {
          name: 'edit-pen'
        },
        {
          name: 'edit-pen-fill'
        },
        {
          name: 'email'
        },
        {
          name: 'email-fill'
        },
        {
          name: 'download'
        },
        {
          name: 'checkmark'
        },
        {
          name: 'checkmark-circle'
        },
        {
          name: 'checkmark-circle-fill'
        },
        {
          name: 'clock'
        },
        {
          name: 'clock-fill'
        },
        {
          name: 'close'
        },
        {
          name: 'close-circle'
        },
        {
          name: 'close-circle-fill'
        },
        {
          name: 'calendar'
        },
        {
          name: 'calendar-fill'
        },
        {
          name: 'car'
        },
        {
          name: 'car-fill'
        },
        {
          name: 'bell'
        },
        {
          name: 'bell-fill'
        },
        {
          name: 'bookmark'
        },
        {
          name: 'bookmark-fill'
        },
        {
          name: 'attach'
        },
        {
          name: 'play-right'
        },
        {
          name: 'play-right-fill'
        },
        {
          name: 'play-left'
        },
        {
          name: 'play-left-fill'
        },
        {
          name: 'error'
        },
        {
          name: 'error-circle'
        },
        {
          name: 'error-circle-fill'
        },
        {
          name: 'wifi'
        },
        {
          name: 'wifi-off'
        },
        {
          name: 'skip-back-left'
        },
        {
          name: 'skip-forward-right'
        },
        {
          name: 'search'
        },
        {
          name: 'setting'
        },
        {
          name: 'setting-fill'
        },
        {
          name: 'volume'
        },
        {
          name: 'volume-fill'
        },
        {
          name: 'more-dot-fill'
        },
        {
          name: 'more-circle'
        },
        {
          name: 'more-circle-fill'
        },
        {
          name: 'bag'
        },
        {
          name: 'bag-fill'
        },
        {
          name: 'arrow-upward'
        },
        {
          name: 'arrow-downward'
        },
        {
          name: 'arrow-leftward'
        },
        {
          name: 'arrow-rightward'
        },
        {
          name: 'arrow-up'
        },
        {
          name: 'arrow-down'
        },
        {
          name: 'arrow-left'
        },
        {
          name: 'arrow-right'
        },
        {
          name: 'rmb'
        },
        {
          name: 'rmb-circle'
        },
        {
          name: 'rmb-circle-fill'
        },
        {
          name: 'thumb-up'
        },
        {
          name: 'thumb-up-fill'
        },
        {
          name: 'thumb-down'
        },
        {
          name: 'thumb-down-fill'
        },
        {
          name: 'coupon'
        },
        {
          name: 'coupon-fill'
        },
        {
          name: 'kefu-ermai'
        },
        {
          name: 'server-fill'
        },
        {
          name: 'server-man'
        },
        {
          name: 'scan'
        },
        {
          name: 'warning'
        },
        {
          name: 'warning-fill'
        },
        {
          name: 'google'
        },
        {
          name: 'google-circle-fill'
        },
        {
          name: 'chrome-circle-fill'
        },
        {
          name: 'ie'
        },
        {
          name: 'IE-circle-fill'
        },
        {
          name: 'github-circle-fill'
        },
        {
          name: 'android-fill'
        },
        {
          name: 'android-circle-fill'
        },
        {
          name: 'apple-fill'
        },
        {
          name: 'camera'
        },
        {
          name: 'camera-fill'
        },
        {
          name: 'pushpin'
        },
        {
          name: 'pushpin-fill'
        },
        {
          name: 'minus-square-fill'
        },
        {
          name: 'plus-square-fill'
        },
        {
          name: 'heart'
        },
        {
          name: 'heart-fill'
        },
        {
          name: 'reload'
        },
        {
          name: 'account'
        },
        {
          name: 'account-fill'
        },
        {
          name: 'minus-people-fill'
        },
        {
          name: 'plus-people-fill'
        },
        {
          name: 'integral'
        },
        {
          name: 'integral-fill'
        },
        {
          name: 'zhihu'
        },
        {
          name: 'zhihu-circle-fill'
        },
        {
          name: 'gift'
        },
        {
          name: 'gift-fill'
        },
        {
          name: 'zhifubao'
        },
        {
          name: 'zhifubao-circle-fill'
        },
        {
          name: 'weixin-fill'
        },
        {
          name: 'weixin-circle-fill'
        },
        {
          name: 'twitter'
        },
        {
          name: 'twitter-circle-fill'
        },
        {
          name: 'taobao'
        },
        {
          name: 'taobao-circle-fill'
        },
        {
          name: 'weibo'
        },
        {
          name: 'weibo-circle-fill'
        },
        {
          name: 'qq-fill'
        },
        {
          name: 'qq-circle-fill'
        },
        {
          name: 'moments'
        },
        {
          name: 'moments-circel-fill'
        },
        {
          name: 'qzone'
        },
        {
          name: 'qzone-circle-fill'
        },
        {
          name: 'facebook'
        },
        {
          name: 'facebook-circle-fill'
        },
        {
          name: 'baidu'
        },
        {
          name: 'baidu-circle-fill'
        },
        {
          name: 'zhuanfa'
        }
      ]
    }
  },
  methods: {
    onClick(i) {
      console.log(i)
    },
    clickIcon() {
      console.log('1111')
    }
  }
}
</script>

<style lang="scss" scoped>
.hover-style {
  background-color: red;
  // color: blue;
  // &:hover {
  // 	background: red;
  // }
}
</style>
