<template>
  <div class="p">
    <c-section>基本使用</c-section>
    <div class="p">
      <!-- <c-number-box v-model="value" @change="valChange"></c-number-box> -->
      <u-number-box v-model="value" @change="valChange"></u-number-box>
      <!-- <c-number-box v-model="value1" @change="valChange" :positive-integer="false" :step="0.1"></c-number-box > -->
      <input 
		    v-model="value" @blur="onBlur"
		    type="digit" />
    </div>
    <div>
      <c-number-box v-model="value" @change="valChange"></c-number-box>
    </div>
  </div>
	
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
        value1: 0
			}
		},
		methods: {
			valChange(e) {
        console.log(e);
				console.log('当前值为: ' + e.value)
			}
		}
	}
</script>
