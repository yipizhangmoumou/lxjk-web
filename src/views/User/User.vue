<template>
    <LayoutFilterTable
        :is-loading="isLoading"
        :page="listPage"
        @onPageIndexChange="onPageIndexChange"
        @onPageSizeChange="onPageSizeChange"
    >
        <div slot="action" class="action-box ms-flex row just-between">
            <div class="query-box">
                <el-input v-model="queryObj.userAccount" placeholder="用户账号" clearable class="query-input-width"></el-input>
                <el-date-picker
                        v-model="dateList"
                        type="daterange"
                        range-separator="至"
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
            <template v-slot:createTime="{row}">
                {{row.createTime}}
            </template>
            <template v-slot:action="{row}">
                <el-button type="primary" @click.native="handleEdit(row)" size="small">编辑</el-button>
                <el-button type="primary" @click.native="handleChangeStatus(row)" size="small">{{row.status === '上架' ? '下架' : '上架'}}</el-button>
                <el-button type="danger" @click.native="handleDelete(row)" size="small">删除</el-button>
            </template>
        </MsUiTable>
        <EditUser v-model="editObj.visible" :data="editObj.data" @query="getTableData"></EditUser>
    </LayoutFilterTable>
</template>

<script>
import LayoutFilterTable from '../../components/LayoutFilterTable/LayoutFilterTable'
import MsUiTable from '../../components/MsUiTable/MsUiTable'
import LayoutFilterTableMixin from '../../components/LayoutFilterTable/LayoutFilterTableMixin'
import EditUser from './component/EditUser'
import cfg from './component/cfg'
export default {
  name: 'User',
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
      listApiUrl: '/api/mgm/user/queryUserList',
      dataKey: 'mgmUserList',
      columns: [
        {
          label: '用户编号',
          field: 'createTime',
          needSlot: true
        },
        {
          label: '用户账号',
          field: 'userAccount'
        },
        {
          label: '用户名',
          field: 'userName'
        },
        {
          label: '状态',
          field: 'status'
        },
        {
          label: '用户类型',
          field: 'userType',
          needSlot: true
        },
        // {
        //   label: '创建人',
        //   field: 'status'
        // },
        // {
        //   label: '创建时间',
        //   field: 'status'
        // },
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
  methods: {
    handleClearQuery () {
      this.queryObj = {
        userAccount: '',
        startDate: '',
        endDate: '',
        status: null,
        userType: null
      };
      this.dateList = ['', ''];
      this.getTableData();
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
      this.$confirm('确认删除这条数据吗', '确认').then(()=>{
        this.$axios.post(`/api/mgm/product/delete/${row.id}`)
        .then(() => {
          this.$msgSuccess()
          this.getTableData()
        })
      }).catch((err)=>{console.log(err)})
    },
    handleChangeStatus (row) {
      this.$axios.post(`/api/mgm/product/update`, {
        product: {
          pkId: row.id,
          status: row.status === '上架' ? -1 : 0
        }
      })
        .then(() => {
          this.$msgSuccess()
          this.getTableData()
        })
        .catch((err) =>{
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
        if(val && val.length) {
          this.queryObj.startDate = val[0]
          this.queryObj.endDate = val[1]
        }
      }
    }
  },
  components: {LayoutFilterTable, MsUiTable, EditUser}
}
</script>

<style scoped lang="less">
    .action-box{
        padding-bottom: 20px;
        text-align: right;
        .query-box{
            >div + div {
                margin-left: 10px;
            }
        }
    }
    .query-input-width{
        width: 180px;
    }
</style>
