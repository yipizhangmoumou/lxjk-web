<template>
    <div id="ExecutiveProgramme">

        <StatusList :ArrayList="executiveCount" />

        <SearchSix @simpleQuery="getBySimpleQuery"/>

        <div class="table-container">
            <div class="table-header">
                <h5>数据列表</h5>
                <div class="table-btn">
                    <el-button size="small" icon="el-icon-upload2">导出</el-button>
                    <!-- <el-button
                        size="small"
                        icon="el-icon-s-check"
                        type="primary"
                    >机构审核结果确认</el-button>
                    <el-button
                        size="small"
                        icon="el-icon-s-custom"
                        type="primary"
                    >机构放款结果确认</el-button>
                    <el-button
                        size="small"
                        icon="el-icon-s-custom"
                        type="primary"
                    >收款审核</el-button> -->
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
                    <el-table-column label="执行单号" prop="number"></el-table-column>
                    <el-table-column label="产品ID"  prop="name"></el-table-column>
                    <el-table-column label="产品名称" prop="name"></el-table-column>
                    <el-table-column label="产品类型" prop="address"></el-table-column>
                    <el-table-column label="申请额度" prop="employee"></el-table-column>
                    <el-table-column label="期数" prop="linkman"></el-table-column>
                    <el-table-column label="贷款利息" prop="mobile"></el-table-column>
                    <el-table-column label="还款方式" prop="createTime"></el-table-column>
                    <el-table-column label="担保方式" prop="status"></el-table-column>
                    <el-table-column label="申请企业" prop="status"></el-table-column>
                    <el-table-column label="放款机构" prop="status"></el-table-column>
                    <el-table-column label="前置付款项" prop="status"></el-table-column>
                    <el-table-column label="前置付款状态" prop="status"></el-table-column>
                    <el-table-column label="服务费" prop="status"></el-table-column>
                    <el-table-column label="服务费支付状态" prop="status"></el-table-column>
                    <el-table-column label="方案执行时间" prop="status"></el-table-column>
                    <el-table-column label="融资顾问" prop="status"></el-table-column>
                    <el-table-column label="来源" prop="status"></el-table-column>
                    <el-table-column label="状态" prop="status"></el-table-column>
                    <el-table-column label="完成时间" prop="status"></el-table-column>
                    <el-table-column prop="address" label="操作" width="150">
                        <template>
                            <div class="cz">
                                <div @click="goDeatils()">融资服务详情</div>
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
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        :current-page="tablePagination.curr"
                        :page-sizes="tablePagination.pageSizes"
                        :page-size="tablePagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tablePagination.total"
                    ></el-pagination>
                </div>
            </div>
        </div>
        <CopyRight />
    </div>
</template>

<script>
import CopyRight from "components/CopyRight";
import SearchSix from "components/Search/SearchSix";
import StatusList from "components/StatusList";
export default {
    name: "ExecutiveProgramme",
    data() {
        return {
            // 融资执行方案管理统计数据
            executiveCount: [
                {
                    name: "全部执行单",
                    key: "totalSize",
                    count: 2000,
                    color: "#58A3F7"
                },
                {
                    name: "前置收款待审核",
                    key: "qzSize",
                    count: 2000,
                    color: "#FEC03D"
                },
                {
                    name: "待放款机构审核",
                    key: "agencyVerSize",
                    count: 2000,
                    color: "#FEC03D"
                },
                {
                    name: "服务收款待审核",
                    key: "servSize",
                    count: 2000,
                    color: "#8167F5"
                },
                {
                    name: "已完成",
                    key: "finishedSize",
                    count: 2000,
                    color: "#4BCED0"
                },
                {
                    name: "已关闭",
                    key: "closedSize",
                    count: 2000,
                    color: "#FB6260"
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

            // 前置付款项状态枚举
            qzChargeItemStatusObj: {
                "1": "待支付",
                "2": "支付中",
                "3": "已付款",
                "4": "确认收款"
            },

            // 服务费付款项状态枚举
            servChargeItemStatusObj: {
                "1": "待支付",
                "2": "支付中",
                "3": "已付款",
                "4": "确认收款"
            },
            // 状态
            actionStatusObj: {
                "0": "申请中",
                "1": "待风控审核",
                "2": "待付款前置收费项",
                "3": "待放款机构审核",
                "4": "待银行/机构签约放款",
                "5": "待付款服务费",
                "6": "服务完成",
                "7": "服务取消"
            },




            // curr: 1,
            multipleSelection: [],
            dialogFormVisible: false,
            options:{},
            value:"",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            formLabelWidth: "120px",
            
        };
    },
    components: {
        SearchSix,
        CopyRight,
        StatusList
    },

    created() {

        // 数据加载-待融资顾问服务数量，待服务定制数量，待服务执行数量，已完成数量
        this.getCalNumData();

        // 数据加载-获取数据列表
        this.getTableData();



        // for (let index = 0; index < 11; index++) {
        //     this.tableData.push({
        //         number: parseInt(Math.random() * 1000000),
        //         name: "机构名称" + index,
        //         address: "地区" + index,
        //         employee: "员工人数" + index,
        //         linkman: "联系人" + index,
        //         mobile: "联系方式" + index,
        //         createTime: "2020-03-09 12:34:23",
        //         status: index % 2 == 0 ? "已开通" : "未开通",
        //         codeUrl: "http://www.baidu.com"
        //     });
        // }
    },

    methods: {
        /**
         * @description: 初始数据加载：全部执行单 前置收款待审核 待放款机构审核 服务收款待审核 已完成 已关闭
         * @Date Changed: 2020-07-12
         */     
        getCalNumData(){
            this.$axios.post('/api/mgm/actionChildPlan/calNum')
                .then(res => {
                    console.log(`/api/mgm/actionChildPlan/calNum`, res);
                    if(res.code===0){
                        let data = res.data;
                        this.executiveCount.forEach(item=>{
                            if( item.key == 'totalSize' ){
                                item.count = data.totalSize;
                            }
                            if( item.key == 'qzSize' ){
                                item.count = data.qzSize;
                            }
                            if( item.key == 'agencyVerSize' ){
                                item.count = data.agencyVerSize;
                            }
                            if( item.key == 'servSize' ){
                                item.count = data.servSize;
                            }
                            if( item.key == 'finishedSize' ){
                                item.count = data.finishedSize;
                            }
                            if( item.key == 'closedSize' ){
                                item.count = data.closedSize;
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
                data.childPlanCode = !filterObj.childPlanCode ? null : filterObj.childPlanCode;
                data.actionStatus  = filterObj.actionStatus === "" ? null : filterObj.actionStatus;
                data.actionTime = !filterObj.actionTime ? null : filterObj.actionTime;
            }
            

            if( !!filterObj && filterObj.type == "advanced" ){
                data.planCode = !filterObj.planCode ? null: filterObj.planCode;         // 服务单号
                data.contact = !filterObj.contact ? null : filterObj.contact;          // 电话
                data.enterpriseName = !filterObj.enterpriseName ? null : filterObj.enterpriseName;   // 企业名称
                data.actionStatus = filterObj.actionStatus === "" ? null : filterObj.actionStatus;     // 服务状态
                data.startTime = !filterObj.createTime ? null : filterObj.createTime;       // 服务申请时间
                data.custServId = !filterObj.custServId ? null : filterObj.custServId;       // 融资顾问  
            }


            this.$axios.post("/api/mgm/actionChildPlan/listData",{
                ...data
            }).then(res=>{
                console.log( "获取数据列表", res );
                if( res.code == 0 ){
                    let data = res.data;
                    this.tableData = data != null ? data.mgmActionChildPlanList.map(item=>{
                        return {
                            childPlanCode: item.childPlanCode,//执行单号 
                            //产品ID 
                            productName: item.productName,//产品名称 
                            productTypeName: item.productTypeName,//产品类型 
                            finalAmount: item.finalAmount,//申请额度 
                            loanCycle: item.loanCycle,//期数 
                            //贷款利息 
                            repaymentStr: item.repaymentStr,//还款方式 
                            applicationMethodStr: item.applicationMethodStr,//申请方式 
                            guaranteeMethodStr: item.guaranteeMethodStr,//担保方式 
                            enterpriseName: item.enterpriseName,//申请企业 
                            orgName: item.orgName,//放款机构 
                            qzChargeItem: item.qzChargeItem,//前置付款项 
                            qzChargeItemStatus: item.qzChargeItemStatus,//前置付款状态 
                            servChargeItem: item.servChargeItem,//服务费
                            servChargeItemStatus: item.servChargeItemStatus,//服务费支付状态 
                            createTime: item.createTime,//方案执行时间 
                            custSerName: item.custSerName,//融资顾问 
                            promoterName: item.promoterName,//来源 
                            actionStatus: item.actionStatus,//状态 
                            finishTime: item.finishTime//完成时间 
                        }
                    }) : [];

                    this.tablePagination.total = data != null ? data.totalSize : this.tablePagination.total;

                }
            })

        },

        /**
         * @description: 数据筛选加载：简略筛选
         * @param {json} filterObj  
         * @Date Changed: 2020-07-13
         */
        getBySimpleQuery(filterObj){
            // 筛选参数中加入筛选类型
            filterObj.type = "simple";

            this.getTableData(filterObj); 
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
        goDeatils(){
        this.$router.push({
            path:'/ServiceDetails',

        })
        },
    },
    

};
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/fn.styl'
#ExecutiveProgramme
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