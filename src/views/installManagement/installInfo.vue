<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="安装单号">
      <el-input size="small" v-model="search.id" placeholder="安装单号"></el-input>
          </el-form-item>
        <!--  <el-form-item label="安装人姓名">
            <el-input size="small" v-model="formInline.search.installname" placeholder="安装人姓名"></el-input>
          </el-form-item>
          -->
          <el-form-item label="决策人姓名">
            <el-input size="small" v-model="search.decisionMakerName" placeholder="决策人姓名"></el-input>
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
            prop="id"
            label="安装单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="decisionMakerNumber"
            label="决策人编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="decisionMakerName"
            label="决策人姓名"
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
              <el-button type="primary" size="mini" @click="handleLog(scope.$index, scope.row)">生成日志</el-button>
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
    <el-dialog title="安装单详情" v-model="dialogTableVisible" size="small">
        <el-table :data="form" border  style="width: 100%">
              <el-table-column
                prop="goodsName"
                label="物品名称"
                width="100">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                width="100">
              </el-table-column>
              <el-table-column
                prop="goodsNumber"
                label="物品编号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="location"
                label="位置">
              </el-table-column>
              <el-table-column
                prop="switchNumber"
                label="所属开关">
              </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
      <el-dialog title="修改信息"  v-model="dialogFormVisibleone" size="small">
          <el-form :model="formE" :rules="rules" ref="formE" label-width="100px" class="demo-ruleForm">
              <el-form-item label="物品名称" >
                  <el-input v-model="formE.goodsName" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="类型" >
                  <el-input v-model="formE.type" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="物品编号" >
                  <el-input v-model="formE.goodsNumber" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="位置" >
                  <el-input v-model="formE.location" ></el-input>
              </el-form-item>
              <el-form-item label="所属开关" >
                  <el-input v-model="formE.switchNumber"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitFormEdit('formE')">立即创建</el-button>
                  <el-button @click="resetForm('formE')">重置</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
      <el-dialog title="编辑" v-model="dialogFormVisible" size="small">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="安装单编号" prop="installNumber">
                  <el-input v-model="ruleForm.installNumber"></el-input>
              </el-form-item>
              <el-form-item label="安装人编号" prop="installerNumber">
                  <el-input v-model="ruleForm.installerNumber"></el-input>
              </el-form-item>
              <el-form-item label="安装人姓名" prop="installerName">
                  <el-input v-model="ruleForm.installerName"></el-input>
              </el-form-item>
              <el-form-item label="录入人编号" prop="inputNumber">
                  <el-input v-model="ruleForm.inputNumber"></el-input>
              </el-form-item>
              <el-form-item label="录入人姓名" prop="inputName">
                  <el-input v-model="ruleForm.inputName"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="other">
                  <el-input type="textarea" v-model="ruleForm.other"></el-input>
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
              id: '',
              decisionMakerName: ''
        },
          ruleForm: {
              installNumber: '',
              installerNumber: '',
              installerName:'',
              inputNumber: '',
              inputName: '',
              other: '',
          },
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
          dialogTableVisible: false,
          editLoading: false,
          dialogFormVisibleone:false,
        form: [],
          formE:{
              goodsName:'',
              goodsNumber:'',
              id:'',
              installNumber :'',
              location :'',
              switchNumber:'',
              type:''},
        currentPage: 1,
        table_index: 999,
          rules: {
              name: [
                  {required: true, message: '请输入物品名称', trigger: 'blur'},
                  {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
              ],
              type1: [
                  {required: true, message: '请选择待办物品类型', trigger: 'change'}
              ],
              date: [
                  {type: 'date', required: true, message: '请选择提醒时间', trigger: 'change'}
              ],
              other: [
                  {required: true, message: '请填写其他信息', trigger: 'blur'}
              ]
          }
      };
    },
      created () {
        this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.154:8080/installinfo/page',
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
          this.$ajax({
              method: 'get', //请求方式
              url: 'http://10.103.241.154:8080/installinfo/page',
              params:{
                  size:5,
                  page:this.currentPage,
                  id:this.search.id,
                  decisionMakerName:this.search.decisionMakerName
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
        console.log('00000',row.id)
        let id=row.id;
       this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.154:8080/installdetail/page',
            params:{
            installNumber:id,
            size:5,
            page:this.currentPage
            }
            }).then( 
            (res) => {
             console.log('=====',res)
            this.form=[];
           this.form =res.data.data.results;
            console.log('99999',this.form);
            }); 
      },
        handleLog (index, row) {
            this.dialogFormVisible = true;
            this.ruleForm.installNumber=row.id
        },
        handleEdit (index, row) {
console.log('编辑编辑',row)
            this.formE=row;
this.dialogFormVisibleone=true;
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
                        url: 'http://10.103.243.94:8080/purchaseLog',
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
                    this.$router.push({ path: 'installLog' })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitFormEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let para = Object.assign({}, this.formE);
                    var data=para;
                    console.log('*****s',data);
                    this.$ajax({
                        method: 'put', //请求方式
                        url: 'http://10.103.241.154:8080/installdetail',
                        data: data
                    }).then(
                        (res) => {
                            console.log('=====', res)

                        });
                    this.dialogFormVisibleone=false;
                } else {
                    return false;
                }
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