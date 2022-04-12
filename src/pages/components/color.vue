<template>
  <div class="padding">
    <div v-for="(i, index) in colors" :key="index">
      <u-section :title="i.title" :right="false" />
      <div class="flex-center p-y-10">
        <div class="flex-1 p-10 " v-for="(j,index2) in i.item" :key="index2"
        :style="{background: j.color}"
        @click="handleClick(j)"
        >
          <div>{{j.color}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        {
          title: '主色调',
          item: [
            {
              name: '$c.color.primary',
              color: uni.$c.color.primary
            },
            {
              name: '$c.color.primaryDark',
              color: uni.$c.color.primaryDark
            },
            {
              name: '$c.color.primaryDisabled',
              color: uni.$c.color.primaryDisabled
            },
            {
              name: '$c.color.primaryLight',
              color: uni.$c.color.primaryLight
            }
          ]
        },
        {
          title: 'Error',
          item: [
            {
              name: '$c.color.error',
              color: uni.$c.color.error
            },
            {
              name: '$c.color.errorDark',
              color: uni.$c.color.errorDark
            },
            {
              name: '$c.color.errorDisabled',
              color: uni.$c.color.errorDisabled
            },
            {
              name: '$c.color.errorLight',
              color: uni.$c.color.errorLight
            }
          ]
        },
        {
          title: 'warning',
          item: [
            {
              name: '$c.color.warning',
              color: uni.$c.color.warning
            },
            {
              name: '$c.color.warningDark',
              color: uni.$c.color.warningDark
            },
            {
              name: '$c.color.warningDisabled',
              color: uni.$c.color.warningDisabled
            },
            {
              name: '$c.color.primaryLight',
              color: uni.$c.color.primaryLight
            }
          ]
        },
        {
          title: 'Info',
          item: [
            {
              name: '$c.color.info',
              color: uni.$c.color.info
            },
            {
              name: '$c.color.infoDark',
              color: uni.$c.color.infoDark
            },
            {
              name: '$c.color.infoDisabled',
              color: uni.$c.color.infoDisabled
            },
            {
              name: '$c.color.infoLight',
              color: uni.$c.color.infoLight
            }
          ]
        },
        {
          title: 'Info',
          item: [
            {
              name: '$c.color.info',
              color: uni.$c.color.info
            },
            {
              name: '$c.color.infoDark',
              color: uni.$c.color.infoDark
            },
            {
              name: '$c.color.infoDisabled',
              color: uni.$c.color.infoDisabled
            },
            {
              name: '$c.color.infoLight',
              color: uni.$c.color.infoLight
            }
          ]
        },
        {
          title: 'success',
          item: [
            {
              name: '$c.color.success',
              color: uni.$c.color.success
            },
            {
              name: '$c.color.successDark',
              color: uni.$c.color.successDark
            },
            {
              name: '$c.color.successDisabled',
              color: uni.$c.color.successDisabled
            },
            {
              name: '$c.color.successLight',
              color: uni.$c.color.successLight
            }
          ]
        },
        {
          title: '文字颜色',
          item: [
            {
              name: '$c.color.main',
              color: uni.$c.color.main
            },
            {
              name: '$c.color.content',
              color: uni.$c.color.content
            },
            {
              name: '$c.color.tips',
              color: uni.$c.color.tips
            },
            {
              name: '$c.color.light',
              color: uni.$c.color.light
            }
          ]
        },
        {
          title: '边框',
          item: [
            {
              name: '$c.color.border',
              color: uni.$c.color.border
            }
          ]
        },
        {
          title: '背景色',
          item: [
            {
              name: '$c.color.bg',
              color: uni.$c.color.bg
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick(item) {
      console.log(item.color)
      this.$c.showModal({
        title: item.color,
        content: item.name,
        confirmColor: item.color,
      }).catch(() => {
        console.log('cancel')
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>