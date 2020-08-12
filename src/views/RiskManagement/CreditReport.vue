<template>
    <div id="product">
        <!--    <SearchThree />-->
        <div class="search-box">
            <span>列表类型： </span>
            <el-select v-model="dicType" placeholder="" style="width: 300px" @change="getTableData">
                <el-option
                        v-for="item in optionsList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="table-container" v-loading="isLoading">
            <div class="table-header">
                <h5>数据列表</h5>
                <div class="table-btn">
                    <!--          <el-button size="small" icon="el-icon-upload2">导出</el-button>-->
<!--                              <el-button size="small" icon="el-icon-plus" type="primary" @click="testGet">测试接口</el-button>-->
                    <!--          <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAddNew">添加产品</el-button>-->
                </div>
            </div>
            <div class="table">
                <el-table
                        ref="multipleTable"
                        :data="listData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :stripe="true"
                        :border="true"
                >
                    <!--          <el-table-column type="selection" width="55"></el-table-column>-->
                    <el-table-column prop="loanId" label="编号"/>
                    <el-table-column prop="customerName" label="名称"></el-table-column>
                    <el-table-column prop="paperNumber" label="身份证"></el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                        <template slot-scope="{row}">
                            <div class="cz">
                                <div @click="handleView(row)">
                                    <i class="el-icon-success"></i>
                                    查看详情
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-container">
                    <div class="selectBtn">
                        <el-button size="small" @click="selectAll">全选</el-button>
                        <el-button size="small" @click="invertSelection(tableData)">反选</el-button>
                        <el-select v-model="value" placeholder="批量操作">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                            :current-page="listPage.page"
                            :page-size="listPage.size"
                            :total="listPage.total"
                            :page-sizes="[10, 20, 30, 50]"
                            layout="total, sizes, prev, pager, next, jumper"
                            @current-change="onPageIndexChange"
                            @size-change="onPageSizeChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <CopyRight/>
    </div>
</template>

<script>
import CopyRight from 'components/CopyRight'
import tableMixin from '../../assets/js/tableMixin'

const INFO_DEFINE = {
  member: '3041',
  sign: 'JNoCMYv9wc46I'
}
export default {
  name: 'CreditReport',
  data () {
    return {
      listApiUrl: '/api/mgm/product/listData',
      dataKey: 'mgmProductList',
      multipleSelection: [],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ],
      value: '',
      dicType: 1,
      optionsList: [
        {value: 1, label: '获取合同/审批待共享列表'},
        {value: 2, label: '获取合同结清状态待共享列表'},
        {value: 3, label: '获取逾期状态待共享列表'},
        {value: 4, label: '获取审批结果待共享列表'},
        {value: 5, label: '获取审批通过无合同待共享列表'}
      ]
    }
  },
  filters: {
    timeFilter (timeStr) {
      if (!timeStr) return ''
      return timeStr.replace('T', ' ')
    }
  },
  mixins: [tableMixin],
  methods: {
    getTableData () {
      this.isLoading = true
      this.$axios.get('/remote/toDoQuery.shtml', {
        params: Object.assign({}, {type: this.dicType}, INFO_DEFINE)
      }).then((res) => {
        this.listData = res.todoList
        this.listPage.total = res.todoList.length
        this.isLoading = false
      }).catch(err => {
        this.listData = []
        this.listPage.total = 0
        this.isLoading = false
        console.log(err)
      })
    },
    testGet () {
      this.$axios.get('/remote/mspClientQuery.shtml', {
        params: Object.assign({}, {
          customerName: '车新',
          paperNumber: '450109199003274742',
          phone: '18612340001'
        }, INFO_DEFINE)
      })
        .then(res => {
          console.log(res)
          this.testGet1()
        })
    },
    testGet1 () {
      this.$axios.get('/remote/mspClientSimpleQuery.shtml', {
        params: Object.assign({}, {
          customerName: '车新',
          paperNumber: '450109199003274742',
          phone: '18612340001'
        }, INFO_DEFINE)
      })
      .then(res => {
        console.log(res)
      })
    },
    handleView (row) {
      console.log(row)
      this.$axios.get('/remote/mspClientSimpleQuery.shtml', {
        params: Object.assign({}, row, INFO_DEFINE)
      })
        .then(res => {
          console.log(res)
        })
    },
    /**
     * @dir 全选
     * @param null
     * @return null
     */

    selectAll () {
      this.$refs.multipleTable.toggleAllSelection()
    }
  },
  components: {
    CopyRight
  },
  created () {
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style lang="stylus" scoped>
    @import "../../assets/styl/fn.styl";
    #product
        position relative
        .search-box
            background-color #fff
            width 1100px
            margin 20px auto 20px
            padding 20px
            box-sizing border-box

        .table-container
            width 1100px
            margin 50px auto 200px
            background-color #fff
            padding 20px
            box-sizing border-box

            .table-header
                align-items center
                display flex
                justify-content space-between
                margin-bottom 20px

            .table
                >>> .el-table
                    th div, td div
                        font-size 12px !important

                    th
                        background-color #FAFAFA

                    .cz
                        display flex
                        justify-content space-around
                        color #0079FE
                        cursor pointer

            .page-container
                margin-top 20px
                display flex
                justify-content space-between

                .el-select
                    margin-left 20px

                    >>> .el-input__inner
                        height 32px
                        line-height 32px

                    >>> .el-input__icon
                        line-height 32px

        #CopyRight
            copyRight()
</style>
