<!--
 * @Author: Wanko
 * @Date: 2022-03-25 21:23:51
 * @LastEditors: Wanko
 * @LastEditTime: 2024-06-06 17:19:10
 * @Description: 
-->
<script>
import {isEmail, isMobile} from 'caring-test'
import utils from 'caring-utils'
import uniApi from 'caring-uni'
import {time, dayOfYear, now, today} from 'caring-time'
export default {
  onLaunch() {
    console.log(now())
    console.log(today())
    time.extend(dayOfYear)
    console.log('今年的第几天：', time().dayOfYear())
    console.log(uniApi)
    console.log(isEmail('233'))
    // console.log(this.$c.today())
  },
  onShow() {
  },
  onHide() {
  }
}
</script>
<style lang="scss">
/*每个页面公共css */
// @import './caring-ui/index.scss';
@import "./uview-ui/index.scss";

</style>
