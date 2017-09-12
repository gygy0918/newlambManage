<template>
	<div class="components-container" >
		<div style="border:1px solid black;maggin:50px">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">

				<el-form-item label="供应商名称">
					<el-input v-model="formInline.merchantName"></el-input>
				</el-form-item>
				<el-form-item label="合同编号">
					<el-input v-model="formInline.id"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input v-model="formInline.name"></el-input>
				</el-form-item>
				<el-form-item label="供应商类型">
					<el-select v-model="formInline.merchantType" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所在城市">
					<el-select v-model="formInline.city" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-select v-model="form.area" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search()">搜索</el-button>
					<el-button  @click="resetForm()">清空</el-button>
				</el-form-item>
			</el-form>

		</div>


		<div style="margin:20px">
			<el-row >
				<el-col :span="12" :offset="20"><div class="grid-content bg-purple">
					<el-button type="primary" :offset="6"> <router-link :to="{name:'供应商维护',params:{id:0}}">+新建供应商</router-link></el-button>
				</div></el-col>
			</el-row>
		</div>
		<div style="border:1px solid black;margin:20px">
			<el-table
			:data="tableData"
			border
			style="width: 100%">
			<el-table-column
			prop="merchantId"
			label="序号"
			width="180">
		</el-table-column>
		<el-table-column
		prop="merchantName"
		label="供应商名称"
		width="180">
	</el-table-column>
	<el-table-column
	prop="merchantType"
	label="供应商类型"
	width="180">
</el-table-column>
<el-table-column
prop="address"
label="地址">
</el-table-column>
<el-table-column
prop="linkman"
label="联系人">
</el-table-column>
<el-table-column
prop="phone"
label="电话">
</el-table-column>
<el-table-column
label="操作"
width="100">
<template scope="scope">
	<el-button type="text" >
<router-link :to="{name:'供应商维护',params:{id:scope.row.merchantId}}">查看</router-link></el-button>

<router-link :to="{name:'供应商维护',params:{id:scope.row.merchantId}}">编辑</router-link></el-button>

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
		mounted() {
			var data = {
				pageSize: 10,
				pageNo: 1
			}
			this.$ajax({
			          method: 'post', //请求方式
			          url: '/api/bdtrip_manage/merchant/getMerchantList.htm',  //   '/api' + 接口后缀
			          params: data, //传递的参数
			      }).then( 
			      (res) => {
			      	let arr=res.data.data.list;
			      	for(let item of arr){
			      		const tableItem = {
			      			merchantId: item.merchantId,
			      			merchantName: item.merchantName,
			      			merchantType: item.merchantType,
			      			address: item.address,
			      			linkman: item.linkman,
			      			phone: item.phone
			      		}
			      		this.tableData.push(tableItem);
			      	}
			      });
			  },			
			  methods: {  
			  //表格查看功能	      
			  check(row) {
			  	console.log(row);
			  	this.dialogTableVisible = true;
			  	var data={
			  		merchantId:row.merchantId
			  	};    
			  	this.$ajax({
			          method: 'post', //请求方式
			          url: '/api/bdtrip_manage/merchant/getMerchantInfo.htm',  //   '/api' + 接口后缀
			          params: data, //传递的参数
			      }).then( 
			      (res) => {
			      	this.singleInfo=[];
			      	let arr=res.data.data;
			      	console.log(arr);
			      	const singleitem={
			      		merchantId:arr.merchantId,
			      		merchantName:arr.merchantName,
			      		merchantType:arr.merchantType,
			      		phone:arr.phone,
			      		linkman:arr.linkman,
			      		address:arr.address
			      	}
			      	this.singleInfo.push(singleitem); 			    
			      });               
			  },
			 //表单编辑功能
			 edit(row){
			 	this.dialogFormVisible = true;
			 	var data={
			 		merchantId:row.merchantId
			 	};    
			 	this.$ajax({
			          method: 'post', //请求方式
			          url: '/api/bdtrip_manage/merchant/getMerchantInfo.htm',  //   '/api' + 接口后缀
			          params: data, //传递的参数
			      }).then( 
			      (res) => {
			      	this.form=res.data.data;
			      });   
			  },
			 //表单编辑提交
			 submit(){
			 	var data = this.form;
			 	this.$ajax({
			 		method:'post',
			 		url: '/api/bdtrip_manage/merchant/saveMerchant.htm',  
			 		params:data
			 	}).then(
			 	(res)=>{
			 		console.log(res.data);	
			 	}
			 	);
			 },

				      //搜索功能
				      search() {
				      	var data = this.formInline;
				      	this.$ajax({
			          method: 'post', //请求方式
			          url: '/api/bdtrip_manage/merchant/getMerchantList.htm',  //   '/api' + 接口后缀
			          params: data, //传递的参数
			      }).then( 
			      (res) => {
			      	let arr=res.data.data.list;
			      	this.tableData=[];
			      	for(let item of arr){
			      		const tableItem = {
			      			merchantId: item.merchantId,
			      			merchantName: item.merchantName,
			      			merchantType: item.merchantType,
			      			address: item.address,
			      			linkman: item.linkman,
			      			phone: item.phone
			      		}
			      		this.tableData.push(tableItem);
			      	}

			      });
			  },
			  //提交功能
			  submit(){
			  	this.dialogFormVisible = false;
			  	var data={
			  		merchantId:this.form.merchantId,
			  		merchantType:this.form.merchantType,
			  		merchantName:this.form.merchantName,
			  		address:this.form.address,
			  		linkman:this.form.linkman,
			  		phone:this.form.phone};
			  		this.$ajax({
			      method: 'post', //请求方式
			      url: '/api/bdtrip_manage/merchant/saveMerchant.htm',  
			      params: data, //传递的参数
			  }).then( 
			  (res) => {
			  });
			},
				    //清空表单功能
				    resetForm() {
				    	for(var name in this.$data.form) {
				    		this.$data.form[name] = ""
				    	}
				    }
				},

				data() {
					return {
				  		//回显信息数组
				  		tableData: [],
				  		//查看信息对象
				  		singleInfo:[],
				  		dialogTableVisible: false,
				  		//搜索对象
				  		formInline: {
				  			merchantName:'',
				  			merchantType: '',
				  			city: '',
				  			area:''
				  		},
				  		//编辑表单对象
				  		form: {
				  			merchantId:'',
				  			merchantName:'',
				  			merchantType:'',
				  			city:'',
				  			area:'',
				  			linkman:'',
				  			phone:''
				  		},
				  		dialogFormVisible: false,
				  		formLabelWidth: '120px'
				  	}
				  }
				}

			</script>
