<template>
  <div class="commentlist">
    <h1 class="text-title">评论管理</h1>
    <el-row class='comment-wrapper'>
      <el-col :span='24'>
          <div class="item" v-for='(comment,index) in comments' v-if='comments.length'>
            <a href="javascript:;" class="close" @click='delcom(comment._id,comment.car,comment.username,index)'><span class=" el-icon-close "></span></a>
            <div class="profile">
              <div class="avatar"><img :src="comment.avatar" alt=""></div>
              <p class="note">{{comment.username}}</p>
            </div>
            <div class="comment ql-container"><p class="tex ql-editor" v-html='comment.content'></p></div>
          </div>
          <div v-if='!comments.length' class="no">
            这里还没人评论呢!
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      comments:[]
    }
  },
  computed:{
    car(){
      return this.$route.params.car
    }
  },
  methods:{
    delcom(_id,carname,username,index){
      this.$confirm('此操作将删除评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post("/api/delcom",{_id,carname,username})
        .then(result =>{
          if(result.data.result == 1){
            this.comments.splice(index,1)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
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
    axios.get('/api/getcomment?carname=' + this.car)
    .then(res => {
      this.comments = res.data.conments
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .commentlist{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px;
    }
    .comment-wrapper{
      margin-top: 20px;
      .no{
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        border-bottom: 1px solid #e7e7e7;
        padding-left: 20px
      }
      .item{
        min-height: 150px;
        overflow: hidden;
        padding: 20px;
        border-bottom: 1px solid #e7e7e7;
        position: relative;
        .close{
          top: 25px;
          right: 10px;
          font-size: 16px;
          color: #aaa;
          position: absolute;
          :hover{
            color: #333;
          }
        }
        .profile{
          float: left;
          width: 100px;
          height: 100%;
          
          .avatar{
            padding-left: 5px;
            padding-top: 30px;
            width: 60px;
            img{
              width: 100%;
            }
          }
          .note{
            line-height: 30px;
            font-size: 14px;
            padding-left: 12px;
          }
        }
        .comment{
          margin-top: 0;
          overflow: hidden;
          min-height: 130px;
          padding-top: 20px;
          padding-left: 20px;
          border-left:1px solid #e7e7e7;
          .tex{
            width: 100%;
            word-wrap:break-word;
          }
        }
      }
    }
  }
</style>
