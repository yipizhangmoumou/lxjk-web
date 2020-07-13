<template>
    <div id="ServiceAdmin">
        <StatusList :ArrayList="serviceCount" />

        <SearchFive @simpleQuery="getBySimpleQuery" @advancedQuery="getByAdvancedQuery" />

        <div class="table-container">
        <div class="table-header">
            <h5>数据列表</h5>
            <div class="table-btn">
                <el-button size="small" icon="el-icon-upload2">导出</el-button>
                <!-- <el-button
                    size="small"
                    icon="el-icon-s-check"
                    type="primary"
                >
                    融资服务审核
                </el-button> -->
                <!--  -->
                <el-button
                    size="small"
                    icon="el-icon-s-custom"
                    type="primary"
                    @click="assginAdvistor">
                    分配融资顾问
                </el-button>
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
                <el-table-column label="服务单号" prop="financingCode"></el-table-column>
                <!-- <el-table-column label="申请时间" prop="name"></el-table-column> -->
                <el-table-column label="用户账号" prop="userAccount"></el-table-column>
                <el-table-column label="联系人" prop="contactPerson"></el-table-column>
                <el-table-column label="电话" prop="contact"></el-table-column>
                <el-table-column label="企业名称" prop="enterpriseName"></el-table-column>
                <el-table-column label="申请额度" prop="financingAmount"></el-table-column>
                <el-table-column label="适用产品" prop="meetProductNum"></el-table-column>
                <el-table-column label="选择产品" prop="selectProductNum"></el-table-column>
                <el-table-column label="申请时间" prop="createTime"></el-table-column>
                <el-table-column label="融资顾问" prop="custServName"></el-table-column>
                <el-table-column label="状态" prop="actionStatus"></el-table-column>

                <el-table-column prop="address" label="操作" width="150">
                    <template slot-scope="scope">
                        <div class="cz">
                            <div @click="goCustomization(scope.row.financingCode)">定制服务</div>
                            <div @click="goServiceDetails(scope.row.financingCode)">融资服务详情</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-container">
            <div class="selectBtn">
                <el-button size="small" @click="selectAll">全选</el-button>
                <el-button size="small" @click="invertSelection(tableData)">反选</el-button>
                <el-select v-model="value" placeholder="批量操作" @change="batchOperating">
                    <!-- <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option> -->
                    <el-option label="批量操作" value></el-option>
                    <el-option label="批量分配融资顾问" value="assginAdvistor"></el-option>
                </el-select>
            </div>
            <!-- 分页 -->
            <el-pagination
                :current-page="tablePagination.curr"
                :page-sizes="tablePagination.pageSizes"
                :page-size="tablePagination.pageSize"
                :total="tablePagination.total"
                @size-change="changePageSize"
                @current-change="changeCurrent"
                layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
            </div>
        </div>

        <!-- 分配融资顾问---【弹出窗】 -->
        <el-dialog title="分配融资顾问" :visible.sync="isShowAdvisor" width="30%">
            <el-form :model="form">
                <el-form-item label="选择融资顾问：" label-width="120px">
                    <el-select v-model="form.region" placeholder="请选择融资顾问">
                        <el-option 
                            v-for="(custServ,idx) in custServList" 
                            :key="idx"
                            :label="custServ.userName" 
                            :value="custServ.id">
                        </el-option> 
                    </el-select>
                </el-form-item>
            </el-form>
            <p style="margin-left:52px">当前服务客户数：3人</p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowAdvisor = false">取 消</el-button>
                <el-button type="primary" @click="isShowAdvisor = false">确 定</el-button>
            </div>
        </el-dialog>

        </div>
        <CopyRight />
    </div>
</template>

<script>
import CopyRight from "components/CopyRight";
import SearchFive from "components/Search/SearchFive";
import StatusList from "components/StatusList";

import dateFormat from './../../unit/dataForamt'

export default {
    name: "ServiceAdmin",
    data() {
        return {
            // 融资服务管理数据统计
            serviceCount: [
                {
                    name: "待融资顾问服务",
                    key: "waitSeredNum",
                    count: 2000,
                    color: "#58A3F7"
                },
                {
                    name: "待服务定制",
                    key: "waitMadeNum",
                    count: 2000,
                    color: "#FEC03D"
                },
                {
                    name: "待服务执行",
                    key: "waitActionNum",
                    count: 2000,
                    color: "#FEC03D"
                },
                {
                    name: "已完成",
                    key: "finishedNum",
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

            // 状态枚举
            statusObj: {
                "1": "待融资顾问服务",
                "2": "待服务定制",
                "3": "待服务执行",
                "4": "服务完成"
            },


            isShowAdvisor: false,   // 分配融资顾问弹窗
            // 融资顾问列表
            custServList: [],
            





            multipleSelection: [],


            
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
        SearchFive,
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

            this.$axios.post('/api/mgm/financingPlan/calNum')
                .then(res => {
                    // console.log(`/api/mgm/financingPlan/calNum`, res);
                    if(res.code===0){
                        let data = res.data;
                        this.serviceCount.forEach(item=>{
                            if( item.key == 'waitSeredNum' ){
                                item.count = data.waitSeredNum;
                            }
                            if( item.key == 'waitMadeNum' ){
                                item.count = data.waitMadeNum;
                            }
                            if( item.key == 'waitActionNum' ){
                                item.count = data.waitActionNum;
                            }
                            if( item.key == 'finishedNum' ){
                                item.count = data.finishedNum   ;
                            }
                        });
                    }
                
                })    
        },   

        /**
         * @description: 初始数据加载：数据列表数据获取
         * @param {type} 
         * @return: 
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


            this.$axios.post("/api/mgm/financingPlan/listData",{
                ...data
            }).then(res=>{
                console.log( "获取数据列表", res );
                if( res.code == 0 ){
                    let data = res.data;
                    this.tableData = data.mgmFinancingPlanList.map(item=>{
                        return {
                            financingCode: !item.financingCode ? "-" : item.financingCode,// 服务单号
                            userAccount: !item.userAccount ? "-" : item.userAccount,// 用户账号
                            contactPerson: !item.contactPerson ? "-" : item.contactPerson ,// 联系人
                            contact: !item.contact ? "-" : item.contact , // 电话
                            enterpriseName: !item.enterpriseName ? "-" : item.enterpriseName,// 企业名称
                            financingAmount: item.financingAmount == null ? "-" : `￥${item.financingAmount}万`,// 申请额度
                            meetProductNum: item.meetProductNum == null ? "-" : `${item.meetProductNum}项`, // 适用产品
                            selectProductNum: item.selectProductNum == null ? "-" : `${item.selectProductNum}项`,// 选择产品
                            createTime: !item.createTime ? "-" : dateFormat.dateFmt(item.createTime),// 申请时间
                            custServName: !item.custServName ? "-" :  item.custServName,// 融资顾问
                            actionStatus: item.actionStatus == null ? "-" : this.statusObj[item.actionStatus] // 状态
                        }
                    });

                    this.tablePagination.total = data.totalSize || this.tablePagination.total;

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

        getByAdvancedQuery(filterObj){
            console.log( "父组件中接收到的高级过滤的数据",filterObj  );

            // 筛选参数中加入筛选类型
            filterObj.type = "advanced";

            this.getTableData(filterObj); 

        },


        /**
         * @description: 数据列表-【全选】
         * @Date Changed: 2020-07-12
         */
        selectAll() {
            this.$refs.multipleTable.toggleAllSelection();
        },

        /**
         * @dir 数据列表-【反选】
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
         * @description: 批量操作事件行为监听
         * @Date Changed: 2020-07-13
         */
        batchOperating(el){            
            switch(el){
                case "assginAdvistor":   // 批量分配融资顾问
                    this.assginAdvistor();
                    break;
                case "":        // 重置操作
                    break;
            }
        },

        /**
         * @description: 数据列表-【当前页显示数据数量】更换
         * @param {Number} val 当前页显示数量
         * @Date Changed: 2020-07-13
         */  
        changePageSize(val){
            // console.log(  "变更分页当前页显示数据数量：", this.tablePagination , val );
            
            // 赋值当前页显示数据数量
            this.tablePagination.pageSize = val;

            // 更新表格数据
            this.getTableData();

        },

        /**
         * @description: 数据列表-当前页变更
         * @param {Number} val 当前页码
         * @Date Changed: 2020-07-13
         */     
        changeCurrent(val){
            // console.log( val ); 

            // 赋值当前页
            this.tablePagination.curr = val;

            // 更新表格数据
            this.getTableData();
        },

        /**
         * @description: 初始数据加载：获取融资顾问列表
         * @Date Changed: 2020-07-13
         */        
        getAssginAdvistorData(){
            this.$axios.post("/api/mgm/financingPlan/listFinancingAdviser")
                .then(res=>{
                    console.log( "获取融资顾问数据：", res ); 
                    if(res.code == 0){
                        let data = res.data;
                        this.custServList = data.map(item=>{
                            return {
                                id: item.id,
                                // phone: item.phone,
                                // userAccount: item.userAccount,
                                userName: item.userName,
                                // createTime: item.createTime,
                                // enterpriseName: item.enterpriseName,
                                // hasBindWx: item.hasBindWx,
                            }
                        })
                    }
                });
        },

        /**
         * @description: 分配融资顾问按钮
         * @param {type} 
         * @return: 
         * @Date Changed: 
         */
        assginAdvistor(){
            console.log( "选定的数据：", this.$refs.multipleTable.selection );
            let selectedData = this.$refs.multipleTable.selection;

            if( selectedData.length < 1 ){
                this.$message({
                    showClose: true,
                    message: '请选定需要分配融资顾问的服务数据！',
                    type: 'warning'
                });
            } else {
                this.getAssginAdvistorData();
                this.isShowAdvisor = true;
            }   

            
        },

        /**
         * @description: 路由跳转-定制服务
         * @param {string} financingCode 服务id
         * @Date Changed: 2020-07-13
         */
        goCustomization(financingCode){
            this.$router.push({
                path: `/customization/${financingCode}`
            });
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
        }
        






    },
    
    
};
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/fn.styl'
#ServiceAdmin
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