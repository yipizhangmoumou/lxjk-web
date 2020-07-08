<template>
    <LayoutFilterTable
        :is-loading="isLoading"
        :page="listPage"
        @onPageIndexChange="onPageIndexChange"
    >
        <div slot="action" class="action-box">
            <el-button type="primary" @click.native="handleAddNew">新建产品</el-button>
        </div>
        <MsUiTable
                :columns="columns"
                :data="listData"
                :is-allow-save-view="true"
        >
            <template v-slot:createTime="{row}">
                {{row.createTime | timeFilter}}
            </template>
            <template v-slot:action="{row}">
                <el-button type="primary" @click.native="handleEdit(row)" size="small">编辑</el-button>
                <el-button type="primary" @click.native="handleChangeStatus(row)" size="small">{{row.status === '上架' ? '下架' : '上架'}}</el-button>
                <el-button type="danger" @click.native="handleDelete(row)" size="small">删除</el-button>
            </template>
        </MsUiTable>
    </LayoutFilterTable>
</template>

<script>
import LayoutFilterTable from '../../components/LayoutFilterTable/LayoutFilterTable'
import MsUiTable from '../../components/MsUiTable/MsUiTable'
import LayoutFilterTableMixin from '../../components/LayoutFilterTable/LayoutFilterTableMixin'
export default {
  name: 'Product',
  data () {
    return {
      listApiUrl: '/api/mgm/product/listData',
      dataKey: 'mgmProductList',
      columns: [
        {
          label: '创建时间',
          field: 'createTime',
          needSlot: true
        },
        {
          label: '类型',
          field: 'financingType'
        },
        {
          label: '名称',
          field: 'name'
        },
        {
          label: '状态',
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
      ]
    }
  },
  mixins: [LayoutFilterTableMixin],
  filters: {
    timeFilter (timeStr) {
      if (!timeStr) return ''
      return timeStr.replace('T', ' ')
    }
  },
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
      this.$router.push('/ProductEdit')
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
  components: {LayoutFilterTable, MsUiTable}
}
</script>

<style scoped lang="less">
.action-box{
    padding-bottom: 20px;
    text-align: right;
}
</style>
