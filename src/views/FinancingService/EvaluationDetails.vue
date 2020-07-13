<template>
  <div id="EvaluationDetails">
        <ElSteps :stepArr="stepData" :stepActive="stepActive" />

        <div class="evaluation-details">
            <div class="details-header">
                订单编号：201808196398345
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
                            :data="baseInfoTableData"
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
                            <el-button>短期(2)</el-button>
                            <el-button>中期0</el-button>
                            <el-button>长期0</el-button>
                        </el-button-group>
                    </div>
                    <div class="table">
                        <el-table
                            :data="byUseProTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="id" width="100px"></el-table-column>
                            <el-table-column label="客户选取" prop="customerSelected"></el-table-column>
                            <el-table-column label="产品名称" prop="proName"></el-table-column>
                            <el-table-column label="产品类型" prop="proType"></el-table-column>
                            <el-table-column label="放款机构" prop="lender"></el-table-column>
                            <el-table-column label="期数" prop="dateNum"></el-table-column>
                            <el-table-column label="贷款利息" prop="interest"></el-table-column>
                            <el-table-column label="还款方式" prop="repayment"></el-table-column>
                            <el-table-column label="担保方式" prop="guarantee"></el-table-column>
                            <el-table-column label="最高申请额度" prop="maxSalary"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
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
                            <el-button>短期(2)</el-button>
                            <el-button>中期0</el-button>
                            <el-button>长期0</el-button>
                        </el-button-group>
                    </div>
                    <div class="table">
                        <el-table
                            :data="byUseProTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="id" width="100px"></el-table-column>
                            <el-table-column label="客户选取" prop="customerSelected"></el-table-column>
                            <el-table-column label="产品名称" prop="proName"></el-table-column>
                            <el-table-column label="产品类型" prop="proType"></el-table-column>
                            <el-table-column label="放款机构" prop="lender"></el-table-column>
                            <el-table-column label="期数" prop="dateNum"></el-table-column>
                            <el-table-column label="贷款利息" prop="interest"></el-table-column>
                            <el-table-column label="还款方式" prop="repayment"></el-table-column>
                            <el-table-column label="担保方式" prop="guarantee"></el-table-column>
                            <el-table-column label="最高申请额度" prop="maxSalary"></el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="page-conatiner">
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

                <!-- 四、评估适用产品 -->
                <div class="table-container">
                    <div class="table-header apply-header">
                        <h6>
                            <i class="el-icon-collection-tag"></i>
                            评估申请信息
                        </h6>
                    </div>
                    <el-form label-position="top" label-width="80px" :model="componyApplyInfo">
                        <div class="form-line">
                            
                            <el-form-item 
                                label="企业全称"
                                prop="fullName"
                                :rules="[
                                    { required: true, message: '请填写企业全称'}
                                ]">
                                <el-input v-model="componyApplyInfo.fullName" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="企业性质"
                                prop="nature"
                                :rules="[
                                    { required: true, message: '请填写企业性质'}
                                ]">
                                <el-input v-model="componyApplyInfo.nature" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="行业类型"
                                prop="industryType"
                                :rules="[
                                    { required: true, message: '请填写企业性质'}
                                ]">
                                <el-input v-model="componyApplyInfo.industryType" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="所在区域"
                                prop="area"
                                :rules="[
                                    { required: true, message: '请填写所在区域'}
                                ]">
                                <el-input v-model="componyApplyInfo.area" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="详细地址"
                                prop="address"
                                :rules="[
                                    { required: true, message: '请填写详细地址'}
                                ]">
                                <el-input v-model="componyApplyInfo.address" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="成立时间"
                                prop="ctime"
                                :rules="[
                                    { required: true, message: '请填写成立时间'}
                                ]">
                                <el-input v-model="componyApplyInfo.ctime" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="本年度销售收入"
                                prop="annualSales"
                                :rules="[
                                    { required: true, message: '请填写本年度销售收入'}
                                ]">
                                <el-input v-model="componyApplyInfo.annualSales" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="上年度销售收入"
                                prop="lastYearSales"
                                :rules="[
                                    { required: true, message: '请填写上年度销售收入'}
                                ]">
                                <el-input v-model="componyApplyInfo.lastYearSales" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="上年度开票收入"
                                prop="lastYearOpen"
                                :rules="[
                                    { required: true, message: '请填写上年度开票收入'}
                                ]">
                                <el-input v-model="componyApplyInfo.lastYearOpen" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有不动产"
                                prop="isImmovables"
                                :rules="[
                                    { required: true, message: '请填写是否有不动产'}
                                ]">
                                <el-input v-model="componyApplyInfo.isImmovables" disabled></el-input>
                            </el-form-item><el-form-item 
                                label="不动产价值"
                                prop="ImmovablesSales"
                                :rules="[
                                    { required: true, message: '请填写不动产价值'}
                                ]">
                                <el-input v-model="componyApplyInfo.ImmovablesSales" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="法人年龄"
                                prop="legalPersonAge"
                                :rules="[
                                    { required: true, message: '请填写法人年龄'}
                                ]">
                                <el-input v-model="componyApplyInfo.legalPersonAge" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有设备"
                                prop="isDevice"
                                :rules="[
                                    { required: true, message: '请填写是否有设备'}
                                ]">
                                <el-input v-model="componyApplyInfo.isDevice" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="设备价值"
                                prop="deviceSales"
                                :rules="[
                                    { required: true, message: '请填写设备价值'}
                                ]">
                                <el-input v-model="componyApplyInfo.deviceSales" disabled></el-input>
                            </el-form-item>
                            
                            <el-form-item 
                                label="是否有股权质押"
                                prop="isEquityPledge"
                                :rules="[
                                    { required: true, message: '请填写是否有股权质押'}
                                ]">
                                <el-input v-model="componyApplyInfo.isEquityPledge" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="是否有专利"
                                prop="ishasPatent"
                                :rules="[
                                    { required: true, message: '请填写是否有专利'}
                                ]">
                                <el-input v-model="componyApplyInfo.ishasPatent" disabled></el-input>
                            </el-form-item>
                            <el-form-item 
                                label="专利数"
                                prop="patentNum"
                                :rules="[
                                    { required: true, message: '请填写专利数'}
                                ]">
                                <el-input v-model="componyApplyInfo.patentNum" disabled></el-input>
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
            codeId: "", // 评估单号

            initData: {},


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
            stepActive: 2,

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
            
            byUseProTableData: [],
            curr: 1,

            componyApplyInfo: {
                fullName: "湖南XXXX科技有限公司",
                nature: "有限公司",
                industryType: "互联网",
                area: "湖南省 长沙市 雨花区",
                address: "雨花区时代阳光大道123号",
                ctime: "2017年6月",
                annualSales: "200万-1000万",
                lastYearSales: "200万-1000万",
                lastYearOpen: "200万-1000万",
                isImmovables: "是",
                ImmovablesSales: "1000万以内",
                legalPersonAge: "20-60岁",
                isDevice: "是",
                deviceSales: "1000万以内",
                isEquityPledge: "是",
                ishasPatent: "是",
                patentNum: "5个以内"


            }

        };
    },
    components: {
        // SearchFour,
        ElSteps,
        CopyRight,
        // StatusList
    },
    created() {

        let codeId = this.codeId = this.$route.params.codeId;

        this.getInitData(codeId);



        for (let index = 0; index < 3; index++) {
            this.byUseProTableData.push({
                id: index+1,
                customerSelected: "客户选定",
                proName: "商户信用贷-"+index,
                proType: "短期",
                lender: "长沙银行",
                dateNum: "12-24期",
                interest: "年化7%-9%",
                repayment: `等额本息 先息后本`,
                guarantee: "需要担保人,资质好可免担保",
                maxSalary: "2020-03-09 12:34:23"
            });
        }
    },

    methods: {

        /**
         * @description: 获取页面初始数据
         * @param {string} codeId 
         * @Date Changed: 2020-07-14
         */
        getInitData(codeId){
            console.log( "codeId>>>", codeId );

            this.$axios.post(`/api/mgm/assessmentApply/detail/${codeId}`)
                .then(res=>{
                    console.log( "评估详情数据响应：", res );
                })
            

        }

    }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/fn.styl";
#EvaluationDetails
    position relative
    // .steps-container
    //     margin 0 auto
    //     margin-top 20px
    //     padding 30px
    //     width 1100px
    //     background-color #fff
    //     box-sizing border-box   

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