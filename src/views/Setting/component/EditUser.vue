<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model.trim="form.phone" placeholder="" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="用户账户(登陆账号)" prop="userAccount">
                <el-input v-model="form.userAccount" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="isNew">
                <el-input v-model="form.password" placeholder="" show-password></el-input>
            </el-form-item>
            <el-form-item label="用户名(用户真实姓名)" prop="userName">
                <el-input v-model="form.userName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="userType">
                <el-select v-model="form.userType" placeholder="" class="full-width" :disabled="!!this.form.pkId">
                    <el-option
                            v-for="item in userTypeList"
                            v-show="item.value !== cfg.USER_TYPE.ENTERPRISE  "
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="handleSave">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
</template>

<script>
import cfg from './cfg'
export default {
  name: 'EditUser',
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
        return {}
      }
    }
  },
  data () {
    return {
      cfg,
      loading: false,
      isNew: true,
      form: {
        pkId: null,
        phone: '',
        userAccount: '',
        password: '',
        userName: '',
        userType: undefined
      },
      rules: {
        phone: [
          {required: true, message: ' ', trigger: 'blur'},
          {validator: this.validatePhone }
          ],
        userAccount: [{required: true, message: ' ', trigger: 'blur'}],
        userType: [{required: true, message: ' ', trigger: 'blur'}],
        password: [{required: true, message: ' ', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('changeVisible', false)
    },
    handleSave () {
      this.$refs.form.validate().then(()=>{
        this.loading = true
        let url = this.form.pkId ? '/api/mgm/user/updateUser' : '/api/mgm/user/add'
        this.$axios.post(url, this.form).then(() => {
          this.loading = false
          this.$msgSuccess()
          this.handleClose()
          this.$emit('query')
        }).catch((err)=>{
          this.loading = false
          this.$msgError(err.message)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {
    dialogTitle () {
      return this.isNew ? '新建用户' : '编辑用户'
    },
    userTypeList () {
      let list = []
      cfg.USER_TYPE_MAP.forEach(v => {
        list.push(v)
      })
      return list
    }
  },
  watch: {
    visible (val) {
      if(val) {
        if(this.data.pkId) {
          this.isNew = false
          this.form = Object.assign({}, this.data)
        } else {
          this.isNew = true
          this.form = {
            pkId: null,
            phone: '',
            userAccount: '',
            password: '',
            userName: '',
            userType: undefined
          }
        }
        this.$refs.form && this.$refs.form.clearValidate()
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="less">

</style>
