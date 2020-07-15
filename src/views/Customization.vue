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
          <el-table :data="baseData" border style="width: 100%" align-center>
            <el-table-column prop="userPkId" align="center" label="用户ID"></el-table-column>
            <el-table-column prop="contactPerson" align="center" label="联系人"></el-table-column>
            <el-table-column prop="contact" align="center" label="手机号"></el-table-column>
            <el-table-column prop="enterpriseName" align="center" label="企业名称"></el-table-column>
            <el-table-column prop="financingAmount" align="center" label="申请金额"></el-table-column>
            <el-table-column prop="meetProductNum" align="center" label="评估适用产品"></el-table-column>
            <el-table-column prop="selectProductNum" align="center" label="客户选定产品"></el-table-column>
            <el-table-column align="center" label="融资服务申请">
              <template slot-scope="scope">
                  <div style="color:#027DB4" @click="goEvaluationDetails(scope.row.financingPlanId)">查看申请详情</div>
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
          <el-table :data="childPlanList" border style="width: 100%" align-center>
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
    <span slot="label"> 企业信息<i class="el-icon-circle-check"></i></span>
<el-form v-if="!showwrite" label-position="top" label-width="80px" :model="enterpriseInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.name}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.enterpriseNature}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 行业类型</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.industryCode}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.areaCode}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 详细地址</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.regAddress}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseInfo.regTime}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{currentYearRevenue[businessInfo.currentYearRevenue]}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{lastYearRevenue[businessInfo.lastYearRevenue]}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
        <el-button class="pdl10" disabled type="text">{{lastYearInvoiceAmount[businessInfo.lastYearInvoiceAmount]}}</el-button>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseAssetInfo.hasRealEstate?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 不动产价值</div>
        <el-button class="pdl10" disabled type="text">{{realEstateVal[enterpriseAssetInfo.realEstateVal]}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
        <el-button class="pdl10" disabled type="text" >{{enterpriseAssetInfo.hasEquipment?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 设备价值</div>
        <el-button class="pdl10" disabled type="text">{{equipmentVal[enterpriseAssetInfo.equipmentVal]}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseAssetInfo.hasPatent?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 专利数</div>
        <el-button class="pdl10" disabled type="text">{{patentVal[enterpriseAssetInfo.patentVal]}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseAssetInfo.hasSharePledge?"是":"否"}}</el-button>
    </el-col>
  </el-row>
</el-form>
<div v-if="showwrite" class="j_titleinfo">
  <div>企业信息</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
<el-form v-if="showwrite" label-position="top" label-width="80px" :model="enterpriseInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-input type="text" v-model="enterpriseInfo.name">{{}}</el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
          <el-select v-model="enterpriseInfo.enterpriseNature" placeholder="请选择">
            <el-option
              v-for="item in companyTypeArr"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
  </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 行业类型</div>
          <el-cascader :options="industryTypeArr" v-model="industryType" :props="props" clearable></el-cascader>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
      <el-cascader :options="areaTree" v-model="area_code" :props="props" clearable></el-cascader>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 详细地址</div>
        <el-input type="text" v-model="enterpriseInfo.regAddress">{{}}</el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
            <el-date-picker
      v-model="enterpriseInfo.regTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
          <el-select v-model="businessInfo.currentYearRevenue" placeholder="请选择">
            <el-option
              v-for="item in thatYearsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
          <el-select v-model="businessInfo.lastYearRevenue" placeholder="请选择">
            <el-option
              v-for="item in lastYearsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
          <el-select v-model="businessInfo.lastYearInvoiceAmount" placeholder="请选择">
            <el-option
              v-for="item in lastcallArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
          <el-select v-model="enterpriseAssetInfo.hasRealEstate" placeholder="请选择">
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
          <el-select v-model="enterpriseAssetInfo.realEstateVal" placeholder="请选择">
            <el-option
              v-for="item in immovablesArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
          <el-select v-model="enterpriseAssetInfo.hasEquipment" placeholder="请选择">
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
          <el-select v-model="enterpriseAssetInfo.equipmentVal" placeholder="请选择">
            <el-option
              v-for="item in facilityArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
          <el-select v-model="enterpriseAssetInfo.hasPatent" placeholder="请选择">
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
          <el-select v-model="enterpriseAssetInfo.patentVal" placeholder="请选择">
            <el-option
              v-for="item in patentsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
          <el-select v-model="enterpriseAssetInfo.hasSharePledge" placeholder="请选择">
            <el-option
              v-for="item in isstockEquityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
    </el-col>
        <!-- <el-col :span="8">
        <div class=""><i class="redrules">*</i> 联系人</div>
        <el-input  type="text" v-model="enterpriseInfo.isstockEquity"></el-input>
    </el-col>
        <el-col :span="8">
        <div class=""><i class="redrules">*</i> 电话</div>
        <el-input type="text" v-model="enterpriseInfo.isstockEquity"></el-input>
    </el-col> -->
  </el-row>
</el-form>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"> 法人信息<i class="el-icon-circle-check"></i></span>
<div v-if="showwrite" class="j_titleinfo">
  <div>法人信息</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
    <el-form  v-if="!showwrite" :model="legalRepresentative">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 法人姓名</div>
        <el-button class="pdl10" disabled type="text">{{legalRepresentative.name}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class="">法人年龄</div>
        <el-button class="pdl10" disabled type="text">{{legalRepresentative.age}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="16">
        <div class=""><i class="redrules">*</i> 法人身份证</div>
        
        <el-image :src="enterpriseInfo.legalCard"></el-image>
        <el-image :src="src"></el-image>
    </el-col>
  </el-row>
  </el-form>
  <el-form v-if="showwrite">
    <el-row>
      <el-col :span="8">
          <div class=""><i class="redrules">*</i> 法人姓名</div>
          <el-input type="text" v-model="legalRepresentative.name">{{}}</el-input>
      </el-col>
      <el-col :span="8">
        <div class="">法人年龄</div>
          <el-select class="ml_0" v-model="legalRepresentative.age" placeholder="请选择">
            <el-option
              v-for="item in legalAgeArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
          <div class="" style="margin-bottom:15px"><i class="redrules">*</i> 法人身份证</div>
          <el-upload
          style="display:inline-block"
  action=""
  list-type="picture-card"
  :limit="1"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :on-exceed="handleExceed"
  :http-request="upload"
  :file-list="fileList"
  >
  <span>正面</span>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
          <el-upload
          style="display:inline-block;margin-left:20px"
  action=""
  list-type="picture-card"
  :limit="1"
  :on-preview="handlePictureCardPreviewB"
  :on-remove="handleRemoveB"
  :on-exceed="handleExceedB"
  :http-request="uploadB"
  :file-list="fileListB"
  >
  <span>背面</span>
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
<el-form  v-if="!showwrite" :model="enterpriseInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业营业证件</div>
         <el-image :src="enterpriseInfo.companyCard"></el-image>
    </el-col>
  </el-row>
  </el-form>
<el-form  v-if="showwrite" :model="enterpriseInfo">
  <el-row>
    <el-col :span="8">
        <div class="" style="margin-bottom:15px"><i class="redrules">*</i> 企业营业证件</div>
          <el-upload
          style="display:inline-block;margin-left:20px"
  action=""
  list-type="picture-card"
  :limit="1"
  :on-remove="handleRemoveC"
  :on-exceed="handleExceedC"
  :http-request="uploadC"
  :file-list="fileListC"
  >
  <span>背面</span>
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
    <el-form v-if="!showwrite" :model="financialInformation">
      <el-row>
        <el-col :span="8">
            <div class=""><i class="redrules">*</i> 开户银行</div>
            <el-button class="pdl10" disabled type="text">{{financialInformation.bankName}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 银行账号</div>
            <el-button class="pdl10" disabled type="text">{{financialInformation.cardNum}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button type="text" disabled>{{financialInformation.cityCode}}</el-button>
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
            <div class=""><i class="redrules">*</i> 开户支行</div>
            <el-button class="pdl10" disabled type="text">{{financialInformation.depositBank}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 税号</div>
            <el-button class="pdl10" disabled type="text">{{financialInformation.taxNumber}}</el-button>
        </el-col>
        <el-col :span="8"> 
          <div class=""><i class="redrules">*</i> 发票抬头</div>
            <el-button class="pdl10" disabled type="text">{{enterpriseInfo.name}}</el-button>
        </el-col>
      </el-row>
  </el-form>
    <el-form v-if="showwrite" :model="financialInformation">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户银行</div>
        <el-input type="text" v-model="financialInformation.bankName"></el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 银行账号</div>
        <el-input type="text" v-model="financialInformation.cardNum"></el-input>
    </el-col>
    <el-col :span="8">
      <div class=""><i class="redrules">*</i> 所在区域</div>
      <el-cascader :options="areaTree" v-model="finan_areaCode" :props="props" clearable></el-cascader>
    
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户支行</div>
        <el-input  type="text" v-model="financialInformation.depositBank"></el-input>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 税号</div>
        <el-input type="text" v-model="financialInformation.taxNumber"></el-input>
    </el-col>
    <el-col :span="8"> 
      <div class=""><i class="redrules">*</i> 发票抬头</div>
        <el-input type="text" v-model="enterpriseInfo.name"></el-input>
    </el-col>
  </el-row>
  </el-form>  
  </el-tab-pane>
</el-tabs>
  <div style="text-align:center;margin-top:20px">
     <el-button type="primary" @click="saveNew">完善提交</el-button>
     <el-button plain>重置</el-button>
  </div>
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
         {value:true,label:'是'},
        {value:false,label:'否'}
      ],
      immovablesArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isFacilityArr:[
         {value:true,label:'是'},
        {value:false,label:'否'}],
      facilityArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isPatentsArr:[
         {value:true,label:'是'},
        {value:false,label:'否'}],
      patentsArr:[
        {value:'1',label:'100万-200万'},
        {value:'2',label:'200万-300万'}
      ],
      isstockEquityArr:[
         {value:true,label:'是'},
        {value:false,label:'否'}],
        legalAgeArr:[
          {value:'1',label:'20-40岁'},
        {value:'2',label:'40-60岁'}
        ],
        
        dialogImageUrl: '',
        dialogVisible: false,
        // ------
        financingPlan:{},
        enterpriseInfo:{},//企业信息
        financialInformation:{},//账户信息
        legalRepresentative:{},//法人信息
        enterpriseAssetInfo:{},//是否字典特 对象
        businessInfo:{},//年度对象
        baseData:[],//基本信息
        childPlanList:[],//产品信息
        areaTree:[],
        props: {
          children: 'children',
          label: 'name',
          value:'code'
        },
        status:'',
        area_code:'',//企业信息区域code
        finan_areaCode:'',//账户区域的code

        fileList:[],
        fileListB:[],
        fileListC:[],
        frontIdCard:'',
        reverseIdCard:'',
        businessLicense:'',

        industryType:'',
      realEstateVal:{
        1:'1000万以内',
        2:'1000万-3000万',
        3:'3000万以上'
      },
      equipmentVal:{
        1:'1000万以内',
        2:'1000万-3000万',
        3:'3000万以上'
      },
      patentVal:{
        1:'5个以内',
        2:'5-10个',
        3:'10个以上'
      },
      currentYearRevenue:{
        1:'200万以内',
        2:'200万-1000万',
        3:'1000以上'
      },
      lastYearRevenue:{
        1:'200万以内',
        2:'200万-1000万',
        3:'1000以上'
      },
      lastYearInvoiceAmount:{
        1:'200万以内',
        2:'200万-1000万',
        3:'1000以上'
      },
      age:{
        1:'22周岁以下',
        2:'22周岁-60周岁',
        3:'60周岁以上'
      },     
      areaText:[],   
        };
    },
    components: {
        CopyRight
    },
    created(){
      this.getAreaTree();
      this.getIndustryTree();
    },
    mounted(){
      this.getDic('year_revenue', 'thatYearsArr')
      this.getDic('last_year_revenue', 'lastYearsArr')
      this.getDic('last_year_invoiced','lastcallArr')

      this.getDic('real_property', 'immovablesArr')
      this.getDic('device_value', 'facilityArr')
      this.getDic('patent_num','patentsArr')
      this.getDic('corporate_age','legalAgeArr')

      this.getDic('enterprise_nature','companyTypeArr')
      console.log(this.$route.params.financingCode);
      let planCode = this.$route.params.financingCode;

      let url ='/api/mgm/financingPlan/serviceCustomization'
       this.$axios.post(url,{
         planCode:planCode
       })
      .then(res=>{
        console.log(res);
        if(res.code == 0){
          let datas =res.data;
          console.log(datas);
          this.baseData = [datas.financingPlan];//基本信息
          this.enterpriseInfo = datas.enterpriseInfo||{};//企业信息
          // ---
          // 企业code要组合 provinceCode cityCode

          this.childPlanList = datas.childPlanList;//定制的产品
          this.financialInformation = datas.financialInformation||{};//财务账户
          this.legalRepresentative = datas.legalRepresentative||{};//法人信息
          this.enterpriseAssetInfo = datas.enterpriseAssetInfo||{};
          this.businessInfo = datas.businessInfo||{};
          this.status = datas.status;
          console.log(this.legalRepresentative,{});
          console.log(this.areaTree)
          this.thattreeFn(this.enterpriseInfo.provinceCode,this.areaTree)
        }else{
          console.log(res);
        }
      })  
    },
    methods: {
    thattreeFn(showData,listData){
      listData.map((item)=>{
        console.log(2333)
        if(showData == item.code){
          this.areaText.push(item.name)
          if(listData.parentCode=='0'){
            
          this.thattreeFn(this.enterpriseInfo.cityCode,item.children)
          }else{
            this.thattreeFn(this.enterpriseInfo.areaCode,item.children)
          }
        }
      })
      console.log(this.areaText)
    },      
    getIndustryTree () {
      this.$axios.post('/api/mgm/industry/getIndustryTree').then(res => {
        this.industryTypeArr = this.deleteEmpty(res.data.industryTreeList)
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
    },     
     getAreaTree () {
        this.$axios.post('/api/mgm/area/getAreaInfo').then(res => {
          this.areaTree = this.deleteEmpty(res.data.areaTree)
          console.log(this.areaTree);
        })
      },
          // 获取字典方法
    getDic (code, key) {
      this.$axios.post('/api/mgm/dict/listDictByParentCode', {code})
      .then((res) => {
        this[key] = res.data
      })
    },
        /**
         * @description: 【定制融资产品/查看详情】按钮跳转
         * @Date Changed: 2020-07-12
         */
        goProductCustomization(){
            let planCode = this.$route.params.financingCode
            console.log( "定制融资产品/查看详情", planCode ); 
            this.$router.push({
                path:`/productCustomization/${planCode}`
            })
        },
        writeCompany(){
          this.showwrite=!this.showwrite;
        },
        saveNew(){
          console.log(this.enterpriseInfo);
          this.enterpriseInfo.provinceCode = this.area_code[0]
          this.enterpriseInfo.cityCode = this.area_code[1]
          this.enterpriseInfo.areaCode = this.area_code[2]
          this.enterpriseInfo.businessLicense = this.businessLicense;
        //   this.enterpriseInfo.companyImg=------
          console.log(this.financialInformation);

          this.financialInformation.provinceCode = this.finan_areaCode[0]
          this.financialInformation.cityCode = this.finan_areaCode[1]
          this.financialInformation.regionCode = this.finan_areaCode[2]
          console.log(this.legalRepresentative);
          this.enterpriseInfo.frontIdCard = this.frontIdCard;
          this.enterpriseInfo.reverseIdCard = this.reverseIdCard;
          console.log(this.financialInformation);
          // return false
          let obj = {
              enterpriseInfo:this.enterpriseInfo,
              financialInformation:this.financialInformation,
              legalRepresentative:this.legalRepresentative,
              enterpriseAssetInfo:this.enterpriseAssetInfo,
              planCode:this.$route.params.financingCode,
              businessInfo:this.businessInfo
          }
          this.$axios.post('/api/mgm/financingPlan/perfectEnterprise',obj).then(res=>{
              if(res.code==0){
                  console.log(res.data);
              }else{
                  console.log(res);
              }
          })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.fileList = [];
        },
        handleExceed(){
            this.$message({
                type:'warning',
                message:'最多可上传一张图片。'
            })
        },
        upload(file){
            console.log(file);
            let fd = new FormData();
      fd.append("file", file.file);
        this.$axios.post('/api/mgm/file/uploadImg',fd).then(res => {
            console.log(res)
            if(res.code==0){
                this.frontIdCard= res.data.url
            }else{
                console.log(res);
                
            }
            
    }).catch(err => {
     console.log(err)
    })
        },

        //背面图片
        handleRemoveB(file, fileList) {
            console.log(file, fileList);
            this.fileListB = [];
        },
        handleExceedB(){
            this.$message({
                type:'warning',
                message:'最多可上传一张图片。'
            })
        },
        uploadB(file){
            console.log(file);
            let fd = new FormData();
      fd.append("file", file.file);
        this.$axios.post('/api/mgm/file/uploadImg',fd).then(res => {
            if(res.code == 0){
                this.reverseIdCard = res.data.url;
            }else{
                console.log(res);
            }
    }).catch(err => {
     console.log(err)
    })
        },     

        //企业证件
        handleRemoveC(file, fileList) {
            console.log(file, fileList);
            this.fileListC = [];
        },
        handleExceedC(){
            this.$message({
                type:'warning',
                message:'最多可上传一张图片。'
            })
        },
        uploadC(file){
            console.log(file);
            let fd = new FormData();
      fd.append("file", file.file);
        this.$axios.post('/api/mgm/file/uploadImg',fd).then(res => {
            if(res.code == 0){
                this.businessLicense = res.data.url;
            }else{
                console.log(res);
            }
    }).catch(err => {
     console.log(err)
    })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handlePictureCardPreviewB(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        /**
         * @description: 路由跳转-评估详情
         * @param {string} id 评估id
         * @Date Changed: 2020-07-13
         */
        goEvaluationDetails(id){
            console.log( "===>", id );
            this.$router.push({
                path: `/evaluationDetails/${id}`
            });
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
.el-form .el-col .el-input,.el-form .el-col .el-select ,.el-form .el-col .el-date-editor,.el-form .el-col .el-cascader
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
.ml_10
  margin-left 0px !important  
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