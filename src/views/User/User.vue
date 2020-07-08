<template>
    <LayoutFilterTable
        :is-loading="isLoading"
        :page="listPage"
        @onPageIndexChange="onPageIndexChange"
    >
        <div slot="action" class="action-box">
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
        <EditUser v-model="editObj.visible" :data="editObj.data"></EditUser>
    </LayoutFilterTable>
</template>

<script>
import LayoutFilterTable from '../../components/LayoutFilterTable/LayoutFilterTable'
import MsUiTable from '../../components/MsUiTable/MsUiTable'
import LayoutFilterTableMixin from '../../components/LayoutFilterTable/LayoutFilterTableMixin'
import EditUser from './component/EditUser'
export default {
  name: 'User',
  data () {
    return {
      listApiUrl: '/api/mgm/product/listData',
      dataKey: 'mgmProductList',
      columns: [
        {
          label: '用户编号',
          field: 'createTime',
          needSlot: true
        },
        {
          label: '用户账号',
          field: 'financingType'
        },
        {
          label: '用户名',
          field: 'name'
        },
        {
          label: '状态',
          field: 'status'
        },
        {
          label: '创建人',
          field: 'status'
        },
        {
          label: '创建时间',
          field: 'status'
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
  methods: {
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
          this.$message.success('成功')
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
          this.$message.success('成功')
          this.getTableData()
        })
        .catch((err) =>{
          this.$message.error(err.message)
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
  computed: {},
  watch: {},
  components: {LayoutFilterTable, MsUiTable, EditUser}
}
</script>

<style scoped lang="less">
.action-box{
    padding-bottom: 20px;
    text-align: right;
}
</style>
