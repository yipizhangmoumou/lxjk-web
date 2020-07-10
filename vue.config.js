module.exports = {
    devServer: {
        port: 8080,
        open: true,
        overlay:{
            errors: true,
            wranings: true
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