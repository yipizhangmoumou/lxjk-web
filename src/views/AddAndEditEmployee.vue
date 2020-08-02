
<template>
  <div id="AddAndEditEmployee" v-loading="loading">
    <div class="form-title">
      <div>请填写员工信息</div>
      <div>
        <span style="color:#FF3B30">*</span>为必填项
      </div>
    </div>
    <div class="form-container">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
                  label="所属机构："
                  prop="loanAgencyId"
                  :rules="[
              { required: true, message: '请选择所属机构', trigger: 'blur' }
            ]"
          >
            <el-select v-model="form.loanAgencyId" placeholder="请选择所属机构">
              <el-option
                      v-for="item in lList"
                      :key="item.pkId"
                      :label="item.name"
                      :value="item.pkId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
                  label="所在区域"
                  prop="area"
                  :rules="[
                    { required: true, message: '请选择所在区域'}
                ]"
          >
            <el-cascader
                    v-model="form.area"
                    placeholder=""
                    :options="areaTree"
                    :props="{
                                      expandTrigger: 'hover',
                                      value: 'code',
                                      label: 'name',
                                      emitPath: false
                                    }"
                    collapse-tags
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="手机号码："
            prop="phone"
            :rules="[
              { required: true, message: '请输入手机号码', trigger: 'blur' }
            ]"
          >
            <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item
                  label="用户姓名："
                  prop="userName"
                  :rules="[
              { required: true, message: '请输入用户姓名', trigger: 'blur' }
            ]"
          >
            <el-input placeholder="请输入用户姓名" v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item
                  v-if="!form.pkId"
                  label="用户密码："
                  prop="password"
                  :rules="[
              { required: true, message: '请输入用户密码', trigger: 'blur' }
            ]"
          >
            <el-input placeholder="请输入用户密码" v-model="form.password" show-password></el-input>
          </el-form-item>
        <div class="submit-btn">
          <el-button type="primary" @click="addForm">提交</el-button>
          <el-button @click="resetForm">取消</el-button>
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
      loading: false,
      // 地区树形数据
      areaTree: [],
      // 这个没有和标签的v-model绑定，由于不知道接口字段。这个后期可以改下
      form: {
        pkId: null,
        "area": "",
        // "deptId": "",
        "loanAgencyId": undefined,
        "password": "",
        "phone": "",
        "userName": ""
      },
      imageUrl: "",
      value: false,
      isEdit: false,
      lList: []
    };
  },
  methods: {
    getIList() {
      this.$axios.post('/api/mgm/loanAgency/queryList', {"page": 1,
        "size": 500}).then(res => this.lList = res.data.mgmLoanAgencyList)
    },
    initData () {
        this.loading = true
        this.$axios.post(`/api/mgm/loanAgencyUser/queryById/${this.$route.params.type}`)
                .then(res => {
                  if (res.data) {
                    this.form = Object.assign(this.form, res.data)
                  }
                  this.loading = false
                })
                .catch(err => {
                  this.$msgError(err.message)
                  this.loading = false
                })
    },
    deleteEmpty (arr) {
      return arr.map(v => {
        if (v.children && v.children.length) {
          v.children = this.deleteEmpty(v.children)
        } else {
          delete v.children
        }
        return v
      })
    },
    getAreaTree () {
      this.$axios.post('/api/mgm/area/getAreaInfo').then(res => {
        this.areaTree = this.deleteEmpty(res.data.areaTree)
      })
    },
    addForm() {
      console.log(this.form);
      this.$refs.form.validate()
        .then(() =>{
          this.loading = true
          let url = this.form.pkId ? '/api/mgm/loanAgencyUser/update' : '/api/mgm/loanAgencyUser/add'
          this.$axios.post(url, this.form)
            .then(() => {
              this.loading = false
              this.$msgSuccess()
              this.$router.back(-1)
            })
            .catch(err => {
              this.loading = false
              this.$msgError(err.message)
            })
        })
        .catch(err => console.log(err))
    },
    resetForm() {
      // 重置 记得改这里
     this.$router.back(-1)
    }
  },
  components: {
    CopyRight
  },
  created() {
    this.getAreaTree()
    this.getIList()
    // 添加
    if(this.$route.params.type === "add") {
      this.isEdit = false;
    }
    // 编辑
    else {
      this.isEdit = true
      this.initData()
    }
  },
  mounted () {
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
      .el-select, .el-input, .el-cascader
        width 100%
    >>> .submit-btn
      text-align center
      padding-bottom 30px
      button
        width 140px
  #CopyRight
    copyRight()
</style>
