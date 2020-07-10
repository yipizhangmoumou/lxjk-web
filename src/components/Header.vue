<template>
  <div id="Header">
    <div class="search item">
      <input type="text" placeholder="请输入搜索内容" />
      <i class="el-icon-search"></i>
    </div>
    <div class="user-info item">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/images/avatar.png" alt />
          Admin
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>基本信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="message item">
      <el-badge :value="12" class="item">
        <i class="el-icon-message-solid"></i>
      </el-badge>
    </div>
    <div class="setting item">
      <i class="el-icon-s-tools"></i>
    </div>
    <div class="logout item">
      <i class="el-icon-switch-button"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
#Header
  background-color #fff
  height 70px
  position fixed
  top 0
  left 0
  width 100%
  box-shadow 0 2px 10px 0 rgba(0, 0, 0, 0.1)
  padding 0 30px 0 240px
  box-sizing border-box
  display flex
  align-items center
  justify-content flex-end
  .search
    position relative
    input
      border 1px solid #ccc
      line-height 35px
      border-radius 25px
      width 200px
      padding 0 20px
    i
      position absolute
      top 50%
      right 16px
      transform translateY(-50%)
  .user-info
    .el-dropdown-link
      img
        width 20px
        height 20px
        vertical-align sub
  .item
    margin 0 20px
    cursor pointer
    font-size 18px
    color #999
    font-weight bold
  .message i, .setting i, .logout i
    font-size 24px !important
</style>