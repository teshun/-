<template>
  <div class="comment">
    <div class="container">
     	<el-row :gutter="100">
  			<el-col :span='5' class='avatarWrapper' :offset='2'>
  				<img :src="user.avatar" alt="" class="avatar">
  				<router-link :to='{name:"personal"}'><el-button>修改资料</el-button></router-link>
  			</el-col>
        <el-col :span='16' class='comment-wrapper'>
            <h2>你的评论</h2>
              <div class="item" v-for='(comment,index) in comments' v-if='comments.length'>
                <a href="javascript:;" class="close" @click='delcom(comment._id,comment.car,index)'><span class="el-icon-close "></span></a>
                <div class="profile">
                  <p class="note">{{comment.date}}<br/>{{comment.time}}<br/>在{{comment.car}}发表</p>

                </div>
                <div class="comment ql-container"><p class="tex ql-editor" v-html='comment.content'></p></div>
              </div>
              <div v-if='!comments.length' class="no">
                你还没有评论过呢！
              </div>
          </el-col>
  		</el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
    	comments:[],
      username:this.$root.$children[0].$data.username
    }
  },
  methods:{
    delcom(_id,carname,index){
      this.$confirm('此操作将删除评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post("/api/delcom",{_id,carname,username:this.username})
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
    axios.get("/api/getusercomment")
    .then(res =>{
      if(res.data.result == -1){
        this.$message({
            message: '请先登陆',
            type: 'warning'
          });
      }
      let comments = res.data.comments.map(function(v){
        return {
          content:v.content,
          car:v.car,
          date:v.meta.createAt.split(/[a=zA-Z]/g)[0],
          time:v.meta.createAt.split(/[a=zA-Z]/g)[1].substr(0,8),
          _id:v._id
        }
      })
      this.comments = this.comments.concat(comments)
    })
  },
  computed:{
    user:{
      get(){
        return {name:this.$root.$children[0].$data.username,avatar:this.$root.$children[0].$data.avatar}
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .comment{
    margin-top: -80px;
    padding: 80px 0 120px;
    /*box-sizing: border-box;*/
    min-height: 100%;
    .container{
      width: 1140px;
      padding: 0 30px;
      padding-top: 55px;
      padding-bottom: 95px;
      margin: 0 auto;
      .avatarWrapper{
  			.avatar{
  				width:100%;
  			}
  			.el-button{
  				margin-top: 20px;
  			}
  		}
  		.comment-wrapper{
        h2{
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          border-bottom: 1px solid #e7e7e7;
        }
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
            
            .note{
              line-height: 30px;
              font-size: 14px;
              padding-top: 20px;
            }
          }
          .comment{
            overflow: hidden;
            min-height: 130px;
            padding-top: 20px;
            padding-left: 20px;
            border-left:1px solid #e7e7e7;
            margin-top: 0;
            .tex{
              width: 100%;
              word-wrap:break-word;
            }
          }
        }
      }
    }
  }
</style>
