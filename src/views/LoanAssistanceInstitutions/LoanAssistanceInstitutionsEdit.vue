<template>
    <!---->
    <div class="lae-box edit-content full-height" v-loading="loading">
        <el-scrollbar class="edit-scrollbar">
            <el-form ref="form" :model="form" label-position="top" :rules="rules" class="edit-form">
                <div class="edit-title">基础信息</div>
                <div class="edit-row">
                    <el-form-item label="机构名称" prop="field1">
                        <el-input v-model="form.field1" placeholder="请填写营业执照上完整的公司名称" class="edit-input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="行业类型" prop="field2">
                        <el-select v-model="form.field2" placeholder="" class="edit-input-width">
                            <el-option
                                    v-for="item in optionsList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在区域" prop="field3">
                        <el-select v-model="form.field3" placeholder="" class="edit-input-width">
                            <el-option
                                    v-for="item in optionsList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="edit-row">
                    <el-form-item label="邮编" prop="field4">
                        <el-input v-model="form.field4" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="field5">
                        <el-input v-model="form.field5" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="field6">
                        <el-input v-model="form.field6" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                </div>
                <div class="edit-row">
                    <el-form-item label="手机号码" prop="field7">
                        <el-input v-model="form.field7" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="field8">
                        <el-input v-model="form.field8" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="field9">
                        <el-input v-model="form.field9" placeholder="" class="edit-input-width"></el-input>
                    </el-form-item>
                </div>
                <div class="edit-title">公司详情</div>
                <el-row :gutter="20">
                 <el-col :span="8">
                     <el-form-item label="公司LOGO" prop="field1">
                         <el-upload
                                 class="avatar-uploader"
                                 action="https://jsonplaceholder.typicode.com/posts/"
                                 :show-file-list="false"
                                 :on-success="handleAvatarSuccess"
                                 :before-upload="beforeAvatarUpload">
                             <img v-if="imageUrl" :src="imageUrl" class="avatar">
                             <div v-else class="avatar-uploader-icon ms-flex column just-center align-center">
                                <i class="el-icon-plus"></i>
                                 <span>上传图片</span>
                             </div>
                             <div slot="tip" style="line-height: 20px">只能上传jpg/png文件，且不超过500kb</div>
                         </el-upload>
                     </el-form-item>
                 </el-col>
                <el-col :span="16">
                    <div class="edit-row">
                        <el-form-item label="详细地址" prop="field1">
                            <el-input v-model="form.field1" placeholder="" class="edit-input-width"></el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="field1">
                            <el-input v-model="form.field1" placeholder="" class="edit-input-width"></el-input>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="传真">
                            <el-input v-model="form.field1" placeholder="" class="edit-input-width"></el-input>
                        </el-form-item>
                        <el-form-item label="网址">
                            <el-input v-model="form.field1" placeholder="" class="edit-input-width"></el-input>
                        </el-form-item>
                    </div>
                    <div class="el-row">
                        <el-form-item label="公司介绍">
                            <el-input v-model="form.field1" type="textarea" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                </el-row>
            </el-form>
        </el-scrollbar>
        <div class="action-box">
            <el-button type="primary" @click.native="handleSave">保 存</el-button>
            <el-button @click.native="handleCancel">取 消</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoanAssistanceInstitutionsEdit',
  data () {
    return {
      imageUrl: '',
      loading: false,
      optionsList: [{value:1, label: 1}],
      form: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        field10: '',
        field11: '',
        field12: '',
        field13: '',
        field14: '',
        field15: '',
        field16: '',
        field17: ''
      },
      rules: {
        field1: [{required: true, message: ' '}]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      console.log(file.type)
      const isJPG = ['image/png', 'image/jpeg'].some(v => v === file.type)
      const isLt2M = file.size / 1024 / 1024 /1024 < 500;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500kb!');
      }
      return isJPG && isLt2M;
    },
    initData () {
      if(this.$route.query && this.$route.query.id) {
        // this.loading = true
        // this.$axios.post(`/api/mgm/product/detail/${this.$route.query.id}`)
        //   .then(res => {
        //     if (res.data) {
        //       let data = res.data
        //       data.product.chargeItems = data.product.chargeItems ? data.product.chargeItems.split(',') : []
        //       data.productApplyCondition.excludeArea = data.productApplyCondition.excludeArea ? data.productApplyCondition.excludeArea.split(',') : []
        //       data.productApplyCondition.excludeIndustry = data.productApplyCondition.excludeIndustry ? data.productApplyCondition.excludeIndustry.split(',') : []
        //       data.product.financingMethodJson && (data.product.financingMethodJson = Number(data.product.financingMethodJson))
        //       this.form.product = Object.assign(this.form.product, data.product)
        //       this.form.productApplyCondition = Object.assign(this.form.productApplyCondition, data.productApplyCondition)
        //     }
        //     this.loading = false
        //   })
        //   .catch(err => {
        //     this.$msgError(err.message)
        //     this.loading = false
        //   })
      }
    },
    handleSave () {
    },
    handleCancel () {
      this.$router.push('/LoanAssistanceInstitutions')
    }
  },
  created () {

  },
  mounted () {
    this.initData()
  },
  beforeDestroy () {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">
.lae-box{
    /deep/.avatar-uploader .el-upload {
        margin-top: 10px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
            border-color: #409EFF;
        }
    }
    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        .el-icon-plus{
            font-size: 30px;
        }
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
}
</style>
