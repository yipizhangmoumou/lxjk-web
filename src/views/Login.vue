<template>
    <!---->
    <div class="full-height login-content">
        <div class="login-box">
            <el-form ref="form" :model="form" label-width="0">
                <el-form-item>
                    <el-input v-model="form.userName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.userPsw" placeholder=""></el-input>
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
      }
    }
  },
  methods: {
    handleLogin () {
      this.$router.push('/Main')
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
.login-content{
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    .login-box{
        padding: 50px;
        border: 1px solid #e8e8e8;
    }
}
</style>
