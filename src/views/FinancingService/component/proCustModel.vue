<template>
    <!---->
    <el-dialog
        id="pro-cust-model"
        title="产品定制"
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

                <el-form-item 
                    label="担保人："
                    prop="guarantor">
                    <el-input v-model="form.guarantor" placeholder="请输入担保人姓名"></el-input>
                </el-form-item>

                <el-form-item 
                    label="担保人身份证件："
                    prop="guarantorCode">
                    <el-input v-model="form.guarantorCode" placeholder="请输入证件号"></el-input>
                </el-form-item>

                <el-form-item 
                    label="担保人电话："
                    prop="guarantorPhone">
                    <el-input v-model="form.guarantorPhone" placeholder="请输入电话"></el-input>
                </el-form-item>
            </div>

            <div class="form-line textare">
                <el-form-item 
                    label="担保人其他信息："
                    prop="guarantorInfo">
                    <el-input type="textarea" v-model="form.guarantorInfo" placeholder="输入其它信息"></el-input>
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
            isNew: true,
            form: {
                name: "",   // 产品名称
                lender: "", // 放款机构
                period: "", // 期数
                loanInterest: "", // 贷款利息
                repayment: "", // 还款方式
                applySalary: "", // 申请额度
                beforeToll: "", // 前置收费
                serverToll: "", // 服务收费项
                guaranteeMethod: "", // 担保方式
                guarantor: "", // 担保人
                guarantorCode: "", // 担保人身份证
                guarantorPhone: "", // 担保人电话
                guarantorInfo: "", // 担保人其他信息
            },
            
            beforeTollUnit: "yuan",  // 前置收费单位
            serverTollUnit: "yuan",  // 前置收费单位



            rules: {
                dictValue: [{required: true, message: ' ', trigger: 'blur'}]
            }
        }
    },
    computed: {
        dialogTitle () {
            return this.isNew ? '新建字典' : '编辑字典'
        }
    },
    methods: {
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
    },
    created () {

    },
    mounted () {

    },
    beforeDestroy () {

    },
    
  
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
                    .textare                
                        width: 100%
                        .el-form-item
                            box-sizing border-box
                            padding 0 20px
                            width: 100%
                            .el-textarea__inner
                                min-height 100px !important
            .el-dialog__footer
                border-top 1px solid #e5e5e5
    
</style>
