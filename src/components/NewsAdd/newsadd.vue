<template>
  <div class="newsadd">
    <h1 class="text-title">增加新闻资讯</h1>
    <el-form ref="form" :model="form" label-width="80px" :label-position="'top'">
      <el-form-item label="新闻标题"  class='wd'>
         <el-input v-model="form.title"></el-input>
      </el-form-item>
      
      <el-form-item label="作者" class='wd'>
        <el-input v-model="form.author"></el-input>
      </el-form-item>

      
      <el-form-item label="日期"  class='wd'>
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label='内容'>
          <div class='editor-wrapper'>
            <quill-editor ref="myTextEditor"
              v-model="form.content"
              :config="editorOption">
            </quill-editor>
          </div>
          <div>
            <el-button @click='submit'>提交</el-button>
          </div>
      </el-form-item>
      <el-form-item label="小图(提交后再添加)" class='wd'>
        <el-upload
          class="upload-avatar"
          drag
          :action="action"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      form:{
        title:'',
        date:'',
        author:'',
        content:'',
      },
      newsid:'',
      editorOption:{}
    }
  },
  computed:{
    action(){
      return "/api/newsavatar?_id=" + this.newsid
    }
  },
  methods:{
    submit(){
      axios.post('/api/savenews',{news:this.form})
      .then(res=>{
        if(res.data.result == 1){
          this.$message({
            message: 'success',
            type: 'success'
          });
          this.newsid = res.data._id
          console.log(this.newsid)
        }
      })
    }
  },
  created(){

  },
  components: {
    quillEditor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .newsadd{
    width: 100%;
    .text-title{
      line-height: 40px;
      height: 40px;
      color: #48576a;
      font-size: 30px;
      padding-bottom: 30px;
    }
    .wd{
        width: 300px;
    }
    .editor-wrapper{
      margin-top: 20px;
      margin-bottom: 100px;
      h2{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
      .quill-editor{
        height: 500px
      }
    }
  }
</style>
