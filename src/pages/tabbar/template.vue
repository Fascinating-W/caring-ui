<!--
 * @Author: Wanko
 * @Date: 2022-04-06 10:45:37
 * @LastEditors: Wanko
 * @LastEditTime: 2023-02-10 17:28:43
 * @Description: 
-->
<template>
  <view>
    <button @click="get">get请求</button>
    <button @click="get2">$c.request.get请求</button>
  </view>
</template>

<script>
export default {
  methods: {
    get() {
      this.$u.get('http://jsonplaceholder.typicode.com/todos/1').then((res) => {
        console.log(res)
      })
    },
    get2() {
      this.$c.request
        .get('TODO_1', {
          name: 'wanko'
        }, {
          header: {
            'custom-header': 'hello'
          },
          error: true,
          raw: true
        })
        .then((res) => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      // this.$c.request
      //   .get('http://jsonplaceholder.typicode.com/todos/2')
      //   .then((res) => {
      //     console.log(res)
      //   })
    },
    uniRequest(options) {
      return new Promise((resolve, reject) => {
        // options.success = (response) => {
        //   console.log(response, 'success')
        // }
        options.complete = (response) => {
          if (response.statusCode == 200) {
            resolve(response.data)
          }
        }
        uni.request(options)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
