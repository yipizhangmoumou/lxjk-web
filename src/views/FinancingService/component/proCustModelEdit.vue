<template>
    <!---->
    <el-dialog
        id="pro-cust-model"
        title="产品定制-编辑"
        :visible.sync="visible"
        width="40%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="" :rules="rules">
            <div class="form-line">
                            
                <el-form-item 
                    label="产品全称："
                    prop="name">
                    <el-input v-model="form.name" placeholder="请输产品名称"></el-input>
                </el-form-item>

                <el-form-item 
                    label="放款机构："
                    prop="lender">
                    <el-input v-model="form.lender" placeholder="请输放款机构"></el-input>
                </el-form-item>
                <el-form-item label="期数：">
                    <el-select v-model="form.period" placeholder="请选择期数">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item 
                    label="贷款利息："
                    prop="loanInterest">
                    <samp style="font-size: 10px">（7-9%）</samp>
                    <el-input v-model="form.loanInterest" placeholder="请输入贷款利息数字">
                        <!-- <template slot="append">%</template> -->
                        <i slot="suffix" class="unit" style="font-size: 20px">%</i>
                    </el-input>
                </el-form-item>

                <el-form-item label="还款方式：">
                    <el-select v-model="form.repayment" placeholder="请选择还款方式">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="申请额度："
                    prop="applySalary">
                    <samp style="font-size: 10px">（10-100万）</samp>
                    <el-input v-model="form.applySalary" placeholder="请输入申请额度数字">
                        <!-- <template slot="append">元</template> -->
                        <i slot="suffix" class="unit"  style="font-size: 20px">万</i>
                    </el-input>
                </el-form-item>

                <el-form-item label="前置收费：" prop="beforeToll">
                    <samp style="font-size: 10px">（0即是无收费项）</samp>
                    <el-input placeholder="请输入数字" v-model="form.beforeToll" class="input-with-select">
                        <el-select v-model="beforeTollUnit" slot="append" placeholder="请选择">
                            <el-option label="元" value="yuan"></el-option>
                            <el-option label="%" value="percentage"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>

                <el-form-item label="服务收费项：" prop="serverToll">
                    <samp style="font-size: 10px">（元或%，百分比为申请额度%）</samp>
                    <el-input placeholder="请输入数字" v-model="form.serverToll" class="input-with-select">
                        <el-select v-model="serverTollUnit" slot="append" placeholder="请选择">
                            <el-option label="元" value="yuan"></el-option>
                            <el-option label="%" value="percentage"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>

                <el-form-item label="担保方式：">
                    <el-select v-model="form.guaranteeMethod" placeholder="请选择担保方式">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" :loading="loading" @click="handleSave">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'proCustModel',
    model: {
        prop: 'visible',
        event: 'changeVisible'
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {


            loading: false,


            /**
             * @description: 枚举数据
             * @param {string} repayment_method 【还款方式】
             * @param {string} guarantee_method 【担保方式】
             * @Date Changed: 2020-07-16
             */
            EnuData:{},







            form: {
                name: "",   // 产品名称
                lender: "", // 放款机构
                period: "", // 期数
                loanInterest: "", // 贷款利息
                repayment: "", // 还款方式
                applySalary: "", // 申请额度
                beforeToll: "", // 前置收费
                serverToll: "", // 服务收费项
                guaranteeMethod: "" // 担保方式
            },
            
            beforeTollUnit: "yuan",  // 前置收费单位
            serverTollUnit: "yuan",  // 服务收费项单位



            rules: {
                dictValue: [{required: true, message: ' ', trigger: 'blur'}]
            }
        }
    },

    created () {
        // this.getAllEnumerate();

        // 统一调用获取枚举数据方法
        this.getEnuData();
    },

    methods: {
        
                /**
         * @description: 方法：获取枚举数据基本函数
         * @param {string} code 枚举关键字 
         * @Date Changed: 2020-07-15
         */
        getEnuDataMethods(code){
            this.$axios.post("/api/mgm/dict/listDictByParentCode",{code})
                .then(res=>{
                    // console.log("还款方式枚举",res);
                    if( res.code == 0 ){
                        this.EnuData[code] = !res.data ? [] : res.data;
                    }
                })
        },  
        
         /**
         * @description: 初始数据获取：获取枚举数据
         * @Date Changed: 2020-07-15
         */ 
        getEnuData(){
            // 【还款方式】枚举
            this.getEnuDataMethods("repayment_method");
            // 【担保方式】枚举
            this.getEnuDataMethods("guarantee_method");
        }, 




        /**
         * @description: 弹窗【取消】按钮
         * @Date Changed: 2020-07-12
         */
        handleClose () {
            this.$emit('changeVisible', false)
        },

        /**
         * @description: 弹窗【确认】按钮
         * @Date Changed: 
         */
        handleSave () {
            
        }
    }
  
}
</script>

<style scoped lang="stylus">
    #pro-cust-model
        /deep/ .el-dialog
            /deep/ .el-dialog__header
                background #f2f2f2
                border-bottom 1px solid #e5e5e5
            /deep/ .el-dialog__body
                max-height 300px
                overflow-y: auto
                .el-form
                    .form-line
                        display flex
                        flex-wrap: wrap
                        justify-content space-around
                        .el-form-item
                            width 240px
                            /deep/ .el-form-item__label 
                                        padding 0
                            /deep/ .el-form-item__content
                                        margin 0 !important
                                        > .el-select
                                            width: 100%
                                        .input-with-select
                                            .el-input-group__append
                                                background: #fff
                                                .el-select
                                                    width: 70px;  

                        &:after
                            display block
                            content: ""
                            width 240px

            .el-dialog__footer
                border-top 1px solid #e5e5e5
    
</style>
