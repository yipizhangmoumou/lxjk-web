<template>
    <!---->
    <div class="full-height login-content">
        <div class="login-box">
            <el-form ref="form" :model="form" label-width="0" :rules="rules">
                <el-form-item prop="userName">
                    <el-input v-model="form.userName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item prop="userPsw">
                    <el-input v-model="form.userPsw" type="password" placeholder=""></el-input>
                </el-form-item>
                <el-button type="primary" @click.native="handleLogin" class="full-width">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        userName: '',
        userPsw: ''
      },
      rules: {
        userName: [{required: true, message: '用户名不能为空'}],
        userPsw: [{required: true, message: '密码不能为空'}]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate().then(()=>{
        window.sessionStorage.setItem('userName', JSON.stringify(this.form.userName))
        this.$store.dispatch('setUserInfo', this.form);
        this.$router.push('/')
      }).catch(err => console.log(err))
      // this.$axios.post('/api/mgm/product/list', {
      //   PageReq: {
      //     page: 1,
      //     size: 20
      //   }
      // })
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch(err => {console.log(err)})
    }
  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">
    .login-content {
        display: flex;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;

        .login-box {
            padding: 50px;
            border: 1px solid #e8e8e8;
        }
    }
</style>
