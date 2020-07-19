<template>
  <div id="Customization">
    <!-- <div class="speed-container">
      <div class="speed">
        
      </div>
    </div> -->
    <ElSteps :stepArr='stepArr' :stepActive="stepActive" />
    <div class="table-info">
      <div class="table-title">
        <div class="divColor">
          <span>服务编号：{{planCode}}</span>
          <span>融资顾问：{{custServName}}</span>
          <!-- <span>开始服务时间：{{createTime}}</span> -->
        </div>
        <div class="title-btn">
          <el-button type="primary" @click="reviewBtn" icon="el-icon-s-check">定制完成，提交审核</el-button>
        </div>
      </div>
      <div class="table-body">
        <div class="title">
          <div>
            <i class="el-icon-s-flag"></i>
            <span class="spans">基本信息</span>
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
              <template >
                  <div style="color:#027DB4" @click="goEvaluationDetails()">查看申请详情</div>
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
            <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>
            <el-table-column prop="productName" align="center" label="产品名称"></el-table-column>
            <el-table-column prop="productTypeName" align="center" label="产品类型"></el-table-column>
            <el-table-column prop="orgName" align="center" label="放款机构"></el-table-column>
            <el-table-column prop="loanCycle" align="center" label="期数"></el-table-column>
            <el-table-column prop="interestRate" align="center" label="贷款利息"></el-table-column>
            <el-table-column prop="repaymentStr" align="center" label="还款方式"></el-table-column>
            <el-table-column prop="guaranteeMethodStr" align="center" label="担保方式"></el-table-column>
            <el-table-column prop="qzChargeItem" align="center" label="前置付款项"></el-table-column>
            <el-table-column prop="servChargeItem" align="center" label="服务费"></el-table-column>
            <el-table-column prop="finalAmount" align="center" label="申请额度"></el-table-column>
          </el-table>
          <div class="total">申请额度合计：<span style="color:red"> ￥{{numAll}}万元</span></div>
        </div>


        <div class="title">
          <div>
            <i class="el-icon-s-flag"></i>
            <span>企业信息</span>
          </div>
          <div>
              <el-button type="primary" icon="el-icon-s-open" v-show="!showwrite" @click="writeCompany">完善企业信息</el-button>
          </div>
        </div>
        <div>
        <div class="most-div pd20">
            <el-tabs type="border-card" class="j_tabs j_customtabs" :stretch="true">
  <el-tab-pane>
    <span slot="label"> 企业信息<i class="el-icon-circle-check"></i></span>
<el-form v-if="!showwrite" label-position="top" ref="companyInfo" :rules="rules" label-width="80px" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseInfo.name}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
        <el-button class="pdl10" disabled type="text">{{enterpriseNature[companyInfo.enterpriseInfo.enterpriseNature]}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 行业类型</div>
        <el-button class="pdl10" disabled type="text">{{industryTextinfo}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button class="pdl10" disabled type="text">{{areaTextinfo}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 详细地址</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseInfo.regAddress}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseInfo.regTime}}</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{currentYearRevenue[companyInfo.businessInfo.currentYearRevenue]}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
        <el-button class="pdl10" disabled type="text">{{lastYearRevenue[companyInfo.businessInfo.lastYearRevenue]}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
        <el-button class="pdl10" disabled type="text">{{lastYearInvoiceAmount[companyInfo.businessInfo.lastYearInvoiceAmount]}}</el-button>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseAssetInfo.hasRealEstate?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 不动产价值</div>
        <el-button class="pdl10" disabled type="text">{{realEstateVal[companyInfo.enterpriseAssetInfo.realEstateVal]}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
        <el-button class="pdl10" disabled type="text" >{{companyInfo.enterpriseAssetInfo.hasEquipment?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 设备价值</div>
        <el-button class="pdl10" disabled type="text">{{equipmentVal[companyInfo.enterpriseAssetInfo.equipmentVal]}}</el-button>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseAssetInfo.hasPatent?"是":"否"}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 专利数</div>
        <el-button class="pdl10" disabled type="text">{{patentVal[companyInfo.enterpriseAssetInfo.patentVal]}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseAssetInfo.hasSharePledge?"是":"否"}}</el-button>
    </el-col>
  </el-row>
</el-form>
<div v-if="showwrite" class="j_titleinfo">
  <div>企业信息</div>
  <div><i class="redrules">*</i>为必填项</div>
</div>
<el-form v-if="showwrite" label-position="top" ref="companyInfo" :rules="rules" label-width="80px" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业全称</div>
        <el-form-item prop="enterpriseInfo.name">
          <el-input type="text" v-model="companyInfo.enterpriseInfo.name">{{}}</el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 企业性质</div>
          <el-select v-model="companyInfo.enterpriseInfo.enterpriseNature" placeholder="请选择">
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
          <el-form-item prop="industryType">
            <el-cascader :options="industryTypeArr" v-model="companyInfo.industryType" :show-all-levels="false" :props="props" clearable></el-cascader>
          </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 所在区域</div>
      <el-form-item prop="area_code">
      <el-cascader @change="areaCascader" :options="areaTree" v-model="companyInfo.area_code" :props="props" clearable></el-cascader>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      
       <div class=""><i class="redrules">*</i> 详细地址</div>
       <el-form-item prop="enterpriseInfo.regAddress">
        <el-input type="text" v-model="companyInfo.enterpriseInfo.regAddress">{{}}</el-input>
       </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 成立时间</div>
       <el-form-item prop="enterpriseInfo.regTime">
            <el-date-picker
      v-model="companyInfo.enterpriseInfo.regTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
       </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 本年度销售收入</div>
          <el-form-item prop="businessInfo.currentYearRevenue">
          <el-select v-model="companyInfo.businessInfo.currentYearRevenue" placeholder="请选择">
            <el-option
              v-for="item in thatYearsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度销售收入</div>
          <el-form-item prop="businessInfo.lastYearRevenue">
          <el-select v-model="companyInfo.businessInfo.lastYearRevenue" placeholder="请选择">
            <el-option
              v-for="item in lastYearsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 上年度开票收入</div>
          <el-form-item prop="businessInfo.lastYearInvoiceAmount">
          <el-select v-model="companyInfo.businessInfo.lastYearInvoiceAmount" placeholder="请选择">
            <el-option
              v-for="item in lastcallArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
  </el-row>  
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有不动产</div>
          <el-form-item prop="enterpriseAssetInfo.hasRealEstate">
          
          <el-select v-model="companyInfo.enterpriseAssetInfo.hasRealEstate" placeholder="请选择">
            <el-option
              v-for="item in isImmovablesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 不动产价值</div>
          <el-form-item prop="enterpriseAssetInfo.realEstateVal">
          <el-select v-model="companyInfo.enterpriseAssetInfo.realEstateVal" placeholder="请选择">
            <el-option
              v-for="item in immovablesArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有设备</div>
          <el-form-item prop="enterpriseAssetInfo.hasEquipment">
          <el-select v-model="companyInfo.enterpriseAssetInfo.hasEquipment" placeholder="请选择">
            <el-option
              v-for="item in isFacilityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 设备价值</div>
          <el-form-item prop="enterpriseAssetInfo.equipmentVal">
          <el-select v-model="companyInfo.enterpriseAssetInfo.equipmentVal" placeholder="请选择">
            <el-option
              v-for="item in facilityArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有专利</div>
          <el-form-item prop="enterpriseAssetInfo.hasPatent">
          <el-select v-model="companyInfo.enterpriseAssetInfo.hasPatent" placeholder="请选择">
            <el-option
              v-for="item in isPatentsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 专利数</div>
          <el-form-item prop="enterpriseAssetInfo.patentVal">
          <el-select v-model="companyInfo.enterpriseAssetInfo.patentVal" placeholder="请选择">
            <el-option
              v-for="item in patentsArr"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
          </el-form-item>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 是否有股权质押</div>
          <el-form-item prop="enterpriseAssetInfo.hasSharePledge">
          <el-select v-model="companyInfo.enterpriseAssetInfo.hasSharePledge" placeholder="请选择">
            <el-option
              v-for="item in isstockEquityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
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
    <el-form  v-if="!showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 法人姓名</div>
        <el-button class="pdl10" disabled type="text">{{companyInfo.legalRepresentative.name}}</el-button>
    </el-col>
    <el-col :span="8">
       <div class="">法人年龄</div>
        <el-button class="pdl10" disabled type="text">{{age[companyInfo.legalRepresentative.age]}}</el-button>
    </el-col>
  </el-row>    
  <el-row>
    <el-col :span="16">
        <div class=""><i class="redrules">*</i> 法人身份证</div>
        
        <el-image :src="'data:image/png;base64,'+frontIdCardBase64"></el-image>
        <el-image :src="'data:image/png;base64,'+reverseIdCardBase64"></el-image>
    </el-col>
  </el-row>
  </el-form>
  <el-form v-if="showwrite"  ref="companyInfo" :rules="rules" :model="companyInfo">
    <el-row>
      <el-col :span="8">
          <div class=""><i class="redrules">*</i> 法人姓名</div>
          <el-form-item prop="legalRepresentative.name">
          <el-input type="text" v-model="companyInfo.legalRepresentative.name">{{}}</el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
        <div class="">法人年龄</div>
          <el-select class="ml_0" v-model="companyInfo.legalRepresentative.age" placeholder="请选择">
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
      <el-col :span="16">
          <div class="" style="margin-bottom:15px"><i class="redrules">*</i> 法人身份证</div>
          <el-upload
          class="pdl10"
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
<el-form  v-if="!showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 企业营业证件</div>
         <el-image class="pdl10" :src="'data:image/png;base64,'+businessLicenseBase64"></el-image>
    </el-col>
  </el-row>
  </el-form>
<el-form  v-if="showwrite" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class="" style="margin-bottom:15px"><i class="redrules">*</i> 企业营业证件</div>
          <el-upload
          class="ml_0"
          style="display:inline-block;margin-left:20px"
  action=""
  list-type="picture-card"
  :limit="1"
  :on-remove="handleRemoveC"
  :on-exceed="handleExceedC"
  :http-request="uploadC"
  :file-list="fileListC"
  >
  <span>上传图片</span>
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
            <el-button class="pdl10" disabled type="text">{{companyInfo.financialInformation.bankName}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 银行账号</div>
            <el-button class="pdl10" disabled type="text">{{companyInfo.financialInformation.cardNum}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 所在区域</div>
        <el-button type="text" disabled>{{areaTextinfoBank}}</el-button>
          
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
            <div class=""><i class="redrules">*</i> 开户支行</div>
            <el-button class="pdl10" disabled type="text">{{companyInfo.financialInformation.depositBank}}</el-button>
        </el-col>
        <el-col :span="8">
          <div class=""><i class="redrules">*</i> 税号</div>
            <el-button class="pdl10" disabled type="text">{{companyInfo.financialInformation.taxNumber}}</el-button>
        </el-col>
        <el-col :span="8"> 
          <div class=""><i class="redrules">*</i> 发票抬头</div>
            <el-button class="pdl10" disabled type="text">{{companyInfo.enterpriseInfo.name}}</el-button>
        </el-col>
      </el-row>
  </el-form>
    <el-form v-if="showwrite" ref="companyInfo" :rules="rules" :model="companyInfo">
  <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户银行</div>
        <el-form-item prop="financialInformation.bankName">
        <el-input type="text" v-model="companyInfo.financialInformation.bankName"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 银行账号</div>
        <el-form-item prop="financialInformation.cardNum">
        <el-input type="text" v-model="companyInfo.financialInformation.cardNum"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8">
      <div class=""><i class="redrules">*</i> 所在区域</div>
      <el-form-item prop="comfinan_areaCode">
      <el-cascader :options="areaTree" @change="bankCascader" v-model="companyInfo.comfinan_areaCode" :props="props" clearable></el-cascader>
      </el-form-item>
    </el-col>
  </el-row>
    <el-row>
    <el-col :span="8">
        <div class=""><i class="redrules">*</i> 开户支行</div>
        <el-form-item prop="financialInformation.depositBank">
        <el-input  type="text" v-model="companyInfo.financialInformation.depositBank"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8">
       <div class=""><i class="redrules">*</i> 税号</div>
        <el-form-item prop="financialInformation.taxNumber">
        <el-input type="text" v-model="companyInfo.financialInformation.taxNumber"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8"> 
      <div class=""><i class="redrules">*</i> 发票抬头</div>
      <el-form-item prop="enterpriseInfo.name">
        <el-input type="text" v-model="companyInfo.enterpriseInfo.name"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  </el-form>  
  </el-tab-pane>
</el-tabs>
  <div v-show="showwrite" style="text-align:center;margin-top:20px">
     <el-button type="primary" @click="saveNew">完善提交</el-button>
     <el-button plain @click="clearBtn">重置</el-button>
     <el-button @click="goback()">返回</el-button>
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
import ElSteps from "components/ElSteps";
export default {
    name: "Customization",
    data() {
        return {
        
        companyInfo:{
          enterpriseInfo:{},//企业信息
          financialInformation:{},//账户信息
          legalRepresentative:{},//法人信息
          enterpriseAssetInfo:{},//是否字典特 对象
          businessInfo:{},//年度对象
          industryType:'',//仅做校验--类型
          area_code:[],//金做校验--区域
          comfinan_areaCode:[],//仅做校验--银行区域
      },
      custServName:'',
      createTime:'',
      planCode:'',
      showwrite:false,
      writeCompany_show:false,
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
        baseData:[],//基本信息
        childPlanList:[],//产品信息
        thatAllplace:'',
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

        industryType:"",
        age:{
          1:'22岁以下',
          2:'22-55(含)岁',
          3:'55岁以上'
        },
        enterpriseNature:{
            1:'有限公司',
            2:'个体工商户',
            3:'其他',
        },
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
        3:'1000万-3000万',
        4:'3000万以上'
      },
      lastYearRevenue:{
        1:'200万以内',
        2:'200万-1000万',
        3:'1000万-3000万',
        4:'3000万以上'
      },
      lastYearInvoiceAmount:{
        1:'200万以内',
        2:'200万-1000万',
        3:'1000万-3000万',
        4:'3000万以上'
      },
      areaText:[],   
      areaTextinfo:'',
      industryText:[],
      industryTextinfo:'',
      areaTextinfoBank:'',
      areaTextbank:[],
      numAll:0,
      rules:{
            [`enterpriseInfo.name`]:[{ required: true, message: '请输入企业全称', trigger: 'blur' }],
            [`enterpriseInfo.enterpriseNature`]: [
            { required: true, message: '请选择企业性质', trigger: 'change' }
          ],
          industryType: [
            { required: true, message: '请选择行业类型', trigger: 'change' }
          ],
          [`enterpriseInfo.regAddress`]: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          area_code:[
            { required: true, message: '请选择所在区域', trigger: 'change' }
          ],
          [`enterpriseInfo.regTime`]:[
            { required: true, message: '请选择成立时间', trigger: 'change' }
          ],
          [`businessInfo.currentYearRevenue`]:[
            { required: true, message: '请选择本年度销售收入', trigger: 'change' }
          ],
          [`businessInfo.lastYearRevenue`]:[
            { required: true, message: '请选择上年度销售收入', trigger: 'change' }
          ],
          [`businessInfo.lastYearInvoiceAmount`]:[
            { required: true, message: '请选择上年度开票收入', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.hasRealEstate`]:[
            { required: true, message: '请选择是否有不动产', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.realEstateVal`]:[
            { required: true, message: '请选择不动产价值', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.hasEquipment`]:[
            { required: true, message: '请选择是否有设备', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.equipmentVal`]:[
            { required: true, message: '请选择设备价值', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.hasPatent`]:[
            { required: true, message: '请选择是否有专利', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.patentVal`]:[
            { required: true, message: '请选择专利数', trigger: 'change' }
          ],
          [`enterpriseAssetInfo.hasSharePledge`]:[
            { required: true, message: '请选择是否有股权质押', trigger: 'change' }
          ],
          [`legalRepresentative.name`]:[{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
          [`financialInformation.bankName`]:[{ required: true, message: '请输入开户银行', trigger: 'blur' }],
          [`financialInformation.cardNum`]:[{ required: true, message: '请输入银行账号', trigger: 'blur' }],
          [`financialInformation.depositBank`]:[{ required: true, message: '请输入开户支行', trigger: 'blur' }],
          [`financialInformation.taxNumber`]:[{ required: true, message: '请输入税号', trigger: 'blur' }],
      },
      stepArr:[
        {name:'融资顾问服务',time:''},
        {name:'服务定制',time:''},
        {name:'服务执行',time:''},
        {name:'完成',time:''},
      ],
      stepActive: 0,
      changeObj:{},
      frontIdCardBase64:'',
      reverseIdCardBase64:'',
      businessLicenseBase64:'',
        };
    },
    components: {
        CopyRight,
        ElSteps
    },
    created(){
        this.initData();
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

    },
    methods: {
      async changeData(datas){
        this.numAll=0;
        this.industryTypeArr = await this.getIndustryTree();
        this.areaTree = await this.getAreaTree();
        this.baseData = [datas.financingPlan];//基本信息
          
          // ---
          // 企业code要组合 provinceCode cityCode

          this.childPlanList = datas.childPlanList||[];//定制的产品
          
          if(this.childPlanList.length>0){
            this.childPlanList.map(item=>{
              this.numAll +=parseInt(item.finalAmount.slice(0,-3));
            })
          }
          console.log(datas);
          this.applyId = datas.applyId;
          this.stepActive = datas.status!=null?parseInt(datas.status.slice(-1)):datas.status;
          this.planCode = datas.planCode||'';
          this.custServName = datas.custServName||'';
          this.createTime = datas.createTime||null;
          this.companyInfo.enterpriseInfo = datas.enterpriseInfo||{};//企业信息
          this.companyInfo.financialInformation = datas.financialInformation||{};//财务账户
          this.companyInfo.legalRepresentative = datas.legalRepresentative||{};//法人信息
          this.companyInfo.enterpriseAssetInfo = datas.enterpriseAssetInfo||{};
          this.companyInfo.businessInfo = datas.businessInfo||{};
          this.status = datas.status;
          this.companyInfo.enterpriseInfo.enterpriseNature = datas.enterpriseInfo.enterpriseNature;
          this.companyInfo.enterpriseInfo.regAddress = datas.enterpriseInfo.regAddress;
          this.companyInfo.enterpriseInfo.enterpriseNature = datas.enterpriseInfo.enterpriseNature;
          this.companyInfo.area_code = [this.companyInfo.enterpriseInfo.provinceCode,this.companyInfo.enterpriseInfo.cityCode,this.companyInfo.enterpriseInfo.areaCode]
          this.companyInfo.comfinan_areaCode = [this.companyInfo.financialInformation.provinceCode,this.companyInfo.financialInformation.cityCode,this.companyInfo.financialInformation.regionCode]
          console.log(this.companyInfo.area_code,this.companyInfo.comfinan_areaCode);
          this.companyInfo.enterpriseAssetInfo.realEstateVal = this.companyInfo.enterpriseAssetInfo.realEstateVal !=null?parseInt(this.companyInfo.enterpriseAssetInfo.realEstateVal):''
          this.companyInfo.enterpriseAssetInfo.equipmentVal = this.companyInfo.enterpriseAssetInfo.equipmentVal!=null?parseInt(this.companyInfo.enterpriseAssetInfo.equipmentVal) :'';
          this.companyInfo.enterpriseAssetInfo.patentVal = this.companyInfo.enterpriseAssetInfo.patentVal!=null?parseInt(this.companyInfo.enterpriseAssetInfo.patentVal):'';
          this.thattreeFn(this.companyInfo.enterpriseInfo.provinceCode,this.areaTree,1)
          this.thattreeFn(this.companyInfo.financialInformation.provinceCode,this.areaTree,2)
          this.thatindustryFn(this.companyInfo.enterpriseInfo.industryCode)
          this.frontIdCardBase64= datas.enterpriseInfo.frontIdCardBase64||null
          this.reverseIdCardBase64= datas.enterpriseInfo.reverseIdCardBase64||null
          this.businessLicenseBase64= datas.enterpriseInfo.businessLicenseBase64||null
          this.fileList = [];
          this.fileListB = [];
          this.fileListC = [];
          this.frontIdCardBase64!=null?this.fileList.push({url:'data:image/png;base64,'+this.frontIdCardBase64}):this.fileList=[];
          this.reverseIdCardBase64!=null?this.fileListB.push({url:'data:image/png;base64,'+this.reverseIdCardBase64}):this.fileListB=[];
          this.businessLicenseBase64!=null?this.fileListC.push({url:'data:image/png;base64,'+this.businessLicenseBase64}):this.fileListC=[];
          this.frontIdCard= this.companyInfo.enterpriseInfo.frontIdCard||''
          this.reverseIdCard= this.companyInfo.enterpriseInfo.reverseIdCard||''
          this.businessLicense= this.companyInfo.enterpriseInfo.businessLicense||''
      },
      areaCascader(val){
        this.companyInfo.area_code = val;
      },
      // typeCascader(val){
      //   this.companyInfo.area_code = val;
      // },
      bankCascader(val){
        this.companyInfo.comfinan_areaCode = val;
      },
      initData(){
        
      let planCode = this.$route.params.financingCode;

      let url ='/api/mgm/financingPlan/serviceCustomization'
       this.$axios.post(url,{
         planCode:planCode
       })
      .then(res=>{
        if(res.code == 0){
          let datas =res.data;
          let objclone = JSON.stringify(datas);

          this.changeObj = JSON.parse(objclone);
          this.changeData(datas);
           return
        }else{
          console.log(res);
        }
      })
        },
    thattreeFn(showData,listData,type){
      listData.forEach((item)=>{
        if(showData == item.code){
            if(type == 1){
                this.areaText.push(item.name)
                if(this.areaText.length==1){
                this.thattreeFn(this.companyInfo.enterpriseInfo.cityCode,item.children,1)
                }else
                if(this.areaText.length==2){
                    this.thattreeFn(this.companyInfo.enterpriseInfo.areaCode,item.children,1)
                }
                if(this.areaText.length==3){
                    return
                }
                console.log(this.areaText)
            }else
            if(type == 2){
                this.areaTextbank.push(item.name);
                if(this.areaTextbank.length==1){
                    
                this.thattreeFn(this.companyInfo.financialInformation.cityCode,item.children,2)
                }else
                if(this.areaTextbank.length==2){
                    this.thattreeFn(this.companyInfo.financialInformation.regionCode,item.children,2)
                }
                if(this.areaTextbank.length==3){
                    return
                }                       
            }

   
        }
      })
      if(type==1){
        this.areaTextinfo = this.areaText.join('/');
        console.log(22,this.areaText);
        // this.areaText = [];
      }else{
        this.areaTextinfoBank = this.areaTextbank.join('/');
        // this.areaText = [];
      }
      
    },  
        thatindustryFn(data){
            this.industryTypeArr.map(item=>{
                item.children.map(item1=>{
                    if(data== item1.code){
                        this.industryText.push(item.name)
                        this.companyInfo.industryType = [item.code,item1.code]
                        return 
                    }
                })
            })
            this.industryTextinfo = this.industryText[0]
        },
    getIndustryTree () {
      return new Promise(resolve=>{
        this.$axios.post('/api/mgm/industry/getIndustryTree').then(res => {
          this.industryTypeArr = this.deleteEmpty(res.data.industryTreeList)
        })
        resolve(this.industryTypeArr)
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
       return new Promise(resolve=>{
        this.$axios.post('/api/mgm/area/getAreaInfo').then(res => {
          this.areaTree = this.deleteEmpty(res.data.areaTree)
          resolve(this.areaTree);
        })
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
        goback(){
          this.showwrite = false;
          this.changeData(this.changeObj);
        },
        clearBtn(){
          this.changeData({});
        },
        saveNew(){
          console.log(this.area_code);
          this.companyInfo.enterpriseInfo.provinceCode = this.companyInfo.area_code[0]
          this.companyInfo.enterpriseInfo.cityCode = this.companyInfo.area_code[1]
          this.companyInfo.enterpriseInfo.areaCode = this.companyInfo.area_code[2]
          this.companyInfo.enterpriseInfo.businessLicense = this.businessLicense;
        //   this.enterpriseInfo.companyImg=------

          this.companyInfo.financialInformation.provinceCode = this.companyInfo.comfinan_areaCode[0]
          this.companyInfo.financialInformation.cityCode = this.companyInfo.comfinan_areaCode[1]
          this.companyInfo.financialInformation.regionCode = this.companyInfo.comfinan_areaCode[2]
          
          this.companyInfo.enterpriseInfo.frontIdCard = this.frontIdCard;
          this.companyInfo.enterpriseInfo.reverseIdCard = this.reverseIdCard;
          
          // return false
          this.$delete(this.companyInfo.enterpriseInfo,'frontIdCardBase64')
          this.$delete(this.companyInfo.enterpriseInfo,'reverseIdCardBase64')
          this.$delete(this.companyInfo.enterpriseInfo,'businessLicenseBase64')
          let obj = {
              enterpriseInfo:this.companyInfo.enterpriseInfo,
              financialInformation:this.companyInfo.financialInformation,
              legalRepresentative:this.companyInfo.legalRepresentative,
              enterpriseAssetInfo:this.companyInfo.enterpriseAssetInfo,
              planCode:this.$route.params.financingCode,
              businessInfo:this.companyInfo.businessInfo
          }
        this.$refs.companyInfo.validate((valid) => {
          if (valid) {
          this.$axios.post('/api/mgm/financingPlan/perfectEnterprise',obj).then(res=>{
              if(res.code==0){
                  this.$message({
                      type:'success',
                      message:'保存成功'
                  })
                  this.initData();
                  this.showwrite = false;
              }else{
                  console.log(res);
              }
          })
          } else {
            console.log('error submit!!');
                  this.$message({
                      type:'warning',
                      message:'请完整必填项'
                  })
            return false;
          }
        });

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
        goEvaluationDetails(){
            let id = this.applyId;
            console.log(id);
            console.log( "===>", id );
            this.$router.push({
                path: `/evaluationDetails/${id}`
            });
        },
        reviewBtn(){
          let arrInfo =this.childPlanList;
          this.$axios.post('/mgm/financingPlan/updateChildPlanProductStatus',arrInfo).then(res => {
              if(res.code == 0){
                this.$message({
                    type:'success',
                    message:'审核成功'
                })
              }else{
                  console.log(res);
              }
          })
          .catch(err=>{
            console.log(err);
          })
        }
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
      .divColor span
        font-weight: 400;
        font-style: normal;
        color: #666666;  
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
        font-family 'MicrosoftYaHei', '微软雅黑'
        color #666666
        font-size 14px
        margin-left 6px
      span.spans
        font-weight: 700
        font-family '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
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
.el-form-item__error
  left 10px !important
.ml_0
  margin-left 0px !important
.el-table /deep/ .el-table__header th
  font-weight: 400
  font-style: normal
  font-size: 14px
  color: #666666
  text-align: center
.el-table /deep/ .el-table__body  td
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    text-align: center;
    line-height: 28px;
</style>