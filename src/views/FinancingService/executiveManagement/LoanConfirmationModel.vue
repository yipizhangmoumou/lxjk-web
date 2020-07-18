/**
 * @description: 机构放款结果确认
 * @Date Changed: 2020-07-18
 */
<template>
    <!---->
    <el-dialog
        id="loanConfirmationModel"
        title="机构放款结果确认"
        :visible.sync="visible"
        width="600px"
        @open="loanConfirmationOpenEvent"
        :before-close="handleClose">
        <el-form 
            ref="loanConfirmationFromData" 
            label-position="left"
            label-width="100px"
            :model="loanConfirmationFromData" 
            :rules="loanConfirmationFromDataRules">



        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button 
                type="text" 
                @click="handleClear('loanConfirmationFromData')">
                清除条件
            </el-button>
            <el-button 
                type="primary" 
                @click="handleSave('loanConfirmationFromData')">
                确 定
            </el-button>
            <el-button 
                @click="()=>{this.handleClear('loanConfirmationFromData');this.handleClose()}">
                取 消
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'loanConfirmationModel',
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
                    productName: "",
                    orgName: "",
                    actionStatusValue: 0
                }
            }
        }
    },
    data () {
        return {

            // 表单数据
            loanConfirmationFromData: {
                result: 0,
                remake: ""

            },

            // 表单校验
            loanConfirmationFromDataRules: {
                
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
        loanConfirmationOpenEvent(){
            console.log("机构放款结果确认弹出窗被打开了~~~");
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
                    console.log("表单数据：",this.confirmationFromData);

                    let requiredParams = {
                        actionCode: this.data.childPlanCode,
                        auditDesc: this.confirmationFromData.remake,     
                        result: this.confirmationFromData.result,
                        status: this.data.actionStatusValue
                    }

                    this.$axios.post("/api/mgm/actionChildPlan/audit",requiredParams)
                        .then(res=>{
                            console.log("放款机构审核结果确认", res);
                        })

                } else {
                    return false;
                }
            });  
        }
    },
    
  
}
</script>

<style scoped lang="stylus">
    #loanConfirmationModel
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
