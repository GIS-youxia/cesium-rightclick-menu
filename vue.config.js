const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        devtool: 'source-map'
    },
// 强制内联CSS
    css: {
        extract: false
    },
    lintOnSave: false,
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/cesium-rightclick-menu')//这里根据你文件夹名称自定义，每个人不一样
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    },
    publicPath: './'
})
