module.exports = {
    devServer: {
        port: 8080,
        open: true,
        overlay:{
            errors: true,
            wranings: true
        },
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
    },
    configureWebpack: {
        resolve: {
            alias: {
                src: "@",
                assets: "@/assets",
                components: "@/components",
                views: "@/views",
                utils: "@/utils",
                api: "@/api"
            }
        }
    }
}
