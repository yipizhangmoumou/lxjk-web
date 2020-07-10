<template>
  <div id="EmployeeAdmin">
    <SearchTwo />
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary" @click="$router.push('/addAndEditEmployee/add')">添加</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :stripe="true"
          :border="true"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="ID" width="120">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="手机号"></el-table-column>
          <el-table-column prop="employee" label="所属机构" width="120"></el-table-column>
          <el-table-column prop="linkman" label="部门" width="120"></el-table-column>
          <el-table-column prop="mobile" label="员工岗位" width="120"></el-table-column>
          <el-table-column prop="createTime" label="推广用户数" width="160"></el-table-column>
          <el-table-column prop="status" label="前台权限" width="80"></el-table-column>
          <el-table-column prop="status" label="注册时间" width="80"></el-table-column>
          <el-table-column prop="status" label="启用" width="80">
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.flag"
                  active-color="#13ce66">
                </el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="240">
            <template slot-scope="scope">
              <div class="cz">
                <div @click="$router.push('/log')">
                  <i class="el-icon-s-order"></i>
                  日志
                </div>
                <div @click="$router.push(`/addAndEditEmployee/${scope.row.id}`)">
                  <i class="el-icon-edit"></i>
                  编辑
                </div>
                <div @click="operation(3, scope.row)">
                  <i class="el-icon-delete-solid"></i>
                  删除
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="codeUrl" label="结构员工推广码" width="120">
            <template>
              <div class="code">
                <div>
                  <i class="el-icon-picture"></i>
                  推广码
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
            :current-page="curr"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import CopyRight from "components/CopyRight"
import SearchTwo from "components/SearchTwo";
export default {
  name: "EmployeeAdmin",
  data() {
    return {
      curr: 1,
      tableData: [],
      multipleSelection: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: ""
    };
  },
  methods: {
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
    SearchTwo,
    CopyRight
  },
  created() {
    for (let index = 0; index < 11; index++) {
      this.tableData.push({
        number: parseInt(Math.random() * 1000000),
        name: "机构名称" + index,
        address: "地区" + index,
        employee: "员工人数" + index,
        flag: index % 2 == 0 ? false : true,
        linkman: "联系人" + index,
        mobile: "联系方式" + index,
        createTime: "2020-03-09 12:34:23",
        status: index % 2 == 0 ? "已开通" : "未开通",
        codeUrl: "http://www.baidu.com"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#EmployeeAdmin
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