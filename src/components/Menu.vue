<template>
    <div id="Menu">
        <Header />
        <el-row class="tac">
            <el-col>
                <h1>链信金科</h1>
                <el-menu
                    :default-active="currPath"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#001529"
                    text-color="#cccccc"
                    active-text-color="#fff"
                    :router="true"
                    unique-opened>
                    <el-submenu :index="String(index)" v-for="(item, index) in menuList" :key="index">
                        <template slot="title">
                            <i class="el-icon-postcard"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                :route="{path: child.path}"
                                :index="`${index}-${key}`"
                                v-for="(child, key) in item.childrenList"
                                :key="key">
                                {{child.name}}
                            </el-menu-item>
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
            currPath: '0-0',
            menuList: [
                {
                    name: '助贷管理',
                    childrenList: [
                        {
                            path: '/organizationAdmin',
                            name:'助贷机构管理',
                            child:[]
                        },
                        {
                            path: '/postAdmin',
                            name:'机构岗位管理'
                        },
                        {
                            path: '/employeeAdmin',
                            name:'助贷机构员工管理',
                            child: []
                        },
                        {
                            path: '/checkEmployee',
                            name:'待审核员工',
                            child: []
                        }
                    ]
                },
                {
                    name: '融资服务',
                    childrenList: [
                        {
                            path: '/applyForAssess',
                            name:'评估申请管理',
                            child: ['evaluationDetails']
                        },
                        {
                            path: '/serviceAdmin',
                            name:'融资服务管理',
                            child: []
                        },
                        {
                            path: '/executiveProgramme',
                            name:'融资执行方案管理',
                            child: []
                        }
                    ]
                },
                {
                    name: '产品管理',
                    childrenList: [
                        {
                            path: '/Product',
                            name:'产品管理',
                            child: []
                        },
                        {
                            path: '/LendingInstitutions',
                            name:'产品贷款机构管理',
                            child: []
                        },
                        {
                            path: '/ProductType',
                            name:'产品类型管理',
                            child: []
                        }
                    ]
                },
                {
                    name: '系统设置',
                    childrenList: [
                        {
                            path: '/User',
                            name:'用户管理',
                            child: []
                        },
                        {
                            path: '/DataDictionary',
                            name:'数据字典管理',
                            child: []
                        }
                    ]
                },
                // {
                //     name: '风险管理',
                //     childrenList: [
                //         {
                //             path: '/CreditReport',
                //             name:'MSP征信报告3.0(API版)',
                //             child: []
                //         }
                //     ]
                // }
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
    mounted() {
        this.menuList.forEach((el, index) => {
            el.childrenList.forEach((item, i) => {

                if ( item.path == this.$route.path || (item.child && item.child.includes(this.$route.name)) ) {

                    this.currPath = `${index}-${i}`;
                    return;
                }
            })
        })
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
        z-index 9
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
