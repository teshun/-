<template>
	<div class="searchlist">
		<div class="container">
			<el-row>
				<el-col :span='13' :offset='4'>
					<div class="item" v-for='car in cars' v-if='cars.length'>
						<div class="avatar">
							<img :src="car.avatar" alt="">
						</div>
						<div class="body clearfix">
							<p class="name">{{car.name}}</p>
							<p class="price">{{car.price.refs.down}}万---{{car.price.refs.down}}万</p>
							<router-link :to='{name:"cardetail",params:{id:car.name}}'><el-button class='btn'>点击查看更多</el-button></router-link>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
	export default{
		data(){
			return{
				cars:[]
			}
		},
		computed:{
			carname(){ return this.$route.params.carname}
		},
		created(){
			axios.get("/api/getsearch?carname="+this.carname)
			.then(res =>{
				this.cars = res.data.result
			})
		}
	}
</script>
<style lang='less'>
	.searchlist{
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
      .item{
      	width: 100%;
      	display: flex;
      	.avatar{
      		flex: 0 0 200px;
      		height: 133px;
      		overflow: hidden;
      		img{
      			width: 100%;
      		}
      	}
      }
      .body{
      	padding-left: 20px;
				flex: 1;
      	.name{
      		font-size: 20px;
      	}
      	.price{
      		line-height: 50px;
      		font-size: 14px;
      	}
      	.btn{
      		margin-top: 26px;
      		float: right;
      	}
      }
    }
	}
</style>