
<template>
  <div id="AddAndEditEmployee">
    <div class="form-title">
      <div>请填写员工信息</div>
      <div>
        <span style="color:#FF3B30">*</span>为必填项
      </div>
    </div>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="userinfo">
          <el-form-item
            label="手机号码："
            prop="phone"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'phone', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
          >
            <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="phone">
            <el-input placeholder="请输入部门"></el-input>
          </el-form-item>
        </div>
        <el-form-item
          label="岗位："
          prop="gw"
          :rules="[
              { required: true, message: '请选择岗位', trigger: 'blur' }
            ]"
        >
          <el-select v-model="form.region" placeholder="请选择岗位">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号密码：" prop="phone">
          <el-input placeholder="请输入账号密码"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="phone">
          <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" prop="day">
          <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="所在城市：" prop="city">
          <el-select v-model="form.region" placeholder="请选择所在城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个性签名：" prop="phone">
          <el-input placeholder="请输入个性签名"></el-input>
        </el-form-item>
        <el-form-item label="设为管理员：" prop="isAdmin">
          <el-switch v-model="value" active-color="#13ce66"></el-switch>
        </el-form-item>
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
  name: "AddAndEditEmployee",
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
      imageUrl: "",
      value: false,
      isEdit: false
    };
  },
  methods: {
    addForm() {
      console.log(this.form);
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
      };
    }
  },
  components: {
    CopyRight
  },
  created() {
    // 添加
    if(this.$route.params.type == "add") {
      this.isEdit = false;
    } 
    // 编辑
    else {
      this.isEdit = true
    }

    console.log(this.$route.params.type)
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/styl/fn.styl'
#AddAndEditEmployee
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
    width 550px
    margin 0 auto
    padding 30px 50px 10px
    >>> .el-form-item__label
      width 120px !important
    >>> .el-form-item__content
      margin-left 120px !important
      .el-select, .el-input
        width 100%
    >>> .submit-btn
      text-align center
      padding-bottom 30px
      button
        width 140px
  #CopyRight
    copyRight()
</style>