<template>
    <!---->
    <div class="product-edit-box full-height">
        <el-form ref="form" :model="form" label-width="80px">
            <el-scrollbar class="full-height"></el-scrollbar>
        </el-form>
        <div class="action-box">
            <el-button type="primary" @click.native="handleSave">保存</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductEdit',
  data () {
    return {
      form: {
        "product": {
          "applicationMethod": "string", // 申请方式，关联数据字典
          "applyTemplateData": "string", // 申请资料模板
          "approvalAmountMax": 0, //审批最大额度(万)
          "approvalAmountMin": 0, //审批最小额度(万)
          "chargeItems": "string", // 收费项
          "chargeStandard": "string", // 收费标准
          "financingMethodJson": "string", // 融资方式
          "fkApplicationCondition": "string", // 申请条件-与申请条件表关联
          "guaranteeMethod": "string", // 担保方式，关联数据字典
          "interestRate": 0,// (参考)利率，并不作为最终子方案的利率，执行方案生成人员可根据此利率上下浮动进行定价。
          "isCreditInvestigation": true,// 是否上征信
          "lenders": "string",// 贷款机构
          "loanInterestMax": 0,// 最高贷款利息
          "loanInterestMin": 0,// 最低贷款利息
          "loanPeriodMax": 0,// 借款最大周期(月)
          "loanPeriodMin": 0,// 借款最小周期(月)
          "loanPeriodOther": 0,// 其他借款周期(月)
          "pkId": null,// 主键
          "productDescribe": "string", // 产品描述
          "productName": "string", // 产品名称
          "repaymentMethod": "string",// 还款方式，关联数据字典
          "status": 0, //状态：-1 下架 0 上架 2注销（删除）
          "type": 0// 产品类型(1.短期 2.中期 3.长期)
        },
        "productApplyCondition": {
          "applicableCareer": "string",// 适用职业： 1 公务员或企事业单位 2 世界五百强企业 3 其他
          "applicantAgeMax": 0,// 申请人最大年龄
          "applicantAgeMin": 0,// 申请人最小年龄
          "area": "string",// 可选地区
          "businessRegistrationPlace": "string",// 企业注册地
          "citizenInternational": "string",//公民国籍
          "corporateDebt": 0,//企业负债率
          "corporationChangeTime": 0,//法人变更时长
          "corporationShare": 0,//法人占股
          "creditReportingTime": 0,//征信逾期
          "currentYearRevenue": 0,//本年度销售收入
          "enterpriseNature": 0,//企业性质
          "excludeCreditCardStatus": "string",//排除信用卡状态： 1 正常 2 冻结 3 止付 4 挂失 5 收卡 6 作废 7 呆账 8代偿
          "excludeCreditStatus": "string",//排除征信报告状态 担保人代还 1 以资抵债 2 展期 3 结清 4 结束 5 还款情况未知
          "excludeIndustry": "string",//排除行业
          "excludeLoanCategory": "string",//排除贷款五级分类 ：1 正常 2关注 3次贷 4 可疑 5 损失
          "fkProduct": 0,//外键关联产品表
          "hasEquipment": 0,//是否有设备
          "hasEquityPledge": 0,//是否有股权质押
          "hasOverdue": true,//是否逾期
          "hasPatent": 0,//是否有专利
          "hasRealEstate": 0,//是否有不动产
          "invoice": "string",//开票
          "isCriminal": true,//是否允许有刑事或民事纠纷
          "isEquipmentRent": true,//是否需要设备租赁标的物
          "isHourse": true,//申请区域是否需要房产证
          "isOverseas": true,//企业注册地或公民国籍
          "isReceivables": true,//是否允许有质押的应收账款
          "isSpecialManage": true,//是否有特殊行业经营资质
          "isSuperpassAmounts": true,//公司及法人名下净资产是否需大于申请额度
          "lastYearInvoiceAmount": 0,//上年度开票金额
          "lastYearRevenue": 0,//上年度总营收
          "lossStatus": 0,//亏损状态
          "maxOverdueTime": 0,//最大逾期时长 /天
          "nearlyOneYearTaxRating": "string",//1年纳税评级：A级 B级 C级 D级 M级 以上
          "operateTime": 0,//经营时间
          "other": "string",//其他
          "personLoans": 0,//网贷次数
          "pkId": "string",//主键
          "receivables": 0,//应收款总额
          "registeredCapital": 0,//注册资本
          "rerevenueExcludeManage": 0,//上年度扣非营收
          "restrictedLand": "string",//限制项目用地： 1 工业用地 2 物流仓储用地 3 科教用地
          "sellAmountsYear": 0,//核年销售总额
          "totalAmounts": 0,//核实总营收
          "vatMoney": 0,//增值税实际纳税
          "whetherPledgeAmount": 0,//质押应收款
          "yearInvoiced": 0//本年度开票收入
        }
      }
    }
  },
  methods: {
    handleSave () {
      this.$axios.post('/api/mgm/product/add', this.form)
        .then((res)=>{
          console.log(res)
        })
      .catch(err => {
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
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">
.product-edit-box{

}
</style>
