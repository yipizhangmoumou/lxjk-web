<template>
  <div id="productCustomization">
        <div class="product-details">
            <div class="details-header">
                <div class="info">
                    <p>客户选定产品：申请额度合计：<span style="color: red;">¥{{initData.totalAmount}}万</span></p>
                </div>
                <el-button-group>
                    <!-- <el-button>短期 2/3</el-button>
                    <el-button>中期 0/3</el-button>
                    <el-button>长期 0/3</el-button> -->
                    <el-button 
                        :class="{active: initData.activeIdx=='short'}" 
                        @click="toggleActivePro('short')">
                        短期 {{initData.applicableProducts.pageMgmAssessmentApplyListShort.length}}/{{initData.selectedProducts.actionPlanProductListShort.length}}
                    </el-button>
                    <el-button 
                        :class="{active: initData.activeIdx=='middle'}"
                        @click="toggleActivePro('middle')">
                        中期 {{initData.applicableProducts.pageMgmAssessmentApplyListMiddle.length}}/{{initData.selectedProducts.actionPlanProductListMiddle.length}}
                    </el-button>
                    <el-button
                        :class="{active: initData.activeIdx=='long'}" 
                        @click="toggleActivePro('long')">
                        长期 {{initData.applicableProducts.pageMgmAssessmentApplyListLong.length}}/{{initData.selectedProducts.actionPlanProductListLong.length}}
                    </el-button>
                </el-button-group>
            </div>
            <div class="product-details-main">
                
                <!-- 二、评估适用产品 -->
                <div class="table-container">
                    <div class="table-header">
                        <h6>
                            <i class="el-icon-collection-tag"></i>
                            评估适用产品：
                        </h6>
                    </div>
                    <div class="table">
                        <el-table
                            :data="initData.currentAppProList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="idx" width="100px"></el-table-column>
                            <el-table-column label="客户选取" prop="selectProductStatus"></el-table-column>
                            <el-table-column label="客户ID" prop="productId"></el-table-column>
                            <el-table-column label="产品名称" prop="productName"></el-table-column>
                            <el-table-column label="产品类型" prop="productType"></el-table-column>
                            <el-table-column label="放款机构" prop="orgName"></el-table-column>
                            <el-table-column label="期数" prop="loanCycle"></el-table-column>
                            <el-table-column label="贷款利息" prop="loanInterest"></el-table-column>
                            <el-table-column label="还款方式" prop="repaymentStr"></el-table-column>
                            <el-table-column label="担保方式" prop="guaranteeMethodStr"></el-table-column>
                            <el-table-column label="最高申请额度" prop="financingAmount"></el-table-column>
                            <el-table-column label="定制状态" prop="actionStatus"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <div class="cz">
                                        <div @click="productCustomize(scope.row)">
                                            产品定制
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
                            <el-pagination
                                :current-page="initData.applicableProductsCurr"
                                :page-sizes="[10, 25, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="initData.currentAppProList.length"
                            ></el-pagination>
                        </div>
                        
                    </div>
                </div>

                <!-- 三、申请选定产品 -->
                <div class="table-container">
                    <div class="table-header">
                        <h6>
                            <i class="el-icon-collection-tag"></i>
                            申请选定产品：
                        </h6>
                        
                    </div>
                    <!-- show-summary
                        :summary-method="getSummaries"
                        :span-method="arraySpanMethod" -->
                    <div class="table">
                        <el-table
                            :data="initData.currentSelectedProList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="idx"></el-table-column>
                            <el-table-column label="产品ID" prop="productId"></el-table-column>
                            <el-table-column label="产品名称" prop="productName"></el-table-column>
                            <el-table-column label="产品类型" prop="productType"></el-table-column>
                            <el-table-column label="放款机构" prop="orgName"></el-table-column>
                            <el-table-column label="期数" prop="loanCycle"></el-table-column>
                            <el-table-column label="贷款利息" prop="loanInterest"></el-table-column>
                            <el-table-column label="还款方式" prop="repaymentStr"></el-table-column>
                            <el-table-column label="担保方式" prop="guaranteeMethodStr"></el-table-column>
                            <el-table-column label="前置付款项" prop="qzChargeItem"></el-table-column>
                            <el-table-column label="服务费" prop="servChargeItem"></el-table-column>
                            <el-table-column label="申请额度" prop="finalAmount"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <div class="cz">
                                        <div @click="aleryProEdit(scope.row)">
                                            编辑
                                        </div>
                                        <div @click="aleryProDelete(scope.row.childActionCode)">
                                            删除
                                        </div>
                                    </div>
                                </template>    
                            </el-table-column>
                            <div 
                                class="total selectedTotal" 
                                slot="append">
                                <p>申请额度小计：<span class='salary'> ¥{{initData.selectedProducts.currentTotal}}万</span></p>
                            </div>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
                            <el-pagination
                                :current-page="initData.selectedProductsCurr"
                                :page-sizes="[10, 25, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="initData.currentSelectedProList.length"
                            ></el-pagination>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
        
 
        <CopyRight />

        <!-- 
            @desc: 产品定制弹窗
         -->
        <ProCustModel v-model="proCustData.visible" :data="proCustData.data" @getInitData="getInitData"/>

        <!-- 
            @desc: 产品定制编辑弹窗
         -->
        <ProCustModelEdit v-model="proCustEditData.visible" :data="proCustEditData.data" @getInitData="getInitData"/>
  </div>
</template>

<script>
import ProCustModel from "./component/proCustModel"
import ProCustModelEdit from "./component/proCustModelEdit"
import CopyRight from "components/CopyRight";
export default {
    name: "productCustomization",
    data() {
        return {
            planCode: "", // 融资申请code

            initData: {
                totalAmount: 0,

                activeIdx: "short",  // 激活按钮状态 short | middle | long

                /*** ------ 评估适用产品：开始 ------ ***/ 
                applicableProducts: {
                    pageMgmAssessmentApplyListShort: [],  // 短期
                    pageMgmAssessmentApplyListMiddle: [],// 中期
                    pageMgmAssessmentApplyListLong: []   // 长期
                },
                currentAppProList: [], // 当前展示的列表数据
                applicableProductsCurr: 1,   //评估适用产品当前分页
                /*** ------ 评估适用产品：结束 ------ ***/

                /*** ------ 申请选定产品：开始 ------ ***/ 
                selectedProducts: {
                    actionPlanProductListShort: [],  // 短期
                    shortTotalFinalAmount: 0,        // 短期申请额度小计
                    actionPlanProductListMiddle: [],// 中期
                    middleTotalFinalAmount: 0,       // 中期申请额度小计
                    actionPlanProductListLong: [],   // 长期
                    longTotalFinalAmount: 0,        // 长期申请额度小计
                    currentTotal: 0                     
                },
                currentSelectedProList: [], // 当前展示的列表数据
                selectedProductsCurr: 1,   //  客户申请选定产品
                /*** ------ 申请选定产品：结束 ------ ***/


            },

            // 产品类型枚举
            productTypeObj: {
                "1": "短期",
                "2": "中期", 
                "3": "长期"
            },

            // 客户选取状态枚举
            selectProductStatusObj: {
                "0": "客户选定",
                "1": "否" 
            },




            
            byUseProTableData: [],
            alerdyProTableData: [],
            curr: 1,

            proCustData: {
                visible: false,
                data: {}
            },
            proCustEditData: {
                visible: false,
                data: {}
            },

        };
    },
    components: {
        ProCustModel,
        ProCustModelEdit,
        CopyRight
    },
    created() {

        // 接收路由中传递过来的编号id  "27184768-1db3-4f3b-bae8-188c45e57cc2";
        let planCode = this.planCode = this.$route.params.planCode;

        /**
         * @description: 获取页面初始数据
         * @param {string} planCode
         * @Date Changed: 2020-07-14
         */
        this.getInitData(planCode);

        

    },
    methods: {
        /**
         * @description: 短|中|长 按钮切换
         * @param {string} key 按钮类型
         * @Date Changed: 2020-07-14
         */    
        toggleActivePro(key){

            this.initData.activeIdx = key;
            switch(key){
                case "short":
                    console.log(  this.initData.selectedProducts.actionPlanProductListShort );
                    // 评估适用产品 短期
                    this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListShort;

                    // 申请选定产品 短期
                    this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListShort;

                    // 选定产品小计
                    this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.shortTotalFinalAmount;
                    break;
                case "middle":
                    // 评估适用产品 中期
                    this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListMiddle;

                    // 申请选定产品 中期
                    this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListMiddle;

                    // 中期申请额度小计
                    this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.middleTotalFinalAmount;

                    break;
                case "long":
                    // 评估适用产品 长期
                    this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListLong;

                    // 申请选定产品 长期
                    this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListLong;

                    // 长期申请额度小计
                    this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.longTotalFinalAmount;
                    break;
            }
        },    

        /**
         * @description: 初始数据加载：
         * @param {string}  planCode
         * @Date Changed: 2020-07-13
         */ 
        getInitData(planCode){
            this.$axios.post("/api/mgm/financingPlan/productCustomizationPage",{planCode})
                .then(res=>{
                    // console.log( "产品定制~",res );
                    if(res.code == 0){
                        let data = res.data;

                        // 已定制的产品总额度
                        this.initData.totalAmount = data.totalAmount == null ? 0 : data.totalAmount;

                        /** ------ 评估适用产品 数据重构：开始------ **/
                        // 短期
                        this.initData.applicableProducts.pageMgmAssessmentApplyListShort = !data.pageMgmAssessmentApplyListShort ? [] : data.pageMgmAssessmentApplyListShort.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息(列表中) | 贷款利息说明(弹窗中)
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount,// 最高申请额度
                                actionStatus: item.actionStatus === null ? "-" : item.actionStatus == "-1" ? "-" : "已定制",// 定制状态

                                amountRegin: !item.amountRegin ? "" : item.amountRegin,  // 申请额度范围
                                
                            }
                        });
                        // 中期
                        this.initData.applicableProducts.pageMgmAssessmentApplyListMiddle = !data.pageMgmAssessmentApplyListMiddle ? [] : data.pageMgmAssessmentApplyListMiddle.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount,// 最高申请额度
                                actionStatus: item.actionStatus === null ? "-" : item.actionStatus == "-1" ? "-" : "已定制",// 定制状态

                                amountRegin: !item.amountRegin ? "" : item.amountRegin,  // 申请额度范围
                            }
                        });
                        // 长期
                        this.initData.applicableProducts.pageMgmAssessmentApplyListLong = !data.pageMgmAssessmentApplyListLong ? [] : data.pageMgmAssessmentApplyListLong.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount,// 最高申请额度
                                actionStatus: item.actionStatus === null ? "-" : item.actionStatus == "-1" ? "-" : "已定制",// 定制状态

                                amountRegin: !item.amountRegin ? "" : item.amountRegin,  // 申请额度范围
                            }
                        });
                        
                        /** ------ 评估适用产品 数据重构：结束------ **/

                        /** ------ 评估申请选定产品 数据重构：开始------ **/ 
                        // 短期
                        this.initData.selectedProducts.actionPlanProductListShort = !data.actionPlanProductListShort ? [] : data.actionPlanProductListShort.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                childActionCode: item.childActionCode, // 产品的id
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                qzChargeItem: item.qzChargeItem === null ? "-" : item.qzChargeItem,// 前置付款项
                                servChargeItem: item.servChargeItem === null ? "-" : item.servChargeItem,// 服务费
                                finalAmount: item.finalAmount === null ? "-" : item.finalAmount,// 申请额度

                                interestRateRegion: !item.interestRateRegion ? "": item.interestRateRegion,  // 贷款利息范围
                                finalAmountRegion: !item.finalAmountRegion ? "": item.finalAmountRegion,    // 最高申请额度范围
                                qzChargeItemRate: !item.qzChargeItemRate ? "" : item.qzChargeItemRate,  // 前置费用利率范围
                                servChargeItemRate: !item.servChargeItemRate ? "" : item.servChargeItemRate // 服务费利率范围
                            }
                        });
                        // 短期申请额度小计
                        this.initData.selectedProducts.shortTotalFinalAmount = data.shortTotalFinalAmount;
                        
                        // 中期
                        this.initData.selectedProducts.actionPlanProductListMiddle = !data.actionPlanProductListMiddle ? [] : data.actionPlanProductListMiddle.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                childActionCode: item.childActionCode, // 产品的id
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                qzChargeItem: item.qzChargeItem === null ? "-" : item.qzChargeItem,// 前置付款项
                                servChargeItem: item.servChargeItem === null ? "-" : item.servChargeItem,// 服务费
                                finalAmount: item.finalAmount === null ? "-" : item.finalAmount,// 申请额度

                                interestRateRegion: !item.interestRateRegion ? "": item.interestRateRegion,  // 贷款利息范围
                                finalAmountRegion: !item.finalAmountRegion ? "": item.finalAmountRegion,    // 最高申请额度范围
                                qzChargeItemRate: !item.qzChargeItemRate ? "" : item.qzChargeItemRate,  // 前置费用利率范围
                                servChargeItemRate: !item.servChargeItemRate ? "" : item.servChargeItemRate // 服务费利率范围
                            }
                        });
                        // 中期申请额度小计
                        this.initData.selectedProducts.middleTotalFinalAmount = data.middleTotalFinalAmount;

                        // 长期
                        this.initData.selectedProducts.actionPlanProductListLong = !data.actionPlanProductListLong ? [] : data.actionPlanProductListLong.map((item,idx)=>{
                            return {
                                idx: idx,  // 序号
                                childActionCode: item.childActionCode, // 产品的id
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                qzChargeItem: item.qzChargeItem === null ? "-" : item.qzChargeItem,// 前置付款项
                                servChargeItem: item.servChargeItem === null ? "-" : item.servChargeItem,// 服务费
                                finalAmount: item.finalAmount === null ? "-" : item.finalAmount, // 申请额度

                                interestRateRegion: !item.interestRateRegion ? "": item.interestRateRegion,  // 贷款利息范围
                                finalAmountRegion: !item.finalAmountRegion ? "": item.finalAmountRegion,    // 最高申请额度范围
                                qzChargeItemRate: !item.qzChargeItemRate ? "" : item.qzChargeItemRate,  // 前置费用利率范围
                                servChargeItemRate: !item.servChargeItemRate ? "" : item.servChargeItemRate // 服务费利率范围
                            }
                        });
                        // 长期申请额度小计
                        this.initData.selectedProducts.longTotalFinalAmount = data.longTotalFinalAmount;

                        /** ------ 评估申请选定产品 数据重构：结束------ **/ 

                        
                        
                        /**
                         * @description: 根据当前激活的tab key 加载当前页面表格数据
                         * @Date Changed: 2020-07-16
                         */
                        switch(this.initData.activeIdx){
                            case 'short':
                               this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListShort; 
                               
                               this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListShort;

                               // 选定产品小计
                               this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.shortTotalFinalAmount;
                               break;
                            case 'middle':
                                this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListMiddle; 
                               
                                this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListMiddle;

                                // 选定产品小计
                                this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.middleTotalFinalAmount;
                                break;
                            case 'long':
                                this.initData.currentAppProList = this.initData.applicableProducts.pageMgmAssessmentApplyListLong; 
                               
                                this.initData.currentSelectedProList = this.initData.selectedProducts.actionPlanProductListLong;

                                // 选定产品小计
                                this.initData.selectedProducts.currentTotal = this.initData.selectedProducts.longTotalFinalAmount;
                                break;
                        }




                    }
                })

        },

        /**
         * @description: 评估使用产品【产品定制】按钮
         * @Date Changed: 2020-07-12
         */
        productCustomize(row){
            console.log( "当前数据", row );
            let { productId, productName, orgName, loanInterest, amountRegin  } = row;


            this.proCustData.data = {
                planCode: this.planCode,
                productId,
                productName,
                orgName,
                loanInterest,
                amountRegin
            }
            this.proCustData.visible = true
        },

        /**
         * @description: 已定制产品【编辑】按钮
         * @param {string} row 
         * @Date Changed: 2020-07-12
         */  
        aleryProEdit(row){
            console.log( row );
            let { childActionCode, productName, orgName, interestRateRegion, finalAmountRegion, qzChargeItemRate, servChargeItemRate} = row;




            this.proCustEditData.data = {
                planCode: this.planCode,
                childActionCode,
                productName,
                orgName,
                interestRateRegion,
                finalAmountRegion,
                qzChargeItemRate,
                servChargeItemRate
            }
            this.proCustEditData.visible = true;
        },

        /**
         * @description: 已定制产品【删除】按钮
         * @param {string} childActionCode 已定制产品的childActionCode
         * @Date Changed: 2020-07-12
         */  
        aleryProDelete(childActionCode){
            this.$confirm("是否确认删除该定制产品", "删除定制的产品", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                this.$axios.post(`/api/mgm/actionChildPlan/delete/${childActionCode}`)
                    .then(res=>{
                        // console.log("删除响应：",res);
                        if(res.code == 0){
                            this.$message({
                                type: "success",
                                message: "删除成功"
                            });

                            // 重新加载表格数据
                            this.getInitData(this.planCode);

                        }else{
                            this.$message({
                                showClose: true,
                                message: `删除失败！原因：${res.message}`,
                                type: 'error'
                            });  
                        }
                    })
                
                
            })
        }, 

    }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#productCustomization
    position relative
    .product-details
        margin 0 auto
        margin-top 16px
        width 1100px
        background-color #fff
        box-sizing border-box
        .details-header 
            padding: 14px 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height 80px
            border-bottom: 1px solid #e9e9e9;
            .info
                margin-right 10px
            .el-button-group
                .active 
                    color #fff
                    background #409eff
        .product-details-main
            padding 20px
            .table-container
                margin-top 20px
                padding-bottom 40px
                .table-header
                    margin-bottom 20px
                    display flex
                    align-items center
                    h5,h6
                        color #666
                    h5 
                        font-weight 700
                .apply-header
                    padding-bottom 20px
                    border-bottom 2px solid #f5f5f5
                .table
                    >>> .el-table
                        th
                            background-color #F5F5F5
                            div
                                color #666
                                font-size 14px !important
                        td div
                            font-size 12px !important
                        .cz
                            display flex
                            justify-content space-around
                            color #0079FE
                            cursor pointer
                        .total
                            padding 16px
                            font-size 16px
                            text-align  right
                            .salary
                                color red
                    .page-conatiner
                        margin-top 10px
                        display flex
                        justify-content flex-end
                .form-line
                    display flex
                    flex-wrap: wrap
                    justify-content space-around
                    >>> .el-form-item__content
                        margin 0 !important
                    >>> input, select
                        width 300px !important
                    >>> .el-form-item__label
                        width auto !important
                    >>> .el-form-item__content
                            .el-input
                            /deep/ .el-input__inner
                                border  none !important
                                cursor: auto
                                background  #fff !important

                    
                    &:after
                        display inline-block
                        content: ""
                        width 300px

                    
  #CopyRight
    copyRight()
</style>