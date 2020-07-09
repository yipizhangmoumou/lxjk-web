<template>
    <div id="CopyRight">
        <p>Copyright © 链信金科 {{year}}, All Rights Reserved.</p>
    </div>
</template>

<script>
    export default {
        name: "CopyRight",
        data() {
            return {
                year: '0000'
            }
        },
        created() {
            /**
             * 根据服务器系统时间，确保服务器系统时间准确
             */
            this.year = new Date().getFullYear();
        }
    }
</script>

<style lang="stylus" scoped>
    #CopyRight
        p
            text-align center
            color #ccc
            font-size 14px
</style>