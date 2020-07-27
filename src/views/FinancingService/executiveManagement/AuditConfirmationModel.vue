<template>
    <!--
        /**
        * @description: 风控审核弹出窗
        * @Date Changed: 2020-07-18
        */
    -->
    <el-dialog
        id="auditConfirmationModel"
        title="风控审核"
        :visible.sync="visible"
        width="600px"
        @open="auditConfirmationOpenEvent"
        :before-close="handleClose">
        <el-form 
            ref="confirmationFromData" 
            label-position="left"
            label-width="100px"
            :model="confirmationFromData" 
            :rules="auditConfirmationFromDataRules">

            <el-form-item label="公司名称：" prop="enterpriseName">
                <el-input v-model="data.enterpriseName" disabled></el-input>
            </el-form-item>

             <el-form-item label="审核结果：" prop="result">
                <el-radio-group v-model="confirmationFromData.result">
                    <el-radio :label="0">通过</el-radio>
                    <el-radio :label="1">未通过,重新定制</el-radio>
                    <el-radio :label="2">未通过,服务取消</el-radio>

                </el-radio-group>
            </el-form-item>

            <el-form-item label="备注：" prop="remake">
                <el-input 
                    type="textarea" 
                    maxlength="30" 
                    :rows="3" 
                    v-model="confirmationFromData.remake" 
                    placeholder="请输入内容">
                </el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button 
                type="text" 
                @click="handleClear('confirmationFromData')">
                清除条件
            </el-button>
            <el-button 
                type="primary" 
                @click="handleSave('confirmationFromData')">
                确 定
            </el-button>
            <el-button 
                @click="()=>{this.handleClear('confirmationFromData');this.handleClose()}">
                取 消
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'auditConfirmationModel',
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
                    financingCode: "",
                    enterpriseName: ""
                }
            }
        }
    },
    data () {
        return {

            // 表单数据
            confirmationFromData: {
                result: 0,
                remake: ""

            },

            // 表单校验
            auditConfirmationFromDataRules: {
                
            },
     
        }
    },
   
    methods: { 

        /**
         * @description: 弹出窗被打开后的回调
         * @Date Changed: 
         */
        auditConfirmationOpenEvent(){
            // console.log("风控审核弹出窗被打开了~~~");
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

                    let requiredParams = {
                        financingCode: this.data.financingCode,
                        auditDesc: this.confirmationFromData.remake,     
                        result: this.confirmationFromData.result
                    }

                    // console.log( "提交的数据：", requiredParams );

                    this.$axios.post("/api/mgm/financingPlan/riskAudit",requiredParams)
                        .then(res=>{
                            // console.log("风控审核结果确认", res);
                            if(res.code == 0){
                                this.$notify({
                                    title: '成功',
                                    message: '确认结果提交成功！',
                                    type: 'success'
                                });
                            }else{
                                this.$notify.error({
                                    title: '失败',
                                    message: '确认结果提交失败！'
                                });
                            }

                            // 清除填写数据
                            this.handleClear('confirmationFromData');

                            // 关闭弹窗
                            this.handleClose();

                            // 刷新父组件表格数据
                            this.$emit('getInitData');
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
    #auditConfirmationModel
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
