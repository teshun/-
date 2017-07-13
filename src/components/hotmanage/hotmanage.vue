<template>
  <div class="hotmanage">
    <h1 class="text-title">热门管理</h1>
    <el-col :span='16'>
      <el-form  label-width="80px" :model="formData">
        <el-form-item label="汽车名">
          <el-input v-model="formData.carname"></el-input>
        </el-form-item>
        <el-form-item label="大致价格">
           <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="描述">
           <el-input type="textarea" v-model="formData.desc" :rows='3'></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            action="/api/getpicpath"
            :on-success='getpath'
            drag
            list-type="picture">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> 
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      cars:[],
      formData: {
        carname: '',
        desc: '',
        picpath:'',
        price:''
      },

    }
  },
  created(){
    
  },
  methods:{
    getpath(res){
      this.formData.picpath = res.path;

    },
    submit(){
      axios.post("/api/hotadd",{data:this.formData})
      .then(res =>{
        if(res.data.result == 1){
          this.formData.carname = ''
          this.formData.desc = ''
          this.formData.price = ''
          this.$message({
            showClose: true,
            duration:2000,
            message: '保存成功',
            type: 'success'
          });
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hotmanage{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px;
    }
  }
</style>
