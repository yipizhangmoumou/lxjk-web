<template>
    <LayoutFilterTable
            :is-loading="isLoading"
            :page="listPage"
            @onPageIndexChange="onPageIndexChange"
            @onPageSizeChange="onPageSizeChange"
    >
        <div slot="action" class="action-box ms-flex row just-between">
            <div class="query-box">
<!--                <el-input v-model="queryObj.userAccount" placeholder="用户账号" clearable-->
<!--                          class="query-input-width"></el-input>-->
<!--                <el-date-picker-->
<!--                        v-model="dateList"-->
<!--                        type="daterange"-->
<!--                        clearable-->
<!--                        :editable="false"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        start-placeholder="开始日期"-->
<!--                        end-placeholder="结束日期">-->
<!--                </el-date-picker>-->
<!--                <el-select v-model="queryObj.status" placeholder="状态" clearable class="query-input-width">-->
<!--                    <el-option-->
<!--                            v-for="item in userStatusList"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--                <el-select v-model="queryObj.userType" placeholder="用户类型" clearable class="query-input-width">-->
<!--                    <el-option-->
<!--                            v-for="item in userTypeList"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--                <el-button type="primary" @click.native="getTableData" class="ms-m l-10">查询</el-button>-->
<!--                <el-button @click.native="handleClearQuery">清除</el-button>-->
            </div>
            <el-button type="primary" @click.native="handleAddNew">新建产品贷款机构</el-button>
        </div>
        <MsUiTable
                :columns="columns"
                :data="listData"
                :is-allow-save-view="true"
        >
            <template v-slot:status="{row}">
                {{row.status | statusFilter}}
            </template>
            <template v-slot:action="{row}">
                <el-button type="primary" size="small" @click.native="handleEdit(row)">编辑</el-button>
                <el-button type="primary" @click.native="handleChangeStatus(row)" size="small">
                    {{row.status === 0 ? '停用' : '启用'}}
                </el-button>
                <el-button type="danger" size="small" @click.native="handleDelete(row)">删除</el-button>
            </template>
        </MsUiTable>
        <EditLendingInstitutions v-model="editObj.visible" :data="editObj.data" @query="getTableData"></EditLendingInstitutions>
    </LayoutFilterTable>
</template>

<script>
import LayoutFilterTable from '../../components/LayoutFilterTable/LayoutFilterTable'
import MsUiTable from '../../components/MsUiTable/MsUiTable'
import LayoutFilterTableMixin from '../../components/LayoutFilterTable/LayoutFilterTableMixin'
import EditLendingInstitutions from './component/EditLendingInstitutions'

export default {
  name: 'LendingInstitutions',
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
      listApiUrl: '/api/mgm/productLendingProvider/listData',
      dataKey: 'mgmProductProviderList',
      columns: [
        // {
        //   label: '创建时间',
        //   field: 'createTime',
        //   needSlot: true
        // },
        {
          label: '名称',
          field: 'name'
        },
        {
          label: '状态',
          field: 'status',
          needSlot: true
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
    statusFilter (status) {
      return status === 0 ? '启用' : '停用'
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
      this.editObj.data = JSON.parse(JSON.stringify(row))
      this.editObj.visible = true
    },
    handleDelete (row) {
      this.$confirm('确认删除这条数据吗', '确认').then(() => {
        this.$axios.post(`/api/mgm/productLendingProvider/delete/${row.id}`)
          .then(() => {
            this.$msgSuccess()
            this.getTableData()
          })
      }).catch((err) => {console.log(err)})
    },
    handleChangeStatus (row) {
      let status = row.status === 0 ? -1 : 0
      this.$axios.post(`/api/mgm/productLendingProvider/update`, {
        productLendingProvider: {
          id: row.id,
          status
        }
      })
        .then(() => {
          this.$msgSuccess()
          this.getTableData()
        })
        .catch((err) => {
          this.$msgError(err.message)
        })
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
  components: {LayoutFilterTable, MsUiTable, EditLendingInstitutions}
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
