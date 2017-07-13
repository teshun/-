<template>
  <div class="admin">
    <div class="container">
      <el-row :gutter="50">
        <el-col :span="5">
          <el-menu default-active="1" class="el-menu-vertical-demo" router>
            <el-submenu index="/admin/hotmanage">
              <template slot="title">首页热门管理</template>
              <el-menu-item index="/admin/hotmanage">热门添加</el-menu-item>
              <el-menu-item index="/admin/delhot">热门删除</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/cartext">cars</el-menu-item>
            <el-menu-item index="/admin/commentmanage">评论管理</el-menu-item>
            <el-submenu index="/admin/newsadd">
              <template slot="title">资讯管理</template>
              <el-menu-item index="/admin/newsadd">新闻添加</el-menu-item>
              <el-menu-item index="/admin/delnews">新闻删除</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span='19'>
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  methods: {
      
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
        if(vm.$root.$children[0].$data.role < 50){
          vm.$router.push({path:'/index'})
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .admin{
    margin-top: -80px;
    padding: 80px 0 120px;
    box-sizing: border-box;
    min-height: 100%;
    .container{
      width: 1140px;
      padding: 0 30px;
      padding-top: 55px;
      padding-bottom: 95px;
      margin: 0 auto;
      .manage{
        background-color: pink;
        height: 100%;
      }
    }
  }
</style>
