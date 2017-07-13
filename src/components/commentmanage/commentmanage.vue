<template>
  <div class="commentmanage">
    <h1 class="text-title">评论管理</h1>
    <el-row>
      <el-col :span="7" v-for="(o, index) in cars" :key="o" :offset="index%3 == 0 ? 0 : 1" class='item'>
        <el-card :body-style="{ padding: '0px' }">
          <img :src=o.avatar class="image">
          <div style="padding: 14px;">
            <span>{{o.name}}</span>
            <router-link :to='{name:"commentlist",params:{car:o.name}}'><el-button type="text" class="button clearfix">查看评论</el-button></router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      cars:[]
    }
  },
  created(){
    axios.get('/api/getallcarinfo')
    .then(res=>{
      
      if(res.data.result == 1){
          this.cars = this.cars.concat(res.data.data)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .commentmanage{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px;
    }
    .item{
      margin-bottom: 36px;
      .bottom {
        margin-top: 13px;
        line-height: 12px;

      }
    
      .button {
        padding: 0;
        float: right;
      }
    
      .image {
        width: 100%;
        height: 172px;
        display: block;
      }
    }
  }
</style>
