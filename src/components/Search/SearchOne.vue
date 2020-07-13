<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
  <div id="SearchOne">
    <div class="search-header">
      <div class="title head-item">数据筛选</div>
      <div class="btn head-item" @click="dialogVisible = true">高级搜索</div>
    </div>
    <div class="search-form">
      <el-form ref="search" :model="search" label-width="80px">
        <!-- <slot name="baseSearch"></slot> -->
        <el-form-item label="输入查询">
          <el-input placeholder="机构编号/名称/联系人" v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select placeholder="全部" v-model="search.region">
            <el-option label="全部" value></el-option>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别">
          <el-select placeholder="全部" v-model="search.jb">
            <el-option label="全部" value></el-option>
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
    <!-- 高级搜索 -->
    <el-dialog title="高级搜索" class="dialog-from" :visible.sync="dialogVisible" width="600px">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="input-line">
          <el-form-item label="输入查询：">
            <el-input v-model="form.name" placeholder="机构名称/联系人"></el-input>
          </el-form-item>
          <el-form-item label="机构级别：">
            <el-select v-model="form.jg" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="机构编号：">
            <el-input v-model="form.num" placeholder="机构编号"></el-input>
          </el-form-item>
          <el-form-item label="账期类型：">
            <el-select v-model="form.zqtype" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="所在地区：">
            <el-select v-model="form.address" placeholder="全部">
              <el-option label="全部" value></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="input-line">
          <el-form-item label="特殊资源：">
            <el-radio-group v-model="form.resource">
              <el-radio
                v-for="(item, index) in radioList"
                :data-type="item.type"
                :label="item.name"
                :key="index"
              ></el-radio>
            </el-radio-group>
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
      console.log("submit!");
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
</style>