<template>
  <div id="EvaluationDetails">
        <ElSteps :stepArr="initData.stepData" :stepActive="initData.stepActive" />

        <div class="evaluation-details">
            <div class="details-header">
                订单编号：{{ id }}
            </div>
            <div class="evaluation-details-main">
                <!-- 一、基本信息 -->
                <div class="table-container">
                    <div class="table-header">
                        <h5>
                            <i class="el-icon-collection-tag"></i>
                            基本信息
                        </h5>
                    </div>
                    <div class="table">
                        <el-table
                            :data="initData.baseInfoTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="用户ID" prop="id" width="100px"></el-table-column>
                            <el-table-column label="企业名称" prop="name"></el-table-column>
                            <el-table-column label="融资方式" prop="type"></el-table-column>
                            <el-table-column label="申请金额" prop="salary"></el-table-column>
                            <el-table-column label="评估结果" prop="result"></el-table-column>
                            <el-table-column label="评估适用产品" prop="beapp"></el-table-column>
                            <el-table-column label="正式申请状态" prop="applySatatus"></el-table-column>
                        </el-table>
                    </div>
                </div>
                
                <!-- 二、评估适用产品 -->
                <div class="table-container">
                    <div class="table-header">
                        <h6>
                            <i class="el-icon-collection-tag"></i>
                            评估适用产品：
                        </h6>
                        <el-button-group>
                            <el-button 
                                :class="{active: initData.actAppIdx=='shotTerms'}" 
                                @click="toggleActApliPro('shotTerms')">
                                短期({{ initData.applicableProducts.shotTerms.length }})
                            </el-button>
                            <el-button 
                                :class="{active: initData.actAppIdx=='middleTerms'}"
                                @click="toggleActApliPro('middleTerms')">
                                中期({{ initData.applicableProducts.middleTerms.length }})
                            </el-button>
                            <el-button
                                :class="{active: initData.actAppIdx=='longTerms'}" 
                                @click="toggleActApliPro('longTerms')">
                                长期({{ initData.applicableProducts.longTerms.length }})
                            </el-button>
                        </el-button-group>
                    </div>
                    <div class="table">
                        <el-table
                            :data="initData.applicableProducts[initData.actAppIdx]"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="idx" width="100px"></el-table-column>
                            <el-table-column label="产品ID" prop="productId"></el-table-column>
                            <el-table-column label="产品名称" prop="productName"></el-table-column>
                            <el-table-column label="产品类型" prop="productType"></el-table-column>
                            <el-table-column label="放款机构" prop="orgName"></el-table-column>
                            <el-table-column label="期数" prop="loanCycle"></el-table-column>
                            <el-table-column label="贷款利息" prop="loanInterest"></el-table-column>
                            <el-table-column label="还款方式" prop="repaymentStr"></el-table-column>
                            <el-table-column label="担保方式" prop="guaranteeMethodStr"></el-table-column>
                            <el-table-column label="最高申请额度" prop="financingAmount"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
                            <el-pagination
                                :current-page="initData.applicableProductsCurr"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="initData.applicableProducts[initData.actAppIdx].length"
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
                        <div class="info">
                            <p>客户选定产品：申请额度合计：<span>¥200万</span></p>
                        </div>
                        <el-button-group>
                            <el-button 
                                :class="{active: initData.selectedAppIdx=='shotTerms'}" 
                                @click="toggleSelectediPro('shotTerms')">
                                短期({{ initData.selectedProducts.shotTerms.length }})
                            </el-button>
                            <el-button 
                                :class="{active: initData.selectedAppIdx=='middleTerms'}"
                                @click="toggleSelectediPro('middleTerms')">
                                中期({{ initData.selectedProducts.middleTerms.length }})
                            </el-button>
                            <el-button
                                :class="{active: initData.selectedAppIdx=='longTerms'}" 
                                @click="toggleSelectediPro('longTerms')">
                                长期({{ initData.selectedProducts.longTerms.length }})
                            </el-button>
                        </el-button-group>
                    </div>
                    <div class="table">
                        <el-table
                            :data="initData.selectedProducts[initData.selectedAppIdx]"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="idx" width="100px"></el-table-column>
                            <el-table-column label="客户选取" prop="selectProductStatus"></el-table-column>
                            <el-table-column label="产品ID" prop="productId"></el-table-column>
                            <el-table-column label="产品名称" prop="productName"></el-table-column>
                            <el-table-column label="产品类型" prop="productType"></el-table-column>
                            <el-table-column label="放款机构" prop="orgName"></el-table-column>
                            <el-table-column label="期数" prop="loanCycle"></el-table-column>
                            <el-table-column label="贷款利息" prop="loanInterest"></el-table-column>
                            <el-table-column label="还款方式" prop="repaymentStr"></el-table-column>
                            <el-table-column label="担保方式" prop="guaranteeMethodStr"></el-table-column>
                            <el-table-column label="最高申请额度" prop="financingAmount"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
                            <el-pagination
                                :current-page="initData.selectedProductsCurr"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="initData.selectedProducts[initData.selectedAppIdx].length"
                            ></el-pagination>
                        </div>
                        
                    </div>
                </div>

                <!-- 四、评估申请信息 -->
                <div class="table-container">
                    <div class="table-header apply-header">
                        <h6>
                            <i class="el-icon-collection-tag"></i>
                            评估申请信息
                        </h6>
                    </div>
                    <el-form label-position="top" label-width="80px" :model="initData.componyApplyInfo">
                        <div class="form-line">
                            
                            <el-form-item 
                                label="企业全称"
                                prop="name"
                                required>
                                <el-input v-model="initData.componyApplyInfo.name" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="企业性质"
                                prop="enterpriseNature"
                                required>
                                <el-input v-model="initData.componyApplyInfo.enterpriseNature" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="行业类型"
                                prop="industryValue"
                                required>
                                <el-input v-model="initData.componyApplyInfo.industryValue" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="所在区域"
                                prop="region"
                                required>
                                <el-input v-model="initData.componyApplyInfo.address" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="详细地址"
                                prop="address"
                                required>
                                <el-input v-model="initData.componyApplyInfo.address" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="成立时间"
                                prop="establishDate"
                                required>
                                <el-input v-model="initData.componyApplyInfo.establishDate" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="本年度销售收入"
                                prop="currentYearRevenueValue"
                                required>
                                <el-input v-model="initData.componyApplyInfo.currentYearRevenueValue" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="上年度销售收入"
                                prop="lastYearRevenueValue"
                                required>
                                <el-input v-model="initData.componyApplyInfo.lastYearRevenueValue" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="上年度开票收入"
                                prop="lastYearInvoiceAmountValue"
                                required>
                                <el-input v-model="initData.componyApplyInfo.lastYearInvoiceAmountValue" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有不动产"
                                prop="hasRealEstate"
                                required>
                                <el-input v-model="initData.componyApplyInfo.hasRealEstate" disabled></el-input>
                            </el-form-item><el-form-item 
                                label="不动产价值"
                                prop="realEstateValString"
                                required>
                                <el-input v-model="initData.componyApplyInfo.realEstateValString" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="法人年龄"
                                prop="corporateAge"
                                required>
                                <el-input v-model="initData.componyApplyInfo.corporateAge" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有设备"
                                prop="hasEquipment"
                                required>
                                <el-input v-model="initData.componyApplyInfo.hasEquipment" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="设备价值"
                                prop="equipmentVal"
                                required>
                                <el-input v-model="initData.componyApplyInfo.equipmentVal" disabled></el-input>
                            </el-form-item>
                            
                            <el-form-item 
                                label="是否有股权质押"
                                prop="hasSharePledge"
                                required>
                                <el-input v-model="initData.componyApplyInfo.hasSharePledge" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有专利"
                                prop="hasPatent"
                                required>
                                <el-input v-model="initData.componyApplyInfo.hasPatent" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="专利数"
                                prop="patentVal"
                                required>
                                <el-input v-model="initData.componyApplyInfo.patentVal" disabled></el-input>
                            </el-form-item>
                            
                        </div>
                    </el-form>
                </div>

            </div>
        </div>
        
 
        <CopyRight />
  </div>
</template>

<script>
import ElSteps from "components/ElSteps";
import CopyRight from "components/CopyRight";
export default {
    name: "evaluationDetails",
    data() {
        return {
            id: "", // 评估单号

            // 页面初始加载数据
            initData: {
                // 流程步骤数据
                stepActive: 2,
                stepData: [
                    {
                        name: "评估申请",
                        time: "2020.07.10 15:43:23"
                    },
                    {
                        name: "评估完成",
                        time: "2020.07.10 15:43:23"
                    },
                    {
                        name: "正式服务申请",
                        time: "2020.07.10 15:43:23"
                    }
                ],

                /*** ------ 基本信息：开始 ------ ***/ 
                baseInfoTableData: [
                    {
                        id: "123",
                        name: "湖南XXXXXX有限公司",
                        type: "债券融资",
                        salary: "¥200万",
                        result: "成功",
                        beapp: "9项",
                        applySatatus: "未申请"

                    }
                ],
                /*** ------ 基本信息：结束 ------ ***/ 

                /*** ------ 评估适用产品：开始 ------ ***/ 
                actAppIdx: "shotTerms",
                applicableProducts: {
                    "shotTerms": [],  // 短期
                    "middleTerms": [],// 中期
                    "longTerms": []   // 长期
                },
                applicableProductsCurr: 1,   //评估适用产品当前分页
                /*** ------ 评估适用产品：结束 ------ ***/ 


                /*** ------ 申请选定产品：开始 ------ ***/ 
                applySalaryTotal: 0,   // 申请额度合计
                selectedAppIdx: "shotTerms",
                selectedProducts: {
                    "shotTerms": [],  // 短期
                    "middleTerms": [],// 中期
                    "longTerms": []   // 长期
                },
                selectedProductsCurr: 1,   //  客户申请选定产品
                /*** ------ 申请选定产品：结束 ------ ***/ 

                
                /*** ------ 评估申请信息：开始 ------ ***/ 
                componyApplyInfo: {}
                /*** ------ 评估申请信息：结束 ------ ***/ 


            },

            // 产品类型枚举
            productTypeObj: {
                "1": "长期",
                "2": "中期", 
                "3": "短期"
            },

            // 客户选取状态枚举
            selectProductStatusObj: {
                "0": "客户选定",
                "1": "否" 
            },

            // 0|1 枚举
            isTureOrFalseObj: {
                "0": "否",
                "1": "是"
            },


            

        };
    },
    components: {
        // SearchFour,
        ElSteps,
        CopyRight,
        // StatusList
    },
    created() {

        let id = this.id = this.$route.params.id;

        /**
         * @description: 获取页面初始数据
         * @param {string} id
         * @Date Changed: 2020-07-14
         */
        this.getInitData(id);

    },

    methods: {

        /**
         * @description: 获取页面初始数据
         * @param {string} id 
         * @Date Changed: 2020-07-14
         */
        getInitData(id){
            console.log( "codeId>>>", id );

            this.$axios.post(`/api/mgm/assessmentApply/detail/${id}`)
                .then(res=>{
                    // console.log( "评估详情数据响应：", res );
                    if(res.code == 0){
                        let data = res.data;

                        // 评估进度状态

                        // 基本信息

                        /** ------ 评估适用产品 数据重构：开始------ **/
                        this.initData.applicableProducts.shotTerms = !data.shotTerms ? [] : data.shotTerms.map((item,idx)=>{
                            return {
                                idx: idx,// 序号
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度
                            }
                        });
                        this.initData.applicableProducts.middleTerms = !data.middleTerms ? [] : data.middleTerms.map((item,idx)=>{
                            return {
                                idx: idx,// 序号
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度
                            }
                        });
                        this.initData.applicableProducts.longTerms = !data.longTerms ? [] : data.longTerms.map((item,idx)=>{
                            return {
                                idx: idx,// 序号
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度
                            }
                        });
                        /** ------ 评估适用产品 数据重构：结束------ **/


                        /** ------ 评估申请选定产品 数据重构：开始------ **/ 
                        this.initData.selectedProducts.shotTerms = !data.selectedShortTerms ? [] : data.selectedShortTerms.map((item,idx)=>{
                            console.log( item );
                            return {
                                idx: idx,// 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度

                            }
                        });
                        this.initData.selectedProducts.middleTerms = !data.selectedMiddleTerms ? [] : data.selectedMiddleTerms.map((item,idx)=>{
                            console.log( item );
                            return {
                                idx: idx,// 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度

                            }
                        });
                        this.initData.selectedProducts.longTerms = !data.selectedLongTerms ? [] : data.selectedLongTerms.map((item,idx)=>{
                            console.log( item );
                            return {
                                idx: idx,// 序号
                                selectProductStatus: item.selectProductStatus === null ? "-" : this.selectProductStatusObj[item.selectProductStatus], // 客户选取
                                productId: !item.productId ? "-" : item.productId,// 产品ID
                                productName: !item.productName ? "-" : item.productName,// 产品名称
                                productType: item.productType === null ? "-" : this.productTypeObj[item.productType],// 产品类型
                                orgName: !item.orgName ? "-" : item.orgName,// 放款机构
                                loanCycle: !item.loanCycle ? "-" : item.loanCycle,// 期数
                                loanInterest: !item.loanInterest ? "-" : item.loanInterest,// 贷款利息
                                repaymentStr: !item.repaymentStr ? "-" : item.repaymentStr,// 还款方式
                                guaranteeMethodStr: !item.guaranteeMethodStr ? "-" : item.guaranteeMethodStr,// 担保方式
                                financingAmount: !item.financingAmount ? "-" : item.financingAmount// 最高申请额度

                            }
                        });
                        /** ------ 评估申请选定产品 数据重构：结束------ **/ 

                        
                        /** ------ 评估申请信息 数据重构：开始------ **/ 
                        this.initData.componyApplyInfo = !data.enterpriseDetail ? {} : {
                            name: !data.enterpriseDetail.name ? "-" : data.enterpriseDetail.name,// 企业名称
                            enterpriseNature: !data.enterpriseDetail.enterpriseNature ? "-" : data.enterpriseDetail.enterpriseNature,// 企业性质
                            industryValue: !data.enterpriseDetail.industryValue ? "-" : data.enterpriseDetail.industryValue,// 行业类型
                            region: `${!data.enterpriseDetail.province ? "-" : data.enterpriseDetail.province} ${!data.enterpriseDetail.city ? "-" : data.enterpriseDetail.city} ${!data.enterpriseDetail.area ? "-" : data.enterpriseDetail.area }`,// 所在区域
                            address: `${data.enterpriseDetail.province}-${data.enterpriseDetail.city}-${data.enterpriseDetail.area}`,// 详细地址
                            establishDate: !data.enterpriseDetail.establishDate ? "-" : data.enterpriseDetail.establishDate ,// 成立时间
                            currentYearRevenueValue: !data.enterpriseDetail.currentYearRevenueValue ? "-" : data.enterpriseDetail.currentYearRevenueValue,// 本年度销售收入
                            lastYearRevenueValue: !data.enterpriseDetail.lastYearRevenueValue ? "-" : data.enterpriseDetail.lastYearRevenueValue,// 上年度销售收入
                            lastYearInvoiceAmountValue: !data.enterpriseDetail.lastYearInvoiceAmountValue ? "-" : data.enterpriseDetail.lastYearInvoiceAmountValue,// 上年度开票收入
                            hasRealEstate: data.enterpriseDetail.hasRealEstate === null ? "-" : data.enterpriseDetail.hasRealEstate ? "是" : "否",// 是否有不动产
                            realEstateValString: !data.enterpriseDetail.realEstateValString ? "-" : data.enterpriseDetail.realEstateValString,// 不动产价值
                            corporateAge: !data.enterpriseDetail.corporateAge ? "-" : data.enterpriseDetail.corporateAge,// 法人年龄
                            hasEquipment: data.enterpriseDetail.hasEquipment === null ? "-" : data.enterpriseDetail.hasEquipment ? "是" : "否",// 是否有设备
                            equipmentVal: !data.enterpriseDetail.equipmentVal ? "-" : data.enterpriseDetail.equipmentVal,// 设备价值
                            hasSharePledge: data.enterpriseDetail.hasSharePledge === null ? "-" : data.enterpriseDetail.hasSharePledge ? "是" : "否",// 是否有股权质押
                            hasPatent: data.enterpriseDetail.hasPatent === null ? "-" : data.enterpriseDetail.hasPatent ? "是" : "否",// 是否有专利
                            patentVal: !data.enterpriseDetail.patentVal ? "-" : data.enterpriseDetail.patentVal// 专利数
                        }
                        /** ------ 评估申请信息 数据重构：结束------ **/ 

                    }
                });
            

        },

        /**
         * @description: 评估适用产品tab切换
         * @param {string} key tab标识 
         * @Date Changed: 2020-07-14
         */        
        toggleActApliPro(key){
            this.initData.actAppIdx = key;

            // console.log( "评估适用产品当前显示数据量：", this.initData.applicableProducts[key] );
        },

        /**
         * @description: 申请选定产品tab切换
         * @param {string} key tab标识 
         * @Date Changed: 2020-07-14
         */ 
        toggleSelectediPro(key){
            this.initData.selectedAppIdx = key;

            // console.log( "申请选定产品当前显示数据量：", this.initData.selectedProducts[key] );
        }

    }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#EvaluationDetails
    position relative
    .evaluation-details
        margin 0 auto 200px
        margin-top 16px
        width 1100px
        background-color #fff
        box-sizing border-box
        .details-header 
            padding: 14px 20px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height 80px
            border-bottom: 1px solid #e9e9e9;
        .evaluation-details-main
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
                    .info
                        margin  0 10px
                        span
                            color #D9001B
                    .el-button-group
                        .active 
                            color #fff
                            background #409eff
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