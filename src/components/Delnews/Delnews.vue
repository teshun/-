<template>
  <div class="newsadd">
    <h1 class="text-title">删除资讯</h1>
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :page-size="5"
        :total="number"
         @current-change="CurrentPage">
      </el-pagination>
    </div>
    <div class="newslist">
      <div class="item" v-for='(news,index) in newslist' :key='news._id'>
        <div class="avatar">
          <img :src="news.avatar" alt="">
        </div>
        <div class="body">
          <router-link :to="{name:'shownews',params:{id:news._id}}" class='title'>{{news.title}}</router-link>
          <p class="del"><el-button @click='delnews(news._id,index)'>删除该项</el-button></p>
        </div>
      </div>
    </div>


    
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      newslist:[],
      number:1
    }
  },
  methods:{
    CurrentPage(val){
      axios.get(`/api/getallnews?page=${val}`)
      .then(res=>{
        console.log(res)
        this.newslist = res.data.data
      })
    },
    delnews(_id,index){
      this.$confirm('此操作将删除这条新闻资讯', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post("/api/delnews",{_id})
        .then(res =>{

          if(res.data.result == 1){
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
          this.newslist.splice(index,1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  created(){
    axios.get('/api/getallnewsnumber')
    .then(res =>{
      this.number = res.data.number
      console.log(this.number)
      this.CurrentPage(1)
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .newsadd{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px;
    }
    .page{
      text-align: right;
    }
    .item{
      display: flex;
      padding: 30px;
      .avatar{
        flex:0 0 133px;
        height: 100px;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .body{
        flex: 1;
        padding-left: 30px;
        font-size: 18px;
        display: flex;
        align-content:space-around;
        a{
          width: 388px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .del{
          align-self: flex-end;
        }
      }
    }
  }
</style>
