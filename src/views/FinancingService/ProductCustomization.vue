<template>
  <div id="productCustomization">
        <div class="product-details">
            <div class="details-header">
                <div class="info">
                    <p>客户选定产品：申请额度合计：<span>¥200万</span></p>
                </div>
                <el-button-group>
                    <el-button>短期 2/3</el-button>
                    <el-button>中期 0/3</el-button>
                    <el-button>长期 0/3</el-button>
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
                            :data="byUseProTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="id" width="100px"></el-table-column>
                            <el-table-column label="客户选取" prop="customerSelected"></el-table-column>
                            <el-table-column label="客户ID" prop="proId"></el-table-column>
                            <el-table-column label="产品名称" prop="proName"></el-table-column>
                            <el-table-column label="产品类型" prop="proType"></el-table-column>
                            <el-table-column label="放款机构" prop="lender"></el-table-column>
                            <el-table-column label="期数" prop="dateNum"></el-table-column>
                            <el-table-column label="贷款利息" prop="interest"></el-table-column>
                            <el-table-column label="还款方式" prop="repayment"></el-table-column>
                            <el-table-column label="担保方式" prop="guarantee"></el-table-column>
                            <el-table-column label="最高申请额度" prop="maxSalary"></el-table-column>
                            <el-table-column label="定制状态" prop="status"></el-table-column>
                            <el-table-column label="操作">
                                <template>
                                    <div class="cz">
                                        <div @click="productCustomize">
                                            产品定制
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
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
                        
                    </div>
                    <div class="table">
                        <el-table
                            :data="alerdyProTableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :border="true"
                            fit>
                            <el-table-column label="序号" prop="id"></el-table-column>
                            <el-table-column label="产品ID" prop="customerSelected"></el-table-column>
                            <el-table-column label="产品名称" prop="proName"></el-table-column>
                            <el-table-column label="产品类型" prop="proType"></el-table-column>
                            <el-table-column label="放款机构" prop="lender"></el-table-column>
                            <el-table-column label="期数" prop="dateNum"></el-table-column>
                            <el-table-column label="贷款利息" prop="interest"></el-table-column>
                            <el-table-column label="还款方式" prop="repayment"></el-table-column>
                            <el-table-column label="担保方式" prop="guarantee"></el-table-column>
                            <el-table-column label="前置付款项" prop="beforePay"></el-table-column>
                            <el-table-column label="服务费" prop="serverSalary"></el-table-column>
                            <el-table-column label="申请额度" prop="applyQuota"></el-table-column>
                            <el-table-column label="操作">
                                <template>
                                    <div class="cz">
                                        <div @click="aleryProEdit">
                                            编辑
                                        </div>
                                        <div @click="aleryProDelete">
                                            删除
                                        </div>
                                    </div>
                                </template>    
                            </el-table-column>
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

                

            </div>
        </div>
        
 
        <CopyRight />

        <!-- :data="editData.data" 
            :dataCodeList="dataCodeList" 
            :parentObj="codeObj"
            @queryList="getTableData" -->
        <ProCustModel v-model="proCustData.visible"/>
        <ProCustModelEdit v-model="proCustEditData.visible"/>
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
        for (let index = 0; index < 3; index++) {
            this.byUseProTableData.push({
                id: index+1,
                customerSelected: "客户选定",
                proId: parseInt(Math.random() * 1000000),
                proName: "商户信用贷-"+index,
                proType: "短期",
                lender: "长沙银行",
                dateNum: "12-24期",
                interest: "年化7%-9%",
                repayment: `等额本息 先息后本`,
                guarantee: "需要担保人,资质好可免担保",
                maxSalary: "2020-03-09 12:34:23",
                status: "已定制"
            });
        }

        for (let index = 0; index < 2; index++) {
            this.alerdyProTableData.push({
                id: index+1,
                proId: parseInt(Math.random() * 1000000),
                proName: "商户信用贷-"+index,
                proType: "短期",
                lender: "长沙银行",
                dateNum: "12-24期",
                interest: "年化7%-9%",
                repayment: `等额本息 先息后本`,
                guarantee: "需要担保人,资质好可免担保",
                beforePay: "无",
                serverSalary: "￥10万",
                applyQuota: "￥100.00万"
            });
        }
    },
    methods: {

        /**
         * @description: 评估使用产品【产品定制】按钮
         * @Date Changed: 2020-07-12
         */
        productCustomize(){
            this.proCustData.data = {}
            this.proCustData.visible = true
        },

        /**
         * @description: 已定制产品【编辑】按钮
         * @Date Changed: 2020-07-12
         */  
        aleryProEdit(){
            this.proCustEditData.data = {}
            this.proCustEditData.visible = true
        },

        /**
         * @description: 已定制产品【编辑】按钮
         * @Date Changed: 2020-07-12
         */  
        aleryProDelete(){
            this.$confirm("是否确认删除该定制产品", "删除定制的产品", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                this.$message({
                    type: "success",
                    message: "删除成功"
                });
                
            })
            .catch(() => {
                // 取消操作
                
            });
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