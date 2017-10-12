<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="维修单号">
            <el-input size="small" v-model="search.maintainNumber" placeholder="维修单号"></el-input>
          </el-form-item>
         <!-- <el-form-item label="维修人姓名">
            <el-input size="small" v-model="search.installname" placeholder="维修人姓名"></el-input>
          </el-form-item>
          -->
          <el-form-item label="监控人姓名">
            <el-input size="small" v-model="search.monitorName" placeholder="监控人姓名"></el-input>
          </el-form-item> 
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
            prop="maintainNumber"
            label="维修单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="monitorNumber"
            label="监控人员编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="monitorName"
            label="监控人员姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="生成时间"
            width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)"> 生成日志</el-button>
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
    <el-dialog title="维修单详情" v-model="dialogTableVisible" size="small">
        <el-table :data="form" border  style="width: 100%">
              <el-table-column
                prop="lightName"
                label="物品名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="location"
                label="位置">
              </el-table-column>
              <el-table-column
                prop="switchNumber"
                label="所属开关">
              </el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog title="维修单详情" v-model="dialogFormVisible" size="small">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="维修单编号" prop="maintainNumber">
          <el-input v-model="ruleForm.maintainNumber"></el-input>
        </el-form-item>
        <el-form-item label="维修人编号" prop="maintainerNumber">
          <el-input v-model="ruleForm.maintainerNumber"></el-input>
        </el-form-item>
        <el-form-item label="维修人姓名" prop="maintainerName">
          <el-input v-model="ruleForm.maintainerName"></el-input>
        </el-form-item>
        <el-form-item label="录入人编号" prop="inputNumber">
          <el-input v-model="ruleForm.inputNumber"></el-input>
        </el-form-item>
        <el-form-item label="录入人姓名" prop="inputName">
          <el-input v-model="ruleForm.inputName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="维修单详情" v-model="dialogTableVisible" size="small">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="维修单编号" prop="maintainNumber">
          <el-input v-model="ruleForm.maintainNumber"></el-input>
        </el-form-item>
        <el-form-item label="维修人编号" prop="maintainerNumber">
          <el-input v-model="ruleForm.maintainerNumber"></el-input>
        </el-form-item>
        <el-form-item label="维修人姓名" prop="maintainerName">
          <el-input v-model="ruleForm.maintainerName"></el-input>
        </el-form-item>
        <el-form-item label="录入人编号" prop="inputNumber">
          <el-input v-model="ruleForm.inputNumber"></el-input>
        </el-form-item>
        <el-form-item label="录入人姓名" prop="inputName">
          <el-input v-model="ruleForm.inputName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = "000";
  export default {
    data () {
      return {
          search: {
              maintainNumber: '',
              monitorName: ''
        },
          ruleForm: {
              maintainNumber: '',
              maintainerNumber:'',
              maintainerName:'',
              inputName: '',
              inputNumber:'',
              maintainerName:'',
              remarks: '',
          },
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form:[],
        currentPage: 1,
        table_index: 999,
      };
    },
      created () {
        this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.110:8080/maintainOrder/page',
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
      },
    methods: {
      onSubmit () {
       // this.$message('模拟数据，这个方法并不管用哦~');
          this.$ajax({
              method: 'get', //请求方式
              url: 'http://10.103.241.110:8080/maintainOrder/page',
              params:{
                  size:5,
                  page:this.currentPage,
                  maintainNumber:this.search.maintainNumber,
                  monitorName:this.search.monitorName
              }
          }).then(
              (res) => {
                  this.tableData=[];
                  this.tableData =res.data.data.results;
                  console.log(this.tableData);
              });
      },
      handleDelete (index, row) {
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleDetail (index, row) {
        this.dialogTableVisible = true;
        console.log('00000',row.maintainNumber)
        let id=row.maintainNumber;
        this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.110:8080/maintainInfo/detail',
            params:{
                id:id
            }
            }).then( 
            (res) => {
            this.form=[];
           this.form =res.data.data;
            console.log('99999',this.form);
            }); 
      },
        handleEdit (index, row) {
            this.dialogFormVisible= true;
            console.log('00000',row.maintainNumber)
            this.ruleForm.maintainNumber=row.maintainNumber
        },
      handleSave () {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let para = Object.assign({}, this.ruleForm);
                    var data=para;
                    console.log('*****s',data);
                    this.$ajax({
                        method: 'post', //请求方式
                        url: 'http://10.103.241.110:8080/maintainInput/save',
                        data:data
                    }).then(
                        (res) => {
                            this.tableData=[];
                            this.tableData =data;
                            console.log(this.tableData);
                        });
                    this.$message({
                        message: "提交成功，请在控制台查看json!！",
                        type: 'success'
                    });
                    this.$router.push({ path: 'repairLogInfo' })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
       // console.log(`当前页: ${val}`);
        console.log(this.currentPage);
         this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.243.94:8011/purchaseLog/page', 
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