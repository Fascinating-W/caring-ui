<template>
  <view
    class="c-progress"
    :style="{
      borderRadius: round ? '100px' : 0,
      height: height + 'px',
      backgroundColor: inactiveColor
    }"
  >
    <view
      :class="[
        type ? `c-type-${type}-bg` : '',
        striped ? 'c-striped' : '',
        striped && stripedActive ? 'c-striped-active' : ''
      ]"
      class="c-active"
      :style="[progressStyle]"
    >
      <slot v-if="$slots.default || $slots.$default" />
      <block v-else-if="showPercent">
        {{ percent + '%' }}
      </block>
    </view>
  </view>
</template>

<script>
import { calcColor } from '../../libs/helper/utils.js'
export default {
  name: 'c-line-progress',
  props: {
    round: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: uni.$c.color.success
    },
    inactiveColor: {
      type: String,
      default: '#ececec'
    },
    percent: {
      type: Number,
      default: 0
    },
    showPercent: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String],
      default: 14
    },
    striped: {
      type: Boolean,
      default: false
    },
    stripedActive: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {}
  },
  computed: {
    progressStyle() {
      let style = {}
      style.width = this.percent + '%'
      style.backgroundColor = calcColor(this.activeColor)
      return style
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.c-progress {
  overflow: hidden;
  height: 15px;
  /* #ifndef APP-NVUE */
  display: inline-flex;
  /* #endif */
  align-items: center;
  width: 100%;
  border-radius: 100rpx;
}

.c-active {
  width: 0;
  height: 100%;
  align-items: center;
  display: flex;
  justify-items: flex-end;
  justify-content: space-around;
  font-size: 20rpx;
  color: #ffffff;
  transition: all 0.4s ease;
}

.c-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 39px 39px;
}

.c-striped-active {
  animation: progress-stripes 2s linear infinite;
}

@keyframes progress-stripes {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 39px 0;
  }
}
</style>
