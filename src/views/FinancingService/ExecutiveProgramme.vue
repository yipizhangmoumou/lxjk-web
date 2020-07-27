<template>
    <div id="ExecutiveProgramme">

        <StatusList :ArrayList="executiveCount" />

        <SearchSix @simpleQuery="getBySimpleQuery"/>

        <div class="table-container">
            <div class="table-header">
                <h5>数据列表</h5>
                <div class="table-btn">
                    <el-button size="small" icon="el-icon-upload2">导出</el-button>

                    <!-- 放款机构审核结果确认：待处理 -->
                    <el-button
                        v-if="isAdminRole"
                        size="small"
                        icon="el-icon-s-check"
                        type="primary"
                        @click="payResultModel">
                        放款机构审核结果确认 
                    </el-button>
                    
                    <el-button
                        v-if="isAdminRole"
                        size="small"
                        icon="el-icon-s-custom"
                        type="primary"
                        @click="loanConfirmationEvent">
                        机构放款结果确认
                    </el-button>

                    <el-button
                        v-if="isReceivables"
                        size="small"
                        icon="el-icon-s-custom"
                        type="primary"
                        @click="receiptConfirmationEvent">
                        收款审核
                    </el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                    ref="tableData"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :stripe="true"
                    :border="true">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="执行单号" prop="childPlanCode"></el-table-column>
                    <el-table-column label="产品ID"  prop="productId"></el-table-column>
                    <el-table-column label="产品名称" prop="productName"></el-table-column>
                    <el-table-column label="产品类型" prop="productTypeName"></el-table-column>
                    <el-table-column label="申请额度" prop="finalAmount"></el-table-column>
                    <el-table-column label="期数" prop="loanCycle"></el-table-column>
                    <el-table-column label="贷款利息" prop="interestRate"></el-table-column>
                    <el-table-column label="还款方式" prop="repaymentStr"></el-table-column>
                    <el-table-column label="申请方式" prop="applicationMethodStr"></el-table-column>
                    <el-table-column label="担保方式" prop="guaranteeMethodStr"></el-table-column>
                    <el-table-column label="申请企业" prop="enterpriseName"></el-table-column>
                    <el-table-column label="放款机构" prop="orgName"></el-table-column>
                    <el-table-column label="前置付款项" prop="qzChargeItem"></el-table-column>
                    <el-table-column label="前置付款状态" prop="qzChargeItemStatus"></el-table-column>
                    <el-table-column label="服务费" prop="servChargeItem"></el-table-column>
                    <el-table-column label="服务费支付状态" prop="servChargeItemStatus"></el-table-column>
                    <el-table-column label="方案执行时间" prop="actionTime"></el-table-column>
                    <el-table-column label="融资顾问" prop="custSerName"></el-table-column>
                    <el-table-column label="来源" prop="promoterName"></el-table-column>
                    <el-table-column label="状态" prop="actionStatus"></el-table-column>
                    <el-table-column label="完成时间" prop="finishTime"></el-table-column>
                    <el-table-column prop="address" label="操作" width="150">
                        <template slot-scope="scope">
                            <div class="cz">
                                <div @click="goServiceDetails(scope.row.childPlanCode)">融资服务详情</div>
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
                        @current-change="changeCurrent"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tablePagination.total"
                    ></el-pagination>
                </div>
            </div>
        </div>

        <CopyRight />

        <!-- 
            * desc: 放款机构审核结果确认
                在列表数据处于【3】状态  才可以审核
         -->
        <PayResultModel v-model="payResulData.visible" :data="payResulData.data" @getInitData="getTableData"/>

        <!-- 
            * desc:  机构放款结果确认 
                在列表数据处于【已申请】状态 才可以审核
         -->
        <LoanConfirmationModel  v-model="loanConfirmationData.visible" :data="loanConfirmationData.data" @getInitData="getTableData"/>

        <!-- 
            * desc:  机构放款结果确认 
                在列表数据处于【已申请】状态 才可以审核
         -->
        <ReceiptConfirmationModel  v-model="receiptConfirmationata.visible" :data="receiptConfirmationata.data" @getInitData="getTableData"/>

    </div>
</template>

<script>
import CopyRight from "components/CopyRight";
import SearchSix from "components/Search/SearchSix";
import StatusList from "components/StatusList";

// 放款机构审核结果确认弹出窗
import PayResultModel from './executiveManagement/PayResultModel'

// 放款机构放款结果确认弹出窗组件
import LoanConfirmationModel from './executiveManagement/LoanConfirmationModel';

// 付款项收款审核
import ReceiptConfirmationModel from './executiveManagement/ReceiptConfirmationModel';

// 处理数据格式函数封装
import dateFormat from './../../unit/dataForamt';
export default {
    name: "ExecutiveProgramme",
    data() {
        return {
            isAdminRole: false,
            isReceivables: false,
            
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
                "7": "服务取消",
                "8": "风控审核不通过",  
                "9": "机构审核不通过"
            },

            // 机构放款结果确认弹窗数据
            payResulData: {
                visible: false,
                data: {}
            },

            // 机构放款结果弹窗数据
            loanConfirmationData: {
                visible: false,
                data: {}
            },

            // 付款项收款审核弹窗数据
            receiptConfirmationata: {
                visible: false,
                data: {}
            },




            options:{},
            value:"",

        };
    },
    components: {
        SearchSix,
        CopyRight,
        StatusList,
        PayResultModel,
        LoanConfirmationModel,
        ReceiptConfirmationModel
    },

    created() {

        // 数据加载-待融资顾问服务数量，待服务定制数量，待服务执行数量，已完成数量
        this.getCalNumData();

        // 数据加载-获取数据列表
        this.getTableData();


    },
    mounted(){
        /**
         * @description: 判断用户当前权限
         * @param {string} loginUserInfo 用户信息
         * @Date Changed: 2020-07-18
         */
        this.getUseRole(this.loginUserInfo);
    },
    methods: {

        /**
         * @description: 根据用户信息【userInfo】中得role属性判断当前用户权限
         * @param {type} userInfo 用户信息
         * @Date Changed: 2020-07-19
         */
        getUseRole(loginUserInfo){
            let {role} = loginUserInfo;
            switch(role){
                case 'admin':  // admin  放款机构审核确认  放款机构审核确认
                    this.isAdminRole = true;
                    break;
                case 'receivables': // 付款财务审核确认
                    this.isReceivables = true;
                    break;
                default:
                    this.isAdminRole = false;
                    this.isReceivables = false;
            }
        },

        /**
         * @description: 初始数据加载：全部执行单 前置收款待审核 待放款机构审核 服务收款待审核 已完成 已关闭
         * @Date Changed: 2020-07-12
         */     
        getCalNumData(){
            this.$axios.post('/api/mgm/actionChildPlan/calNum')
                .then(res => {
                    // console.log(`/api/mgm/actionChildPlan/calNum`, res);
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
                data.financingPlanCode = !filterObj.financingPlanCode ? null : filterObj.financingPlanCode;
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
                // console.log( "获取数据列表", res );
                if( res.code == 0 ){
                    let data = res.data;
                    this.tableData = data != null ? data.mgmActionChildPlanList.map((item)=>{
                        return {
                            childPlanCode: !item.childPlanCode ? "-" : item.childPlanCode ,//执行单号 
                            productId: !item.productId ? "-" : item.productId,//产品ID 
                            productName: !item.productName ? "-" : item.productName,//产品名称 
                            productTypeName: !item.productTypeName ? "-" : item.productTypeName,//产品类型 
                            finalAmount: !item.finalAmount ? "-" : item.finalAmount,//申请额度 
                            loanCycle: !item.loanCycle ? "-" : item.loanCycle,//期数 
                            interestRate: !item.interestRate ? "-" : item.interestRate, //贷款利息 
                            repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,//还款方式 
                            applicationMethodStr: !item.applicationMethodStr ? "-" : item.applicationMethodStr ,//申请方式 
                            guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,//担保方式 
                            enterpriseName: !item.enterpriseName ? "-" : item.enterpriseName,//申请企业 
                            orgName: !item.orgName ? "-" : item.orgName,//放款机构 
                            qzChargeItem: !item.qzChargeItem ? "-" : item.qzChargeItem,//前置付款项 
                            qzChargeItemStatus: item.qzChargeItemStatus === null ? "-" : this.qzChargeItemStatusObj[item.qzChargeItemStatus],//前置付款状态 
                            servChargeItem: !item.servChargeItem ? "-" : item.servChargeItem,//服务费
                            servChargeItemStatus: item.servChargeItemStatus === null ? "-" : this.servChargeItemStatusObj[item.servChargeItemStatus],//服务费支付状态 
                            actionTime: !item.actionTime ? "-" : dateFormat.dateFmt(item.actionTime),//方案执行时间 
                            custSerName: !item.custSerName ? "-" : item.custSerName,//融资顾问 
                            promoterName: !item.promoterName ? "-" : item.promoterName,//来源 
                            actionStatus: item.actionStatus === null ? "" : this.actionStatusObj[item.actionStatus],//状态 
                            actionStatusValue: item.actionStatus,//状态 原始值
                            finishTime: !item.finishTime ? "-" : dateFormat.dateFmt(item.finishTime)//完成时间 
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

        /**
         * @description: 路由跳转-融资服务详情
         * @param {string} financingCode 服务id
         * @Date Changed: 2020-07-13 
         */
        goServiceDetails(financingCode){
            this.$router.push({
                path: `/ServiceDetails/${financingCode}`
            });
        },

        /**
         * @description: 【放款机构审核结果确认】按钮事件
         * @Date Changed: 2020-07-23
         */
        payResultModel(){

            console.log( "[放款机构审核结果确认]选定的数据：", this.$refs.tableData.selection );

            let selectedData = this.$refs.tableData.selection;

            if( selectedData.length < 1 ){
                this.$message({
                    showClose: true,
                    message: '请选定需要【放款审核结果确认】操作的数据项！',
                    type: 'warning'
                });
            } else if( selectedData.length > 1 ){
                this.$message({
                    showClose: true,
                    message: '目前不支持批量审核！',
                    type: 'warning'
                });
            } else{

                let {childPlanCode, productName, orgName, actionStatusValue } = selectedData[0];

                if(actionStatusValue == 3){  
                    

                    this.payResulData.data = {
                        childPlanCode,
                        productName,
                        orgName,
                    }

                    this.payResulData.visible = true;
                    
                }else if(actionStatusValue >= 3 ){  // 【放款机构审核结果确认】已审批
                    
                    this.$message({
                        showClose: true,
                        message: '当前单号已审批，请勿重复审批！',
                        type: 'warning'
                    });
                    
                }else if( actionStatusValue == 2 ){  // 【付款项收款审核】
                    this.$message({
                        showClose: true,
                        message: '请等待【付款项收款审核】操作！',
                        type: 'warning'
                    });    
                }else if(actionStatusValue == 1){   // 【付款项收款审核】
                    this.$message({
                        showClose: true,
                        message: '请等待风控审核】操作！',
                        type: 'warning'
                    });
                }else if(actionStatusValue == 0){   // 【风控审核】
                    this.$message({
                        showClose: true,
                        message: '请等待【风控审核】操作！',
                        type: 'warning'
                    });
                }
            } 
        },

        /**
         * @description: 【机构放款结果确认】按钮事件
         * @param {type} 
         * @return: 
         * @Date Changed: 
         */        
        loanConfirmationEvent(){
            // console.log( "选定的数据：", this.$refs.tableData.selection );

            let selectedData = this.$refs.tableData.selection;

            if( selectedData.length < 1 ){
                this.$message({
                    showClose: true,
                    message: '请选定需要【放款审核结果确认】操作的数据项！',
                    type: 'warning'
                });
            } else if( selectedData.length > 1 ){
                this.$message({
                    showClose: true,
                    message: '目前不支持批量审核！',
                    type: 'warning'
                });
            } else{

                let {childPlanCode, productName, orgName, actionStatusValue } = selectedData[0];

                if(actionStatusValue == 4){  
                    

                    this.loanConfirmationData.data = {
                        childPlanCode,
                        productName,
                        orgName,
                    }

                    this.loanConfirmationData.visible = true;
                    
                }else if(actionStatusValue > 4 ){  // 【机构放款结果确认】已审批
                    
                    this.$message({
                        showClose: true,
                        message: '当前单号已审批，请勿重复审批！',
                        type: 'warning'
                    });
                    
                }else if( actionStatusValue == 3 ){  // 【放款机构审核结果确认】
                    this.$message({
                        showClose: true,
                        message: '请等待【放款机构审核结果确认】操作！',
                        type: 'warning'
                    });    
                }else if( actionStatusValue == 2 ){  // 【付款项收款审核】
                    this.$message({
                        showClose: true,
                        message: '请等待【付款项收款审核】操作！',
                        type: 'warning'
                    });    
                }else if(actionStatusValue == 1){   // 【风控审核】
                    this.$message({
                        showClose: true,
                        message: '请等待【风控审核】操作！',
                        type: 'warning'
                    });
                }else if(actionStatusValue == 0){   // 【风控审核】
                    this.$message({
                        showClose: true,
                        message: '请等待【风控审核】操作！',
                        type: 'warning'
                    });
                }


                

                

            }            
        },

        /**
         * @description: 【付款项收款审核】按钮事件
         * @param {type} 
         * @return: 
         * @Date Changed: 
         */ 
        receiptConfirmationEvent(){


            // console.log( "选定的数据：", this.$refs.tableData.selection );

            let selectedData = this.$refs.tableData.selection;

            if( selectedData.length < 1 ){
                this.$message({
                    showClose: true,
                    message: '请选定需要付款项收款审核的数据项！',
                    type: 'warning'
                });
            } else if( selectedData.length > 1 ){
                this.$message({
                    showClose: true,
                    message: '目前不支持批量审核！',
                    type: 'warning'
                });
            } else{

                let {childPlanCode, productName, finalAmount, qzChargeItem, servChargeItem, actionStatusValue } = selectedData[0];

                if(actionStatusValue == 2){  // 前置付款项审核

                    this.receiptConfirmationata.data = {
                        childPlanCode,
                        actionStatusValue,
                        productName, // 产品名称
                        finalAmount,           // 申请额度
                        qzChargeItem,            // 前置付款项
                        servChargeItem            // 服务费
                        
                    }

                    this.receiptConfirmationata.visible = true;
                    
                }else if(actionStatusValue == 5){  // 服务费付款项审核

                    this.receiptConfirmationata.data = {
                            childPlanCode,
                            actionStatusValue,
                            productName, // 产品名称
                            finalAmount,           // 申请额度
                            qzChargeItem,            // 前置付款项
                            servChargeItem            // 服务费
                            
                        }

                    this.receiptConfirmationata.visible = true;

                }else if(actionStatusValue == 0){
                    this.$message({
                        showClose: true,
                        message: '请等待【风险审核】操作！',
                        type: 'warning'
                    });   
                }  else if(actionStatusValue == 1){
                    this.$message({
                        showClose: true,
                        message: '请等待【付款项收款审核】操作！',
                        type: 'warning'
                    });   
                }  else if(actionStatusValue == 3){
                    this.$message({
                        showClose: true,
                        message: '请等待【机构放款结果确认】操作！',
                        type: 'warning'
                    });   
                }  else if(actionStatusValue == 4){  
                    this.$message({
                        showClose: true,
                        message: '请等待【放款机构审核结果确认】操作！',
                        type: 'warning'
                    }); 
                }else{
                    this.$message({
                        showClose: true,
                        message: '当前单号已审批，请勿重复审批！',
                        type: 'warning'
                    });
                }

            } 

        },       


        InstitutionalReview(){
            this.InstitutionalReview_show = true;
        },


        LendingInstitutions(){
            this.LendingInstitutions_show = true;
        },
        collection(){
            this.collection_show = true;
        },
        InstitutionalReview_cancel(){},
        InstitutionalReview_save(){
            console.log(this.InstitutionalReview_form)
        },
        LendingInstitutions_cancel(){},
        LendingInstitutions_save(){
            console.log(this.InstitutionalReview_form)
        },
        collection_cancel(){},
        collection_save(){
            console.log(this.InstitutionalReview_form)
        },
        changeCurrent(val){
            // console.log( val ); 

            // 赋值当前页
            this.tablePagination.curr = val;

            // 更新表格数据
            this.getTableData();
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
<style scoped>
/* .j_dailog .el-dialog{
    width:600px
}
.j_dailog .el-dialog__title{
    font-size: 16px;
    font-family: MicrosoftYaHei, 微软雅黑;
    font-weight: 400;
    font-style: normal;
}
.j_dailog .el-dialog__header{
    border-bottom: rgb(228,228,228);
    background: rgb(242,242,242);
}
.j_dailog .el-form{
    padding: 0 30px;
}
.el-dialog__footer{
    padding: 16px;
    border-top: 1px solid #e5e5e5;
} */
</style>