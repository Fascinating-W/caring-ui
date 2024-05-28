/*
 * @Author: Wanko
 * @Date: 2022-03-25 21:23:51
 * @LastEditors: Wanko
 * @LastEditTime: 2024-05-08 15:45:57
 * @Description: 
 */
const path = require('path')
module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('postcss-import')({
      resolve(id, basedir, importOptions) {

        const rootDir = process.env.UNI_INPUT_DIR

        console.log(rootDir, 'rootDir', id)

        // 如果导入的文件在 docs 文件夹中，则不处理
        if (id.startsWith(rootDir + '/docs/')) {
          return false
        }
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    }),
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5'
    }),
    require('@dcloudio/vue-cli-plugin-uni/packages/postcss')
  ]
}
