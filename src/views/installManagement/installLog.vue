<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="安装单号">
            <el-input size="small" v-model="search.installerNumber" placeholder="安装单号"></el-input>
          </el-form-item>
          <el-form-item label="安装人姓名">
            <el-input size="small" v-model="search.installerName" placeholder="安装人姓名"></el-input>
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
            prop="installNumber"
            label="安装单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="installerName"
            label="安装人姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="installerNumber"
            label="安装人编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="inputNumber"
            label="录入人编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="inputName"
            label="录入人姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="安装完成时间"
            width="120">
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
  </section>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = "000";
  export default {
    data () {
      return {
          search: {
              installerNumber: '',
              installerName: ''
        },
        tableData: [
       ],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          puchernumber: '',
          xiafaname: '',
          xiafanumber: '',
          name: '',
          power: '',
          price: '',
        },
        currentPage: 1,
        table_index: 999,
      };
    },
    created () {
            this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.154:8080/installlog/page', 
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
              url: 'http://10.103.241.154:8080/installlog/page',
              params: {
                  size: 5,
                  page: this.currentPage,
                  installNumber: this.search.installerNumber,
                  installerName: this.search.installerName
              }
          }).then(
              (res) => {
                  this.tableData = [];
                  this.tableData = res.data.data.results;
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
      handleEdit (index, row) {
        this.dialogFormVisible = true;
        console.log('00000',row)
        this.form = Object.assign({}, row);
        this.table_index = index;
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
            url: 'http://10.103.241.154:8080/installlog/page', 
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
