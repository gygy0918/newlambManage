<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="采购单号">
            <el-input size="small" v-model="formInline.search.installnumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="采购人姓名">
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
            label=生成时间"
            width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
    <el-dialog title="采购单详情" v-model="dialogFormVisible" size="small">
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
        </el-table>
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
            installnumber: '',
            installname: '',
            xiafaname: '',
            address: []
          }
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
        let id=row.purchaseNumber;
        console.log('idid',id)
       this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.243.94:8080/purchaseDetail/page', 
            params:{
            purchaseNumber:id,
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