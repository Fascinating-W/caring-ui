<!--
 * @Author: Wanko
 * @Date: 2024-03-18 13:53:33
 * @LastEditors: Wanko
 * @LastEditTime: 2024-03-19 18:16:57
 * @Description: 
-->
<template>
  <view class="p">
    <c-section> 基本使用 </c-section>
    <div class="p">
      <c-button @click="show = true">打开单列</c-button>
      <c-select
        v-model="show"
        :list="list"
				:showCancel="false"
        @confirm="confirm"
        @change="change"
        title="c-select"
        current="1"
      ></c-select>
    </div>
    <c-section> 多列 </c-section>
    <div class="p">
      <c-button @click="show1 = true">打开多列</c-button>

      <c-select
        v-model="show1"
        :list="list1"
        @confirm="confirm1"
        title="c-select"
        :current="[1, 1, 0]"
      ></c-select>
    </div>
    <c-section> 多列联动 </c-section>
    <div class="p">
      <c-button @click="show2 = true">打开多列</c-button>
      <c-select
        v-model="show2"
        :list="list2"
        @confirm="confirm2"
        title="c-select"
				:current="[1, 0, 0]"
      ></c-select>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      list: [
        {
          value: '1',
          label: '江'
        },
        {
          value: '2',
          label: '湖'
        }
      ],
      show1: false,
      list1: [
        [
          {
            value: '1',
            label: '江'
          },
          {
            value: '2',
            label: '湖'
          }
        ],
        [
          {
            value: '3',
            label: '夜'
          },
          {
            value: '4',
            label: '雨'
          }
        ],
        [
          {
            value: '5',
            label: '十'
          },
          {
            value: '6',
            label: '年'
          },
          {
            value: '7',
            label: '灯'
          }
        ]
      ],
      show2: false,
      list2: [
        {
          value: 1,
          label: '中国',
          children: [
            {
              value: 2,
              label: '广东',
              children: [
                {
                  value: 3,
                  label: '深圳'
                },
                {
                  value: 4,
                  label: '广州'
                }
              ]
            },
            {
              value: 5,
              label: '广西',
              children: [
                {
                  value: 6,
                  label: '南宁'
                },
                {
                  value: 7,
                  label: '桂林'
                }
              ]
            }
          ]
        },
        {
          value: 8,
          label: '美国',
          children: [
            {
              value: 9,
              label: '纽约',
              children: [
                {
                  value: 10,
                  label: '皇后街区'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
    confirm(e) {
      console.log(e)
    },
    confirm1(e) {
      console.log(e)
    },
    confirm2(e) {
      console.log(e)
    },
    change(e) {
      console.log(e)
    }
  }
}
</script>
