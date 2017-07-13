<template>
  <div class="cardetail">
    <div class="container">
        <el-row :gutter="50">
          <el-col :span="10"><div class="proPic"><img :src="info.avatar" class="ava-img" alt=""></div></el-col>
          <el-col :span="14">
            <div class="brief">
              <h2>
                <span class="note">全国参考价：</span>
                <span class="price">{{info.price.refs.down}} - {{info.price.refs.up}}万</span>
                <el-button>关注</el-button>
              </h2>
              <h5 class="factory-price">
                  <span class="note">厂家指导价：</span>
                  <span class="price">{{info.price.gui.down}} - {{info.price.gui.up}}万</span>
              </h5>
              <div class="info">
                <ul class="info-ul">
                  <li class="info-li">
                    排量： <span v-for='it in info.parameter.pl'>{{it}}&nbsp;</span>
                  </li>
                  <li class="info-li">
                    变速箱：  <span>{{info.parameter.bsx}}</span>
                  </li>
                  <li class="info-li">
                    保修  <span>{{info.parameter.bx}}</span>
                  </li>
                  <li>
                    油耗  <span>{{info.parameter.yh.down}}L - {{info.parameter.yh.up}}L</span>
                  </li>
                </ul>
              </div>
              <div class="md">  
                <ul class="md-ul">
                  <li class="md-li">
                    <div class="inner">
                      <div class="top">
                        <p class="note">优惠降价</p>
                        <a href="javascript:;" class="desc">直降{{info.purchase.yh}}万</a>
                      </div>
                      <div class="button">
                         <el-button type="danger" style='width:80%'>询底价>></el-button>
                      </div>
                    </div>
                  </li>
                  <li class="md-li">
                    <div class="inner">
                      <div class="top">
                        <p class="note">贷款</p>
                        <a href="javascript:;" class="desc" style='color="#ff4f53"'>首付{{info.purchase.dk}}万起>></a>
                      </div>
                      <div class="button">
                        <el-button :plain="true" type="danger">询底价</el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <div class='slide-wrapper'>
              <h2 class="detail">more</h2>
              <el-carousel trigger="click" height="600px">
                <el-carousel-item v-for="item in info.display" :key="item">
                  <img :src="item" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='19' class='tableWrapper'>
              <el-table
                :data="info.carType"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="vs"
                  label="型号"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="bsx"
                  label="变速箱"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="zdj"
                  label="指导价">
                </el-table-column>
                <el-table-column
                  prop="ckj"
                  label="最低参考价">
                </el-table-column>
              </el-table>
          </el-col>
        </el-row>
        <el-row class='comment-wrapper'>
          <el-col :span='19'>
            <h2>相关评论</h2>
              <div class="item" v-for='comment in comments' v-if='comments.length'>
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
          <el-col :span='19' class='editor-wrapper'>
            <quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption">
            </quill-editor>
            
          </el-col>
          <el-col>
            <el-button @click='comsave'>提交</el-button>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      info:{
        name:this.car
      },
      content:'',
      editorOption:{
        
      },
      comments:[]
    }
  },
  computed:{
    car(){
      return this.$route.params.id;
    }
  },
  methods: {
    comsave(){
      axios.post('/api/comsave',{
        car:this.car,
        content:this.content
      })
      .then(res=>{
        if(res.data.result == -1){
          this.$message({
            message: '请先登陆',
            type: 'warning'
          });
        }else if(res.data.result == -2){
          this.$message({
            message: '评论错误',
            type: 'error'
          });
        }else{
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.comments.push({
            content:this.content,
            avatar:this.$root.$children[0].$data.avatar,
            username:this.$root.$children[0].$data.username
          })
          this.content = ''
        }
      })
    }
  },
  created(){
    axios.get('/api/getcarinfo?name='+this.car)
    .then(res => {
      this.info = Object.assign({},this.info,res.data.result);
    })
    axios.get('/api/getcomment?carname=' + this.car)
    .then(res => {
      this.comments = res.data.conments

    })
    console.log(this.$root.$children[0].$data.username)
  },
  mounted(){

  },
  components: {
    quillEditor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cardetail{
    margin-top: -80px;
    padding: 80px 0 120px;
    box-sizing: border-box;
    min-height: 100%;
    color:#666;
    .container{
      width: 1140px;
      padding: 0 30px;
      padding-top: 55px;
      padding-bottom: 95px;
      margin: 0 auto;
      .proPic{
        height:300px;
        overflow: hidden;
        .ava-img{
          width: 100%
        }
      }
      .brief{
        line-height: 40px;
        
        .note{
          font-size: 30px;
          margin-right: 10px;
          font-size: 18px;
        }
        .price{
          font-size: 30px;
          color: #FF4F53;
          vertical-align: -4px;
          font-weight: bold;
          margin-right: 20px
        }
        .factory-price{
          .price{
            font-size: 20px;
            vertical-align: -1px;
            font-weight: normal;
            color: #333;
          }
        }
        .info{
          .info-ul{
            display: flex;
            justify-content: space-between;
            color: #333;
            .info-li{
              position: relative;
              
              &:after{
                content:'';
                height: 14px;
                width: 1px;
                background-color: #ccc;
                position: absolute;
                right: -15px;
                top: 12px;
              }
            }
          }
        }
        .md{
          background-color: #F7F7F7;
          margin-top: 32px;
          width: 100%;
          height: 144px;
          .md-ul{
            
            .md-li{
              float: left;
              width: 177px;
              height: 120px;
              .inner{
                padding: 18px 0 0 20px;
                .note{
                  font-size: 14px;
                  line-height: 20px;
                }
                .desc{
                  font-size: 18px;
                  line-height: 24px;
                  color: #ff4f53;
                  margin: 5px 0 15px;

                }
              }
            }
          }
        }
      }
      .slide-wrapper{
        width: 900px;
        position: relative;
        .detail{
          line-height: 40px;
          height: 40px;
          font-size: 25px;
        }
        img{
          width: 100%;
        }
      }
      .tableWrapper{
        margin-top: 30px;
      }
      .comment-wrapper{
        margin-top: 20px;
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
      .editor-wrapper{
        margin-top: 20px;
        margin-bottom: 88px;
        h2{
          height: 40px;
          line-height: 40px;
          font-size: 20px;

        }
        .quill-editor{
          height: 200px
        }
      }
    }
  }
</style>
