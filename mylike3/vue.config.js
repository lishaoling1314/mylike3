var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
function addStyleResource (rule) {
  rule.use('style-resource')
  .loader('style-resources-loader')
  .options({
      patterns: [
          path.resolve(__dirname, 'src/assets/css/varibles.styl')
      ]
  })
}
module.exports = {
  devServer:{
      port:8081
  },
  runtimeCompiler: true,/**如果报You are using the runtime-only build....加上这句**/
  lintOnSave:false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    config.resolve.alias
      .set('@', resolve('src'))
      .set('css', resolve('src/assets/css'))
      .set('components', resolve('src/assets/components'))
      .set('images', resolve('src/assets/images'))
  }
}