<template>
  <view class="">
    <view
      class="c-steps"
      :class="customClass"
      :style="[
        {
          flexDirection: !col ? 'row' : 'column'
        },
        customStyle
      ]"
    >
      <view
        class="c-steps__item"
        :class="[`c-steps__item--${!col ? 'row' : 'column'}`]"
        v-for="(item, index) in list"
        :key="index"
      >
        <view
          class="c-steps__item__num"
          v-if="!dot"
          :style="{
            backgroundColor: current < index ? 'transparent' : activeColor,
            borderColor: current < index ? inactiveColor : activeColor
          }"
        >
          <text
            v-if="current < index"
            :style="{
              color: current < index ? inactiveColor : activeColor
            }"
          >
            {{ index + 1 }}
          </text>
          <c-icon v-else size="11" color="#ffffff" :name="icon"></c-icon>
        </view>
        <view
          class="c-steps__item__dot"
          v-if="dot"
          :style="{
            backgroundColor: index <= current ? activeColor : inactiveColor
          }"
        ></view>
        <text
          class="line-1"
          :style="{
            color: index <= current ? activeColor : inactiveColor
          }"
          :class="['c-steps__item__text--' + !col ? 'row' : 'column']"
        >
          {{ item.name }}
        </text>
        <view
          class="c-steps__item__line"
          :class="[`c-steps__item__line--${dot ? 'dot' : 'number'}`]"
          v-if="index < list.length - 1"
        >
          <c-line
            :col="col"
            length="100%"
            :hair-line="false"
            :color="inactiveColor"
          ></c-line>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { customStyle, customClass } from '../../libs/props/common.js'
export default {
  name: 'c-steps',
  props: {
    customStyle,
    customClass,
    dot: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    current: {
      type: [Number, String],
      default: 0
    },
    activeColor: {
      type: String,
      default: uni.$c.color.primary
    },
    inactiveColor: {
      type: String,
      default: uni.$c.color.tips
    },
    icon: {
      type: String,
      default: 'checkmark'
    },
    col: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$c-steps-item-number-width: 44rpx;
$c-steps-item-dot-width: 20rpx;

.c-steps {
  display: flex;
  font-size: 26rpx;
  color: #8799a3;
  .c-steps__item {
    flex: 1;
    text-align: center;
    position: relative;
    min-width: 100rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &--row {
      display: flex;
      flex-direction: column;

      .c-steps__item__line {
        position: absolute;
        z-index: 0;
        left: 75%;
        width: 50%;

        &--dot {
          top: calc(#{$c-steps-item-dot-width} / 2);
        }

        &--number {
          top: calc(#{$c-steps-item-number-width} / 2);
        }
      }
    }

    &--column {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      min-height: 120rpx;

      .c-steps__item__line {
        position: absolute;
        z-index: 0;
        height: 50%;
        top: 75%;

        &--dot {
          left: calc(#{$c-steps-item-dot-width} / 2);
        }

        &--number {
          left: calc(#{$c-steps-item-number-width} / 2);
        }
      }
    }

    &__num {
      display: flex;
      align-items: center;
      justify-content: center;
      width: $c-steps-item-number-width;
      height: $c-steps-item-number-width;
      border: 1px solid #8799a3;
      border-radius: 50%;
      overflow: hidden;
    }

    &__dot {
      width: $c-steps-item-dot-width;
      height: $c-steps-item-dot-width;
      display: flex;
      border-radius: 50%;
    }

    &__text--row {
      margin-top: 14rpx;
    }

    &__text--column {
      margin-left: 14rpx;
    }
  }
}
</style>
