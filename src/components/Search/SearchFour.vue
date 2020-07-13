<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
  <div id="SearchFour">
    <div class="search-header">
      <div class="title head-item">数据筛选</div>
      <div class="btn head-item" @click="dialogVisible = true">高级搜索</div>
    </div>
    <div class="search-form">
      <el-form ref="search" :model="search" label-width="80px">
        <!-- <slot name="baseSearch"></slot> -->
        <el-form-item label="输入查询：">
          <el-input placeholder="评估单号" v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="评估结果：">
          <el-select placeholder="全部" v-model="search.region">
            <el-option label="全部" value></el-option>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评估时间：">
          <el-date-picker v-model="search.region" type="date" placeholder="选择评估时间-区间"></el-date-picker>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="el-icon-back">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 高级搜索 -->
    <el-dialog title="高级搜索" class="dialog-from" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="input-line">
          <el-form-item label="输入查询：">
            <el-input v-model="form.name" placeholder="服务单号"></el-input>
          </el-form-item>
          <el-form-item label="用户账号：">
            <el-input v-model="form.name" placeholder="账号"></el-input>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="企业名称：">
            <el-input v-model="form.num" placeholder="企业名称"></el-input>
          </el-form-item>
          <el-form-item label="申请额度：">
            <el-select v-model="form.zqtype" placeholder="全部 - 可以设定区间">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="评估结果：">
            <el-select v-model="form.address" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评估时间：">
            <el-date-picker v-model="form.date" type="date" placeholder="选择评估时间-区间"></el-date-picker>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="融资申请：">
            <el-select v-model="form.address" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="融资申请时间：">
            <el-date-picker v-model="form.date" type="date" placeholder="选择评估时间-区间"></el-date-picker>
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
  name: "SearchOne",
  data() {
    return {
      search: {
        name: "",
        region: "",
        jb: ""
      },
      dialogVisible: false,
      form: {
        name: "",
        date: "",
        jg: "",
        num: "",
        zqtype: "",
        resource: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    submitSearch() {
      console.log(this.form);
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
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/search.styl'
#SearchFour 
  .search-form 
    .el-form 
      .btn-box 
        >>> .el-form-item__content
          margin-left 10px !important
>>> .el-form-item__label
  padding 0
</style>