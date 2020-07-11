<template>
    <!---->
    <div class="edit-content full-height" v-loading="loading">
        <el-scrollbar class="edit-scrollbar">
            <el-form ref="form" :model="form.product" :rules="rules" label-width="160px" label-position="left" class="edit-form">
                <div class="edit-title">产品信息</div>
                <div>
<!--                    <div class="edit-row">-->
<!--                        <el-form-item label="产品名称" prop="productName">-->
<!--                            <el-input v-model="form.product.productName" placeholder="" class="edit-input-width"></el-input>-->
<!--                        </el-form-item>-->

<!--                    </div>-->
                    <div class="edit-row">
<!--                        <el-form-item label="产品类型" prop="type">-->
<!--                            <el-radio-group v-model="form.product.type">-->
<!--                              <el-radio :label="1">短期</el-radio>-->
<!--                              <el-radio :label="2">中期</el-radio>-->
<!--                              <el-radio :label="3">长期</el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </el-form-item>-->
                        <el-form-item label="融资方式" prop="financingMethodJson">
                            <el-cascader
                                    v-model="form.product.financingMethodJson"
                                    placeholder=""
                                    :options="typeTree"
                                    :props="{
                                      expandTrigger: 'hover',
                                      value: 'pkId',
                                      label: 'name',
                                      emitPath: false
                                    }"
                                    collapse-tags
                                    :show-all-levels="false"
                                    class="edit-input-width"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="申请方式" prop="applicationMethod">
                            <el-select v-model="form.product.applicationMethod" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in application_method"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="审批最小额度(万元)" prop="loanInterestMin">
                            <el-input-number v-model="form.product.loanInterestMin" :min="0"
                                             :controls="false" class="edit-input-width"></el-input-number>
                        </el-form-item>
                        <el-form-item label="审批最大额度(万元)" prop="loanInterestMax">
                            <el-input-number v-model="form.product.loanInterestMax" :min="0"
                                             :controls="false" class="edit-input-width"></el-input-number>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="最小借款周期(期)" prop="loanPeriodMin">
                            <el-input-number v-model="form.product.loanPeriodMin" :min="0"
                                             :controls="false" class="edit-input-width"></el-input-number>
                        </el-form-item>
                        <el-form-item label="最大借款周期(期)" prop="loanPeriodMax">
                            <el-input-number v-model="form.product.loanPeriodMax" :min="0"
                                             :controls="false" class="edit-input-width"></el-input-number>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="还款方式" prop="repaymentMethod">
                            <el-select v-model="form.product.repaymentMethod" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in repayment_method"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="担保方式" prop="guaranteeMethod">
                            <el-select v-model="form.product.guaranteeMethod" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in guarantee_method"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="产品描述">
                            <el-input v-model="form.product.productDescribe" placeholder="" class="edit-input-width"></el-input>
                        </el-form-item>
                        <el-form-item label="产品收费项" prop="chargeItems">
                            <el-checkbox-group v-model="form.product.chargeItems">
                              <el-checkbox v-for="(v,i) in charge_items" :label="v.key" :key="i">{{v.value}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <el-form ref="form1" :model="form.productApplyCondition" :rules="rules1" label-width="160px" label-position="left" class="edit-form">
                <div class="edit-title">准入条件--企业信息</div>
                <div>
                    <div class="edit-row">
                        <el-form-item label="排除行业" prop="excludeIndustry">
                            <el-cascader
                                    v-model="form.productApplyCondition.excludeIndustry"
                                    placeholder=""
                                    :options="industryTree"
                                    :props="{
                                      expandTrigger: 'hover',
                                      value: 'code',
                                      label: 'name',
                                      multiple: true,
                                      emitPath: false
                                    }"
                                    collapse-tags
                                    :show-all-levels="false"
                                    class="edit-input-width"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="排除地区" prop="excludeArea">
                            <el-cascader
                                    v-model="form.productApplyCondition.excludeArea"
                                    placeholder=""
                                    :options="areaTree"
                                    :props="{
                                      expandTrigger: 'hover',
                                      value: 'code',
                                      label: 'name',
                                      multiple: true,
                                      emitPath: false
                                    }"
                                    collapse-tags
                                    :show-all-levels="false"
                                    class="edit-input-width"
                            ></el-cascader>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="可选企业性质" prop="enterpriseNature">
                            <el-select v-model="form.productApplyCondition.enterpriseNature" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in enterprise_nature"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="(不低于)公司注册资本" prop="registeredCapital">
                            <el-input-number v-model="form.productApplyCondition.registeredCapital" :min="0"
                                             :controls="false" placeholder="" class="edit-input-width"></el-input-number>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="(不低于)公司注册年限" prop="operateTime">
                            <el-input-number v-model="form.productApplyCondition.operateTime" :min="0"
                                             :controls="false" placeholder="" class="edit-input-width"></el-input-number>
                        </el-form-item>
                    </div>
                </div>
                <div class="edit-title">准入条件--法人信息</div>
                <div>
                    <div class="edit-row">
                        <el-form-item label="法人年龄" prop="applicantAge">
                            <el-select v-model="form.productApplyCondition.applicantAge" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in corporate_age"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="edit-title">准入条件--企业经营</div>
                <div>
                    <div class="edit-row">
                        <el-form-item label="本年度销售收入" prop="currentYearRevenue">
                            <el-select v-model="form.productApplyCondition.currentYearRevenue" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in year_revenue"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上年度销售收入" prop="lastYearRevenue">
                            <el-select v-model="form.productApplyCondition.lastYearRevenue" placeholder="" class="edit-input-width">
                                <el-option
                                        v-for="item in last_year_revenue"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="edit-row">
                        <el-form-item label="上年度开票收入" prop="yearInvoiced">
                            <el-input-number v-model="form.productApplyCondition.yearInvoiced" :min="0"
                                             :controls="false" placeholder="" class="edit-input-width"></el-input-number>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </el-scrollbar>
        <div class="action-box">
            <el-button type="primary" @click.native="handleSave">保存</el-button>
            <el-button @click.native="handleCancel">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductEdit',
  data () {
    const validateNum = (rules, value, cb) => {
      if(!value){
        return cb(new Error(' '))
      }
      cb()
    }
    return {
      loading: false,
      chargeList: [],
      form: {
        "product": {
          "applicationMethod": "", // 申请方式，关联数据字典
          "applyTemplateData": "", // 申请资料模板
          "approvalAmountMax": 0, //审批最大额度(万)
          "approvalAmountMin": 0, //审批最小额度(万)
          "chargeItems": [], // 收费项
          "chargeStandard": "", // 收费标准
          "financingMethodJson": "", // 融资方式
          "fkApplicationCondition": "", // 申请条件-与申请条件表关联
          "guaranteeMethod": "", // 担保方式，关联数据字典
          "interestRate": 0,// (参考)利率，并不作为最终子方案的利率，执行方案生成人员可根据此利率上下浮动进行定价。
          "isCreditInvestigation": true,// 是否上征信
          "lenders": "string",// 贷款机构 TODO 助贷机构做好后要加入
          "loanInterestMax": undefined,// 最高贷款利息
          "loanInterestMin": undefined,// 最低贷款利息
          "loanPeriodMax": undefined,// 借款最大周期(月)
          "loanPeriodMin": undefined,// 借款最小周期(月)
          "loanPeriodOther": 0,// 其他借款周期(月)
          "pkId": null,// 主键
          "productDescribe": "", // 产品描述
          "productName": "", // 产品名称
          "repaymentMethod": "",// 还款方式，关联数据字典
          "status": 0, //状态：-1 下架 0 上架 2注销（删除）
          // "type": undefined// 产品类型(1.短期 2.中期 3.长期)
        },
        "productApplyCondition": {
          "applicableCareer": "",// 适用职业： 1 公务员或企事业单位 2 世界五百强企业 3 其他
          "applicantAgeMax": 0,// 申请人最大年龄
          "applicantAgeMin": 0,// 申请人最小年龄
          "excludeArea": [],// 排除地区
          "businessRegistrationPlace": "",// 企业注册地
          "citizenInternational": "",//公民国籍
          "corporateDebt": 0,//企业负债率
          "corporationChangeTime": 0,//法人变更时长
          "corporationShare": 0,//法人占股
          "creditReportingTime": 0,//征信逾期
          "currentYearRevenue": undefined,//本年度销售收入
          "enterpriseNature": undefined,//企业性质
          "excludeCreditCardStatus": "",//排除信用卡状态： 1 正常 2 冻结 3 止付 4 挂失 5 收卡 6 作废 7 呆账 8代偿
          "excludeCreditStatus": "",//排除征信报告状态 担保人代还 1 以资抵债 2 展期 3 结清 4 结束 5 还款情况未知
          "excludeIndustry": [],//排除行业
          "excludeLoanCategory": "",//排除贷款五级分类 ：1 正常 2关注 3次贷 4 可疑 5 损失
          "fkProduct": 0,//外键关联产品表
          "hasEquipment": 0,//是否有设备
          "hasEquityPledge": 0,//是否有股权质押
          "hasOverdue": false,//是否逾期
          "hasPatent": 0,//是否有专利
          "hasRealEstate": 0,//是否有不动产
          "invoice": "",//开票
          "isCriminal": false,//是否允许有刑事或民事纠纷
          "isEquipmentRent": false,//是否需要设备租赁标的物
          "isHourse": false,//申请区域是否需要房产证
          "isOverseas": false,//企业注册地或公民国籍
          "isReceivables": false,//是否允许有质押的应收账款
          "isSpecialManage": false,//是否有特殊行业经营资质
          "isSuperpassAmounts": false,//公司及法人名下净资产是否需大于申请额度
          "lastYearInvoiceAmount": 0,//上年度开票金额
          "lastYearRevenue": undefined,//上年度总营收
          "lossStatus": 0,//亏损状态
          "maxOverdueTime": 0,//最大逾期时长 /天
          "nearlyOneYearTaxRating": "",//1年纳税评级：A级 B级 C级 D级 M级 以上
          "operateTime": 0,//经营时间
          "other": "string",//其他
          "personLoans": 0,//网贷次数
          "pkId": null,//主键
          "receivables": 0,//应收款总额
          "registeredCapital": 0,//注册资本
          "rerevenueExcludeManage": 0,//上年度扣非营收
          "restrictedLand": "",//限制项目用地： 1 工业用地 2 物流仓储用地 3 科教用地
          "sellAmountsYear": 0,//核年销售总额
          "totalAmounts": 0,//核实总营收
          "vatMoney": 0,//增值税实际纳税
          "whetherPledgeAmount": 0,//质押应收款
          "yearInvoiced": 0,//本年度开票收入
          "applicantAge": undefined //法人年龄
        }
      },
      rules: {
        productName: [{required: true, message: ' '}],
        productDescribe: [{required: true, message: ' '}],
        // type: [{required: true, message: '请选中产品类型'}],
        financingMethodJson: [{required: true, message: ' '}],
        loanInterestMin: [{required: true, validator: validateNum}],
        loanInterestMax: [{required: true, validator: validateNum}],
        loanPeriodMin: [{required: true, validator: validateNum}],
        loanPeriodMax: [{required: true, validator: validateNum}],
        repaymentMethod: [{required: true, message: ' '}],
        guaranteeMethod: [{required: true, message: ' '}],
        applicationMethod: [{required: true, message: ' '}]
      },
      rules1: {
        excludeArea: [{required: true, message: ' '}],
        enterpriseNature: [{required: true, message: ' '}],
        registeredCapital: [{required: true, validator: validateNum}],
        operateTime: [{required: true, validator: validateNum}],
        currentYearRevenue: [{required: true, message: ' '}],
        lastYearRevenue: [{required: true, message: ' '}],
        yearInvoiced: [{required: true, validator: validateNum}],
        applicantAge: [{required: true, message: ' '}],
        excludeIndustry: [{required: true, message: ' '}]
      },
      // 还款方式
      repayment_method: [],
      // 担保方式
      guarantee_method: [],
      // 申请方式
      application_method: [],
      // 企业性质
      enterprise_nature: [],
      // 法人年龄
      corporate_age: [],
      // 本年销售收入
      year_revenue: [],
      // 上年销售收入
      last_year_revenue: [],
      // 融资方式树形数据
      typeTree: [],
      // 地区树形数据
      areaTree: [],
      // 行业树形数据
      industryTree: [],
      // 收费项
      charge_items: []
    }
  },
  methods: {
    initData () {
      if(this.$route.query && this.$route.query.id) {
        this.loading = true
        this.$axios.post(`/api/mgm/product/detail/${this.$route.query.id}`)
          .then(res => {
            if (res.data) {
              let data = res.data
              data.product.chargeItems = data.product.chargeItems ? data.product.chargeItems.split(',') : []
              data.productApplyCondition.excludeArea = data.productApplyCondition.excludeArea ? data.productApplyCondition.excludeArea.split(',') : []
              data.productApplyCondition.excludeIndustry = data.productApplyCondition.excludeIndustry ? data.productApplyCondition.excludeIndustry.split(',') : []
              data.product.financingMethodJson && (data.product.financingMethodJson = Number(data.product.financingMethodJson))
              this.form.product = Object.assign(this.form.product, data.product)
              this.form.productApplyCondition = Object.assign(this.form.productApplyCondition, data.productApplyCondition)
            }
            this.loading = false
          })
        .catch(err => {
          this.$msgError(err.message)
          this.loading = false
        })
      }
    },
    handleSave () {
      let form = this.$refs.form.validate()
      let form1 = this.$refs.form1.validate()
      Promise.all([form, form1]).then(() =>{
        this.loading = true
        let obj = JSON.parse(JSON.stringify(this.form))
        obj.product.chargeItems = obj.product.chargeItems.toString()
        obj.productApplyCondition.excludeArea = obj.productApplyCondition.excludeArea.toString()
        obj.productApplyCondition.excludeIndustry = obj.productApplyCondition.excludeIndustry.toString()
        obj.product.chargeItems = obj.product.chargeItems.toString()
        if (obj.product.financingMethodJson || obj.product.financingMethodJson === 0) {
          obj.product.financingMethodJson = obj.product.financingMethodJson.toString()
        }
        let url = this.form.product.pkId ? '/api/mgm/product/update' : '/api/mgm/product/add'
          this.$axios.post(url, obj)
            .then(()=>{
              this.loading = false
              this.$msgSuccess()
              this.handleCancel()
            })
          .catch(err => {
            console.log(err)
            this.loading = false
            this.$msgError(err.message)
          })
      }).catch((err) =>{
        console.log(err)
      })
    },
    handleCancel () {
      this.$router.push('/Product')
    },
    getFinancingTypeTree () {
      this.$axios.post('/api/mgm/financingType/getFinancingTypeTree').then(res => {
        this.typeTree = this.deleteEmpty(res.data.typeTree)
      })
    },
    getAreaTree () {
      this.$axios.post('/api/mgm/area/getAreaInfo').then(res => {
        this.areaTree = this.deleteEmpty(res.data.areaTree)
      })
    },
    getIndustryTree () {
      this.$axios.post('/api/mgm/industry/getIndustryTree').then(res => {
        this.industryTree = this.deleteEmpty(res.data.industryTreeList)
      })
    },
    deleteEmpty (arr) {
      return arr.map(v => {
        if (v.children && v.children.length) {
          v.children = this.deleteEmpty(v.children)
        } else {
          delete v.children
        }
        return v
      })
    }
  },
  created () {
    this.getDic('repayment_method', 'repayment_method')
    this.getDic('guarantee_method', 'guarantee_method')
    this.getDic('application_method', 'application_method')
    this.getDic('enterprise_nature', 'enterprise_nature')
    this.getDic('corporate_age', 'corporate_age')
    this.getDic('year_revenue', 'year_revenue')
    this.getDic('last_year_revenue', 'last_year_revenue')
    this.getDic('charge_items', 'charge_items')
    this.getFinancingTypeTree()
    this.getAreaTree()
    this.getIndustryTree()
  },
  mounted () {
    this.initData()
  },
  beforeDestroy () {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">

</style>
