<template>
  <div class="cardetail">
    <div class="container">
      <div class="head">
        <div class="title">{{data.title}}</div>
        <p>
          <span class="author">{{data.author}}</span>
          <span class="time">{{data.date.split(/[a=zA-Z]/g)[0]}}</span>
        </p>
      </div>
        <div class="content" v-html='data.content'></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      data:{}
    }
  },
  computed:{
    newsid(){
      return this.$route.params.id
    }
  },
  created(){
    axios.get("/api/getnews?_id="+this.newsid)
    .then(res =>{
      this.data = res.data.data
    })
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
      max-width: 710px;
      padding: 0 30px;
      padding-top: 55px;
      padding-bottom: 95px;
      margin: 0 auto;
      .head{
        margin-bottom: 25.5px;
        vertical-align: center;
        .title{
          font-size: 37.5px;
          letter-spacing: -2px;
          text-indent: -3px;
          margin-bottom: 12px;
        }
      }
      .content{
        font-size: 14px;
        line-height: 24px;
        color: #333;
      }
    }
  }
</style>