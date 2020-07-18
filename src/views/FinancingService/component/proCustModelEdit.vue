<template>
    <!---->
    <el-dialog
        id="pro-cust-model"
        title="产品定制-编辑"
        :visible.sync="visible"
        width="600px"
        @open="editModelOpen"
        :before-close="handleClose">
        <el-form ref="proEditData" :model="proEditData" label-position="" :rules="proCustEditDataRules">
            <div class="form-line">
                            
                <el-form-item label="产品名称：">
                    <el-input 
                        disabled
                        v-model="data.productName" 
                        placeholder="请输产品名称">
                    </el-input>
                </el-form-item>

                <el-form-item label="放款机构：">
                    <el-input 
                        disabled
                        v-model="data.orgName" 
                        placeholder="请输放款机构">
                    </el-input>
                </el-form-item>

                <el-form-item label="期数：" prop="loanCycle">
                    <el-select v-model="proEditData.loanCycle" placeholder="请选择期数">
                        <el-option label="6期" value="6"></el-option>
                        <el-option label="12期" value="12"></el-option>
                        <el-option label="24期" value="24"></el-option>
                    </el-select>
                </el-form-item>
        
                <el-form-item label="贷款利息：" prop="interestRate">
                    <samp style="font-size: 10px">{{ data.interestRateRegion }}</samp>
                    <el-input 
                        v-model.number="proEditData.interestRate" 
                        placeholder="请输入贷款利息数字">
                        <i slot="suffix" class="unit" style="font-size: 18px">%</i>
                    </el-input>
                </el-form-item>

                <el-form-item label="还款方式：">
                    <el-select v-model="proEditData.repayment" placeholder="请选择还款方式">
                        <el-option 
                            v-for="(item,idx) in EnuData['repayment_method']"
                            :key="idx"
                            :label="item.value" 
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="申请额度："
                    prop="applySalary">
                    <samp style="font-size: 10px">{{ data.finalAmountRegion }}</samp>
                    <el-input v-model.number="proEditData.finalAmount" placeholder="请输入申请额度数字">
                        <i slot="suffix" class="unit"  style="font-size: 18px">万</i>
                    </el-input>
                </el-form-item>

                <el-form-item label="前置收费：" prop="beforeToll">
                    <samp style="font-size: 10px">{{ data.qzChargeItemRate }}</samp>
                    <el-input placeholder="请输入数字" v-model.number="proEditData.qzCharge" class="input-with-select">
                        <el-select v-model="beforeTollUnit" slot="append" placeholder="请选择">
                            <el-option label="元" value="元"></el-option>
                            <el-option label="%" value="%"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>

                <el-form-item label="服务收费项：" prop="serverToll">
                    <samp style="font-size: 10px">{{ data.servChargeItemRate }}</samp>
                    <el-input placeholder="请输入数字" v-model.number="proEditData.servCharge" class="input-with-select">
                        <el-select v-model="serverTollUnit" slot="append" placeholder="请选择">
                            <el-option label="元" value="元"></el-option>
                            <el-option label="%" value="%"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>

                <el-form-item label="担保方式：" prop="guaranteeMethod">
                    <el-select v-model="proEditData.guaranteeMethod" placeholder="请选择担保方式">
                        <el-option 
                            v-for="(item,idx) in EnuData['guarantee_method']"
                            :key="idx"
                            :label="item.value" 
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="guaranteeMethod" v-if="proEditData.guaranteeMethod==2">
                </el-form-item>

                <el-form-item label="担保人：" prop="guarantorName" v-if="proEditData.guaranteeMethod!=2">
                    <el-input
                        v-model="proEditData.guarantorName" 
                        placeholder="请输入担保人姓名">
                    </el-input>
                </el-form-item>

                <el-form-item label="担保人身份证件：" prop="guarantorIdNum" v-if="proEditData.guaranteeMethod!=2">
                    <el-input 
                        v-model="proEditData.guarantorIdNum" 
                        placeholder="请输入证件号">
                    </el-input>
                </el-form-item>

                <el-form-item label="担保人电话：" prop="guarantorPhone" v-if="proEditData.guaranteeMethod!=2">
                    <el-input 
                        v-model="proEditData.guarantorPhone" 
                        placeholder="请输入电话">
                    </el-input>
                </el-form-item>

            </div>

            <div class="form-line textare">
                <el-form-item label="担保人其他信息：" prop="guarantorOtherInfo" v-if="proEditData.guaranteeMethod!=2">
                    <el-input 
                        type="textarea" 
                        v-model="proEditData.guarantorOtherInfo" 
                        placeholder="输入其它信息">
                    </el-input>
                </el-form-item>   
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="text" @click="handleClear('proEditData')">清除条件</el-button>
            <el-button type="primary" @click="handleSave('proEditData')">确 定</el-button>
            <el-button @click="()=>{this.handleClear('proEditData');this.handleClose()}">取 消</el-button>
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
                return {
                    planCode: "",
                    childActionCode: "",
                    productName: "",
                    orgName: "",
                    interestRateRegion: "",
                    finalAmountRegion: "",
                    qzChargeItemRate: "",
                    servChargeItemRate: ""
                }
            }
        }
    },
    data () {
        return {



            /**
             * @description: 枚举数据
             * @param {string} repayment_method 【还款方式】
             * @param {string} guarantee_method 【担保方式】
             * @Date Changed: 2020-07-16
             */
            EnuData:{},

            proEditData: {
                loanCycle: "", // 期数                 loanCycle
                interestRate: "", // 贷款利息       interestRate
                repayment: "", // 还款方式          repayment
                finalAmount: "", // 申请额度      finalAmount
                qzCharge: "", // 前置收费         qzCharge
                servCharge: "", // 服务收费项           servCharge【咨询服务费】        
                guaranteeMethod: "", // 担保方式        guaranteeMethod
                guarantorName: "", // 担保人            guarantorName
                guarantorIdNum: "", // 担保人身份证  guarantorIdNum
                guarantorPhone: "", // 担保人电话       guarantorPhone
                guarantorOtherInfo: "", // 担保人其他信息
            },
            
            beforeTollUnit: "元",  // 前置收费单位
            serverTollUnit: "元",  // 服务收费项单位



            proCustEditDataRules: {
                // name: [{required: true, message: '请输产品名称', trigger: 'blur'}],
                // lender: [{required: true, message: '请输放款机构', trigger: 'blur'}],
                loanCycle: [{required: true, message: '请选择期数', trigger: 'blur'}],
                interestRate: [
                    {required: true, message: '请输入贷款利息数字', trigger: 'blur'},
                    {type: 'number', message: '贷款利息必须为数字值', trigger: 'blur'},
                    // {type: 'number', min: 7, max: 9, message: '贷款利息7%~9%', trigger: 'blur' }
                ],
                repayment: [{required: true, message: '请选择还款方式', trigger: 'blur'}],
                finalAmount: [
                    {required: true, message: '请输入申请额度数字', trigger: 'blur'},
                    {type: 'number', message: '申请额度必须为数字值', trigger: 'blur'},
                    // {type: 'number', min: 10, max: 100, message: '申请额度10-100万', trigger: 'blur'},
                ],
                qzCharge: [
                    {required: true, message: '请输前置收费', trigger: 'blur'},
                    {type: 'number', message: '前置收费必须为数字值', trigger: 'blur'}
                ],
                servCharge: [
                    {required: true, message: '请输服务收费项', trigger: 'blur'},
                    {type: 'number', message: '服务收费项必须为数字值', trigger: 'blur'}
                ],
                guaranteeMethod: [
                    {required: true, message: '请选择担保方式', trigger: 'blur'}
                ],
                guarantorName: [
                    {required: true, message: '请输入担保人姓名', trigger: 'blur'},
                    {type: 'string', min: 1, max: 10, message: '姓名1~10位', trigger: 'blur'}
                ],
                guarantorIdNum: [
                    {required: true, message: '请输入担保人证件号', trigger: 'blur'},
                    {type: 'string', min: 18, max: 18, message: '身份证号码18位', trigger: 'blur'},
                ],
                guarantorPhone: [
                    {required: true, message: '请输入担保人电话', trigger: 'blur'}
                ],
                guarantorInfo: [
                    {required: true, message: '请输入担保人其他信息', trigger: 'blur'},
                    {type: 'string', min: 1, max: 300, message: '1~300位', trigger: 'blur'}
                ]
            }
        }
    },

    methods: {
        /**
         * @description: 弹窗打开后的行为处理
         * @description:    - 获取初始数据枚举字典
         * @description:    - 获取表单初始数据
         * @Date Changed: 2020-07-17
         */
        editModelOpen(){
            // 统一调用获取枚举数据方法
            this.getEnuData();

            // 调用获取表单初始数据的函数
            this.getInitData(this.data.childActionCode);
        },

        /**
         * @description: 获取表单初始数据
         * @param {string} childActionCode 已选定产品的编号 
         * @Date Changed: 2020-07-17
         */
        getInitData(childActionCode){
            this.$axios.post(`/api/mgm/actionChildPlan/selectProductCustomizationDialog/${childActionCode}`)
                .then(res=>{
                    console.log( "查看产品定制页面弹出框响应：", res );
                    if(res.code == 0){
                        let data = res.data;

                        // 初始值赋值
                        this.proEditData = {
                            loanCycle: data.loanCycle, // 期数                 loanCycle
                            interestRate: data.interestRate, // 贷款利息       interestRate
                            repayment: data.repayment, // 还款方式          repayment
                            finalAmount: data.finalAmount, // 申请额度      finalAmount
                            qzCharge: !data.qzCharge ? "" :  data.qzCharge.split(/元|%/g)[0], // 前置收费         qzCharge
                            servCharge: !data.servCharge ? "" :  data.servCharge.split(/元|%/g)[0], // 服务收费项           servCharge【咨询服务费】        
                            guaranteeMethod: data.guaranteeMethod, // 担保方式        guaranteeMethod
                            guarantorName: data.guarantorName, // 担保人            guarantorName
                            guarantorIdNum: data.guarantorIdNum, // 担保人身份证  guarantorIdNum
                            guarantorPhone: data.guarantorPhone, // 担保人电话       guarantorPhone
                            guarantorOtherInfo: data.guarantorOtherInfo, // 担保人其他信息   
                        }

                        // 前置收费单位 服务收费项单位
                        this.beforeTollUnit = !data.qzCharge? "元": data.qzCharge.split(/\d+/g)[1];  // 前置收费单位
                        this.serverTollUnit = !data.servCharge? "元": data.servCharge.split(/\d+/g)[1];  // 服务收费项单位
                    }
                })
        },
        
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
         * @description: 弹窗【清除】按钮
         * @param {string} 
         * @return: 
         * @Date Changed: 
         */     
        handleClear(formName){
            this.$refs[formName].resetFields();
        },

        /**
         * @description: 弹窗【取消】按钮
         * @Date Changed: 2020-07-12
         */
        handleClose () {
            this.$emit('changeVisible', false);
        },

        /**
         * @description: 弹窗【确认】按钮
         * @Date Changed: 2020-07-17
         */
        handleSave (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // let requiredParam = JSON.parse(JSON.stringify(this.proEditData));

                    // requiredParam.actionCode = this.data.childActionCode;

                    // requiredParam.qzCharge = `${ requiredParam.qzCharge }${ this.beforeTollUnit }`
                    // requiredParam.servCharge = `${ requiredParam.servCharge }${ this.serverTollUnit }`

                    let requiredParam = {
                        actionCode: this.data.childActionCode,
                    };

                    let {loanCycle, interestRate, repayment, finalAmount, qzCharge,servCharge, guaranteeMethod, guarantorName, guarantorIdNum, guarantorPhone, guarantorOtherInfo} = this.proEditData;

                    // 根据担保方式处理提交数据
                    if( guaranteeMethod == 1 ){ // 需要担保人
                        requiredParam.loanCycle = loanCycle;
                        requiredParam.interestRate = interestRate;
                        requiredParam.repayment = repayment;
                        requiredParam.finalAmount = finalAmount;
                        requiredParam.qzCharge = `${ qzCharge }${ this.beforeTollUnit }`;
                        requiredParam.servCharge = `${ servCharge }${ this.serverTollUnit }`;
                        requiredParam.guaranteeMethod = guaranteeMethod;
                        requiredParam.guarantorName = guarantorName;
                        requiredParam.guarantorIdNum = guarantorIdNum;
                        requiredParam.guarantorPhone = guarantorPhone;
                        requiredParam.guarantorOtherInfo = guarantorOtherInfo;

                    }else if( guaranteeMethod == 2 ){ // 可申请免担保
                        requiredParam.loanCycle = loanCycle;
                        requiredParam.interestRate = interestRate;
                        requiredParam.repayment = repayment;
                        requiredParam.finalAmount = finalAmount;
                        requiredParam.qzCharge = `${ qzCharge }${ this.beforeTollUnit }`;
                        requiredParam.servCharge = `${ servCharge }${ this.serverTollUnit }`;
                        requiredParam.guaranteeMethod = guaranteeMethod;
                        
                    }



                    console.log("表单提交的数据",requiredParam);


                    this.$axios.post("/api/mgm/actionChildPlan/updateProductCustomizationDialog",requiredParam)
                        .then(res=>{
                            console.log( "产品编辑响应：", res );
                            if(res.code == 0){
                                this.$notify({
                                    title: '成功',
                                    message: '产品定制更新提交成功！',
                                    type: 'success'
                                });
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: `产品定制更新提交失败！原因：${res.message}`
                                });
                            }

                            // 清除填写数据
                            this.handleClear('proEditData');

                            // 关闭弹窗
                            this.handleClose();

                            // 刷新父组件表格数据
                            this.$emit('getInitData',this.data.planCode);
                        })


                
                } else {
                    return false;
                }
            });      
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
