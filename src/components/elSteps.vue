<template>
  <div class="step-container">
    <el-steps class="step-step"  :active="1" finish-status="success">
  <el-step v-for="(item,index) in stepArr" :key="index" :title="item.title" :description="item.description"></el-step>
</el-steps>
  </div>
</template>

<script>
export default {
        props:{
            stepArr: {
                type: Array,
                required: true
            },
            stepActive:{
              type:String,
            }
        },
  data(){
    return{

    }
  },
  mounted(){
    console.log(this.stepArr,this.stepActive);
  },
}
</script>

<style lang="stylus" scoped>
.step-container
    width 1100px
    height 200px
    margin 20px auto
    background-color #fff
    box-sizing border-box
    display flex
    justify-content center
    align-items center
    .el-steps
      width 80%
      margin 0 auto
      .el-step
        width 20% !important

</style>