<template>
    <LayoutFilterTable
            :is-loading="isLoading"
            :page="listPage"
            @onPageIndexChange="onPageIndexChange"
            @onPageSizeChange="onPageSizeChange"
    >
        <div slot="action" class="action-box ms-flex row just-between">
            <div class="query-box">
                <span>数据字典类型 : </span>
                <el-select v-model="codeObj" placeholder="" value-key="code">
                    <el-option
                            v-for="(item, index) in dataCodeList"
                            :key="index"
                            :label="item.value"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" @click.native="handleAddNew">新建字典</el-button>
        </div>
        <MsUiTable
                :columns="columns"
                :data="listData"
                :is-allow-save-view="true"
                needIndex
        >
            <template v-slot:action="{row}">
<!--                <el-button type="primary" @click.native="handleEdit(row)" size="small">编辑</el-button>-->
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
  name: 'DataDictionary',
  data () {
    return {
      listApiUrl: '/api/mgm/dict/listData',
      dataKey: 'mgmDictList',
      codeObj: {},
      dataCodeList: [],
      columns: [
        {
          label: '字典名称',
          field: 'value'
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
  methods: {
   getCodeTypeList () {
     this.$axios.post('/api/mgm/dict/getParentDict').then(res => {
       this.dataCodeList = res.data
       res.data.length && (this.codeObj = res.data[0])
     }).catch(err => {
       console.log(err)
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
    this.getCodeTypeList()
  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {
    queryObj () {
      return {
        code: this.codeObj.code
      }
    }
  },
  watch: {
    codeObj: {
      deep: true,
      handler (val) {
        val && this.getTableData()
      }
    }
  },
  components: {MsUiTable, LayoutFilterTable}
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
