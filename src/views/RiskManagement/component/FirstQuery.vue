<template>
    <!---->
    <el-dialog
            title="风险查询"
            :visible.sync="visible"
            width="800px"
            :before-close="handleClose">
        <el-form ref="form" class="form-box" :model="form" label-position="left" label-width="120px" :rules="rules">
            <el-form-item prop="customerName" label="姓名">
                <el-input v-model="form.customerName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="paperNumber" label="身份证号">
                <el-input v-model="form.paperNumber" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="loanTypeDesc" label="借款类型描述">
                <el-input v-model="form.loanTypeDesc" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="applyAssureType" label="担保类型">
                <el-select v-model="form.applyAssureType" placeholder="">
                    <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="applyLoanMoney" label="借款金额(元)">
                <el-input-number style="width: 100%" v-model="form.applyLoanMoney" :min="1" :max="99999999999999999999" :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item prop="applyLoanTimeLimit" label="借款期限(月)">
                <el-input-number style="width: 100%" v-model="form.applyLoanTimeLimit" :min="1" :max="999999" :controls="false" :precision="0"></el-input-number>
            </el-form-item>
            <el-form-item prop="applyDate" label="申请日期">
                <el-date-picker v-model="form.applyDate" type="date" placeholder="" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="借款地点" prop="applyCreditCity">
                <el-cascader
                        v-model="form.applyCreditCity"
                        placeholder=""
                        :options="areaTree"
                        :props="{
                                      expandTrigger: 'hover',
                                      value: 'code',
                                      label: 'name',
                                      emitPath: false
                                    }"
                />
            </el-form-item>
            <el-form-item label="快速查询">
                <el-select v-model="form.quickRisk" placeholder="">
                    <el-option label="是" value="1"/>
                    <el-option label="否" value="0"/>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="常用住址">
                <el-cascader
                        v-model="form.currentAddress"
                        placeholder=""
                        :options="areaTree"
                        :props="{
                                      expandTrigger: 'hover',
                                      value: 'code',
                                      label: 'name',
                                      emitPath: false
                                    }"
                />
            </el-form-item>
            <el-form-item label="常用住址">
                <el-input v-model="form.currentAddressDetail" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="工作单位">
                <el-input v-model="form.company" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="handleQuery">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
</template>

<script>
const INFO_DEFINE = {
  member: '3041',
  sign: 'JNoCMYv9wc46I'
}
export default {
  name: 'FirstQuery',
  model: {
    prop: 'visible',
    event: 'changeVisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      optionsList: [
        {value: 'A', label: '抵押'},
        {value: 'B', label: '质押'},
        {value: 'C', label: '担保'},
        {value: 'D', label: '信用'},
        {value: 'E', label: '保证'},
        {value: 'Y', label: '其他'}
      ],
      areaTree: [],
      form: {
        customerName: '',
        paperNumber: '',
        loanTypeDesc: '',
        applyAssureType: '',
        applyLoanMoney: undefined,
        applyLoanTimeLimit: undefined,
        applyDate: '',
        applyCreditCity: '',
        quickRisk: '',
        email: '',
        phone: '',
        currentAddress: '',
        currentAddressDetail: '',
        company: ''
      },
      rules: {
        customerName: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        paperNumber: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        loanTypeDesc: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        applyAssureType: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        applyLoanMoney: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        applyLoanTimeLimit: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        applyDate: [{required: true, message: ' ', trigger: ['blur', 'change']}],
        applyCreditCity: [{required: true, message: ' ', trigger: ['blur', 'change']}]
      }
    }
  },
  methods: {
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
    handleClose () {
      this.$emit('changeVisible', false)
    },
    getRandom () {
      return ('' + +new Date() + '-' + Math.floor((Math.random() * 100) + 1))
    },
    handleQuery () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        this.$axios.get('/remote/mspClientQuery.shtml', {
          params: Object.assign(
            {},
            INFO_DEFINE,
            this.form,
            {
              loanId: this.getRandom()
            }
          )
        })
          .then((res) => {
            this.loading = false
            if (res.errors && res.errors.length) {
              return this.$msgError(res.errors[0].msg)
            } else {
              this.$router.push(
                {
                  name: 'CreditReferenceDetails',
                  query: {
                    customerName: this.form.customerName,
                    paperNumber: this.form.paperNumber
                  },
                  params: res
                }
              )
            }
          })
          .catch((err) => {
            this.loading = false
            this.$msgError(err.message)
          })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getAreaTree()
  },
  beforeDestroy () {

  },
  computed: {},
  watch: {
    visible (val) {
      if (val) {
        this.form = {
          customerName: '',
          paperNumber: '',
          loanTypeDesc: '',
          applyAssureType: '',
          applyLoanMoney: undefined,
          applyLoanTimeLimit: undefined,
          applyDate: '',
          applyCreditCity: '',
          quickRisk: '',
          email: '',
          phone: '',
          currentAddress: '',
          currentAddressDetail: '',
          company: ''
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
    .form-box{
        display: flex;
        flex-wrap: wrap;
        justify-content space-between
        .el-form-item{
            width: 45%
        }
    }
</style>
