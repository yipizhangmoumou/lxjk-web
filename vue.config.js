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
            },
            // '/remote': {
            //     target: 'https://p2ptest.creditdata.cn:10000/p2p/remote',
            //     secure: false,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/remote': ''
            //     }
            // }
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
