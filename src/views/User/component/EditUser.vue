<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户账户(登陆账号)" prop="userAccount">
                <el-input v-model="form.userAccount" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="userType">
                <el-input v-model="form.userType" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
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
      isNew: true,
      form: {
        phone: '',
        userAccount: '',
        userType: undefined
      },
      rules: {
        phone: [
          {required: true, message: ' '},
          {type: 'phone', message: ' '}
        ],
        userAccount: [{required: true, message: ' '}],
        userType: [{required: true, message: ' '}]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('changeVisible', false)
    },
    handleSave () {
      this.$refs.form.validate().then(()=>{

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
            phone: '',
            userAccount: '',
            userType: undefined
          }
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="less">

</style>
