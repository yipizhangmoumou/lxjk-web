module.exports = {
  lintOnSave: 'error',
  assetsDir: 'assets',
  productionSourceMap: false,
  configureWebpack: {
    devServer: {
      port: 8088,
      open: false, // 启动后是否自动打开浏览器
      proxy: {
        '/api': {
          target: 'https://www.risesin.com/api',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
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
