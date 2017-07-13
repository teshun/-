<template>
  <div class="head">
		<div class="container">
			<div class="logo">
				<h1 class="head-h1">
						<router-link to="/index" class="logo-a"><span class="special">A</span>utocar</router-link>	
				</h1>
				<div class="nav-wrapper">
					<div class="search"><input v-model="searchcontent" class="search-input" placeholder="请输入内容" @keyup.enter="onEnter"></input></div>
					<ul class="nav" v-if="!isLoad">
						<li class="nav-item"><a href="javascript:;" @click='showSignup'>注册</a></li>
						<li class="nav-item"><a href="javascript:;" @click='showSignin'>登陆</a></li>
					</ul class="nav" v-if="!isLoad">
					<ul class="nav" v-if="isLoad">
						<li class="nav-item"><router-link :to='{name:"comment"}'>欢迎您，{{user.name == "admin" ?"管理员":user.name}} <img :src="user.avatar" alt=""></router-link></li>
						<li class="nav-item"><a href="javascript:;" @click='logout'>退出</a></li>
						<li class="nav-item" v-if='user.name =="admin"'><router-link to='/admin'>后台管理</router-link></li>
					</ul>
				</div>
			</div>
		</div>
		<transition name='fade'>
			<div class="modelWrapper" v-if='isShow' >
					<div class="model">
						<h1>{{modelTitle}}</h1>
						<el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm" v-if='modelTitle == "快速注册"'>
							<el-form-item label="用户名" prop="name">
						    <el-input v-model="formData.name" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="密码" prop="pass">
						    <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="确认密码" prop="checkPass">
						    <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="signup('formData')">注册</el-button>
						    <el-button @click="resetForm('formData')">取消</el-button>
						  </el-form-item>
						</el-form>
						<el-form  label-width="80px" :model="formData1" ref="formData1" v-else>
						  <el-form-item label="用户名" prop="name">
						    <el-input v-model="formData1.name"></el-input>
						  </el-form-item>
						  <el-form-item label="密码" prop="pass">
						    <el-input type="password" v-model="formData1.pass"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="signin('formData1')">登陆</el-button>
						    <el-button @click="resetForm('formData1')">取消</el-button>
						  </el-form-item>
						</el-form>
					</div>
			</div>
		</transition>
		
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
// axios.defaults.withCredentials = true
export default {
  data () {
  	var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
      	axios.post('/api/checkName',qs.stringify({name:this.formData.name}))
    			.then(function(res){
    					if(res.data.result == -1){
    							callback(new Error('用户名重复'));
    					}
    					callback();
    			})
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.formData.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      searchcontent:"",
      isShow:false,
      formData: {
        name: '',
        pass: '',
        checkPass: '',
      },
      formData1: {
        name: '',
        pass: '',
      },
      modelTitle:"",
      rules: {
      	name:[
      		{ validator: validateName, trigger: 'blur' }
      	],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
  	user:{
  		get(){
  			return {name:this.$root.$children[0].$data.username,avatar:this.$root.$children[0].$data.avatar}
  		},
  		set(newValue){
  			this.$root.$children[0].$data.username = newValue.name,
  			this.$root.$children[0].$data.avatar = newValue.avatar,
  			this.$root.$children[0].$data.role = newValue.role
  		}
  	},
  	isLoad(){
  		return Boolean(this.user.name);
  	}
  },
  created(){
  	
  },
  methods:{
  		onEnter(){
  			this.$router.push({name:"searchlist",params:{carname:this.searchcontent}})
        this.searchcontent = ""
  		},
    	showSignin(){
    		this.isShow=true;
    		this.modelTitle = "登陆";
    	},
    	showSignup(){
    		this.isShow=true;
    		this.modelTitle = "快速注册";
    	},
    	logout(){
    		axios.post('/api/logout')
    		.then((res) =>{
    			if(res.data.result == 1){
    				this.user= {
    					name:'',
    					avatar:'',
    					role:1
    				}
    				this.$router.push({name:'index'})
    			}
    		})
    	},
    	signup(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formData.name,this.formData.pass)
            axios.post('/api/signup',qs.stringify({
            	name:this.formData.name,
            	password:this.formData.pass,
            }))
    				.then((res) => {
    						if(res.data.result == 1){
    								this.$message({
    								showClose: true,
    								duration:2000,
      					    message: '恭喜你注册成功',
      					    type: 'success'
      					  });
    							setTimeout(() =>{
    								this.resetForm('formData');
    							},500)
    						}
    				}).catch(function(){
    					this.$message({
    								showClose: true,
    								duration:2000,
      					    message: '出错',
      					    type: 'error'
      					  });
    				})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      signin(){
      	axios.post("/api/signin",qs.stringify({
          	name:this.formData1.name,
          	password:this.formData1.pass,
          })).then((res) => {
      			if(res.data.status == -1){
      				this.$message({
    							showClose: true,
    							duration:2000,
      					  message: res.data.message,
      					  type: 'error'
      					});
      			}else if(res.data.status == -2){
      				this.$message({
    							showClose: true,
    							duration:2000,
      					  message: res.data.message,
      					  type: 'error'
      					});
      			}else{
      				this.$message({
    							showClose: true,
    							duration:2000,
      					  message: res.data.message,
      					  type: 'success'
      					});
      				this.user = {
      					name:res.data.userData.name,
      					avatar:res.data.userData.avatar,
      					role:res.data.userData.role
      				}
      				console.log(this.user)
      				setTimeout(() =>{
    							this.resetForm('formData1');
    						},500)
      			}
      	})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      	this.isShow = !this.isShow;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
	@import '../../assets/css/editor.css';
	.head{
		height: 80px;
		width:100%;
		background-color: rgb(32, 160, 255);
		line-height: 80px;
    .container{
    	max-width: 1190px;
    	height: 100%;
    	margin: 0 auto;
    	padding: 0 30px;
    	box-sizing: border-box;
    	width:100%;
			.head-h1{
				float: left;
				.logo-a{
					color: #fff;
    			display: block;
    			padding: 0 20px;
    			opacity: .8;
    			font-style: italic;
    			font-size: 30px;
					.special{
						font-size:40px;
					}
				}
				
			}
			.nav-wrapper{
				float: right;
				.search{
					float: left;
					.search-input{
    				font-size: 14px;
    				width: 100%;
    				-webkit-appearance: none;
    				-moz-appearance: none;
    				appearance: none;
    				background-color: #fff;
    				background-image: none;
    				border-radius: 4px;
    				border: 1px solid #bfcbd9;
    				box-sizing: border-box;
    				color: #1f2d3d;
    				display: inline-block;
    				height: 36px;
    				line-height: 1;
    				outline: 0;
    				padding: 3px 10px;
    				transition: border-color .2s cubic-bezier(.645,.045,.355,1);
					}
				}
				.nav{
				float: left;
				.nav-item{
					float: left;
					cursor: pointer;
    			margin-left: 20px;
    			a{
    				  color: #fff;
    					display: block;
    					padding: 0 20px;
    					opacity: .8;
    				}
    			img{
    				width:36px;
    				height:36px;
    				vertical-align: -12px;
    			}
					}	
				}
			}
    }
    .modelWrapper{
    	position: fixed;
    	width: 100%;
    	height: 100%;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	background-color: rgba(0,0,0,.7);
    	top: 0;
    	left: 0;
    	z-index: 50;
    	.model{
    		position: relative;
    		z-index: 60;
    		width: 30%;
    		/*height:200px;*/
    		padding: 30px 80px 20px 20px;
    		background-color: #fff;
    		transition: all 0.4s linear;
    		transform: translateY(0);
    		position: relative;
    		z-index: 10;
    		background-color: #fff;
    		border-radius: 4px;
    		h1{
					text-align: center;
					color: #48576a;
					line-height: 30px;
					margin-bottom: 20px;
    		}
    	}
    	&.fade-enter-active{
    		animation: fadeIn .5s;
    		.model{
    			animation: bounceInDown .5s;
    		}
    	}
    	&.fade-leave-active{
    		animation: fadeOut .5s;
    		.model{
    			animation: bounceOutUp .5s;
    		}
			}
    }
	}
</style>
