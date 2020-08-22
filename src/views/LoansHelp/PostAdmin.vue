<template>
  <div id="PostAdmin">
<!--    <SearchOne />-->
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
<!--          <el-button size="small" icon="el-icon-upload2">导出</el-button>-->
<!--          <el-button size="small" icon="el-icon-download">导入</el-button>-->
<!--          <el-button size="small" icon="el-icon-plus" type="primary">为机构新增员工</el-button>-->
          <el-button size="small" icon="el-icon-plus" type="primary" @click="handleAddNew">添加岗位</el-button>
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
          <el-table-column type="selection" width="55"/>
          <el-table-column label="所属机构" prop="fkCompanyId">
            <template slot-scope="scope">
              {{getFKName(scope.row.fkCompanyId)}}
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" prop="deptName"/>
          <el-table-column label="更新时间" prop="updateTime">
            <template slot-scope="scope">
              {{scope.row.updateTime ? scope.row.updateTime.replace('T', ' ') : ''}}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="岗位描述"/>
          <el-table-column label="状态" prop="status" width="80">
            <template slot-scope="scope">
              {{scope.row.status === 0 ? '启用' : '停用'}}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="240">
            <template slot-scope="scope">
              <div class="cz">
                <div @click="handleEdit(scope.row)">
                  <i class="el-icon-edit"></i>
                  编辑
                </div>
                <div @click="handleStatus(scope.row)" v-if="scope.row.status !== 0">
                  <i class="el-icon-success"></i>
                  启用
                </div>
                <div @click="handleStatus(scope.row)" v-else>
                  <i class="el-icon-remove"></i>
                  停用
                </div>
                <div @click="handleDelete(scope.row)">
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
    <EditPost
      v-model="editObj.visible"
      :data="editObj.data"
      :lAlist="lAlist"
      @query="getTableData"
    />
  </div>
</template>

<script>
import CopyRight from "components/CopyRight"
// import SearchOne from "components/Search/SearchOne";
import EditPost from "./component/EditPost"
import tableMixin from '../../assets/js/tableMixin'
export default {
  name: "PostAdmin",
  data() {
    return {
      listApiUrl: '/api/mgm/loanAgencyDept/list',
      dataKey: 'data',
      multipleSelection: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      editObj: {
        visible: false,
        data: {}
      },
      lAlist: [],
    };
  },
  mixins: [tableMixin],
  methods: {
    handleEdit (row) {
      console.log(row)
      this.editObj.data = JSON.parse(JSON.stringify(row))
      this.editObj.visible = true
    },
    handleStatus (row) {
      let obj = JSON.parse(JSON.stringify(row))
      obj.status = row.status === 0 ? 1 : 0
      this.$axios.post('/api/mgm/loanAgencyDept/update', obj)
      .then(() =>{
        this.$msgSuccess()
        this.getTableData()
      })
      .catch(err => {
        this.$msgError(err.message)
      })
    },
    handleDelete (row) {
      this.$confirm('确认删除这条数据吗', '确认').then(() => {
        this.$axios.post(`/api/mgm/loanAgencyDept/delete/${row.pkId}`)
        .then(() => {
          this.$msgSuccess()
          this.getTableData()
        })
        .catch(err => {
          this.$msgError(err.message)
        })
        }).catch((err) => {
        console.log(err)
      })
    },
    getLAList () {
      this.$axios.post('/api/mgm/loanAgency/queryList', {
        "page": 1,
        "size": 500,
        "status": 0
      })
      .then(res => {
        res.data.mgmLoanAgencyList && (this.lAlist = res.data.mgmLoanAgencyList)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getFKName (id) {
      let obj = this.lAlist.find(v => v.pkId === id)
      return obj ? obj.name : ''
    },
    handleAddNew () {
      this.editObj.visible = true
      this.editObj.data = {}
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
     * @dir 表格里面的按钮
     * @param null
     * @return null
     */
    operation(type, row) {
      switch (type) {
        case 1:
          this.layer({
            row,
            content: "是否为机构开通服务",
            message: "开通成功",
            suFn() {
              console.log("成功以后做的");
            },
            erFn() {
              console.log("失败以后做的");
            }
          });
          break;
        case 2:
          this.layer({
            row,
            content: "是否禁用机构服务",
            message: "禁用成功",
            suFn() {
              console.log("成功以后做的");
            },
            erFn() {
              console.log("失败以后做的");
            }
          });
          break;
        case 3:
          this.layer({
            row,
            content: "是否确定删除机构",
            message: "删除成功",
            suFn() {
              console.log("成功以后做的");
            },
            erFn() {
              console.log("失败以后做的");
            }
          });
          break;
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
    // SearchOne,
    CopyRight,
    EditPost
  },
  created() {
    this.getLAList()
    this.getTableData()
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#PostAdmin
  position relative
  .table-container
    width 1100px
    margin 20px auto 200px
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
