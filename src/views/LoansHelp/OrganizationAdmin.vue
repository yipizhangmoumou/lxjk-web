<template>
  <div id="OrganizationAdmin">
    <SearchOne @search="onSearch"/>
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
          <el-button size="small" icon="el-icon-download">导入</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary">为机构新增员工</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary" @click="$router.push('/addOrganization')">添加机构</el-button>
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
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="area" label="区域">
            <template v-slot="{row}">
              {{getAreaName(row.area)}}
            </template>
          </el-table-column>
<!--          <el-table-column prop="empNumber" label="所在地区"></el-table-column>-->
          <el-table-column prop="leader" label="负责人"></el-table-column>
          <el-table-column prop="name" label="公司名称"></el-table-column>
          <el-table-column prop="orgCode" label="公司代码"></el-table-column>
          <el-table-column prop="phone" label="联系电话"></el-table-column>
<!--          <el-table-column prop="status" label="状态"></el-table-column>-->
          <el-table-column prop="address" label="操作" width="240">
            <template slot-scope="{row}">
              <div class="cz">
                <div @click="handleEdit(row)">
                  <i class="el-icon-edit"></i>
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
  </div>
</template>

<script>
import CopyRight from "components/CopyRight"
import SearchOne from "components/Search/SearchOne";
import tableMixin from '../../assets/js/tableMixin'
export default {
  name: "OrganizationAdmin",
  data() {
    return {
      key:0,
      listApiUrl: '/api/mgm/loanAgency/queryList',
      dataKey: 'mgmLoanAgencyList',
      multipleSelection: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      areaTree: [],
      queryObj: {}
    };
  },
  mixins: [tableMixin],
  methods: {
    onSearch (val) {
      this.queryObj = val;
      this.getTableData();
    },
    getAreaName(code) {
      if(!code) return '-'
      let list = code.split(',')
      // if (list.length === 1) {
      //   let obj = this.areaTree.find(v => v.code === list[0])
      //   return obj ? obj.name : '-'
      // }
      let returnList = []
      let childrenList = []
      list.forEach((v, i) => {
        if (!i) {
          let obj = this.areaTree.find(y => y.code === v)
          if (obj) {
            childrenList = obj.children
            returnList.push(obj.name)
          }
        } else {
          let obj = childrenList.find(y => y.code === v)
          if (obj) {
            childrenList = obj.children
            returnList.push(obj.name)
          }
        }
      })
      if (!returnList.length) return '-'
      return returnList.join(' / ')
    },
    deleteEmpty (arr) {
      return arr.map(v => {
        if (v.children && v.children.length) {
          v.children = this.deleteEmpty(v.children)
        } else {
          delete v.children
        }
        return v
      })
    },
    getAreaTree () {
      this.$axios.post('/api/mgm/area/getAreaInfo').then(res => {
        this.areaTree = this.deleteEmpty(res.data.areaTree)
      })
    },
    recursion(data, current){
      let result = null;
      for(let i in data){
        let item = data[i];
        if(item.code === current){
          result = item;
          break;
        }else if(item.children){
          this.recursion(item.children, current) && (result = this.recursion(item.children, current));
        }
      }
      return result;
    },
    handleEdit(row) {
      this.$router.push({path: '/addOrganization', query: {id: row.pkId}})
    },
    handleDelete(row) {
      this.$confirm('确认删除这条数据吗', '确认').then(()=>{
        this.$axios.post(`/api/mgm/loanAgency/delete/${row.pkId}`)
                .then(() => {
                  this.$msgSuccess()
                  this.getTableData()
                })
        .catch(err => {
          this.$msgError(err.message)
        })
      }).catch((err)=>{
        console.log(err)
      })
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
    SearchOne,
    CopyRight
  },
  created() {
    this.getAreaTree()
  },
  mounted () {
    this.getTableData()
    console.log('this.loginUserInfo--->',this.loginUserInfo)
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#OrganizationAdmin
  position relative
  .table-container
    width 1100px
    margin 0 auto 200px
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
