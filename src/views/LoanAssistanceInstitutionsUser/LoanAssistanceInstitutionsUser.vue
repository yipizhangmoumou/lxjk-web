<template>
    <LayoutFilterTable
            :is-loading="isLoading"
            :page="listPage"
            @onPageIndexChange="onPageIndexChange"
            @onPageSizeChange="onPageSizeChange"
    >
        <div slot="action" class="action-box ms-flex row just-between">
            <div class="query-box">
                <el-input v-model="queryObj.userAccount" placeholder="用户账号" clearable
                          class="query-input-width"></el-input>
                <el-date-picker
                        v-model="dateList"
                        type="daterange"
                        clearable
                        :editable="false"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="queryObj.status" placeholder="状态" clearable class="query-input-width">
                    <el-option
                            v-for="item in userStatusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="queryObj.userType" placeholder="用户类型" clearable class="query-input-width">
                    <el-option
                            v-for="item in userTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click.native="getTableData" class="ms-m l-10">查询</el-button>
                <el-button @click.native="handleClearQuery">清除</el-button>
            </div>
            <el-button type="primary" @click.native="handleAddNew">新建用户</el-button>
        </div>
        <MsUiTable
                :columns="columns"
                :data="listData"
                :is-allow-save-view="true"
        >
            <template v-slot:status="{row}">
                {{row.status | statusFilter}}
            </template>
            <template v-slot:userType="{row}">
                {{row.userType | typeFilter}}
            </template>
            <template v-slot:action="{row}">
                <el-button type="success" @click.native="handleChangeStatus(row, 'pend')" size="small">审核
                </el-button>
                <!--                <el-button type="danger" @click.native="handleChangeStatus(row, 'black')" size="small"-->
                <!--                           v-if="![CFG.USER_STATUS.BLACKLIST, CFG.USER_STATUS.CANCELLATION].includes(row.status)">加入黑名单-->
                <!--                </el-button>-->
            </template>
        </MsUiTable>
        <EditUser v-model="editObj.visible" :data="editObj.data" @query="getTableData"></EditUser>
    </LayoutFilterTable>
</template>

<script>
import LayoutFilterTable from '../../components/LayoutFilterTable/LayoutFilterTable'
import MsUiTable from '../../components/MsUiTable/MsUiTable'
import LayoutFilterTableMixin from '../../components/LayoutFilterTable/LayoutFilterTableMixin'

export default {
  name: 'LoanAssistanceInstitutionsUser',
  data () {
    return {
      dateList: ['', ''],
      queryObj: {
        userAccount: '',
        startDate: '',
        endDate: '',
        status: null,
        userType: null
      },
      listApiUrl: '/api/mgm/loanAgency/queryList',
      dataKey: 'mgmLoanAgencyList',
      columns: [
        {
          label: '创建时间',
          field: 'orgCode'
        },
        {
          label: '区域',
          field: 'area'
        },
        {
          label: '机构名称',
          field: 'name'
        },
        {
          label: 'empNumber',
          field: 'empNumber'
        },
        {
          label: 'leader',
          field: 'leader'
        },
        {
          label: 'phone',
          field: 'phone'
        },
        {
          label: '操作',
          field: 'action',
          needSlot: true,
          fixed: true,
          fixedPos: 'right',
          width: 260
        }
      ],
      editObj: {
        visible: false,
        data: {}
      }
    }
  },
  mixins: [LayoutFilterTableMixin],
  filters: {
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
      this.$router.push({
        path: '/ProductEdit',
        query: {
          id: row.id
        }
      })
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
    handleChangeStatus () {

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
    }
  },
  created () {
    this.getTableData()
  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {
    userTypeList () {
      let list = []
      return list
    },
    userStatusList () {
      let list = []
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
  },
  components: {LayoutFilterTable, MsUiTable}
}
</script>

<style scoped lang="less">
    .action-box {
        padding-bottom: 20px;
        text-align: right;

        .query-box {
            > div + div {
                margin-left: 10px;
            }
        }
    }

    .query-input-width {
        width: 180px;
    }
</style>
