<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="采购单号">
            <el-input size="small" v-model="search.purchaseNumber" placeholder="采购单号"></el-input>
          </el-form-item>
     <!--     <el-form-item label="采购人姓名">
            <el-input size="small" v-model="search.installname" placeholder="采购人姓名"></el-input>
          </el-form-item>
          -->
          <el-form-item label="下发人姓名">
            <el-input size="small" v-model="search.purchaseManagerName" placeholder="采购人姓名"></el-input>
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
            prop="purchaseNumber"
            label="采购单号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="totalCount"
            label="数量"
            width="80">
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="总价"
            width="80">
          </el-table-column>
          <el-table-column
            prop="purchaseManagerNumber"
            label="下发人员编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="purchaseManagerName"
            label="下发人员姓名"
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
                <el-button type="primary" size="mini" @click="handleLog(scope.$index, scope.row)">日志生成</el-button>
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
    <el-dialog title="采购单详情" v-model="dialogTableVisible" size="small">
        <el-table :data="form" border  style="width: 100%">
              <el-table-column
                prop="name"
                label="物品名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="countDetail"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="power"
                label="功率">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类别">
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
                  <el-input v-model="formE.name"></el-input>
              </el-form-item>
              <el-form-item label="数量" >
                  <el-input v-model="formE.countDetail"></el-input>
              </el-form-item>
              <el-form-item label="单价" >
                  <el-input v-model="formE.price"></el-input>
              </el-form-item>
              <el-form-item label="功率" >
                  <el-input v-model="formE.power"></el-input>
              </el-form-item>
              <el-form-item label="类别" >
                  <el-input v-model="formE.type"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitFormEdit('formE')">立即创建</el-button>
                  <el-button @click="resetForm('formE')">重置</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
      <el-dialog title="录入日志信息" v-model="dialogFormVisible" size="small">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="采购单编号" prop="purchaseNumber">
                  <el-input v-model="ruleForm.purchaseNumber"></el-input>
              </el-form-item>
              <el-form-item label="采购人编号" prop="buyerNumber">
                  <el-input v-model="ruleForm.buyerNumber"></el-input>
              </el-form-item>
              <el-form-item label="采购人姓名" prop="buyerName">
                  <el-input v-model="ruleForm.buyerName"></el-input>
              </el-form-item>
              <el-form-item label="录入人编号" prop="recorderNumber">
                  <el-input v-model="ruleForm.recorderNumber"></el-input>
              </el-form-item>
              <el-form-item label="录入人姓名" prop="recorderName">
                  <el-input v-model="ruleForm.recorderName"></el-input>
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
            installnumber: '',
            installname: '',
            xiafaname: '',
            address: []
          },
          ruleForm: {
              purchaseNumber: '',
              recorderNumber: '',
              recorderName:'',
              buyerNumber: '',
              buyerName: '',
              other: ''
          },
        tableData: [],
        options: [],
        places: [],
       dialogTableVisible:false,
        dialogFormVisible: false,
        editLoading: false,
        dialogFormVisibleone:false,
        formE:{
            name:'',
            countDetail:'',
            price:'',
            power:'',
            type:''

        },
          form:[],
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
            url: 'http://10.103.243.94:8080/purchaseInfo/page', 
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
        onSubmit() {
            //this.$message('模拟数据，这个方法并不管用哦~');
            this.$ajax({
                method: 'post', //请求方式
                url: 'http://10.103.243.94:8080/purchaseInfo/page',
                params: {
                    size: 5,
                    page: this.currentPage,
                    purchaseManagerName: this.search.purchaseManagerName,
                    purchaseNumber: this.search.purchaseNumber
                }
            }).then(
                (res) => {
                    console.log('=====', res)
                    this.tableData = [];
                    this.tableData = res.data.data.results;
                    console.log(this.tableData);
                });
        },
        handleDelete(index, row) {
            this.tableData.splice(index, 1);
            this.$message({
                message: "操作成功！",
                type: 'success'
            });
        },
        handleDetail(index, row) {
            this.dialogTableVisible = true;
            console.log('00000xaingq', row)
            let id = row.purchaseNumber;
            console.log('idid', id)
            this.$ajax({
                method: 'get', //请求方式
                url: 'http://10.103.243.94:8080/purchaseDetail/page',
                params: {
                    purchaseNumber: id,
                    size: 5,
                    page: this.currentPage
                }
            }).then(
                (res) => {
                    console.log('=====', res)
                    this.form = [];
                    this.form = res.data.data.results;
                    console.log('99999', this.form);
                });
        },
        handleEdit(index, row){
            console.log('888编辑',row)
            this.dialogFormVisibleone=true;
//            let id = row.id;
//            console.log('row888编辑', row)

           this.formE=row;

    },
        logInput(index,row){
          let id=this.row.id;

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
        handleLog(index, row){
            this.dialogFormVisible = true
            console.log(row.purchaseNumber,'99999')
            this.ruleForm.purchaseNumber=row.purchaseNumber
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
                    this.$router.push({ path: 'supplierLogInfo' })
                } else {
                    return false;
                }
            });
        },
        submitFormEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let para = Object.assign({}, this.formE);
                    var data=para;
                    console.log('*****s',data);
                    this.$ajax({
                        method: 'put', //请求方式
                        url: 'http://10.103.243.94:8080/purchaseInfo',
                        data: data
                    }).then(
                        (res) => {
                           console.log('保存成功')

                        });
                    this.dialogFormVisibleone=false;
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
            url: 'http://10.103.243.94:8080/purchaseLog/page', 
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