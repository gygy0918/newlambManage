<template>
  <div class="components-container" >
    <div style="border:1px solid black;pandding:20px">
    	<el-form :inline="true" :model="formInline" class="demo-form-inline">

  <el-form-item label="供应商名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="合同编号">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="负责人">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="供应商类型">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所在城市">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所在城市">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    <el-button>清空</el-button>
  </el-form-item>
</el-form>


    </div>


    <div style="margin:20px">
    	<el-row >
		  <el-col :span="12" :offset="20"><div class="grid-content bg-purple">
			<el-button type="primary" :offset="6">+新建供应商</el-button>
		  </div></el-col>
		</el-row>


    	
    </div>
    		<div style="border:1px solid black;margin:20px">
				  	 <el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			     <el-table-column
			      prop="id"
			      label="序号"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="地址">
			    </el-table-column>
			     <el-table-column
			      fixed="right"
			      label="操作"
			      width="100">
			      <template scope="scope">
			        <el-button @click="handleClick" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>
			      </template>
			    </el-table-column>
			  </el-table>

  	</div>


  </div>

  
</template>


		<style>
		  .el-row {
		    margin-bottom: 20px;
		   }
		</style>

		<script>
				export default {
				 methods: {
				      handleClick() {
				        console.log(1);
				      },
				      onSubmit() {
				        console.log('submit!');
				      }
				 },

				    data() {
				      return {
				      input: '',
				        options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面'
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }],
				          tableData: [{
				          id:'1',
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          id:'2',
				          date: '2016-05-04',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1517 弄'
				        }, {
				          id:'3',
				          date: '2016-05-01',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1519 弄'
				        }, {
				          id:'4',
				          date: '2016-05-03',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1516 弄'
				        }],
				        form: {
				          name: '',
				          region: '',
				          date1: '',
				          date2: '',
				          delivery: false,
				          type: [],
				          resource: '',
				          desc: ''
				        },
				        value3: ''
				      }
				    }
				  }

		</script>
