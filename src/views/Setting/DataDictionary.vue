<template>
    <div id="product">
        <div class="search-box">
            <span>数据字典类型 : </span>
            <el-select v-model="codeObj" filterable  placeholder="" value-key="code">
                <el-option
                        v-for="(item, index) in dataCodeList"
                        :key="index"
                        :label="item.value"
                        :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="table-container">
            <div class="table-header">
                <h5>数据列表</h5>
                <div class="table-btn">
                    <!--          <el-button size="small" icon="el-icon-upload2">导出</el-button>-->
                    <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAddNew">新建字典</el-button>
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
                    <el-table-column prop="value" label="字典名称"></el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                        <template slot-scope="{row}">
                            <div class="cz">
                                <div @click="handleEdit(row)">
                                    <i class="el-icon-success"></i>
                                    编辑
                                </div>
                                <div @click="handleDelete(row)">
                                    <i class="el-icon-delete-solid"></i>
                                    删除
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
        <CopyRight />
        <EditDataDictionary v-model="editData.visible" :data="editData.data" :dataCodeList="dataCodeList" :parentObj="codeObj"
                            @queryList="getTableData"
        />
    </div>
</template>

<script>
import CopyRight from "components/CopyRight"
import tableMixin from '../../assets/js/tableMixin'
import EditDataDictionary from './component/EditDataDictionary'
export default {
  name: "DataDictionary",
  data() {
    return {
      listApiUrl: '/api/mgm/dict/listData',
      dataKey: 'mgmDictList',
      codeObj: {},
      dataCodeList: [],
      listData: [],
      multipleSelection: [],
      value: '',
      editData: {
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
  filters: {
  },
  mixins: [tableMixin],
  methods: {
    getCodeTypeList () {
      this.$axios.post('/api/mgm/dict/getParentDict').then(res => {
        this.dataCodeList = res.data
        res.data.length && (this.codeObj = res.data[0])
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit (row) {
      console.log(row)
      this.editData.data = JSON.parse(JSON.stringify(row))
      this.editData.visible = true
    },
    handleDelete (row) {
      this.$confirm('确认删除这条数据吗', '确认').then(()=>{
        this.$axios.post(`/api/mgm/dict/delete/${row.id}`)
          .then(() => {
            this.$msgSuccess()
            this.getTableData()
          })
      }).catch((err)=>{
        this.$msgError(err.message)
      })
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
      this.editData.data = {}
      this.editData.visible = true
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
    EditDataDictionary
  },
  created() {
    this.getCodeTypeList()
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
