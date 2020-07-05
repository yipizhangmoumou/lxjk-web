<template>
    <!---->
    <div class="main-box full-height">
        <Header></Header>
        <section class="sys-section">
            <Aside></Aside>
            <router-view class="full-height full-width" />
        </section>
    </div>
</template>

<script>
import Header from './component/Header'
import Aside from './component/Aside'
export default {
  name: 'Main',
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
  components: {Header, Aside}
}
</script>

<style scoped lang="less">
.main-box{
    .sys-section{
        border-top: 1px solid #e8e8e8;
        height: calc(100% - 80px);
        display: flex;
        >div{
            height: 100%s;
        }
    }
}
</style>
