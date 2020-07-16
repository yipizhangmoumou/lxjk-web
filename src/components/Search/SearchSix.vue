<!--
    @dir 助贷机构管理 和 机构岗位管理 的数据筛选模块 这个高级搜索和上边的搜索可以通过事件传参的方式来进行更新table表格
    当然你可以用slot 插槽，我懒得写了。 你要想优化就优化吧，不想优化就复制粘贴
    @date 2020年07月10日11:39:37
-->

<template>
    <div id="SearchSix">
        <div class="search-header">
            <div class="title head-item">数据筛选</div>
            <div class="btn head-item" @click="isShowAdvancedFilter = true">高级搜索</div>
        </div>
        <div class="search-form">
            <el-form ref="search" :model="search" label-width="80px">
                <!-- <slot name="baseSearch"></slot> -->
                <el-form-item label="输入查询：">
                    <el-input placeholder="执行单号" v-model="search.childPlanCode"></el-input>
                </el-form-item>
                <el-form-item label="执行状态：">
                    <el-select placeholder="全部" v-model="search.actionStatus">
                        <el-option label="全部" value></el-option>
                        <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                        <el-option 
                            v-for="(item,idx) in actionStatusList" 
                            :key="idx"
                            :label="item.label" 
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行时间：">
                    <el-date-picker v-model="search.actionTime" type="date" placeholder="选择执行时间-区间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="btn-box">
                    <el-button size="small" type="primary" icon="el-icon-search" @click="abbreviatedQuery">查询</el-button>
                    <el-button size="small" icon="el-icon-back">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 高级搜索 -->
        <el-dialog title="高级搜索" class="dialog-from" :visible.sync="isShowAdvancedFilter" width="600px">
            <el-form ref="advancedFilter" :model="advancedFilter" label-width="80px">
                <div class="input-line">
                    <el-form-item label="输入查询：">
                        <el-input v-model="advancedFilter.name" placeholder="执行单号"></el-input>
                    </el-form-item>
                    <el-form-item label="执行单状态：">
                        <el-select v-model="advancedFilter.zqtype" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!-- <div class="input-line">
                    <el-form-item label="产品类型：">
                        <el-select v-model="advancedFilter.zqtype" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="申请额度：">
                        <el-select v-model="advancedFilter.zqtype" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="期数：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="还款方式：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="放款机构：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="担保方式：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div> -->
                <!-- <div class="input-line">
                    <el-form-item label="融资顾问：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="前置付款状态：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div> -->
                <div class="input-line">
                    <!-- <el-form-item label="来源：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="前置付款状态：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务款支付状态：">
                        <el-select v-model="advancedFilter.address" placeholder="全部">
                        <el-option label="全部" value></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="input-line">
                    <el-form-item label="执行时间：">
                        <el-date-picker v-model="advancedFilter.date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成时间：">
                        <el-date-picker v-model="advancedFilter.date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <span class="close-if" @click="cleanIf">清除条件</span>
                <el-button @click="() => { isShowAdvancedFilter = false; cleanIf() }">取 消</el-button>
                <el-button type="primary" @click="submitSearch">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "SearchSix",
    data() {
        return {
            // 执行单状态数据
            actionStatusList: [
                {
                    label: "申请中",
                    value: 0
                },
                {
                    label: "待风控审核",
                    value: 1
                },
                {
                    label: "待付款前置收费项",
                    value: 2
                },
                {
                    label: "待放款机构审核",
                    value: 3
                },
                {
                    label: "待银行/机构签约放款",
                    value: 4
                },
                {
                    label: "待付款服务费",
                    value: 5
                },
                {
                    label: "服务完成",
                    value: 6
                },
                {
                    label: "服务取消",
                    value: 7
                },
            ],

            // 简略筛选
            search: {
                childPlanCode: "", // 执行单号
                actionStatus: "",   // 执行单状态
                actionTime: ""  // 执行时间
            },


            isShowAdvancedFilter: false, // 高级筛选弹窗是否显示
            // 高级筛选
            advancedFilter: {
                childPlanCode: "", // 执行单号
                actionStatus: "",// 执行单状态
                // 产品类型 
                // 产品类型
                // 申请额度
                // 期数
                // 还款方式
                // 放款机构
                // 担保方式
                // 融资顾问
                // 前置付款状态
                // 来源
                // 服务款支付状态
                // 执行时间
                // 完成时间


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
        /**
         * @description: 缩略查询按钮
         * @param {json} search
         * @Date Changed: 2020-07-13
         */
        abbreviatedQuery() {
            console.log( "abbreviatedQuery===> ", this.search );
            this.$emit("simpleQuery", this.search)
        },

        submitSearch() {
            console.log(this.advancedFilter);
            this.isShowAdvancedFilter = false;
        },
        cleanIf() {
            this.advancedFilter = {
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
#SearchSix
  .search-form
    .el-form
      .btn-box
        >>> .el-form-item__content
          margin-left 10px !important
>>> .el-form-item__label
  padding 0
</style>