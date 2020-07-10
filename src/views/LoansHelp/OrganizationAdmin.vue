<template>
  <div id="OrganizationAdmin">
    <SearchOne />
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
          <el-button size="small" icon="el-icon-download">导入</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary">为机构新增员工</el-button>
          <el-button size="small" icon="el-icon-plus" type="primary">添加机构</el-button>
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
          <el-table-column label="机构编号" width="120">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="name" label="机构名称" width="120"></el-table-column>
          <el-table-column prop="address" label="所在地区"></el-table-column>
          <el-table-column prop="employee" label="员工人数" width="120"></el-table-column>
          <el-table-column prop="linkman" label="联系人" width="120"></el-table-column>
          <el-table-column prop="mobile" label="联系方式" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column prop="status" label="状态" width="80"></el-table-column>
          <el-table-column prop="address" label="操作" width="240">
              <template>
                  <div class="cz">
                        <div>
                          <i class="el-icon-edit"></i>
                          编辑
                        </div>
                        <div>
                            <i class="el-icon-success"></i>
                            开通
                        </div>
                        <div>
                            <i class="el-icon-remove"></i>
                            禁用
                        </div>
                        <div>
                            <i class="el-icon-delete-solid"></i>
                            删除
                        </div>
                  </div>
              </template>
          </el-table-column>
          <el-table-column prop="codeUrl" label="结构员工推广码" width="100">
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
      </div>
    </div>
  </div>
</template>

<script>
import SearchOne from "components/SearchOne";
export default {
  name: "OrganizationAdmin",
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  components: {
    SearchOne
  },
  created() {
    for (let index = 0; index < 30; index++) {
        this.tableData.push({
            number: index + 1,
            name: "机构名称" + index,
            address: "地区" + index,
            employee: "员工人数" + index,
            linkman: "联系人" + index,
            mobile: "联系方式" + index,
            createTime: "2020-03-09 12:34:23",
            status: index % 2 == 0 ? "已开通" : "未开通",
            codeUrl:'http://www.baidu.com' 
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
#OrganizationAdmin
  .table-container
    width 1100px
    margin 0 auto
    background-color #fff
    padding 20px
    box-sizing border-box
    .table-header
      align-items center
      display flex
      justify-content space-between
      margin-bottom 20px
    .table
        padding-bottom 90px
        >>> .el-table
            th div,
            td div
                font-size 12px !important
            th
                background-color #FAFAFA
            .cz
                display flex
                justify-content space-around
                color #0079FE

</style>