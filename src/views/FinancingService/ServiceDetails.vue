<template>
  <div id="ServiceDetails">
    <!-- 服务详情 -->
    <ElSteps :stepArr='stepArr' :stepActive="stepActive" />
    <div class="list-container">
      <div class="top-info">
        <div class="info-message">
          <div>服务单号:</div><div>201808196398345</div>
        </div>
        <div class="info-message">
          <div>融资顾问:</div><div>丁昱</div>
        </div>
        <div class="info-message">
          <div>服务申请时间:</div><div>2020.07.10 12:22:22</div>
        </div>
      </div>
      <div class="details-most">
        <div class="most-div pd20">
          <h5><i class="el-icon-collection-tag" type="primary"></i>基本信息</h5>
          <el-table
            ref="userTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :stripe="true"
            :border="true"
          >
            <el-table-column label="用户ID" prop="number"></el-table-column>
            <el-table-column prop="user" label="联系人"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="company" label="企业名称"></el-table-column>
            <el-table-column prop="linkman" label="申请金额"></el-table-column>
            <el-table-column prop="mobile1" label="评估适用产品"></el-table-column>
                      <el-table-column prop="address" label="操作" width="150">
            <template>
              <div class="cz">
                <div @click="goEvaluationDetails">点击查看</div>
              </div>
            </template>
          </el-table-column>
          </el-table>
        </div>
        <div class="most-div pd20">
          <h5><i class="el-icon-collection-tag" type="primary"></i>融资执行方案</h5>
          <el-table
            ref="userTable"
            :data="actionData"
            tooltip-effect="dark"
            style="width: 100%"
            :stripe="true"
            :border="true"
          >
            <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
            <el-table-column prop="actionnum" label="执行单号" ></el-table-column>
            <el-table-column prop="user" label="产品名称"></el-table-column>
            <el-table-column prop="mobile" label="产品类型"></el-table-column>
            <el-table-column prop="company" label="放款机构"></el-table-column>
            <el-table-column prop="linkman" label="期数"></el-table-column>
            <el-table-column prop="mobile1" label="贷款利息"></el-table-column>
            <el-table-column prop="mobile" label="还款方式"></el-table-column>
            <el-table-column prop="danbao" label="担保方式">
              <template slot-scope="scope">
                <span>{{scope.row.danbao=='1'?'免担保':'有担保'}}</span>
                <br>
                <span class="cz" @click="seeAssurance" v-if="scope.row.danbao==2">
                  查看详情
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="linkman" label="前置付款项"></el-table-column>
            <el-table-column prop="mobile1" label="服务费"></el-table-column>
            <el-table-column prop="linkman" label="申请额度"></el-table-column>
            <el-table-column prop="mobile1" label="进度"></el-table-column>
          </el-table>
          <div class="table-bottom">
            <div>申请额度合计: <span class="red">￥200.00万</span></div>
          </div>
        </div>
        <div class="most-div pd20">
            <h5><i class="el-icon-collection-tag" type="primary"></i>融资执行方案</h5>
            <el-tabs type="border-card" :stretch="true">
  <el-tab-pane>
    <span slot="label"> 我的行程<i class="el-icon-circle-check"></i></span>
<el-form label-position="top" label-width="80px" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.companyName}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.companyType}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 行业类型</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.industryType}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.areaCity}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 详细地址</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.adress}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.time}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.thatYears}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.lastYears}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.lastcall}}</el-button>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.isImmovables}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 不动产价值</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.immovables}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
        <el-button class="pdl10" disabled type="text" >{{companyInfo.isFacility}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 设备价值</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.facility}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.isPatents}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 专利数</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.patents}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.isstockEquity}}</el-button>
    </el-col>
  </el-row>
</el-form>
  </el-tab-pane>
  <el-tab-pane label="消息中心">
    <el-form :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 法人姓名</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.legalPerson}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class="">法人年龄</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.legalAge}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="16">
        <div class=""><i class="redrules">*</i> 法人身份证</div>
        
        <el-image :src="companyInfo.legalCard"></el-image>
        <el-image :src="src"></el-image>
    </el-col>
  </el-row>
  </el-form>
  </el-tab-pane>
  <el-tab-pane label="角色管理">
<el-form :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业营业证件</div>
         <el-image :src="companyInfo.companyCard"></el-image>
    </el-col>
  </el-row>
  </el-form>
  </el-tab-pane>
  <el-tab-pane label="定时任务补偿">
    <el-form :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户银行</div>
        <el-button class="pdl10" disabled type="text" v-model="companyInfo.openBank">{{companyInfo.openBank}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 银行账号</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.bankCard}}</el-button>
    </el-col>
    <el-col :span="8">
      <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.bankArea}}</el-button>
    
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户支行</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.bankBranch}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 税号</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.dutyParagraph}}</el-button>
    </el-col>
    <el-col :span="8"> 
      <div class=""><i class="redrules">*</i> 发票抬头</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.invoiceTitle}}</el-button>
    </el-col>
  </el-row>
  </el-form>
  </el-tab-pane>
</el-tabs>
        </div>
      </div>
    </div>
    <!-- 担保详情 -->
    <el-dialog title="担保详情" class="dialog-from j_dialog" :visible.sync="showAssurance" width="600px">
      <el-form ref="form" :model="form" label-width="130px">
        <div class="input-line">
          <el-row>
            <el-col :span='12'>
              <el-form-item label="担保方式：">
                <el-input v-model="form.name" placeholder="机构名称/联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='12'>
              <el-form-item label="担保人：">
                <el-input v-model="form.name" placeholder="机构名称/联系人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="input-line">
          <el-row>
            <el-col :span="12">
            <el-form-item label="担保人身份证件：">
              <el-input v-model="form.num" placeholder="所属机构"></el-input>
            </el-form-item>              
            </el-col>
            <el-col :span="12">
            <el-form-item label="担保人电话：">
              <el-input v-model="form.name" placeholder="机构名称/联系人"></el-input>
            </el-form-item>              
            </el-col>
          </el-row>
        </div>
        <div class="input-line">
          <el-form-item label="账号状态：">
            <el-input v-model="form.name" type="textarea" placeholder="机构名称/联系人"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>    
  </div>
</template>

<script>
import ElSteps from "components/ElSteps";
export default {
  name:'ServiceDetails',
  components:{
    ElSteps
  },
  data(){
    return {
      tableData:[],
      actionData:[],
      form:{},
      stepArr:[
        {name:'融资顾问服务',time:'2020.07.10 15:43:23'},
        {name:'服务定制',time:'2020.07.10 15:43:23'},
        {name:'服务执行',time:'执行中'},
        {name:'完成',time:''},
      ],
      stepActive: 1,
      companyInfo:{
        companyName:'湖南XXXX科技有限公司',
        companyType:'有限公司',
        industryType:'互联网',
        areaCity:'湖南省 长沙市 雨花区',
        adress:'雨花区时代阳光大道123号',
        time:'2017年6月',
        thatYears:'200万-1000万',
        lastYears:'200万-1000万',
        lastcall:'200万-1000万',
        isImmovables:'是',
        immovables:'1000万内',
        isFacility:'是',
        facility:'1000万内',
        isPatents:'是',
        patents:'5个以内',
        isstockEquity:'是',

        legalPerson:'袁天作',
        legalAge:'20-60岁',
        legalCard:'',

        companyCard:'',

        openBank:'长沙银行',
        bankCard:'123456412313',
        bankArea:'湖南省长沙市雨花区',
        bankBranch:'雨花区银行',
        dutyParagraph:'214123412312',
        invoiceTitle:'湖南XXXX科技有限公司',
      },
      showAssurance:false,
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  created(){
    for (let index = 0; index < 3; index++) {
      this.tableData.push({
        number: parseInt(Math.random() * 1000000),
        user: "user" + index,
        mobile: "手机号" + index,
        company: "企业名称" + index,
        linkman: "申请金额" + index,
        mobile1: "评估适用产品" + index,
      });
    }    
        for (let index = 0; index < 3; index++) {
      this.actionData.push({
        number: parseInt(Math.random() * 1000000),
        user: "user" + index,
        actionnum: "actionnum" + index,
        mobile: "手机号" + index,
        company: "企业名称" + index,
        linkman: "申请金额" + index,
        mobile1: "评估适用产品" + index,
        danbao:index%2==0?'1':'2'
      });
    }    
  },
  methods:{
    seeAssurance(){
      this.showAssurance = true;
    },
    goEvaluationDetails(){
        this.$router.push("/evaluationDetails")
    }
  },

}
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/fn.styl'
#ServiceDetails
  position relative
  .list-container
    width 1100px
    margin 0 auto 200px
    margin-top: 20px;
    background-color #fff
    box-sizing border-box
    .top-info
    
      padding 20px 0px 0px 0px
      display flex
      justify-content flex-start
      height 60px
      line-height 60px
      border-bottom 1px solid #e9e9e9
      .info-message 
        padding 0 20px
        margin-right 30px
        display flex
        
        div
          margin-right 10px
        
    .details-most
      margin 10px 0
      color #666666
      .most-div
        h5
          margin-bottom 20px
          font-weight 700
          font-style normal
          font-family '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑'
          font-size 14px
          letter-spacing normal
        .table-bottom
          border 1px solid #EBEEF5
          text-align right 
          height 60px
          line-height 60px  
          background rgba(249, 249, 249, 1)
          padding-right 20px
      .cz
        color #0079FE
        cursor pointer
.pd20
  padding 20px
.red
  color #F04844  
.redrules
  color #f04844
.pdl10
  padding-left 10px
.el-form .el-col
  margin 15px 0
.el-form .el-col .el-button,.el-form .el-col .el-image
  margin 10px 0
.el-image
  width 200px
  height 150px
  margin-right 40px !important
  img
    width 100%
    height 100%    

</style>
<style lang="stylus">
.j_dialog .el-dialog__header
  background rgb(242,242,242) !important
</style>