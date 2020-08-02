<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="所属融资分类">
                <el-select v-model="parentObj" placeholder="" value-key="code" class="full-width" disabled>
                    <el-option
                            v-for="(item, index) in dataCodeList"
                            :key="index"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品类型编码" prop="code">
                <el-input v-model="form.code" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="产品类型名称" prop="name">
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
  name: 'EditDataDictionary',
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
    dataCodeList: {
      type: Array,
      default () {
        return []
      }
    },
    parentObj: {
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
        code: null,
        name: null,
        parentCode: '',
        pkId: null
      },
      rules: {
        code: [{required: true, message: ' ', trigger: 'blur'}],
        name: [{required: true, message: ' ', trigger: 'blur'}]
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
        let url = this.form.pkId ? '/api/mgm/financingType/update' : '/api/mgm/financingType/add'
        this.$axios.post(url, {financingType: this.form}).then(() => {
          this.loading = false
          this.$msgSuccess()
          this.handleClose()
          this.$emit('queryList')
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
      return this.isNew ? '新建字典' : '编辑字典'
    }
  },
  watch: {
    visible (val) {
      if(val) {
        if(this.data.id) {
          this.isNew = false
          this.form = {
            code: this.data.code,
            name: this.data.name,
            parentCode: this.parentObj.code,
            pkId: this.data.id
          }
        } else {
          this.isNew = true
          this.form = {
            code: null,
            name: null,
            parentCode: this.parentObj.code,
            pkId: null
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
