<template>
    <LayoutFilterTable
        :is-loading="isLoading"
        :page="listPage"
        @onPageIndexChange="onPageIndexChange"
    >
        <div slot="action">
            <el-button type="primary" @click.native="handleAddNew">新增</el-button>
        </div>
        <MsUiTable
                :columns="columns"
                :data="listData"
                :is-allow-save-view="true"
        >
            <template v-slot:createTime="{row}">
                {{row.createTime}}
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
      listApiUrl: '/api/mgm/product/list',
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
        }
      ]
    }
  },
  mixins: [LayoutFilterTableMixin],
  methods: {
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

</style>
