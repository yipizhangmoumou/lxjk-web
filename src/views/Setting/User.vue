<template>
    <div id="product">
<!--        <div class="search-box">-->
<!--            <span>数据字典类型 : </span>-->
<!--            <el-select v-model="codeObj" filterable  placeholder="" value-key="code">-->
<!--                <el-option-->
<!--                        v-for="(item, index) in dataCodeList"-->
<!--                        :key="index"-->
<!--                        :label="item.value"-->
<!--                        :value="item">-->
<!--                </el-option>-->
<!--            </el-select>-->
<!--        </div>-->
        <div class="table-container">
            <div class="table-header">
                <h5>数据列表</h5>
                <div class="table-btn">
                    <!--          <el-button size="small" icon="el-icon-upload2">导出</el-button>-->
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAddNew">新建用户</el-button>
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
                    <el-table-column prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column prop="userAccount" label="用户账号"></el-table-column>
                    <el-table-column prop="userName" label="用户名"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="{row}">
                            {{row.status | statusFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户类型">
                        <template slot-scope="{row}">
                            {{row.userType | typeFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                        <template slot-scope="{row}">
                            <div class="cz">
                                <div @click="handleEdit(row)">
                                    <i class="el-icon-success"></i>
                                    编辑
                                </div>
<!--                                <div @click="handleChangeStatus(row, 'pend')">-->
<!--                                    <i class="el-icon-success"></i>-->
<!--                                    审核-->
<!--                                </div>-->
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
                            @size-change="onPageSizeChange"
                            @current-change="onPageIndexChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <CopyRight />
        <EditUser v-model="editObj.visible" :data="editObj.data" @query="getTableData"/>
    </div>
</template>

<script>
import CopyRight from "components/CopyRight"
import tableMixin from '../../assets/js/tableMixin'
import EditUser from './component/EditUser'
import cfg from './component/cfg'
export default {
  name: "User",
  data() {
    return {
      CFG: cfg,
      dateList: ['', ''],
      queryObj: {
        userAccount: '',
        startDate: '',
        endDate: '',
        status: null,
        userType: null
      },
      listApiUrl: '/api/mgm/user/queryUserList',
      dataKey: 'mgmUserList',
      listData: [],
      multipleSelection: [],
      value: '',
      editObj: {
        visible: false,
        data: {}
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
    };
  },
  mixins: [tableMixin],
  filters: {
    statusFilter (status) {
      let obj = cfg.USER_STATUS_MAP.get(status)
      return obj ? obj.label : '-'
    },
    typeFilter (type) {
      let obj = cfg.USER_TYPE_MAP.get(type)
      return obj ? obj.label : '-'
    }
  },
  methods: {
    handleClearQuery () {
      this.queryObj = {
        userAccount: '',
        startDate: '',
        endDate: '',
        status: null,
        userType: null
      }
      this.dateList = ['', '']
      this.getTableData()
    },
    handleEdit (row) {
      this.editObj.data = Object.assign({}, row)
      this.editObj.visible = true
    },
    handleDelete (row) {
      this.$confirm('确认删除这条数据吗', '确认').then(() => {
        this.$axios.post(`/api/mgm/product/delete/${row.id}`)
          .then(() => {
            this.$msgSuccess()
            this.getTableData()
          })
      }).catch((err) => {console.log(err)})
    },
    handleChangeStatus (row, key) {
      let status = null
      switch (key) {
        case 'active':
          status = row.status === cfg.USER_STATUS.ACTIVE ? cfg.USER_STATUS.INACTIVE : cfg.USER_STATUS.ACTIVE
          this.changeStatus({pkId: row.pkId, status})
          break
        case 'pend':
          return false
        // break;
        case 'black':
          this.$confirm('确认将该用户加入黑名单', ' ').then(() => {
            status = cfg.USER_STATUS.BLACKLIST
            this.changeStatus({pkId: row.pkId, status})
          })
          break
      }
    },
    changeStatus (obj) {
      this.$axios.post(`/api/mgm/user/updateUserStatus`, obj)
        .then(() => {
          this.$msgSuccess()
          this.getTableData()
        })
        .catch((err) => {
          this.$msgError(err.message)
        })
    },
    handleAddNew () {
      this.editObj.data = {}
      this.editObj.visible = true
    },
    /**
     * @dir 全选
     * @param null
     * @return null
     */

    selectAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },

    /**
     * @dir 反选
     * @param null
     * @return null
     */

    invertSelection(rows) {
      let arr = [];
      this.tableData.forEach((e, index) => {
        rows.forEach(i => {
          if (e.id_ === i.id_) {
            arr.push(this.tableData[index]);
          }
        });
      });
      if (arr) {
        this.$nextTick(() => {
          arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    /**
     * @dir 封装的弹层
     * @param null
     * @return null
     */
    layer({ row, content, type, message, suFn, erFn }) {
      console.log(row, "一些数据");
      this.$confirm(content, "确认提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type || "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: message
          });
          suFn();
        })
        .catch(() => {
          // 取消操作
          erFn();
        });
    }
  },
  components: {
    CopyRight,
    EditUser
  },
  created() {
    this.getTableData()
  },
  computed: {
    userTypeList () {
      let list = []
      cfg.USER_TYPE_MAP.forEach(v => {
        list.push(v)
      })
      return list
    },
    userStatusList () {
      let list = []
      cfg.USER_STATUS_MAP.forEach(v => {
        list.push(v)
      })
      return list
    }
  },
  watch: {
    dateList: {
      deep: true,
      handler (val) {
        if (val && val.length) {
          this.queryObj.startDate = val[0]
          this.queryObj.endDate = val[1]
        }
      }
    }
  }
};
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
