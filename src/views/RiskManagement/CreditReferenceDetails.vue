<template>
    <div id="AddOrganization" v-loading="loading">
        <!--        <div class="form-title">-->
        <!--            <div>个人小额信贷交易征信报告</div>-->
        <!--            <div>-->
        <!--&lt;!&ndash;                <span style="color:#FF3B30">*</span>为必填项&ndash;&gt;-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="form-container">
            <el-form ref="form" :model="form" label-position="top" label-suffix=" : ">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            {{form.title.customerName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号">
                            {{form.title.paperNumber}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="报告编码">
                            {{form.title.queryNumber}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="查询时间">
                            {{form.title.reportTime}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="信贷交易统计概况">
                    <el-table
                            :data="form.detail"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="key"
                                label=""/>
                        <el-table-column
                                align="center"
                                label="借款申请记录">
                            <el-table-column
                                    align="center"
                                    prop="applying"
                                    label="待审核"/>
                            <el-table-column
                                    align="center"
                                    prop="applyPassed"
                                    label="审批通过"/>
                            <el-table-column
                                    align="center"
                                    prop="applyReject"
                                    label="审批拒绝"/>
                            <el-table-column
                                    align="center"
                                    prop="applyCancel"
                                    label="客户取消"/>
                            <el-table-column
                                    align="center"
                                    prop="applyTotal"
                                    label="小计"/>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="正常还款账户">
                            <el-table-column
                                    align="center"
                                    prop="wjq"
                                    label="未结清"/>
                            <el-table-column
                                    align="center"
                                    prop="jq"
                                    label="已结清"/>
                            <el-table-column
                                    align="center"
                                    prop="total"
                                    label="小计"/>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="异常还款账户">
                            <el-table-column
                                    align="center"
                                    prop="ewjq"
                                    label="未结清"/>
                            <el-table-column
                                    align="center"
                                    prop="ejq"
                                    label="已结清"/>
                            <el-table-column
                                    align="center"
                                    prop="etotal"
                                    label="小计"/>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="black"
                                label="行业不良记录"/>
                        <el-table-column
                                align="center"
                                label="查询记录">
                            <el-table-column
                                    align="center"
                                    prop="queryCount3Month"
                                    label="3个月内"/>
                            <el-table-column
                                    align="center"
                                    prop="queryCount6Month"
                                    label="6个月内"/>
                            <el-table-column
                                    align="center"
                                    prop="queryCount2Year"
                                    label="总数"/>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <!--                <div>信贷交易详情</div>-->
                <el-form-item label="借款申请记录明细(金额：元)">
                    <el-table
                            :data="form.applyDetail"
                            border
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                label="申请日期"
                                prop="applyDate"
                        />
                        <el-table-column
                                align="center"
                                label="会员类型"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('memberTypeList', scope.row.memberType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="申请地点"
                                prop="creditAddress"
                        />
                        <el-table-column
                                align="center"
                                label="申请金额"
                                prop="loanMoney"
                        />
                        <el-table-column
                                align="center"
                                label="审批结果"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('applyResultList', scope.row.applyResult)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="备注"
                                prop="remark"
                        />
                    </el-table>
                </el-form-item>
                <el-form-item label="正常还款账户明细(金额：元)">
                    <el-table
                            :data="form.normalCreditDetails"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="num"
                                align="center"
                                label="借款编号"
                        />
                        <el-table-column
                                align="center"
                                label="会员类型"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('memberTypeList', scope.row.memberType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="creditStartDate"
                                align="center"
                                label="借款日期"
                        />
                        <el-table-column
                                prop="creditEndDate"
                                align="center"
                                label="到期日期"
                        />
                        <el-table-column
                                prop="creditAddress"
                                align="center"
                                label="借款地点"
                        />
                        <el-table-column
                                align="center"
                                label="担保方式"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('assureTypeList', scope.row.assureType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="loanMoney"
                                align="center"
                                label="合同金额"
                        />
                        <el-table-column
                                prop="loanPeriods"
                                align="center"
                                label="还款期数"
                        />
                        <el-table-column
                                prop="remark"
                                align="center"
                                label="备注"
                        />
                    </el-table>
                </el-form-item>
                <el-form-item label="异常还款记录明细(金额：元)">
                    <el-table
                            :data="form.abnormalCreditDetails"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="num"
                                align="center"
                                label="借款编号"
                        />
                        <el-table-column
                                align="center"
                                label="会员类型"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('memberTypeList', scope.row.memberType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="creditStartDate"
                                align="center"
                                label="借款日期"
                        />
                        <el-table-column
                                prop="creditEndDate"
                                align="center"
                                label="到期日期"
                        />
                        <el-table-column
                                prop="creditAddress"
                                align="center"
                                label="借款地点"
                        />
                        <el-table-column
                                align="center"
                                label="担保方式"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('assureTypeList', scope.row.assureType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="loanMoney"
                                align="center"
                                label="合同金额"
                        />
                        <el-table-column
                                prop="loanPeriods"
                                align="center"
                                label="还款期数"
                        />
                        <el-table-column
                                prop="checkOverdueDate"
                                align="center"
                                label="逾期(开始)日期"
                        />
                        <el-table-column
                                align="center"
                                label="逾期时长"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('overdueDaysList', scope.row.overdueDays)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="nbMoney"
                                align="center"
                                label="逾期金额"
                        />
                        <el-table-column
                                align="center"
                                label="逾期状态"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('overdueStateList', scope.row.overdueState)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="operTime"
                                align="center"
                                label="更新日期"
                        />
                        <el-table-column
                                prop="remark"
                                align="center"
                                label="备注"
                        />
                    </el-table>
                </el-form-item>
                <el-form-item label="查询记录明细">
                    <el-table
                            :data="form.queryDetails"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="序号"
                                width="50"
                        />
                        <el-table-column
                                prop="queryDate"
                                align="center"
                                label="查询日期"
                        />
                        <el-table-column
                                align="center"
                                label="会员类型"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('memberTypeList', scope.row.memberType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="queryType"
                                align="center"
                                label="查询类别"
                        />
                        <el-table-column
                                prop="remark"
                                align="center"
                                label="备注"
                        />
                    </el-table>
                </el-form-item>
                <el-form-item label="行业不良信息 ">
                    <el-table
                            :data="form.blackDatas"
                            border
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                label="序号"
                                width="50"
                        />
                        <el-table-column
                                align="center"
                                label="会员类型"
                        >
                            <template slot-scope="scope">
                                {{getDicLabel('memberTypeList', scope.row.memberType)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                align="center"
                                label="报送/公开日期"
                        />
                        <el-table-column
                                prop="lastOverdueDate"
                                align="center"
                                label="最近逾期开始日期"
                        />
                        <el-table-column
                                prop="creditAddress"
                                align="center"
                                label="借款地点"
                        />
                        <el-table-column
                                prop="arrears"
                                align="center"
                                label="欠款总额"
                        />
                        <el-table-column
                                prop="phone"
                                align="center"
                                label="电话"
                        />
                        <el-table-column
                                prop="email"
                                align="center"
                                label="邮箱"
                        />
                        <el-table-column
                                prop="residenceAddress"
                                align="center"
                                label="户籍地址"
                        />
                        <el-table-column
                                prop="currentAddress"
                                align="center"
                                label="现居地址"
                        />
                        <el-table-column
                                prop="status"
                                align="center"
                                label="状态"
                        />
                        <el-table-column
                                prop="source"
                                align="center"
                                label="信息来源"
                        />
                    </el-table>
                </el-form-item>
                <el-form-item label="本人异议申告明细">
                    <el-table
                            :data="form.blackSelfComplain"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="complainDate"
                                align="center"
                                label="申告日期"
                        />
                        <el-table-column
                                prop="complainContent"
                                align="center"
                                label="申告内容"
                        />
                        <el-table-column
                                prop="remark"
                                align="center"
                                label="备注"
                        />
                    </el-table>
                </el-form-item>
            </el-form>
            <!--            <div class="submit-btn">-->
            <!--                <el-button @click="handleCancel">取消</el-button>-->
            <!--            </div>-->
        </div>
        <CopyRight/>
    </div>
</template>

<script>
import CopyRight from 'components/CopyRight'

const INFO_DEFINE = {
  member: '3041',
  sign: 'JNoCMYv9wc46I'
}
export default {
  name: 'CreditReferenceDetails',
  data () {
    return {
      loading: false,
      form: {
        'abnormalCreditDetails': [],
        'applyDetail': [
          //   {
          //   'applyDate': '2020-08-01',
          //   'applyResult': null,
          //   'creditAddress': '湖南省长沙市',
          //   'loanMoney': '100',
          //   'memberType': '04',
          //   'remark': '本机构'
          // }
        ],
        'blackDatas': [],
        'blackSelfComplain': [],
        'errors': null,
        'normalCreditDetails': [],
        'queryDetails': [
          // {
          //     'memberType': '04',
          //     'queryDate': '2020-08-16',
          //     'queryType': '贷后查询',
          //     'remark': '本机构'
          //   }
        ],
        'title': {
          'applyCancelCount': '0',
          'applyCancelSumMoney': '0',
          'applyPassedCount': '0',
          'applyPassedSumMoney': '0',
          'applyRejectCount': '0',
          'applyRejectSumMoney': '0',
          'applyTotalCount': '1',
          'applyTotalSumMoney': '100',
          'applyingCount': '1', // 借款申请处于审批过程中的笔数统计。
          'applyingSumMoney': '100',
          'blackCount': '0',
          'blackSumMoney': '0',
          'customerName': '呵呵', // 姓名
          'ejqCount': '0',
          'ejqSumMoney': '0',
          'etotalCount': '0',
          'etotalSumMoney': '0',
          'ewjqCount': '0',
          'ewjqSumMoney': '0',
          'jqCount': '0',
          'jqSumMoney': '0',
          'paperNumber': '430102199002232032', // 省份证号码
          'queryCount': '3',
          'queryCount2Year': '3',
          'queryCount3Month': '3',
          'queryCount6Month': '3',
          'queryNumber': '3041-20200816110405202-104282', // 报告唯一编号
          'reportTime': '2020-08-16 11:04', // 报告生成时间
          'totalCount': '0',
          'totalSumMoney': '0',
          'wjqCount': '0',
          'wjqSumMoney': '0'
        },
        detail: []
      },
      memberTypeList: [
        {value: '01', label: 'P2P企业'},
        {value: '02', label: '小贷公司'},
        {value: '03', label: '担保公司'},
        {value: '04', label: '财务公司'},
        {value: '05', label: '消费金融'},
        {value: '06', label: '典当公司'},
        {value: '07', label: '民间借贷'},
        {value: '08', label: '保险机构'},
        {value: '09', label: '融资租赁'},
        {value: '99', label: '其他'}
      ],
      overdueStateList: [
        {value: '01', label: '逾期中'},
        {value: '03', label: '恢复正常'},
        {value: '04', label: '核销'},
        {value: '05', label: '结清'}
      ],
      overdueDaysList: [
        {value: '01', label: '小于30天'},
        {value: '02', label: '大于等于30天且小于60天'},
        {value: '03', label: '大于等于60天且小于90天'},
        {value: '04', label: '大于等于90天且小于120天'},
        {value: '05', label: '大于等于120天且小于150天'},
        {value: '06', label: '大于等于150天且小于180天'},
        {value: '07', label: '大于等于180天且小于210天'},
        {value: '08', label: '大于等于210天且小于240天'},
        {value: '09', label: '大于等于240天且小于270天'},
        {value: '10', label: '大于等于270天且小于300天'},
        {value: '11', label: '大于等于300天且小于330天'},
        {value: '12', label: '大于等于330天且小于360天'},
        {value: '13', label: '大于等于360天'},
        {value: '99', label: '至今'}
      ],
      applyResultList: [
        {value: '01', label: '通过'},
        {value: '02', label: '拒绝'},
        {value: '04', label: '重新审批'},
        {value: '05', label: '客户取消'}
      ],
      assureTypeList: [
        {value: 'A', label: '抵押'},
        {value: 'B', label: '质押'},
        {value: 'C', label: '担保'},
        {value: 'D', label: '信用'},
        {value: 'E', label: '保证'},
        {value: 'Y', label: '其他'}
      ]
    }
  },
  methods: {
    getDicLabel (listName, value) {
      if (!value) return '-'
      let obj = this[listName].find(v => v.value === value)
      if (!obj) return '-'
      return obj.label
    },
    initData () {
      console.log(this.$route.params)
      console.log(INFO_DEFINE)
      if (Object.keys(this.$route.params).length !== 0) {
        let res = this.$route.params;
        res.detail = []
        if (res.title) {
          let title = res.title
          res.detail.push({
            key: '笔数',
            applying: title.applyingCount,
            applyPassed: title.applyPassedCount,
            applyReject: title.applyRejectCount,
            applyCancel: title.applyCancelCount,
            applyTotal: title.applyTotalCount,
            wjq: title.wjqCount,
            jq: title.jqCount,
            total: title.totalCount,
            ewjq: title.ewjqCount,
            ejq: title.ejqCount,
            etotal: title.etotalCount,
            black: title.blackCount,
            queryCount3Month: title.queryCount3Month,
            queryCount6Month: title.queryCount6Month,
            queryCount2Year: title.queryCount2Year,
            queryCount: title.queryCount
          })
          res.detail.push({
            key: '总(合同)金额',
            applying: title.applyingSumMoney,
            applyPassed: title.applyPassedSumMoney,
            applyReject: title.applyRejectSumMoney,
            applyCancel: title.applyCancelSumMoney,
            applyTotal: title.applyTotalSumMoney,
            wjq: title.wjqSumMoney,
            jq: title.jqSumMoney,
            total: title.totalSumMoney,
            ewjq: title.ewjqSumMoney,
            ejq: title.ejqSumMoney,
            etotal: title.etotalSumMoney,
            black: title.blackSumMoney,
            queryCount3Month: '- -',
            queryCount6Month: '- -',
            queryCount2Year: '- -',
            queryCount: '- -'
          })
        }
        this.form = res
      } else {
        this.loading = true
        this.$axios.get(`/remote/mspClientSimpleQuery.shtml`, {
          params: Object.assign({}, this.$route.query, INFO_DEFINE)
        })
          .then(res => {
            if (res.errors && res.errors.length) {
              this.$msgError(res.errors[0].msg || '系统错误')
              return this.handleCancel()
            }
            res.detail = []
            if (res.title) {
              let title = res.title
              res.detail.push({
                key: '笔数',
                applying: title.applyingCount,
                applyPassed: title.applyPassedCount,
                applyReject: title.applyRejectCount,
                applyCancel: title.applyCancelCount,
                applyTotal: title.applyTotalCount,
                wjq: title.wjqCount,
                jq: title.jqCount,
                total: title.totalCount,
                ewjq: title.ewjqCount,
                ejq: title.ejqCount,
                etotal: title.etotalCount,
                black: title.blackCount,
                queryCount3Month: title.queryCount3Month,
                queryCount6Month: title.queryCount6Month,
                queryCount2Year: title.queryCount2Year,
                queryCount: title.queryCount
              })
              res.detail.push({
                key: '总(合同)金额',
                applying: title.applyingSumMoney,
                applyPassed: title.applyPassedSumMoney,
                applyReject: title.applyRejectSumMoney,
                applyCancel: title.applyCancelSumMoney,
                applyTotal: title.applyTotalSumMoney,
                wjq: title.wjqSumMoney,
                jq: title.jqSumMoney,
                total: title.totalSumMoney,
                ewjq: title.ewjqSumMoney,
                ejq: title.ejqSumMoney,
                etotal: title.etotalSumMoney,
                black: title.blackSumMoney,
                queryCount3Month: '- -',
                queryCount6Month: '- -',
                queryCount2Year: '- -',
                queryCount: '- -'
              })
            }
            this.form = res
            this.loading = false
          })
          .catch(err => {
            this.$msgError(err.message)
            this.loading = false
          })
      }
    },
    handleCancel () {
      this.$router.push('/CreditReport')
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    this.initData()
  },
  beforeDestroy () {

  },
  components: {
    CopyRight
  }
}
</script>

<style lang="stylus" scoped>
    @import "../../assets/styl/fn.styl";
    #AddOrganization
        position relative
        width calc(100% - 40px)
        margin 20px 20px 200px
        background-color #fff

        .form-title
            padding 20px 30px
            box-sizing border-box
            display flex
            justify-content space-between
            font-size 14px
            color #666
            border-bottom 1px solid #e9e9e9

        .form-container
            padding 30px 30px 10px

            h4
                color #666
                font-size 14px
                font-weight bold
                margin 10px 0 20px

            /deep/ .el-form-item__label
                line-height 26px
                padding 0

            .submit-btn
                text-align center
                padding-bottom 30px

                button
                    width 140px

        #CopyRight
            copyRight()
</style>
