/**
 * @description: 机构审核结果确认
 * @Date Changed: 2020-07-18
 */
<template>
    <!---->
    <el-dialog
        id="auditConfirmationModel"
        title="放款机构审核结果确认"
        :visible.sync="visible"
        width="600px"
        @open="proCustModelOpenEvent"
        :before-close="handleClose">
        <el-form 
            ref="confirmationFromData" 
            :model="confirmationFromData" 
            label-position="" 
            :rules="auditConfirmationFromDataRules">

            <el-form-item label="产品名称：">
                <el-link v-model="confirmationFromData.name">{{confirmationFromData.name}}</el-link>
            </el-form-item>

            <el-form-item label="放款机构：">
                <el-link v-model="confirmationFromData.org">{{confirmationFromData.org}}</el-link>
            </el-form-item>

             <el-form-item label="审核结果：" prop="result">
                <el-radio-group v-model="confirmationFromData.result">
                    <el-radio :label="0">通过</el-radio>
                    <el-radio :label="1">未通过</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="备注：" prop="remake">
                <el-input 
                    type="textarea" 
                    maxlength="30" 
                    :rows="4" 
                    v-model="confirmationFromData.remake" 
                    placeholder="请输入内容">
                </el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="text" @click="handleClear('confirmationFromData')">清除条件</el-button>
            <el-button type="primary" @click="handleSave('confirmationFromData')">
                确 定
            </el-button>
            <el-button @click="()=>{this.handleClear('confirmationFromData');this.handleClose()}">取 消</el-button>
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

                }
            }
        }
    },
    data () {
        return {

            // 表单数据
            confirmationFromData: {
                name: "",
                org: "",
                result: 0,
                remake: ""

            },

            // 表单校验
            auditConfirmationFromDataRules: []
     
        }
    },
    methods: { 

        /**
         * @description: 弹出窗被打开后的回调
         * @Date Changed: 
         */
        proCustModelOpenEvent(){
            console.log("机构审核结果弹出窗被打开了~~~");
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
                    console.log(valid);
                } else {
                    return false;
                }
            });  
        }
    },
    
  
}
</script>

<style scoped lang="stylus">

</style>
