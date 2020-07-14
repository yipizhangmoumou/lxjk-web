<template>
    <div id="ApplyForAssess">
        <StatusList :ArrayList="assessCount" />

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
                    :border="true">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="评估单号" prop="code"></el-table-column>
                    <el-table-column label="评估时间" prop="assessTime"></el-table-column>
                    <el-table-column label="用户账号" prop="userAccount"></el-table-column>
                    <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
                    <el-table-column label="申请额度" prop="financingAmount"></el-table-column>
                    <el-table-column label="评估结果" prop="applyResult"></el-table-column>
                    <el-table-column label="适用产品" prop="meetProductNum"></el-table-column>
                    <el-table-column label="融资申请" prop="financingPlanStatus"></el-table-column>
                    <el-table-column label="申请时间" prop="createTime"></el-table-column>
                    <el-table-column label="操作" prop="address">
                        <template slot-scope="scope">
                            <div class="cz">
                                <div @click="goEvaluationDetails(scope.row.id)">
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
                        :current-page="tablePagination.curr"
                        :page-sizes="tablePagination.pageSizes"
                        :page-size="tablePagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tablePagination.total">
                    </el-pagination>
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
            assessCount:[
                {
                    name: "全部评估申请",
                    key: "totalSize",
                    count: 0,
                    color: "#58A3F7"
                },
                {
                    name: "评估成功",
                    key: "applySuccessSize",
                    count: 0,
                    color: "#FEC03D"
                },
                {
                    name: "评估失败",
                    key: "applyFailSize",
                    count: 0,
                    color: "#FEC03D"
                },
                {
                    name: "融资申请",
                    key: "financingPlanSize",
                    count: 0,
                    color: "#FEC03D"
                }
            ],

            // 数据列表
            tableData: [],

            // 数据列表分页数据
            tablePagination: {
                pageSizes: [10, 20, 50, 100],
                pageSize: 10,   // 当前页显示条数
                curr: 1,  //当前页
                total: 0  // 数据总数量
            },

            // 评估结果枚举
            applyResultObj: {
                "1": "成功",
                "0": "失败"
            },
            // 融资申请枚举
            financingPlanStatusObj: {
                "1": "未申请",
                "2": "已申请"
            },
            



            // curr: 1,
            // pageSize:10,
            
            multipleSelection: [],
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                }
            ],
            value: "",

            
        };
    },
    components: {
        SearchFour,
        CopyRight,
        StatusList
    },
    created() {

        // 数据加载-待融资顾问服务数量，待服务定制数量，待服务执行数量，已完成数量
        this.getCalNumData();

        // 数据加载-获取数据列表
        this.getTableData();
 
    },
    methods: {

        /**
         * @description: 初始数据加载：待融资顾问服务数量，待服务定制数量，待服务执行数量，已完成数量
         * @Date Changed: 2020-07-12
         */     
        getCalNumData(){

            this.$axios.post('/api/mgm/assessmentApply/calNum')
                .then(res => {
                    // console.log(`/api/mgm/financingPlan/calNum`, res);
                    if(res.code===0){
                        let data = res.data;
                        this.assessCount.forEach(item=>{
                            if( item.key == 'totalSize' ){
                                item.count = data.totalSize;
                            }
                            if( item.key == 'applySuccessSize' ){
                                item.count = data.applySuccessSize;
                            }
                            if( item.key == 'applyFailSize' ){
                                item.count = data.applyFailSize;
                            }
                            if( item.key == 'financingPlanSize' ){
                                item.count = data.financingPlanSize;
                            }
                        });
                    }
                
                })    
        }, 

        /**
         * @description: 初始数据加载：数据列表数据获取
         * @param {object}  filterObj 筛选条件
         * @Date Changed: 2020-07-13
         */      
        getTableData(filterObj){
            let data = {
                page: this.tablePagination.curr,
                size: this.tablePagination.pageSize,
            }

            if( !!filterObj && filterObj.type == "simple" ){
                data.planCode = !filterObj.planCode ? null : filterObj.planCode;
                data.actionStatus  = !filterObj.actionStatus ? null : filterObj.actionStatus;
                data.startTime = !filterObj.startTime ? null : filterObj.startTime;
            }

            if( !!filterObj && filterObj.type == "advanced" ){
                data.planCode = !filterObj.planCode ? null: filterObj.planCode;         // 服务单号
                data.contact = !filterObj.contact ? null : filterObj.contact;          // 电话
                data.enterpriseName = !filterObj.enterpriseName ? null : filterObj.enterpriseName;   // 企业名称
                data.actionStatus = !filterObj.actionStatus ? null : filterObj.actionStatus;     // 服务状态
                data.startTime = !filterObj.createTime ? null : filterObj.createTime;       // 服务申请时间
                data.custServId = !filterObj.custServId ? null : filterObj.custServId;       // 融资顾问  
            }


            this.$axios.post("/api/mgm/assessmentApply/listData",{
                ...data
            }).then(res=>{
                console.log( "获取数据列表", res );
                if( res.code == 0 ){
                    let data = res.data;
                    this.tableData = data != null ? data.mgmAssessmentApplyList.map(item=>{
                        return {
                            id: item.id,
                            code: !item.code ? "-" : item.code,// 评估单号
                            assessTime: !item.assessTime? "-" : item.assessTime,// 评估时间   
                            userAccount: !item.userAccount ? "-" : item.userAccount,// 用户账号
                            enterpriseName: !item.enterpriseName ? "-" : item.enterpriseName,// 企业名称
                            financingAmount: item.financingAmount == null ? "-" : `￥${item.financingAmount}万`,// 申请额度
                            applyResult: item.applyResult == null ? "-" : this.applyResultObj[item.applyResult],// 评估结果
                            meetProductNum: item.meetProductNum == null ? "-" : `${item.meetProductNum}项`, // 适用产品
                            financingPlanStatus: item.financingPlanStatus == null ? "-" : this.financingPlanStatusObj[item.financingPlanStatus],// 融资申请
                            createTime: item.createTime// 申请时间
                        }
                    }) : [];

                    this.tablePagination.total = data != null ? data.totalSize : this.tablePagination.total;

                }
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

        /**
         * @description: 路由跳转-定制服务
         * @param {string} id 评估id
         * @Date Changed: 2020-07-13
         */
        goEvaluationDetails(id){
            this.$router.push({
                path: `/evaluationDetails/${id}`
            });
        },
    },

    // mounted() {
    //     const param={
        
    //     page:1,
    //     size:10
    //     }
    //     this.$axios.post('/api/mgm/assessmentApply/listData',param)
    //         .then((res) => {
    //             if(res.code===0){
    //                 this.tableData=res.data.mgmAssessmentApplyList;
    //             }
                
    //         })
    // },

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