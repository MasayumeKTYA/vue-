<template>
  <div class="header">
    <div class="left">
      <el-button 
      plain 
      class="btn" 
      icon="el-icon-menu" 
      size="mini"
      @click="handleMenu"></el-button>
      <h3>首页</h3>
    </div>
    <div class="right">
        <el-dropdown trigger="click" szie="mini">
            <span class="el-dropdown-link"><img :src="userImg"></span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut()">退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name:'HeaderItem',
  data(){
    return{
      userImg:require('../assets/logo.png')
    }
  },
  methods:{
    handleMenu(){
      this.$store.commit('collaspeMenu')
    },
    loginOut(){
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push("/login")
    }
  }
}
</script>

<style scoped lang="less">
  .header{
    display: flex;
    justify-content: space-between;
    .left{
        .btn{
          margin-top: 10px;
        }
        h3{
          color: #fff;
          display: inline-block;
          margin-left: 40px;
        }
      }
      .right{
        img{
          padding: 10px;
          height: 40px;
          width: 40px;
        }
      }
    
  }
</style>
