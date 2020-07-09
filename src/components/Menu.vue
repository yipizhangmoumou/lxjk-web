<template>
  <div id="Menu">
    <Header />
    <el-row class="tac">
      <el-col>
        <h1>链信金科</h1>
        <el-menu
          default-active="0-0"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#cccccc"
          active-text-color="#fff"
          :router="true"
        >
          <el-submenu :index="String(index)" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :route="{path: child.path}" :index="`${index}-${key}`" v-for="(child, key) in item.childrenList" :key="key">{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "components/Header"
export default {
  name: "Menu",
  data() {
      return {
        menuList: [
            {
                name: '助贷管理',
                childrenList: [
                    {
                        path: '/login',
                        name:'助贷机构管理'
                    },
                    {
                        path: '/login',
                        name:'机构岗位管理'
                    },
                    {
                        path: '/login',
                        name:'助贷机构员工管理'
                    },
                    {
                        path: '/login',
                        name:'待审核员工'
                    }
                ]
            },
            {
                name: '融资服务',
                childrenList: [
                    {
                        path: '/login',
                        name:'评估申请管理'
                    },
                    {
                        path: '/login',
                        name:'融资服务管理'
                    },
                     {
                        path: '/login',
                        name:'融资执行方案管理'
                    }
                ]
            }
        ]
      }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
      Header
  }
};
</script>

<style lang="stylus" scoped>
    #Menu
        width 240px
        position absolute
        top 0
        left 0
        bottom 0
        background-color #001529
        h1
            line-height 70px
            text-align center
            font-size 18px
            color #ccc
            background-color #002140
        .el-menu-item.is-active
            background-color #0079fe !important
        .el-menu-item
            &:hover
                color #fff !important
</style>