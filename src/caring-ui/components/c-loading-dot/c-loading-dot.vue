<!--
 * @Author: Wanko
 * @Date: 2024-03-19 14:14:26
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-19 15:35:14
 * @Description: 
-->
<template>
  <div
    class="flex-center inline-block"
    :style="[
      {
        fontSize: '14px',
        color: color
      }
    ]"
  >
    <slot>{{ text }}</slot>
    <div class="c-loading-dot" :style="animationDuration"></div>
  </div>
</template>

<script>
export default {
  name: 'c-loading-dot',
  props: {
    text: {
      type: String,
      default: '加载中'
    },
    color: {
      type: String,
      default: uni.$c.color.content
    },
    duration: {
      type: [String, Number],
      default: 3
    }
  },
  computed: {
    animationDuration() {
      const duration = +this.duration
      return {
        '--animation-duration': `${duration}s`
      }
    }
  }
}
</script>

<style scoped>
.c-loading-dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  vertical-align: -0.25em;
  overflow: hidden;
}
.c-loading-dot::before {
  display: block;
  content: '...\A..\A.';
  white-space: pre-wrap;
  animation: dot infinite step-start both;
  animation-duration: var(--animation-duration);
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
</style>
