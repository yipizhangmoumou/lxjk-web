<template>
    <div id="StatusList">
        <ul>
            <li v-for="(item, index) in ArrayList" :key="index" :style="ArrayList.length > 4 ? 'width:165px' : 'width:250px'">
                <p class="name">
                    <i :style="'background-color:' + item.color"></i>
                    <span>{{item.name}}</span>
                </p>
                <p class="count">{{item.count}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"StatusList",
        props:{
            ArrayList: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
#StatusList
    width 1100px
    margin 20px auto
    ul
        display flex
        justify-content space-between
        align-items center
        li
            background-color #fff
            width 250px
            height 100px
            border 1px solid #e9e9e9
            text-align center
            padding-top 25px
            box-sizing border-box
            color #666
            .name
                i
                    display inline-block
                    width 5px
                    height 5px
                    border-radius 50%
                    vertical-align middle
                    margin-right 6px
            p.count 
                margin-top 10px
                font-size 28px
</style>