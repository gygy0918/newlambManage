<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="维修单号">
            <el-input size="small" v-model="formInline.search.installnumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="维修人姓名">
            <el-input size="small" v-model="formInline.search.installname" placeholder="采购人姓名"></el-input>
          </el-form-item>
          <el-form-item label="下发人姓名">
            <el-input size="small" v-model="formInline.search.xiafaname" placeholder="采购人姓名"></el-input>
          </el-form-item> 
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <a href="javascript:;" id="download" style="float: right;color: #169bd5;font-size: 14px;padding-top: 7px" @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 80%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="maintainNumber"
            label="维修单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="maintainerName"
            label="维修人姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="maintainerNumber"
            label="维修人编号"
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
            prop="date"
            label="维修完成时间"
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
        formInline: {
          search: {
            puchernumber: '',
            puchername: '',
            xiafaname: '',
            address: [],
            place: ''
          }
        },
        tableData: [{
            installnumber:'09876',
            jiankongname: '王小虎1',
            jiankongnumber:'123',
            location: '上海市普陀区金沙江路 1518 弄',
            diandengnumber:'123',
            date:'1992-09-18',
            xiafaname:'张三'
          }, {
            installnumber:'98765',
            jiankongname: '王小虎1',
            jiankongnumber:'123',
            location: '上海市普陀区金沙江路 1518 弄',
            diandengnumber:'123',
            date:'1992-09-18',
            xiafaname:'张三'
          }, {
            installnumber:'98765',
            jiankongname: '王小虎1',
            jiankongnumber:'123',
            location: '上海市普陀区金沙江路 1518 弄',
            diandengnumber:'123',
            date:'1992-09-18',
            xiafaname:'张三'
          }, {
            installnumber:'98765',
            jiankongname: '王小虎1',
            jiankongnumber:'123',
            location: '上海市普陀区金沙江路 1518 弄',
            diandengnumber:'123',
            date:'1992-09-18',
            xiafaname:'张三'
          }],
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
