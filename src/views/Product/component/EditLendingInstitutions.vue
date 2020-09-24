<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="产品贷款机构名称" prop="name">
                <el-input v-model="form.name" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="handleSave">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  name: 'EditLendingInstitutions',
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
      loading: false,
      isNew: true,
      form: {
        "id": null,
        "name": "",
        "status": 0
      },
      rules: {
        name: [{required: true, message: ' ', trigger: 'blur'},
          {validator: this.validateBase }]
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
        let url = this.form.id ? '/api/mgm/productLendingProvider/update' : '/api/mgm/productLendingProvider/add'
        this.$axios.post(url, { productLendingProvider: this.form }).then(() => {
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
      return this.isNew ? '新建产品贷款机构' : '编辑产品贷款机构'
    }
  },
  watch: {
    visible (val) {
      if(val) {
        if(this.data.id) {
          this.isNew = false
          this.form = Object.assign({}, this.data)
        } else {
          this.isNew = true
          this.form = {
            "id": null,
            "name": "",
            status: 0
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
