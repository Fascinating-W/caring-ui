<!--
 * @Author: Wanko
 * @Date: 2024-03-14 17:24:41
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-14 18:00:19
 * @Description: 
-->
<template>
	<view class="c-time-axis" :style="[borderStyle]">
		<slot />
	</view>
</template>

<script>
	export default {
		name: "c-time-line",
		data() {
			return {

			}
		},
    props: {
      borderColor: {
        type: String,
        default: "#ddd"
      }
    },
    computed: {
      borderStyle(){
        return {
          '--border-color': this.borderColor
        }
      }
    }
	}
</script>

<style scoped>
	.c-time-axis {
		padding-left: 40rpx;
		position: relative;
	}

	.c-time-axis::before {
		content: " ";
		position: absolute;
		left: 0;
		top: 12rpx;
		width: 1px;
		bottom: 0;
		border-left: 1px solid var(--border-color);
		transform-origin: 0 0;
		transform: scaleX(0.5);
	}
 
</style>
