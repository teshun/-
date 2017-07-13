<template>
  <div class="carphoto">
    <h1  class="h1-title">汽车图像增加</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="车型">
        <el-col :span='24'>
          <el-input
            v-model="name"
            :disabled="true">
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="车型图">
        <el-col :span='24'>
          <el-upload
            class="upload-avatar"
            drag
            action="/api/carsphoto"
            :on-preview="handlePreview"
            list-type="picture">
            <input type="hidden" v-model='name'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="展示图">
        <el-col :span='24'>
          <el-upload
            class="upload-display"
            multiple
            drag
            action="/api/carsdisplay"
            :on-preview="handlePreview"
            list-type="picture">
            <input type="hidden" v-model='name'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
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
      form: {
        
      }
    }
  },
  computed:{
    name(){
      return this.$route.params.carname
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .carphoto{
    width: 100%;
    .h1-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px
    }
  }
</style>
