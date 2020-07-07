<template>
    <!---->
    <header class="sys-head ms-flex row just-between">
        <div class="logo-box">链信金科</div>
        <div class="head-box full-width"></div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {},
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  computed: {},
  watch: {},
  components: {}
}
</script>

<style scoped lang="less">
.sys-head{
    height: 80px;
    .logo-box{
        text-align: center;
        line-height: 80px;
        background-color: rgba(0, 33, 64, 1);
        color: #FFFFFF;
        flex: 0 0 @sideBarWidth;
    }
    .head-box{
        border-bottom: 1px solid #e8e8e8;
    }
}
</style>
