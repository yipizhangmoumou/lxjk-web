<template>
    <!---->
    <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            width="30%"
            :before-close="handleClose">
        <el-form ref="form" :model="form" label-position="top" :rules="rules">
            <el-form-item label="字典类型">
                <el-select v-model="parentObj" placeholder="" class="full-width" disabled>
                    <el-option
                            v-for="(item, index) in dataCodeList"
                            :key="index"
                            :label="item.value"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字典名称" prop="dictValue">
                <el-input v-model="form.dictValue" placeholder=""></el-input>
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
          "id": null,
          "parentId": null,
          "code": "",
          "dictValue": ""
      },
      rules: {
        dictValue: [{required: true, message: ' ', trigger: 'blur'}]
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
        let url = this.form.id ? '/api/mgm/dict/update' : '/api/mgm/dict/add'
        this.$axios.post(url, {dict: this.form}).then(() => {
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
            "id": this.data.id,
            "parentId": this.parentObj.id,
            "code": this.data.code,
            "dictValue": this.data.value
          }
        } else {
          this.isNew = true
          this.form = {
            "id": null,
            "parentId": this.parentObj.id,
            "code": this.parentObj.code,
            "dictValue": ""
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
