<template>
    <!---->
    <aside class="aside-box full-height">
        <el-scrollbar class="full-height">
            <el-menu
                    class="full-height"
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
        {
          index: '/User',
          name: '用户管理'
        },{
          index: '/Product',
          name: '产品管理'
        },{
          index: '/Product',
          name: '助贷机构管理'
        },{
          index: '/Product',
          name: '融资评估管理'
        },{
          index: '/Product',
          name: '融资方案管理'
        }
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
    width: 200px;
}
</style>
