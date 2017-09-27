<template>
  <section style="margin:50px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="人员编号">
            <el-input size="small" v-model="formInline.search.staffNumber " placeholder="人员编号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input size="small" v-model="formInline.search.staffName" placeholder="姓名"></el-input>
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
  const ERR_OK = "000";
  export default {
    data () {
      return {
        formInline: {
          search: {
            purchaseNumber: '',
            puchername: '',
            purchaseManagerName: '',
            address: [],
            place: ''
          }
        },
        tableData: [{
            staffNumber: '小王',
            staffName:'12',
            gender:'男',
            department:'0',
            job:'安装',
            idNumber:'456',
            address:'天津'
          }, {
            staffNumber: '小李',
            staffName:'12',
            gender:'男',
            department:'0',
            job:'安装',
            idNumber:'456',
            address:'天津'
          }, {
             staffNumber: '小猫',
            staffName:'12',
            gender:'男',
            department:'0',
            job:'安装',
            idNumber:'456',
            address:'天津'
          }, {
            staffNumber: '小张',
            staffName:'12',
            gender:'男',
            department:'0',
            job:'安装',
            idNumber:'456',
            address:'天津'
          }],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          purchaseNumber: '',
          purchaseManagerNumber: '',
          purchaseManagerName: '',
          name: '',
          power: '',
          price: '',
          count:''
        },
        currentPage: 4,
        table_index: 999,
      };
    },
    created () {
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
    },
    methods: {
      onSubmit () {
        this.$message('模拟数据，这个方法并不管用哦~');
      },
      handleDelete (index, row) {
        this.tableData.splice(index, 1);
        this.$message({
          message: "操作成功！",
          type: 'success'
        });
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index;
        console.log(`当前页: ${val}`);
        this.$ajax({
            method: 'post', //请求方式
            url: 'http://10.103.243.94:8011/purchaseLog/page', 
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
