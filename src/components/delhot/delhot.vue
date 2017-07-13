<template>
  <div class="hotmanage">
    <h1 class="text-title">热门删除</h1>
    <el-col :span='22'>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <template scope="props">
              <img :src="props.row.picpath" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="carname"
            label="车型"
            width="150">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="200">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="简述"
            width="269">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template scope="scope">
              <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-col>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData:[]
    }
  },
  created(){
    axios.get("/api/getindexCarlist")
    .then(res =>{
      this.tableData = res.data.data.hot;
    })
  },
  methods:{
    deleteRow(i,v){
      let _id = v[i]._id
      axios.post("/api/delhot",{_id})
      .then(res => {
        if(res.data.result == 1){
          this.tableData.splice(i,1)
          this.$notify({
            title: '成功',
            message: '删除成功',
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
