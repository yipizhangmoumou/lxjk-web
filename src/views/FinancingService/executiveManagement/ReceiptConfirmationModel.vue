/**
 * @description: 付款项收款审核
 * @Date Changed: 2020-07-18
 */
<template>
    <!---->
    <el-dialog
        id="receiptConfirmationModel"
        title="付款项收款审核"
        :visible.sync="visible"
        width="600px"
        @open="receiptConfirmationOpenEvent"
        :before-close="handleClose">
        <el-form 
            ref="receiptConfirmationFromData" 
            label-position="left"
            label-width="100px"
            :model="receiptConfirmationFromData" 
            :rules="receiptConfirmationFromDataRules">

            <el-form-item label="产品名称：" prop="name">
                <el-input v-model="data.productName" disabled></el-input>
            </el-form-item>

            <el-form-item label="申请额度：" prop="finalAmount" >
                <el-input v-model="data.finalAmount" disabled></el-input>
            </el-form-item>

            <el-form-item label="前置付款项：" prop="qzChargeItem" v-if="data.actionStatusValue == '2'">
                <el-input v-model="data.qzChargeItem" disabled></el-input>
            </el-form-item>

            <el-form-item label="服务费：" prop="servChargeItem" v-if="data.actionStatusValue == '5'">
                <el-input v-model="data.servChargeItem" disabled></el-input>
            </el-form-item>

            <el-form-item label="审核收款项：" prop="reviewCollection" >
                <el-radio v-model="receiptConfirmationFromData.reviewCollection" label="1" v-if="data.actionStatusValue == '2'">前置付款项</el-radio>
                <el-radio v-model="receiptConfirmationFromData.reviewCollection" label="2" v-if="data.actionStatusValue == '5'">服务费</el-radio>
            </el-form-item>

            <el-form-item label="审核收款项：" prop="收款结果审核">
                <el-radio v-model="receiptConfirmationFromData.result" label="1">已放款</el-radio>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button 
                type="text" 
                @click="handleClear('receiptConfirmationFromData')">
                清除条件
            </el-button>
            <el-button 
                type="primary" 
                @click="handleSave('receiptConfirmationFromData')">
                确 定
            </el-button>
            <el-button 
                @click="()=>{this.handleClear('receiptConfirmationFromData');this.handleClose()}">
                取 消
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'receiptConfirmationModel',
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
                    childPlanCode: "",
                    actionStatusValue: "",      // 审批状态
                    productName: "",
                    finalAmount: "",           // 申请额度
                    qzChargeItem: "",            // 前置付款项
                    servChargeItem: ""            // 服务费
                }
            }
        }
    },
    data () {
        return {

            // 表单数据
            receiptConfirmationFromData: {
                reviewCollection: "1",  // 审核收款项
                result: "1"// 收款结果审核

            },

            // 表单校验
            receiptConfirmationFromDataRules: {
                
            },

            // 状态反向
            actionStatusSetObj: {
                "申请中": 0,
                "待风控审核": 1,
                "待付款前置收费项": 2,
                "待放款机构审核": 3,
                "机构签约放款": 4,
                "待付款服务费": 5,
                "服务完成": 6,
                "服务取消": 7
            },
     
        }
    },
   
    methods: { 

        /**
         * @description: 弹出窗被打开后的回调
         * @Date Changed: 
         */
        receiptConfirmationOpenEvent(){
            console.log("付款项收款审核弹出窗被打开了~~~");
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
         * @param {string}: 提交的表单名
         * @Date Changed: 
         */
        handleSave (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("ajax数据：",this.data);
                    console.log("表单数据：",this.receiptConfirmationFromData);

                    let requiredParams = {
                        actionCode: this.data.childPlanCode,  
                        result: this.confirmationFromData.result,
                        status: this.data.actionStatusValue
                    }
                    console.log("提交参数：", requiredParams);

                    // this.$axios.post("/api/mgm/actionChildPlan/audit",requiredParams)
                    //     .then(res=>{
                    //         console.log("放款机构审核结果确认", res);
                    //     })

                } else {
                    return false;
                }
            });  
        }
    },
    
  
}
</script>

<style scoped lang="stylus">
    #receiptConfirmationModel
        /deep/ .el-dialog
            /deep/ .el-dialog__header
                background #f2f2f2
                border-bottom 1px solid #e5e5e5
            .el-dialog__body
                padding 20px 40px
                max-height 300px
                overflow-y: auto

            .el-dialog__footer
                border-top 1px solid #e5e5e5
        
</style>
