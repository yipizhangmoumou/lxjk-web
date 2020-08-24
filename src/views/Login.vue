<template>
    <div id="Login">
        <div class="login-group">
            <div class="login-item">
                <img src="../assets/images/login-banner.png" alt="">
            </div>
            <div class="login-item">
                <h1 class="title">链信金科</h1>
                <el-form :model="user" ref="user" class="form-item" @submit.native.prevent>
                    <el-form-item prop="phone"
                        :rules="[
                            { required: true, message: '请输入手机号码', trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model="user.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password"
                        :rules="[
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
                        ]"
                    >
                        <el-input type="password" v-model="user.password" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" native-type="submit" @click="submitForm('user')" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <copyright />
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    phone: '',
                    password: ''
                },
              loading: false
            }
        },
        methods: {


            

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 登录调试
                  this.loading = true
                    this.$axios.post('/api/mgm/index/login', this.user).then(res => {
                      window.sessionStorage.setItem('token', res.data.token);
                      window.sessionStorage.setItem('userName', res.data.userName || "");
                      window.sessionStorage.setItem('role', res.data.role);
                      let userInfo = {
                        role: res.data.role,
                        userName: res.data.userName
                      }
                      this.$store.commit('setLoginUserInfo', userInfo)
                      this.$router.push("/");
                      this.loading = false
                    }).catch(() => {
                      this.$msgError('账号或者密码错误')
                      this.loading = false
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>
    #Login
        background url(../assets/images/login-bg.png) no-repeat right bottom #015cf2
        position absolute
        top 0
        left 0
        bottom 0
        width 100%
        .login-group
            width 840px
            height 600px
            position absolute
            top 45%
            left 50%
            transform translate(-50%, -50%)
            margin 0 auto
            background-color #fff
            box-shadow 0 0 10px 0 rgba(0,0,0,.4)
            display flex
            .login-item
                flex 1
                .title
                    margin 160px auto 70px;
                    text-align center
                    color #015cf2
                    font-size 26px
                .form-item
                    width 300px
                    margin 0 auto
                    .el-input,
                    >>> .el-input__inner
                        height 50px
                        line-height 50px
                    .el-button
                        width 100%
                        height 50px
                        font-size 18px
                        background-color #015cf2
                        border-color #015cf2
                        &:hover
                            opacity .85
    >>> #CopyRight
        p
            position absolute
            bottom 60px
            left 50%
            transform translateX(-50%)
</style>
