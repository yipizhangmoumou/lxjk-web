export default {
  data () {
    return {
      isLoading: false,
      // 列表请求方法的接口
      listApiUrl: '',
      // 列表数据
      listData: [],
      // 页码信息
      listPage: {
        total: 0,
        page: 1,
        size: 20
      },
      // 表格的列信息 - 具体参数可以参考 src/components/MsUiTable/MsUiTable.vue 中的注释
      columns: [],
      searchForm: {}
    }
  },
  computed: {
  },
  methods: {
    // 默认请求方法
    getTableData (flag) {
      // 防止重复请求
      if (this.isLoading) return
      // 参数flag为true则表示不重置过滤条件，只修改页码
      if (flag === true) {
        this.searchForm.page = this.listPage.page
        this.searchForm.size = this.listPage.size
      }
      else {
        this.listPage.page = 1
        this.searchForm = this.getFilterParams()
      }
      this.isLoading = true
      this.$axios.post(this.listApiUrl, this.searchForm)
        .then(res => {
          this.listData = res.data[this.dataKey]
          this.listPage.total = res.data.totalSize
          this.isLoading = false
          this.scrollContentToTop()
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    // 拼接参数
    getFilterParams () {
      let output ={}
      let params = Object.assign({}, this.queryObj || {}, this.listPage)
      delete output.total
      // 过滤掉空值
      Object.keys(params).forEach(key => {
        if (params[key]) {
          output[key] = params[key]
        }
      })
      return output
    },
    scrollContentToTop () {
      try {
        window.document.querySelector('.l--filter-table .el-table__body-wrapper').scrollTop = 0
      }
      catch (e) {
        console.log(e)
      }
    },
    onPageIndexChange (index) {
      this.listPage.page = index
      this.getTableData(true)
    },
    onPageSizeChange (index) {
      this.listPage.size = index
      this.getTableData(true)
    }
  }
}
