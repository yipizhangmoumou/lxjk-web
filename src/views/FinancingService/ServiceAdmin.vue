<template>
  <div id="ServiceAdmin">
    <StatusList :ArrayList="arrayList" />
    <SearchFive />
    <div class="table-container">
      <div class="table-header">
        <h5>数据列表</h5>
        <div class="table-btn">
          <el-button size="small" icon="el-icon-upload2">导出</el-button>
          <el-button
            size="small"
            icon="el-icon-s-check"
            type="primary"
          >融资服务审核</el-button>
          <el-button
            size="small"
            icon="el-icon-s-custom"
            type="primary"
            @click="dialogFormVisible = true"
          >分配融资顾问</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :stripe="true"
          :border="true"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="服务单号" prop="number"></el-table-column>
          <el-table-column prop="name" label="申请时间"></el-table-column>
          <el-table-column prop="address" label="用户账号"></el-table-column>
          <el-table-column prop="employee" label="联系人"></el-table-column>
          <el-table-column prop="linkman" label="联系人"></el-table-column>
          <el-table-column prop="mobile" label="联系人"></el-table-column>
          <el-table-column prop="createTime" label="申请额度"></el-table-column>
          <el-table-column prop="status" label="适用产品"></el-table-column>
          <el-table-column prop="status" label="选择产品"></el-table-column>
          <el-table-column prop="status" label="申请时间"></el-table-column>
          <el-table-column prop="status" label="融资顾问"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>

          <el-table-column prop="address" label="操作" width="150">
            <template>
              <div class="cz">
                <div>评估详情</div>
                <div @click="$router.push('/customization')">定制服务</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-container">
          <div class="selectBtn">
            <el-button size="small" @click="selectAll">全选</el-button>
            <el-button size="small" @click="invertSelection(tableData)">反选</el-button>
            <el-select v-model="value" placeholder="批量操作">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <!-- 分页 -->
          <el-pagination
            :current-page="curr"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>


      <el-dialog title="分配融资顾问" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择融资顾问">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <p style="margin-left:52px">当前服务客户数：3人</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <CopyRight />
  </div>
</template>

<script>
import CopyRight from "components/CopyRight";
import SearchFive from "components/Search/SearchFive";
import StatusList from "components/StatusList";
export default {
  name: "ServiceAdmin",
  data() {
    return {
      curr: 1,
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      options:{},
      value:"",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      arrayList: [
        {
          name: "待融资顾问服务",
          count: 2000,
          color: "#58A3F7"
        },
        {
          name: "待服务定制",
          count: 2000,
          color: "#FEC03D"
        },
        {
          name: "待服务执行",
          count: 2000,
          color: "#FEC03D"
        },
        {
          name: "已完成",
          count: 2000,
          color: "#FB6260"
        }
      ]
    };
  },
  methods: {
    /**
     * @dir 全选
     * @param null
     * @return null
     */

    selectAll() {
      this.$refs.multipleTable.toggleAllSelection();
    },

    /**
     * @dir 反选
     * @param null
     * @return null
     */

    invertSelection(rows) {
      let arr = [];
      this.tableData.forEach((e, index) => {
        rows.forEach(i => {
          if (e.id_ === i.id_) {
            arr.push(this.tableData[index]);
          }
        });
      });
      if (arr) {
        this.$nextTick(() => {
          arr.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  },
  components: {
    SearchFive,
    CopyRight,
    StatusList
  },
  created() {
    for (let index = 0; index < 11; index++) {
      this.tableData.push({
        number: parseInt(Math.random() * 1000000),
        name: "机构名称" + index,
        address: "地区" + index,
        employee: "员工人数" + index,
        linkman: "联系人" + index,
        mobile: "联系方式" + index,
        createTime: "2020-03-09 12:34:23",
        status: index % 2 == 0 ? "已开通" : "未开通",
        codeUrl: "http://www.baidu.com"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/fn.styl'
#ServiceAdmin
  position relative
  .table-container
    width 1100px
    margin 0 auto 200px
    background-color #fff
    padding 20px
    box-sizing border-box
    .table-header
      align-items center
      display flex
      justify-content space-between
      margin-bottom 20px
    .table
      >>> .el-table
        th div, td div
          font-size 12px !important
        th
          background-color #FAFAFA
        .cz
          display flex
          justify-content space-around
          color #0079FE
          cursor pointer
    .page-container
      margin-top 20px
      display flex
      justify-content space-between
      .el-select
        margin-left 20px
        >>> .el-input__inner
          height 32px
          line-height 32px
        >>> .el-input__icon
          line-height 32px
  #CopyRight
    copyRight()
</style>