<template>
  <div class="index">
    <div class="container">
      <el-row class='menu'>
        <!-- 车型分类 -->
        <el-col :span="18">
          <div class="left-layout">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane class='tab'  label="8万以下" name="downeight">
                <ul v-for='item in carlist.downeight'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="8-12万" name="eightToTwelve">
                <ul v-for='item in carlist.eightToTwelve'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="12-18万" name="twelveToEighteen"><ul v-for='item in carlist.twelveToEighteen'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul></el-tab-pane>
              <el-tab-pane class='tab' label="18-25万" name="eighteenToTwentyfive">
                <ul v-for='item in carlist.eighteenToTwentyfive'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="25-40万" name="twentyfiveToForty">
                <ul v-for='item in carlist.twentyfiveToForty'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="40万以上" name="upForty">
                <ul v-for='item in carlist.upForty'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="新车" name="newcar">
                <ul v-for='item in carlist.newcar'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
              <el-tab-pane class='tab' label="二手车" name="usedcar">
                <ul v-for='item in carlist.usedcar'><li><a href="javascript:;" @click ='routeto(item)'>{{item}}</a></li></ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="6"><div class="right-layout">
          <ul>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./m_9_55.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >奥迪</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./bm.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >宝马</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./bc.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >奔驰</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./bt.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >本田</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./cq.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >传祺</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./m_8_55.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >大众</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./fentian.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >丰田</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><img src="./ft.png" alt="" class="li-img"></a>
              <a href="javascript:;" class='right-icon-a'><p >福特</p></a>
            </li>
            <li class="li-item">
              <a href="javascript:;" class='right-icon-a'><p class="more">...</p></a>
              <a href="javascript:;" class='right-icon-a'><p >更多</p></a>
            </li>
          </ul>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span='24' class='slideWrapper'>
        <h3 class='slideTitle'>热门车辆</h3>
          <el-carousel indicator-position="outside" :interval='6666'>
            <el-carousel-item v-for="item in hotLengthData.length" :key="item">
              <el-col :span='7' :offset='1' v-if='(item - 1)*3 + 0 < hot.length'>
                <div class="hotWrapper" >
                  <div class="imgWrapper">
                    <img :src="hot[(item - 1)*3 + 0].picpath" alt=""  class='img'>
                  </div>
                  <p class="carname">{{hot[(item - 1)*3 + 0].carname}}</p>
                  <p class="price">{{hot[(item - 1)*3 + 0].price}}</p>
                  <div class="desc">{{hot[(item - 1)*3 + 0].desc}}</div>
                </div>
              </el-col>
              <el-col :span='7' :offset='1' v-if='(item - 1)*3 + 1 < hot.length'>
                <div class="hotWrapper">
                  <div class="imgWrapper">
                    <img :src="hot[(item - 1)*3 + 1].picpath" alt=""  class='img'>
                  </div>
                  <p class="carname">{{hot[(item - 1)*3 + 1].carname}}</p>
                  <p class="price">{{hot[(item - 1)*3 + 1].price}}</p>
                  <div class="desc">{{hot[(item - 1)*3 + 1].desc}}</div>
                </div>
              </el-col>
              <el-col :span='7' :offset='1' v-if='(item - 1)*3 + 2 < hot.length'>
                <div class="hotWrapper">
                  <div class="imgWrapper">
                    <img :src="hot[(item - 1)*3 + 2].picpath" alt="" class='img'>
                  </div>
                  <p class="carname">{{hot[(item - 1)*3 + 2 ].carname}}</p>
                  <p class="price">{{hot[(item - 1)*3 + 2].price}}</p>
                  <div class="desc">{{hot[(item - 1)*3 + 2].desc}}</div>
                </div>
              </el-col>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span='20' class='newWrapper'>
          <h3 class='newsTopTitle'>热门新闻</h3>
          <div class="newswrapper" v-for='news in newslist'>
            <div class="avatar">
              <img :src="news.avatar" alt="">
            </div>
            <div class="body">
              <router-link :to="{name:'shownews',params:{id:news._id}}" class='title'>{{news.title}}</router-link>
            </div>
          </div>
          <p class="loadmore"><el-button type="text" @click='loadmore'>点击加载更多</el-button></p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      activeName: 'downeight',
      carlist:{},
      hot:[],
      newslist:[],
      currentPage : 1
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(this.activeName)
    },
    routeto(carname){
      this.$router.push({name:"cardetail",params:{id:carname}})
    },
    loadmore(){
      let val = ++this.currentPage
      axios.get(`/api/getallnews?page=${val}`)
      .then(res=>{
        this.newslist = this.newslist.concat(res.data.data)
      })
    }
  },
  computed:{
    hotLengthData(){
      return {length:Math.ceil(this.hot.length / 3),remainder:this.hot.length % 3}
    }
  },
  created(){
    axios.get('/api/getindexCarlist').then(res=>{
      if(res.data.result == 1){
        this.carlist = res.data.data.display
        this.hot = res.data.data.hot
      }
    })
    axios.get("/api/getallnews")
    .then(res =>{
      this.newslist = res.data.data
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .index{
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
      .menu{
        border-bottom: 1px solid #E1E1E1;
      
        .left-layout{
          height: 225px;
          .el-tabs__header{
            margin-bottom: 0;
            .el-tabs__item{
              height: 50px;
            }
          }
          .tab{
            ul{
              li{
                float: left;
                width: calc(100% / 7);
                line-height: 58px;
                a:hover{
                  color:#20a0ff;
                }
              }
            }
          }
        }
        .right-layout{
          height: 225px;
          .li-item{
            float: left;
            width: 86px;
            height: 75px;
            text-align: center;
            .right-icon-a{
              display: block;
              &:hover{
                color:#20a0ff;
              }
              .li-img{
                width: 40px;
                height: 40px;
              }
              .more{
                line-height: 40px;
                font-size: 20px;
              }
            }
            
          }
        }
      }
      .slideWrapper{
        margin-top: 20px;
        width: 100%;
        .slideTitle{
          line-height: 40px;
          height: 40px;
          color: #48576a;
          font-size: 30px;   
          padding-bottom: 10px;     
        }
        .hotWrapper{
          height: 260px;
          text-align: center;
          margin-right: 20px;
          transition: all .5s;
          position: relative;
          overflow: hidden;
          .carname{
            line-height: 46px;
            font-size: 18px;
            color: #333;
          }
          .price{
            line-height: 26px;
            font-size: 14px;
            color: #ff6700;
          }
          .imgWrapper{
            width: 100%;
            text-align: center;
            .img{
              transition: all .5s;
              width: 80%;
            }
          }
          .desc{
            position: absolute;
            bottom: -100px;
            width: 100%;
            height: 80px;
            color: #5e6d82;
            background-color: #fff;
            transition: all .5s;
            font-size: 18px;
            text-align: center;
            line-height: 50px;
          }
          &:hover{
            .img{
              transform: translate(-3px,3px);
            }
            .desc{
              bottom: 0;
            }
          }
        }
      }
      .newWrapper{
        margin-top: 20px;
        width: 100%;
        .newsTopTitle{
          line-height: 40px;
          height: 40px;
          color: #48576a;
          font-size: 30px;
        }
        .loadmore{
          width: 50%;
          text-align: center;
        }
        .newswrapper{
          padding-left: 100px;
          width: 50%;
          display: flex;
          padding: 30px;
          border-bottom: 1px solid #E1E1E1;
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
          }
        }
      }
    }
  }
  
</style>
