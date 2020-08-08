<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
    <div id="SearchFour">
        <div class="search-header">
            <div class="title head-item">数据筛选</div>
            <!-- <div class="btn head-item" @click="isShowAdvancedFilter = true">高级搜索</div> -->
        </div>
        <div class="search-form">
            <el-form ref="search" :model="search" label-width="80px">
                
                <el-form-item label="输入查询：" prop="code">
                    <el-input placeholder="评估单号" v-model="search.code"></el-input>
                </el-form-item>

                <el-form-item label="评估结果：" prop="applyResult">
                    <el-select placeholder="全部" v-model="search.applyResult">
                        <el-option 
                            v-for="(status,idx) in applyResultList"  
                            :key = "idx"
                            :label="status.label" 
                            :value="status.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="申请时间：">
                    <el-date-picker v-model="search.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择申请时间-区间"></el-date-picker>
                </el-form-item>

                <el-form-item class="btn-box">
                    <el-button size="small" type="primary" icon="el-icon-search" @click="abbreviatedQuery">查询</el-button>
                    <el-button size="small" icon="el-icon-back" @click="resetAbbreviatedQuery('search')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <!-- 高级搜索 -->
        <el-dialog title="高级搜索" class="dialog-from" :visible.sync="isShowAdvancedFilter" width="600px">
            <el-form ref="advancedFilter" :model="advancedFilter" label-width="80px">
                <div class="input-line">
                    <el-form-item label="输入查询：">
                        <el-input v-model="advancedFilter.code" placeholder="评估单号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户账号：">
                        <el-input v-model="advancedFilter.userAccount" placeholder="用户账号"></el-input>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="企业名称：">
                        <el-input v-model="advancedFilter.enterpriseName" placeholder="企业名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="申请额度：">
                        <el-select v-model="form.zqtype" placeholder="全部 - 可以设定区间">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="评估结果：">
                    <el-select v-model="advancedFilter.status" placeholder="全部">
                        <el-option 
                            v-for="(status,idx) in applyResultList"  
                            :key = "idx"
                            :label="status.label" 
                            :value="status.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!-- <div class="input-line">
                    
                     <el-form-item label="评估时间：">
                        <el-date-picker v-model="form.date" type="date" placeholder="选择评估时间-区间"></el-date-picker>
                    </el-form-item> 
                </div> -->
                <div class="input-line">
                    <el-form-item label="融资申请：">
                        <el-select v-model="advancedFilter.financingApply" placeholder="全部">
                            <el-option 
                                v-for="(status,idx) in financingApplyList"  
                                :key = "idx"
                                :label="status.label" 
                                :value="status.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="融资申请时间：">
                        <el-date-picker 
                            v-model="advancedFilter.startTime" 
                            type="date" 
                            value-format="yyyy-MM-dd" 
                            placeholder="选择评估时间-区间">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <span class="close-if" @click="cleanIf">清除条件</span>
                <el-button @click="() => { isShowAdvancedFilter = false; cleanIf() }">取 消</el-button>
                <el-button type="primary" @click="advancedFilterQuery">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "SearchOne",
    data() {
        return {
            // 评估结果枚举
            applyResultList: [
                {
                    label: "成功",
                    value: 1
                },
                {
                    label: "失败",
                    value: 0
                }
            ],

            // 融资申请枚举
            financingApplyList: [
                {
                    label: "已申请",
                    value: 1
                },
                {
                    label: "未申请",
                    value: 0
                }
            ],

            // 简略筛选     
            search: {
                code: "",
                applyResult: "",
                startTime: ""
            },

            isShowAdvancedFilter: false,
            // 高级筛选
            advancedFilter: {
                code: "",               // 评估单号
                userAccount: "",        // 用户账号
                enterpriseName: "",     // 企业名称
                                        // 申请额度  后台无
                status: "",             // 评估结果
                                        // 评估时间  后台无
                financingApply: "",      // 融资申请
                startTime: ""            // 申请时间
            }
        };
    },
    methods: {

        /**
         * @description: 缩略查询按钮
         * @param {json} search
         * @Date Changed: 2020-07-13
         */
        abbreviatedQuery() {
            this.$emit("simpleQuery", this.search)
        },

        /**
         * @description: 缩略重置按钮
         * @param {string} formName 表单名 
         * @Date Changed: 2020-07-13
         */ 
        resetAbbreviatedQuery(formName){
            this.$refs[formName].resetFields();

            this.$emit("simpleQuery", this.search);
        }, 

        /**
         * @description: 高级筛选提交
         * @param {type} 
         * @return: 
         * @Date Changed: 
         */
        advancedFilterQuery() {
            // console.log("高级筛选",this.advancedFilter);

            this.$emit("advancedQuery", this.advancedFilter);

            this.cleanIf();
            this.isShowAdvancedFilter = false;
        },


        /**
         * @description: 高级搜索清除
         * @param {type} 
         * @return: 
         * @Date Changed: 
         */
        cleanIf() {
            this.advancedFilter = {
                code: "",               // 评估单号
                userAccount: "",        // 用户账号
                enterpriseName: "",     // 企业名称
                status: "",             // 评估结果
                financingApply: "",      // 融资申请
                startTime: ""            // 申请时间
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