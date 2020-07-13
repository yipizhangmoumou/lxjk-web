<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
    <div id="SearchFive">
        <div class="search-header">
            <div class="title head-item">数据筛选</div>
            <div class="btn head-item" @click="showAdvancedFilterModel">高级搜索</div>
        </div>
        <div class="search-form">
            <el-form ref="search" :model="search" label-width="80px">
                <el-form-item label="输入查询：" prop="planCode">
                    <el-input placeholder="服务单号" v-model="search.planCode"></el-input>
                </el-form-item>
                <el-form-item label="服务状态：" prop="actionStatus">
                    <el-select placeholder="全部" v-model="search.actionStatus">
                        <el-option label="全部" value></el-option>
                        <el-option 
                            v-for="(status,idx) in actionStatusList"  
                            :key = "idx"
                            :label="status.label" 
                            :value="status.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间：" prop="startTime">
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
                    <el-form-item label="输入查询：" prop="planCode">
                        <el-input v-model="advancedFilter.planCode" placeholder="服务单号"></el-input>
                    </el-form-item>
                    <el-form-item label="输入联系人电话：" prop="contact">
                        <el-input v-model="advancedFilter.contact" placeholder="联系人电话"></el-input>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="企业名称：" prop="enterpriseName">
                        <el-input v-model="advancedFilter.enterpriseName" placeholder="企业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务状态：" prop="actionStatus">
                        <el-select v-model="advancedFilter.actionStatus" placeholder="全部">
                            <el-option 
                                v-for="(status,idx) in actionStatusList"  
                                :key = "idx"
                                :label="status.label" 
                                :value="status.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="服务申请时间：" prop="createTime">
                        <el-date-picker v-model="advancedFilter.createTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="融资顾问：" prop="custServId">
                        <el-select v-model="advancedFilter.custServId" placeholder="全部">
                            <el-option 
                                v-for="(custServ,idx) in custServList" 
                                :key="idx"
                                :label="custServ.userName" 
                                :value="custServ.id">
                            </el-option> 
                        </el-select>
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
    name: "SearchFive",
    data() {
        return {
            // 初始数据
            actionStatusList: [
                {
                    label: "待融资顾问服务",
                    value: 1
                },
                {
                    label: "待服务定制",
                    value: 2
                },
                {
                    label: "待服务执行",
                    value: 3
                },
                {
                    label: "服务完成",
                    value: 4
                }
            ],

            // 融资顾问列表
            custServList: [],

            // 简略筛选
            search: {
                planCode: "",
                actionStatus: "",
                startTime: ""
            },
            
            isShowAdvancedFilter: false, // 高级筛选弹窗是否显示
            // 高级筛选
            advancedFilter: {
                planCode: "",        // 服务单号
                contact: "",         // 电话
                enterpriseName: "",  // 企业名称
                actionStatus: "",    // 服务状态
                createTime: "",      // 服务申请时间
                custServId: "",      // 融资顾问
            }
        };
    },

    

    methods: {
        /**
         * @description: 初始数据加载：获取融资顾问列表
         * @Date Changed: 2020-07-13
         */        
        getAssginAdvistorData(){
            this.$axios.post("/api/mgm/financingPlan/listFinancingAdviser")
                .then(res=>{
                    // console.log( "获取融资顾问数据：", res ); 
                    if(res.code == 0){
                        let data = res.data;
                        this.custServList = data.map(item=>{
                            return {
                                id: item.id,
                                // phone: item.phone,
                                // userAccount: item.userAccount,
                                userName: item.userName,
                                // createTime: item.createTime,
                                // enterpriseName: item.enterpriseName,
                                // hasBindWx: item.hasBindWx,
                            }
                        })
                    }
                });
        },

        /**
         * @description: 高级搜索按钮
         * @Date Changed: 2020-07-13
         */
        showAdvancedFilterModel(){
            
            this.getAssginAdvistorData();

            this.isShowAdvancedFilter = true;
            
        },

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
         * @description: 高级筛选
         * @Date Changed: 2020-07-13
         */
        advancedFilterQuery() {
            // console.log("高级筛选",this.advancedFilter);
            this.$emit("advancedQuery", this.advancedFilter);
            
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
                planCode: "",        // 服务单号
                contact: "",         // 电话
                enterpriseName: "",  // 企业名称
                actionStatus: "",    // 服务状态
                createTime: "",      // 服务申请时间
                custServId: "",      // 融资顾问
            };
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/styl/search.styl'
#SearchFive 
  .search-form 
    .el-form 
      .btn-box 
        >>> .el-form-item__content
          margin-left 10px !important
>>> .el-form-item__label
  padding 0
</style>