
<template>
  <div id="Log">
    <div class="form-title">
      <div>数据列表</div>
    </div>
    <div class="form-container">
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :stripe="true"
          :border="true"
        >
          <el-table-column prop="date" align="center" label="时间"></el-table-column>
          <el-table-column prop="action" align="center" label="操作"></el-table-column>
          <el-table-column prop="content" align="center" label="内容"></el-table-column>
        </el-table>
        <div class="page-container">
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
import CopyRight from "components/CopyRight";
export default {
  name: "Log",
  data() {
    return {
        tableData:[],
        curr: 1
    };
  },
  created() {
      for (let index = 0; index < 20; index++) {
          this.tableData.push({
              date: index,
              action: index,
              content: index
          })
      }
  },
  components: {
    CopyRight
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/styl/fn.styl'
#Log
  position relative
  width 1100px
  margin 20px auto 200px
  background-color #fff
  .form-title
    padding 20px 30px 0
    box-sizing border-box
    display flex
    justify-content space-between
    font-size 14px
    color #666
  .form-container
    padding 20px
    .table
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
            cursor pointer
  .page-container
    margin-top 20px
    display flex
    justify-content flex-end
  #CopyRight
    copyRight()
</style>