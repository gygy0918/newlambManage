<template>
  <section style="margin:50px">
    <el-row>
      <el-col :span="24">
        <h1>{{hello}}</h1>
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="人员编号">
            <el-input size="small" v-model="search.staffNumber " placeholder="人员编号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input size="small" v-model="search.staffName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input size="small" v-model="search.gender" placeholder="性别"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input size="small" v-model="search.department" placeholder="部门"></el-input>
          </el-form-item>
          <el-collapse v-model="activeNames" @change="handleChange" style="border: none;display: inline-block">
            <el-collapse-item title="更多查询条件" name="1">
              <el-form-item label="职位">
                <el-input size="small" v-model="search.job" placeholder="职位"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input size="small" v-model="search.phoneNumber" placeholder="电话"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码">
                <el-input size="small" v-model="search.idNumber" placeholder="身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="住址">
                <el-input size="small" v-model="search.address" placeholder="家庭住址"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <a href="javascript:;" id="download" style="float: right;color: #169bd5;font-size: 14px;padding-top: 7px" @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="staffNumber"
            label="人员编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="staffName"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            width="80">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            width="80">
          </el-table-column>
          <el-table-column
            prop="job"
            label="职位"
            width="80">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话"
            width="80">
          </el-table-column>
          <el-table-column
            prop="idNumber"
            label="身份证号"
            width="80">
          </el-table-column>          
          <el-table-column
            prop="address"
            label="家庭住址"
            width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改人员信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="人员编号">
          <el-input v-model="form.staffNumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.staffName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.gender"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.job"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag';
  import Vue from 'vue';
  const ERR_OK = "000";

  export default {
    data () {
      return {
          hello: '',
          search: {
            purchaseNumber: '',
            puchername: '',
            purchaseManagerName: '',
            address: [],
            place: ''
        },
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          staffNumber: '',
          staffName: '',
          gender: '',
          department: '',
          job: '',
          idNumber: '',
          address:'',
          phoneNumber:''
        },
        currentPage: 1,
        table_index: 999,
      };
    },
      apollo: {
          // Simple query that will update the 'hello' vue property
          hello: gql`{hello}`,
      },
    created () {
//     console.log('graphql',this.$apollo.provider.defaultClient);
//        console.log('graphqlq',this.$apollo.queries.hello)
//            this.$ajax({
//            method: 'get', //请求方式
//            url: 'http://10.103.243.94:8080/staff/page',
//            params:{
//            size:5,
//            page:this.currentPage
//            }
//            }).then(
//            (res) => {
//            this.tableData=[];
//           this.tableData =res.data.data.results;
//            console.log(this.tableData);
//            });
        this.$ajax({
            method: 'post', //请求方式
            url: 'http://10.103.243.94/8080/login',
            data:{username:'ddmin',password:'123456'}
        }).then(
            (res) => {
                console.log(test,res);
                this.$message({
                    message: "提交成功，请在控制台查看json!！",
                    type: 'success'
                });
                this.$router.push({ path: 'personInfo' })
            });
    },
    methods: {
//        updateProduct() {
//            this.$apollo.mutate({
//                mutation: UpdateProductQuery,
//                variables: {
//                    id: this.Product.id,
//                    title: this.Product.title,
//                    description: this.Product.description,
//                },
//            })
//        },
      onSubmit () {
        this.$message('模拟数据，这个方法并不管用哦~');
      },
      handleDelete (index, row) {
        this.tableData.splice(index, 1);
        console.log('ddddd',row.id)
        let id=row.id;
            this.$ajax({
            method: 'delete', //请求方式
            url: 'http://10.103.243.94:8080/staff/', 
            params:{
            id
            }
            }).then( 
            (res) => {
            console.log(res);
            }); 
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleEdit (index, row) {
      console.log('88888',row.id)
        this.dialogFormVisible = true;
        this.form.address=row.address;
        this.form.department=row.department;
        this.form.gender=row.gender;
        this.form.id=row.id;
        this.form.idNumber=row.idNumber;
        this.form.job=row.job;
        this.form.phoneNumber=row.phoneNumber;
        this.form.staffName=row.staffName;
        this.form.staffNumber=row.staffNumber;

        //this.form = Object.assign({}, row);
        console.log('0000',row)
        this.table_index = index;
        console.log(`当前页: ${val}`);
        this.$ajax({
            method: 'post', //请求方式
            url: 'http://10.103.243.94/8080/login',
            data:{username:'ddmin',password:'123456'}
            }).then( 
            (res) => {
            console.log(test,res);
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
            this.$router.push({ path: 'personInfo' }) 
            }); 
      },
      handleSave () {
      var data=this.form;
        this.$ajax({
            method: 'put', //请求方式
            url: 'http://10.103.243.94:8080/staff', 
            data:this.form
            }).then( 
            (res) => {
            console.log(res);
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
            this.$router.push({ path: 'personInfo' }) 
            }); 

        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
            this.form.date = date
          }
//          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: 'success'
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        }).catch(() => {

        });
      },
      download: function() {
        var obj = document.getElementById('download');
        var str = "姓名,出生日期,地址\n";
        for (var i = 0; i < this.tableData.length; i++) {
          var item = this.tableData[i];
          str += item.name + ',' + item.date + ',' + item.address;
          str += "\n";
        }
        str = encodeURIComponent(str);
        obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
        obj.download = "download.csv";
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.243.94:8080/staff/page', 
            params:{
            size:5,
            page:this.currentPage
            }
            }).then( 
            (res) => {
            this.tableData=[];
           this.tableData =res.data.data.results;
            console.log(this.tableData);
            }); 
      }
    }
  };
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
</style>
