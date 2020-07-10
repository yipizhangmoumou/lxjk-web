<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块
    @date 2020年07月10日11:39:37
-->

<template>
  <div id="SearchOne">
    <div class="search-header">
      <div class="title head-item">数据筛选</div>
      <div class="btn head-item">高级搜索</div>
    </div>
    <div class="search-form">
      <el-form ref="search" :model="search" label-width="80px">
        <el-form-item label="输入查询">
          <el-input placeholder="机构编号/名称/联系人" v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select placeholder="全部" v-model="search.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别">
          <el-select placeholder="全部" v-model="search.jb">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button size="small" icon="el-icon-back">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="stylus" scoped>
#SearchOne
  background-color #fff
  width 1100px
  margin 20px auto 20px
  .search-header
    padding 14px 20px
    box-sizing border-box
    display flex
    justify-content space-between
    font-size 14px
    font-weight bold
    border-bottom 1px solid #e9e9e9
    .btn
      color #0079FE
      cursor pointer
  .search-form
    padding 20px 25px 0
    .el-form
      display flex
      >>> .el-input__inner
        height 35px
        line-height 35px
      .btn-box
        >>> .el-form-item__content
            margin-left 60px !important
</style>