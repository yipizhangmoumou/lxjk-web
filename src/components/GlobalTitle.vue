<template>
    <div id="GlobalTitle">
        <div class="title-container">
            <div class="title-text">
                <p>{{title}}</p>
            </div>
            <div class="">
                <el-button plain size="small" icon="el-icon-refresh" @click="reload">刷新</el-button>
                <el-button plain size="small" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import routes from "../router/routes"
    export default {
        name: "GlobalTitle",
        data() {
            return {
                title: ''
            }
        },
        methods: {
            reload() {
                window.location.reload();
            }
        },
        watch: {
            $route({ meta: { name } }) {
                this.title = name ? name : '';
            }
        },
        created() {
            const currentPath = window.location.hash.split('#')[1];
            if(currentPath.indexOf("addAndEditEmployee") != -1) {
                this.title = "机构自行新增员工"
                return;
            }

            routes[0].children.forEach(el => {
                if(el.path == currentPath) {
                    this.title = el.meta.name
                    return;
                }
            })
        }
    }
</script>

<style lang="stylus" scoped>
#GlobalTitle
    height 50px
    width 100%
    background-color #fff
    border-bottom 1px solid #e9e9e9
    .title-container
        display flex
        justify-content space-between
        width 1100px
        line-height 50px
        margin 0 auto
        .title-text
            p   
                line-height 50px
                font-size 16px
                color #999
                font-weight bold
                position relative
                &::before
                    content ""
                    position absolute
                    left -10px
                    top 50%
                    transform translateY(-50%)
                    width 4px
                    height 18px
                    background-color #0079fe 
</style>