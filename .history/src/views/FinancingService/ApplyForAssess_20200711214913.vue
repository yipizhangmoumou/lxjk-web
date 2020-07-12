<template>
  <div id="ApplyForAssess">
    <StatusList :ArrayList="arrayList" />
    <SearchFour />
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
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
          <el-table-column label="评估单号" prop="code"></el-table-column>
          <el-table-column prop="createTime" label="评估时间"></el-table-column>
          <el-table-column prop="address" label="用户账号"></el-table-column>
          <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
          <el-table-column prop="financingAmount" label="申请额度"></el-table-column>
          <el-table-column prop="applyResult" label="评估结果" :formatter="statushighest"></el-table-column>
          <el-table-column prop="createTime" label="适用产品"></el-table-column>
          <el-table-column prop="status" label="融资申请"></el-table-column>
          <el-table-column prop="status" label="申请时间"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template>
              <div class="cz">
                <div>
                  评估详情
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-container">
          <div class="selectBtn">
            <!-- <el-button size="small" @click="selectAll">全选</el-button>
            <el-button size="small" @click="invertSelection(tableData)">反选</el-button>
            <el-select v-model="value" placeholder="批量操作">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </div>
          <!-- 分页 -->
          <el-pagination
            :current-page="curr"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="pageSize"
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
import SearchFour from "components/Search/SearchFour";
import StatusList from "components/StatusList";
export default {
  name: "ApplyForAssess",
  data() {
    return {
      curr: 1,
      pageSize:10,
      tableData: [],
      multipleSelection: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: "",
      arrayList:[
        {
          name:"全部评估申请",
          count:2000,
          color: "#58A3F7"
        },
        {
          name:"评估成功",
          count:2000,
          color: "#FEC03D"
        },
        {
          name:"评估失败",
          count:2000,
          color: "#FEC03D"
        },
        {
          name:"融资申请",
          count:2000,
          color: "#FEC03D"
        }
      ]
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
    statushighest(row){
      if (row.applyResult == 0) return '失败'
      if (row.applyResult == 1) return '成功'
    },


    /**
     * @dir 反选
     * @param null
     * @return null
     */

    // invertSelection(rows) {
    //   let arr = [];
    //   this.tableData.forEach((e, index) => {
    //     rows.forEach(i => {
    //       if (e.id_ === i.id_) {
    //         arr.push(this.tableData[index]);
    //       }
    //     });
    //   });
    //   if (arr) {
    //     this.$nextTick(() => {
    //       arr.forEach(row => {
    //         this.$refs.multipleTable.toggleRowSelection(row);
    //       });
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // }
  },
  components: {
    SearchFour,
    CopyRight,
    StatusList
  },
  mounted() {
    const param={
      
      page:this.curr,
      size:this.pageSize
    }
     this.$axios.post('/api/mgm/assessmentApply/listData',param)
        .then((res) => {
          if(res.code===0){
            this.tableData=res.data.mgmAssessmentApplyList;
          }
           
        })
  },
  created() {
   
    for (let index = 0; index < 11; index++) {
      this.tableData.push({
        number: parseInt(Math.random() * 1000000),
        name: "机构名称" + index,
        address: "地区" + index,
        employee: "员工人数" + index,
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
#ApplyForAssess
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