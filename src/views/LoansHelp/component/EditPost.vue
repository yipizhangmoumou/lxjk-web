<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="left" label-width="80px" :rules="rules">
            <el-form-item label="所属机构" prop="fkCompanyId">
                <el-select v-model="form.fkCompanyId" placeholder="" class="full-width">
                    <el-option
                            v-for="item in lAlist"
                            :key="item.pkId"
                            :label="item.name"
                            :value="item.pkId">
                    </el-option>
                </el-select>
            </el-form-item>
<!--            <el-form-item label="上级岗位">-->
<!--                <el-select v-model="form.parentId" placeholder="" :disabled="!form.fkCompanyId" class="full-width">-->
<!--                    <el-option-->
<!--                            v-for="item in adeptList"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                    </el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="岗位名称" prop="deptName">
                <el-input v-model="form.deptName" placeholder="" maxlength="48"></el-input>
            </el-form-item>
            <el-form-item label="岗位描述">
                <el-input v-model="form.description" type="textarea" placeholder=""></el-input>
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
  name: 'EditPost',
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
    },
    lAlist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      isNew: true,
      optionsList: [],
      form: {
        "deptName": "", //部门名称
        "description": "", //描述
        "fkCompanyId": null, //公司ID
        "id": null,
        "parentId": null, //父主键
        "status": 0 // '是否启用 1：不启用 0：正常’
      },
      rules: {
        fkCompanyId: [{required: true, message: ' ', trigger: 'blur'}],
        deptName: [{required: true, message: ' ', trigger: 'blur'},
          {validator: this.validateBase }]
      },
      adeptList: []
    }
  },
  methods: {
    handleChangeFK (val) {
      if (val) {
        this.$axios.post(`/api/mgm/loanAgencyDept/children/${val}`)
        .then(res => {
          console.log(res)
          res.data.deptTree && (this.adeptList = res.data.deptTress)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    handleClose () {
      this.$emit('changeVisible', false)
    },
    handleSave () {
      this.$refs.form.validate().then(()=>{
        this.loading = true
        let url = this.form.pkId ? '/api/mgm/loanAgencyDept/update' : '/api/mgm/loanAgencyDept/add'
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
      return this.isNew ? '添加岗位' : '编辑岗位'
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
            "deptName": "", //部门名称
            "description": "", //描述
            "fkCompanyId": null, //公司ID
            "id": null,
            "parentId": null, //父主键
            "status": 0 // '是否启用 1：不启用 0：正常’
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
