<template>
  <div id="stepContainer">
    <el-steps :active="stepActive" align-center>
        <el-step 
            v-for = "(step,idx) in stepArr"
            :key="idx"
            :title="step.name" 
            :description="step.time">
        </el-step>
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
              type:Number,
            }
        },
  data(){
    return{

    }
  },
}
</script>

<style lang="stylus" scoped>
#stepContainer
    margin 0 auto
    margin-top 20px
    padding 30px
    width 1100px
    background-color #fff
    box-sizing border-box 

</style>