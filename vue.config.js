module.exports = {
  lintOnSave: 'error',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      port: 8088,
      open: false, // 启动后是否自动打开浏览器
      proxy: {
        'api': {
          target: 'http://192.168.50.250:8011',
          secure: false,
          changeOrigin: true
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        './src/assets/style/var.less'
      ]
    }
  }
}
