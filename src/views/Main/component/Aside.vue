<template>
    <!---->
    <aside class="aside-box full-height">
        <el-scrollbar class="full-height">
            <el-menu
                    class="full-height"
                    active-text-color="#409EFF"
                    :default-active="$route.path"
                    router>
                <el-menu-item v-for="(v, i) in menus" :key="i" :index="v.index">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{v.name}}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </aside>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      menus: [
        // {
        //   index: '/User',
        //   name: '用户管理'
        // },
        {
          index: '/Product',
          name: '产品管理'
        }
        // ,{
        //   index: '/Product',
        //   name: '助贷机构管理'
        // },{
        //   index: '/Product',
        //   name: '融资评估管理'
        // },{
        //   index: '/Product',
        //   name: '融资方案管理'
        // }
      ]
    }
  },
  methods: {},
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">
.aside-box{
    transition: width 0.28s;
    width: @sideBarWidth !important;
    background-color: @menuBg;
    overflow: hidden;

    /deep/.el-menu {
        border: none;
        background-color: inherit;
        .submenu-title-noDropdown,
        .el-submenu__title {
            &:hover {
                background-color: @menuHover !important;
            }
        }
        .el-menu-item {
            color: #FFFFFF;
            &:hover {
                // you can use $subMenuHover
                background-color: @menuHover !important;
            }
        }
        .is-active>.el-submenu__title {
            color: @subMenuActiveText !important;
        }

        .el-menu-item {
            min-width: @sideBarWidth !important;
            background-color: @subMenuBg !important;

            &:hover {
                background-color: @subMenuHover !important;
            }
        }
    }
}
</style>
