<template>
  <div id="Customization">
    <div class="speed-container">
      <div class="speed">
        <el-steps :active="1" align-center finish-status="success">
          <el-step title="定制融资产品" description="2020.07.10 15:43:23"></el-step>
          <el-step title="完善企业信息" description="待完善"></el-step>
          <el-step title="服务定制结果审核" description="待审核"></el-step>
          <el-step title="完成定制" description></el-step>
        </el-steps>
      </div>
    </div>
    <div class="table-info">
      <div class="table-title">
        <div>
          <span>服务编号：201808196398345</span>
          <span>融资顾问：丁昱</span>
          <span>开始服务时间：2020.07.10 12:22:22</span>
        </div>
        <div class="title-btn">
          <el-button type="primary" icon="el-icon-s-check">定制完成，提交审核</el-button>
        </div>
      </div>
      <div class="table-body">
        <div class="title">
          <div>
            <i class="el-icon-s-flag"></i>
            <span>基本信息</span>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%" align-center>
            <el-table-column prop="date" align="center" label="用户ID"></el-table-column>
            <el-table-column prop="name" align="center" label="联系人"></el-table-column>
            <el-table-column prop="address" align="center" label="手机号"></el-table-column>
            <el-table-column prop="address" align="center" label="企业名称"></el-table-column>
            <el-table-column prop="address" align="center" label="申请金额"></el-table-column>
            <el-table-column prop="address" align="center" label="评估适用产品"></el-table-column>
            <el-table-column prop="address" align="center" label="融资服务申请">
              <template>
                  <div style="color:#027DB4">查看申请详情</div>
              </template>
            </el-table-column>
          </el-table>
        </div>


        <div class="title">
          <div>
            <i class="el-icon-s-flag"></i>
            <span>产品定制</span>
          </div>
          <div>
              <el-button type="primary" icon="el-icon-s-open" @click="goProductCustomization()">定制融资产品/查看详情</el-button>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%" align-center>
            <el-table-column prop="date" align="center" label="序号"></el-table-column>
            <el-table-column prop="name" align="center" label="产品名称"></el-table-column>
            <el-table-column prop="address" align="center" label="产品类型"></el-table-column>
            <el-table-column prop="address" align="center" label="放款机构"></el-table-column>
            <el-table-column prop="address" align="center" label="期数"></el-table-column>
            <el-table-column prop="address" align="center" label="贷款利息"></el-table-column>
            <el-table-column prop="address" align="center" label="还款方式"></el-table-column>
            <el-table-column prop="address" align="center" label="担保方式"></el-table-column>
            <el-table-column prop="address" align="center" label="前置付款项"></el-table-column>
            <el-table-column prop="address" align="center" label="服务费"></el-table-column>
            <el-table-column prop="address" align="center" label="申请额度"></el-table-column>
          </el-table>
          <div class="total">申请额度合计：<span style="color:red"> ¥200.00万</span></div>
        </div>


        <div class="title">
          <div>
            <i class="el-icon-s-flag"></i>
            <span>企业信息</span>
          </div>
          <div>
              <el-button type="primary" icon="el-icon-s-open" @click="writeCompany">完善企业信息</el-button>
          </div>
        </div>
        <div>
        <div class="most-div pd20">
            <el-tabs type="border-card" class="j_tabs j_customtabs" :stretch="true">
  <el-tab-pane>
    <span slot="label"> 我的行程<i class="el-icon-circle-check"></i></span>
<el-form v-if="!showwrite" label-position="top" label-width="80px" :model="companyInfo">
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
<div v-if="showwrite" class="j_titleinfo">
  <div>企业信息</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
<el-form v-if="showwrite" label-position="top" label-width="80px" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-input type="text" v-model="companyInfo.companyName">{{}}</el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
          <el-select v-model="companyInfo.companyType" placeholder="请选择">
            <el-option
              v-for="item in companyTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
  </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 行业类型</div>
          <el-select v-model="companyInfo.industryType" placeholder="请选择">
            <el-option
              v-for="item in industryTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
          <el-select v-model="companyInfo.industryType" placeholder="请选择">
            <el-option
              v-for="item in industryTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 详细地址</div>
        <el-input type="text" v-model="companyInfo.adress">{{}}</el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
            <el-date-picker
      v-model="companyInfo.time"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
          <el-select v-model="companyInfo.thatYears" placeholder="请选择">
            <el-option
              v-for="item in thatYearsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
          <el-select v-model="companyInfo.lastYears" placeholder="请选择">
            <el-option
              v-for="item in lastYearsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
          <el-select v-model="companyInfo.lastcall" placeholder="请选择">
            <el-option
              v-for="item in lastcallArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
          <el-select v-model="companyInfo.isImmovables" placeholder="请选择">
            <el-option
              v-for="item in isImmovablesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 不动产价值</div>
          <el-select v-model="companyInfo.immovables" placeholder="请选择">
            <el-option
              v-for="item in immovablesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
          <el-select v-model="companyInfo.isFacility" placeholder="请选择">
            <el-option
              v-for="item in isFacilityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 设备价值</div>
          <el-select v-model="companyInfo.facility" placeholder="请选择">
            <el-option
              v-for="item in facilityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
          <el-select v-model="companyInfo.isPatents" placeholder="请选择">
            <el-option
              v-for="item in isPatentsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 专利数</div>
          <el-select v-model="companyInfo.patents" placeholder="请选择">
            <el-option
              v-for="item in patentsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
          <el-select v-model="companyInfo.isstockEquity" placeholder="请选择">
            <el-option
              v-for="item in isstockEquityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
        <el-col :span="8">
        <div class=""><i class="redrules">*</i> 联系人</div>
        <el-input class="pdl10" type="text" v-model="companyInfo.isstockEquity"></el-input>
    </el-col>
        <el-col :span="8">
        <div class=""><i class="redrules">*</i> 电话</div>
        <el-input class="pdl10" type="text" v-model="companyInfo.isstockEquity"></el-input>
    </el-col>
  </el-row>
</el-form>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"> 法人信息<i class="el-icon-circle-check"></i></span>
<div v-if="showwrite" class="j_titleinfo">
  <div>法人信息</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
    <el-form  v-if="!showwrite" :model="companyInfo">
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
  <el-form v-if="showwrite">
    <el-row>
      <el-col :span="8">
          <div class=""><i class="redrules">*</i> 法人姓名</div>
          <el-input class="pdl10" type="text" v-model="companyInfo.legalPerson">{{}}</el-input>
      </el-col>
      <el-col :span="8">
        <div class="">法人年龄</div>
          <el-input class="pdl10" type="text" v-model="companyInfo.legalAge"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
          <div class=""><i class="redrules">*</i> 法人身份证</div>
          <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
      </el-col>
    </el-row>
  </el-form>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"> 企业资质<i class="el-icon-circle-check"></i></span>
<div v-if="showwrite" class="j_titleinfo">
  <div>企业资质</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
<el-form  v-if="!showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业营业证件</div>
         <el-image :src="companyInfo.companyCard"></el-image>
    </el-col>
  </el-row>
  </el-form>
<el-form  v-if="showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业营业证件</div>
          <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </el-col>
  </el-row>
  </el-form>
  </el-tab-pane>
  <el-tab-pane>
    
    <span slot="label"> 财务账户<i class="el-icon-circle-check"></i></span>
<div v-if="showwrite" class="j_titleinfo">
  <div>财务账户</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
    <el-form v-if="!showwrite" :model="companyInfo">
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
    <el-form v-if="showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户银行</div>
        <el-input type="text" v-model="companyInfo.openBank"></el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 银行账号</div>
        <el-input type="text" v-model="companyInfo.bankCard"></el-input>
    </el-col>
    <el-col :span="8">
      <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-input type="text" v-model="companyInfo.bankArea"></el-input>
    
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户支行</div>
        <el-input  type="text" v-model="companyInfo.bankBranch"></el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 税号</div>
        <el-input type="text" v-model="companyInfo.dutyParagraph"></el-input>
    </el-col>
    <el-col :span="8"> 
      <div class=""><i class="redrules">*</i> 发票抬头</div>
        <el-input type="text" v-model="companyInfo.invoiceTitle"></el-input>
    </el-col>
  </el-row>
  </el-form>  
  </el-tab-pane>
</el-tabs>
        </div>
        </div>
      </div>
    </div>
    <CopyRight />
  </div>
</template>

<script>
import CopyRight from "components/CopyRight";
export default {
    name: "Customization",
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
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
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      showwrite:false,
      writeForm:{},
      companyTypeArr:[
        {value:'1',label:'有限公司'},
        {value:'2',label:'股份有限公司'}
      ],
      industryTypeArr:[
        {value:'1',label:'互联网'},
        {value:'2',label:'物联网'}
      ],
      areaCityArr:[
        {value:'1',label:'互联网'},
        {value:'2',label:'物联网'}
      ],
      thatYearsArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}],
      lastYearsArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}],
      lastcallArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}],
      isImmovablesArr:[
         {value:'1',label:'是'},
        {value:'2',label:'否'}
      ],
      immovablesArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isFacilityArr:[
         {value:'1',label:'是'},
        {value:'2',label:'否'}],
      facilityArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isPatentsArr:[
         {value:'1',label:'是'},
        {value:'2',label:'否'}],
      patentsArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isstockEquityArr:[
         {value:'1',label:'是'},
        {value:'2',label:'否'}],
        legalAgeArr:[
          {value:'1',label:'20-40岁'},
        {value:'2',label:'40-60岁'}
        ],
        
        dialogImageUrl: '',
        dialogVisible: false
        };
    },
    components: {
        CopyRight
    },
    mounted(){
      
      console.log(this.$route.params.financingCode);
      let planCode = this.$route.params.financingCode;

      let url ='/api/mgm/financingPlan/serviceCustomization'
       this.$axios.post(url,{
         planCode:planCode
       })
      .then(res=>{
        console.log(res);
        // if(res.code == 0){
        //   // let datas =res.data;

        // }else{

        // }
      })  
    },
    methods: {
        /**
         * @description: 【定制融资产品/查看详情】按钮跳转
         * @Date Changed: 2020-07-12
         */
        goProductCustomization(){
            console.log( "定制融资产品/查看详情" );
            this.$router.push("/productCustomization")
        },
        writeCompany(){
          this.showwrite=!this.showwrite;
        },
    }
};
</script>

<style lang="stylus" scoped>
@import "../assets/styl/fn.styl";
#Customization
  position relative
  width 1100px
  margin 30px auto
  box-sizing border-box
  .speed-container
    background-color #fff
    padding 30px
    .speed
      width 850px
      margin 0 auto
  .table-info
    margin-bottom 200px
    .table-title
      margin-top 20px
      display flex
      justify-content space-between
      padding 20px 30px
      background-color #fff
      align-items center
      border-bottom 1px solid #e9e9e9
      span
        margin-right 30px
        color #999
        font-size 14px
    .table-body
      background-color #fff
      color #333
      font-weight bold
      .title
        padding 40px 30px 0
        display flex
        justify-content space-between
        align-items center
      .table
        padding 20px 30px
        >>> thead
            th
                background-color #f0f2f5 !important
        .total
            width 100%
            line-height 70px
            text-align right 
            background-color #f9f9f9
            border 1px solid #e9e9e9
            border-top 0
            padding-right 20px
            box-sizing border-box
      span
        color #333
        font-size 16px
        margin-left 6px
  >>> #CopyRight
    copyRight()
.red
  color #F04844  
.redrules
  color #f04844
.pdl10
  padding-left 10px
.el-form .el-col
  margin 15px 0
.el-form .el-col .el-button,.el-form .el-col .el-image,.el-form .el-col .el-input
  margin 10px 0
.el-form .el-col .el-input,.el-form .el-col .el-select ,.el-form .el-col .el-date-editor
  width 250px  
  margin 10px 0
  margin-left 10px
.el-image
  width 200px
  height 150px
  margin-right 40px !important
  img
    width 100%
    height 100%    
.form-margin
  padding 0 20px    
.j_titleinfo 
  display flex
  justify-content space-between
  border-bottom 1px solid #e9e9e9
  height 50px
  line-height 50px
  padding 0 20px
</style>
<style lang="stylus">
.j_tabs
  box-shadow none !important
.j_tabs .el-tabs__item .el-icon-circle-check
  color #67C23A
.pd20
  padding 20px
.j_customtabs .el-tabs__content  
  padding 0px
.j_customtabs .el-form
  padding 15px  
</style>