<template>
    <div id="GlobalTitle">
        <div class="title-container">
            <div class="title-text">
                <p>{{title}}</p>
            </div>
            <div class="title-btn">
                <el-button plain size="small" icon="el-icon-refresh">刷新</el-button>
                <el-button plain size="small" icon="el-icon-arrow-left">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GlobalTitle",
        data() {
            return {
                title: ''
            }
        },
        watch: {
            $route({ meta: { name } }) {
                this.title = name ? name : '';
            }
        },
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