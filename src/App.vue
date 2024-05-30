<!--
 * @Author: Wanko
 * @Date: 2022-03-25 21:23:51
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-29 17:36:37
 * @Description: 
-->
<script>
import {isEmail, isMobile} from 'caring-test'
import utils from 'caring-utils'
export default {
  onLaunch() {
    console.log('App Launch')
    // console.log(uni.$c)
  },
  onShow() {
    console.log('App Show')
    const valueArray = [1, 2,1,1,1, 2, 3, 4, 4, 5,6,7]

    
    console.log(this.$c.unique(valueArray))
     // true
    console.log(isEmail('123@qq.com'))
    console.log(isMobile('138123456781111'))
  },
  onHide() {
    console.log('App Hide')
  }
}
</script>
<style lang="scss">
/*每个页面公共css */
// @import './caring-ui/index.scss';
@import "./uview-ui/index.scss";

</style>
