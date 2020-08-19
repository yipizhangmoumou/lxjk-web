<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
  <div id="SearchTwo">
    <div class="search-header">
      <div class="title head-item">数据筛选</div>
<!--      <div class="btn head-item" @click="dialogVisible = true">高级搜索</div>-->
    </div>
    <div class="search-form">
      <el-form ref="search" :model="search" label-width="80px">
        <el-form-item label="输入查询">
          <el-input placeholder="用户ID/手机号/姓名" v-model="search.userIdOrMobileOrName"></el-input>
        </el-form-item>
        <el-form-item label="机构">
          <el-input placeholder="机构名称/编号" v-model="search.loanAgencyIdOrName"></el-input>
        </el-form-item>
<!--        <el-form-item label="岗位">-->
<!--          <el-select placeholder="全部" v-model="search.jb">-->
<!--            <el-option label="全部" value></el-option>-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item class="btn-box">
          <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="el-icon-back" @click="handleC">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 高级搜索 -->
    <el-dialog title="高级搜索" class="dialog-from" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="input-line">
          <el-form-item label="输入查询：">
            <el-input v-model="form.name" placeholder="机构名称/联系人"></el-input>
          </el-form-item>
          <el-form-item label="前台权限：">
            <el-select v-model="form.jg" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="所属机构：">
            <el-input v-model="form.num" placeholder="所属机构"></el-input>
          </el-form-item>
          <el-form-item label="员工岗位：">
            <el-select v-model="form.zqtype" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="账号状态：">
            <el-select v-model="form.address" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-date-picker v-model="form.date" type="date" placeholder="选择注册时间"></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <span class="close-if" @click="cleanIf">清除条件</span>
        <el-button @click="() => { dialogVisible = false; cleanIf() }">取 消</el-button>
        <el-button type="primary" @click="submitSearch">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SearchTwo",
  data() {
    return {
      search: {
        loanAgencyIdOrName: "",
        userIdOrMobileOrName: ""
      },
      dialogVisible: false,
      form: {
        name: "",
        date: "",
        jg: "",
        num: "",
        zqtype: "",
        resource: ""
      },
      radioList: [
        {
          name: "全部",
          type: 1
        },
        {
          name: "已开通",
          type: 2
        },
        {
          name: "未开通",
          type: 3
        },
        {
          name: "禁用",
          type: 4
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.$emit('search', this.search);
    },
    handleC () {
      this.search = {
        loanAgencyIdOrName: "",
        userIdOrMobileOrName: ""
      };
      this.$emit('search', {});
    },
    submitSearch() {
      console.log(this.form)
      this.dialogVisible = false;
    },
    cleanIf() {
      this.form = {
        name: "",
        date: "",
        jg: "",
        num: "",
        zqtype: "",
        resource: ""
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../../assets/styl/search.styl";
  .btn-box{
    width: 500px;
    text-align: right;
  }
</style>
