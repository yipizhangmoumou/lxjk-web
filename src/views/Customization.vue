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
              <el-button type="primary" icon="el-icon-s-open">定制融资产品/定制完成，查看详情</el-button>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%" align-center>
            <el-table-column prop="date" align="center" label="企业信息"></el-table-column>
            <el-table-column prop="name" align="center" label="法人信息"></el-table-column>
            <el-table-column prop="address" align="center" label="企业资质"></el-table-column>
            <el-table-column prop="address" align="center" label="财务账户"></el-table-column>
          </el-table>
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
            ]
        };
    },
    components: {
        CopyRight
    },
    methods: {
        /**
         * @description: 【定制融资产品/查看详情】按钮跳转
         * @Date Changed: 2020-07-12
         */
        goProductCustomization(){
            console.log( "定制融资产品/查看详情" );
            this.$router.push("/productCustomization")
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
</style>