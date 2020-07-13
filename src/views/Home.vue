<template>
  <div id="Home">
    <Menu/>
    <div class="router-child">
      <GloablTitle/>
      <router-view />
    </div>
  </div>
</template>

<script>
import GloablTitle from "components/GlobalTitle"
import Menu from "components/Menu"
export default {
  name: 'Home',
  components: {
    Menu,
    GloablTitle
  }
}
</script>

<style lang="stylus" scoped>
#Home
  .router-child
    overflow auto
    height 100vh
    padding 70px 0 0 240px
    background-color #f0f2f5
</style>
