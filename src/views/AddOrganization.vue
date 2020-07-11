<!--
    其实这个form表单可以遍历的，通过对象状态来控制select 和 input 还有 必填项和选填项，但是我懒得改了。你要想改你改吧!
    2020年7月10日23:29:29   emmmmmmm......
-->

<template>
  <div id="AddOrganization">
    <div class="form-title">
      <div>新增助贷机构</div>
      <div>
        <span style="color:#FF3B30">*</span>为必填项
      </div>
    </div>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="base-info">
          <h4>基础信息</h4>
          <div class="base-box">
            <div class="form-line">
              <el-form-item
                label="活动名称"
                prop="name"
                :rules="[
                    { required: true, message: '请填写公司名称'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写公司名称"></el-input>
              </el-form-item>
              <el-form-item
                label="行业类型"
                prop="name"
                :rules="[
                    { required: true, message: '行业类型不能为空'}
                ]"
              >
                <el-select v-model="form.region" placeholder="请选择行业类别">
                  <el-option label="请选择行业类别" value></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="所在区域"
                prop="name"
                :rules="[
                    { required: true, message: '请选择所在区域'}
                ]"
              >
                <el-select v-model="form.region" placeholder="请选择所在区域">
                  <el-option label="请选择所在区域" value></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-line">
              <el-form-item
                label="邮编"
                prop="name"
                :rules="[
                    { required: true, message: '请填写邮编'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写邮编"></el-input>
              </el-form-item>
              <el-form-item
                label="联系人"
                prop="name"
                :rules="[
                    { required: true, message: '请填写联系人'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写联系人"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="name">
                <el-input v-model="form.name" placeholder="请填写职位"></el-input>
              </el-form-item>
            </div>
            <div class="form-line">
              <el-form-item
                label="手机号码"
                prop="name"
                :rules="[
                    { required: true, message: '请填写手机号码'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写手机号码"></el-input>
              </el-form-item>
              <el-form-item label="QQ">
                <el-input v-model="form.name" placeholder="请填写QQ"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="name">
                <el-input v-model="form.name" placeholder="请填写邮箱"></el-input>
              </el-form-item>
            </div>
          </div>

          <h4>公司详情</h4>
          <div class="details">
            <div class="upload">
              <el-form-item
                label="公司LOGO"
                :rules="[
                    { required: true, message: '请填写手机号码'}
                ]"
                prop="name"
              >
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
                </el-upload>
              </el-form-item>
            </div>

            <div class="details-list">
              <div class="form-line">
                <el-form-item
                  label="详细地址"
                  prop="name"
                  :rules="[
                    { required: true, message: '请填写详细地址'}
                ]"
                >
                  <el-input style="margin-right: 50px;" v-model="form.name" placeholder="请填写详细地址"></el-input>
                </el-form-item>
                <el-form-item
                  label="电话"
                  prop="name"
                  :rules="[
                        { required: true, message: '请填写电话'}
                    ]"
                >
                  <el-input v-model="form.name" placeholder="请填写电话"></el-input>
                </el-form-item>
              </div>
              <div class="form-line">
                <el-form-item label="传真">
                  <el-input style="margin-right: 50px;" v-model="form.name" placeholder="请填写传真"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                  <el-input v-model="form.name" placeholder="请填写网址"></el-input>
                </el-form-item>
              </div>
              <div class="form-line">
                <el-form-item label="公司介绍">
                  <el-input
                    type="textarea"
                    v-model="form.desc"
                    style="width: 650px;"
                    rows="6"
                    placeholder="请输入介绍信息"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <h4>财务信息</h4>
          <div class="base-box">
            <div class="form-line">
              <el-form-item
                label="税号"
                prop="name"
                :rules="[
                    { required: true, message: '请填写税号'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写税号"></el-input>
              </el-form-item>
              <el-form-item
                label="发票抬头"
                prop="name"
                :rules="[
                    { required: true, message: '请填写发票抬头'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写发票抬头"></el-input>
              </el-form-item>
              <el-form-item
                label="开户银行"
                prop="name"
                :rules="[
                    { required: true, message: '请填写开户银行'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写开户银行"></el-input>
              </el-form-item>
            </div>
            <div class="form-line">
              <el-form-item
                label="银行账号"
                prop="name"
                :rules="[
                    { required: true, message: '请填写银行账号'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写银行账号"></el-input>
              </el-form-item>
              <el-form-item
                label="电话号码"
                prop="name"
                :rules="[
                    { required: true, message: '请填写电话号码'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写电话号码"></el-input>
              </el-form-item>
              <el-form-item
                label="单位地址"
                prop="name"
                :rules="[
                    { required: true, message: '请填写单位地址'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写单位地址"></el-input>
              </el-form-item>
            </div>
          </div>

          <h4>机构信息</h4>
          <div class="base-box">
            <div class="form-line">
              <el-form-item
                label="机构编号（登录账号，也可以自动生成）"
                prop="name"
                :rules="[
                    { required: true, message: '请填写机构编号'}
                ]"
              >
                <el-input v-model="form.name" placeholder="请填写税号"></el-input>
              </el-form-item>
              <el-form-item
                label="初始密码（登录后提示修改密码）"
                prop="name"
                :rules="[
                    { required: true, message: '请填写密码'}
                ]"
              >
                <el-input v-model="form.name" placeholder="888888"></el-input>
              </el-form-item>
              <el-form-item
                label="机构级别（暂无）"
                prop="name"
                :rules="[
                    { required: true, message: '请选择机构级别'}
                ]"
              >
                <el-select v-model="form.region" placeholder="请选择机构级别">
                  <el-option label="请选择机构级别" value></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-line">
              <el-form-item
                label="签约时间"
                prop="name"
                :rules="[
                    { required: true, message: '请填写签约时间'}
                ]"
              >
                <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input class="info" v-model="form.name" placeholder="请填写备注信息"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="submit-btn">
          <el-button type="primary" @click="addForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import CopyRight from "components/CopyRight";
export default {
  name: "AddOrganization",
  data() {
    return {
      // 这个没有和标签的v-model绑定，由于不知道接口字段。这个后期可以改下
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addForm() {
        console.log(this.form)
    },
    resetForm() {
        // 重置 记得改这里
        this.form = {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    }
  },
  components: {
    CopyRight
  }
};
</script>

<style lang="stylus" scoped>
@import "../assets/styl/fn.styl";
#AddOrganization
  position relative
  width 1100px
  margin 20px auto 200px
  background-color #fff
  .form-title
    padding 20px 30px
    box-sizing border-box
    display flex
    justify-content space-between
    font-size 14px
    color #666
    border-bottom 1px solid #e9e9e9
  .form-container
    padding 30px 50px 10px
    .base-info
      padding-bottom 20px
      h4
        color #666
        font-size 14px
        font-weight bold
        margin-bottom 50px
      .base-box, .details
        .form-line
          display flex
          justify-content space-between
          >>> .el-form-item__content
            margin 0 !important
          >>> input, select
            width 300px !important
          >>> .el-form-item__label
            width auto !important
        .info
          width 650px !important
          >>> .el-input__inner
            width 100% !important
    .submit-btn
      text-align center
      padding-bottom 30px
      button
        width 140px
    .details
      flex 1
      display flex
      justify-content space-between
      >>> .el-form-item__content
        margin 0 !important
      >>> input, select
        width 300px !important
      >>> .el-form-item__label
        float initial
        width auto !important
    >>> .el-upload
      border 1px dashed #d9d9d9
      border-radius 6px
      cursor pointer
      position relative
      overflow hidden
    .avatar-uploader
      .el-upload:hover
        border-color #409EFF
    .avatar-uploader-icon
      font-size 28px
      color #8c939d
      width 178px
      height 178px
      line-height 178px
      text-align center
    .avatar
      width 178px
      height 178px
      display block
  #CopyRight
    copyRight()
</style>
