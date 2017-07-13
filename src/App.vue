<template>
  <div id="app">
    <Myhead></Myhead>
    <router-view></router-view>
    <Myfooter></Myfooter>
  </div>
</template>

<script>
import Head from '@/components/head/Head'
import Myfooter from '@/components/footer/Myfooter'
import axios from 'axios'
export default {
  name: 'app',
  components:{Myhead:Head,Myfooter},
  data(){
    return{
      username:'',
      avatar:'',
      role:1
    }
  },
  created(){
    axios.post('/api/testsession')
    .then(res =>{
      if(res.data.result == 1){
        console.log(res.data.userData.avatar)
        this.username = res.data.userData.username;
        this.avatar = res.data.userData.avatar;
        this.role = res.data.userData.role;
      }
    })
  }
}
</script>

<style >
  html{
    height: 100%;
  }
  body{
    height: 100%;
  }
  #app{
    height: 100%
  }
</style>
