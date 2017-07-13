<template>
  <div class="cartext">
    <h1 class="text-title">汽车概况</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="汽车名称">
        <el-col :span="8">
          <el-input v-model="form.name" @blur='get'></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="参考价格(万)">
        <el-col :span="8">
          <el-input  v-model.number="form.price.refs.down" style="width: 100%;"></el-input>
        </el-col>
        <el-col class="line" :span="2">---</el-col>
        <el-col :span="8">
          <el-input  v-model.number="form.price.refs.up" style="width: 100%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="指导价格(万)">
        <el-col :span="8">
          <el-input v-model.number="form.price.gui.down" style="width: 100%;"></el-input>
        </el-col>
        <el-col class="line" :span="2">---</el-col>
        <el-col :span="8">
          <el-input v-model.number="form.price.gui.up" style="width: 100%;"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="大概参数">
        <el-col :span="8">
          <el-input v-model.number="form.parameter.yh.down" style="width: 100%;"><template slot="prepend">油耗down</template></el-input>
        </el-col>
        <el-col class="line" :span="2">---</el-col>
        <el-col :span="8"><el-input v-model.number="form.parameter.yh.up" style="width: 100%;"><template slot="prepend">油耗up</template></el-input></el-col>
        <el-col :span="8">
            <el-input placeholder="排量" v-for='(pl,index) in form.parameter.pl' v-model='form.parameter.pl[index]'>
              <template slot="prepend">排量</template>
            </el-input>
            <el-button @click="addpl" >增加</el-button><el-button @click="depl" >减少</el-button>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-select v-model="form.parameter.bsx" placeholder="变速箱">
            <template slot="prepend">变速箱</template>
            <el-option label="手动" value="手动"></el-option>
            <el-option label="自动" value="自动"></el-option>
            <el-option label="手动/自动" value="手动/自动"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" :offset='2'>
          <el-input v-model="form.parameter.bx"><template slot="prepend">保修</template></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="优惠相关">
        <el-col :span="8">
            <el-input placeholder="降价优惠" v-model.number="form.purchase.yh">
              <template slot="prepend">降价优惠</template>
            </el-input>
        </el-col>
        <el-col :span="8">
            <el-input placeholder="贷款优惠" v-model.number="form.purchase.dk">
              <template slot="prepend">贷款优惠</template>
            </el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.carType"
        :label="'车型' + (index + 1)"
        :key='index*100'
      > 
          <el-col :span="8">
            <el-input  v-for='(val,key) in item' v-model="item[key]" :key='index*100 + key' v-if='key !== "_id"'>
              <template slot="prepend">{{txt(key)}}</template>
            </el-input>
          </el-col>
          <el-button @click.prevent="remove(item)">删除</el-button>
          
      </el-form-item>
      <el-form-item>
        <el-button @click="additem">新增车型</el-button>

        <el-button type="primary" @click="onSubmit" v-if='step'>下一步</el-button>
        <el-button type="primary" @click="change" v-else>修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      step:true,
      oldname:'',
      form: {
        name: '',
        price:{
          refs:{
            down:1,
            up:1
          },
          gui:{
            down:1,
            up:1
          }
        },
        parameter:{
          pl:[''],
          bsx:"",
          bx:"",
          yh:{
            up:1.0,
            down:1.0
          }
        },
        avatar:'',
        purchase:{
          yh:1,
          dk:1,
          uk:1
        },
        carType:[
          {
            vs:'',
            bsx:'',
            zdj:'',
            ckj:''
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post("/api/carstext",this.form)
      .then((res) => {
        console.log(res.data)
        this.$router.push({name:'carphoto',params:{carname:this.form.name}})
      })
    },
    remove(item){
      var index = this.form.carType.indexOf(item)
        if (index !== -1) {
          this.form.carType.splice(index, 1)
        }
    },
    addpl(){
      this.form.parameter.pl.push('');
    },
    depl(){
      var index = this.form.parameter.pl.length-1
      this.form.parameter.pl.splice(index, 1)
    },
    additem(){
      this.form.carType.push({
          vs: '',
          bsx: '',
          zdj:'',
          ckj:''
        });
    },
    change(){
      let oldname = this.oldname;
      let newDate = Object.assign({},this.form);
      newDate.oldname = oldname;
      axios.post('/api/changetext',newDate)
      .then(response => {
        if(response.data.result = 1)
          this.$message({
          message: '修改成功',
          type: 'success',
          duration:2000
        });
        this.oldname = newDate.name
      })
    },
    get(){
      axios.get('/api/getcarinfo?name='+this.form.name)
      .then((res) =>{
        if(res.data.result !== -1){
          if(!res.data.result.carType){
            res.data.result.carType = [];
            this.additem()
          }
        
        this.form = Object.assign({},this.form,res.data.result)
        this.oldname = this.form.name
        this.step = false;
        }
      }).catch(err =>{
        console.log(err)
        console.log(22)
      })
    },
    txt(text){
      switch(text)
      {
      case "vs":
        return "车型"
      case 'bsx':
        return "变速箱"
      case "zdj":
        return "指导价"
      case "ckj":
        return "参考价"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cartext{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px
    }
  }
</style>
