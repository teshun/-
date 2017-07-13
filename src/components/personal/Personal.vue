<template>
  <div class="personal">
    <div class="container">
     	<el-row :gutter="100">
  			<el-col :span='5' class='avatarWrapper' :offset='2'>
  				<img :src="user.avatar" alt="" class="avatar">
  				<router-link :to='{name:"comment"}'><el-button>我的评论</el-button></router-link>
  			</el-col>
  			<el-col :span='10' class='proform'>
  				<h2>profile</h2>
  				<el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  					<el-form-item label="修改头像" class='changeAvatar'>
  						<el-upload
							  class="avatar-uploader"
							  action="/api/uploadavatar"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
  					</el-form-item>
					  <el-form-item label="修改密码" prop="pass">
					    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="确认密码" prop="checkPass">
					    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					    <el-button @click="resetForm('ruleForm')">重置</el-button>
					  </el-form-item>
					</el-form>
  			</el-col>
  		</el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
  	var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
    	ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
  	submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/uploadpassword',{password:this.ruleForm.pass})
          .then(res=>{
          	if(res.data.result == 1){
          		this.$message({
    						showClose: true,
    						duration:2000,
      				  message: '恭喜你修改成功',
      				  type: 'success'
      				});
          	}
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file){
      this.$root.$children[0].$data.avatar = res.avatar
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  computed:{
  	user:{
  		get(){
  			return {name:this.$root.$children[0].$data.username,avatar:this.$root.$children[0].$data.avatar}
  		}
  	},
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
        if(vm.$root.$children[0].$data.role < 10){
          vm.$router.push({path:'/index'})
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .personal{
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
  		.proform{
  			h2{
  				height: 40px;
          line-height: 40px;
          font-size: 20px;
          padding-bottom: 20px;
  			}
  			.changeAvatar{
  				.avatar-uploader .el-upload {
  				  border: 1px dashed #d9d9d9;
  				  border-radius: 6px;
  				  cursor: pointer;
  				  position: relative;
  				  overflow: hidden;
  				}
  				.avatar-uploader .el-upload:hover {
  				  border-color: #20a0ff;
  				}
  				.avatar-uploader-icon {
  				  font-size: 28px;
  				  color: #8c939d;
  				  width: 178px;
  				  height: 178px;
  				  line-height: 178px;
  				  text-align: center;
  				}
  				.avatar {
  				  width: 178px;
  				  height: 178px;
  				  display: block;
  				}
  			}
  		}
    }
  }
</style>
