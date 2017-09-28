<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="安装单号">
            <el-input size="small" v-model="formInline.search.installnumber" placeholder="安装单号"></el-input>
          </el-form-item>
          <el-form-item label="安装人姓名">
            <el-input size="small" v-model="formInline.search.installname" placeholder="安装人姓名"></el-input>
          </el-form-item>
          <el-form-item label="下发人姓名">
            <el-input size="small" v-model="formInline.search.xiafaname" placeholder="安装人姓名"></el-input>
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
    <el-dialog title="安装单详情" v-model="dialogFormVisible" size="small">
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
                label="物品名称"
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
        form: [],
        currentPage: 1,
        table_index: 999,
      };
    },
      created () {
        this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.154:8011/installinfo/page', 
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
        console.log('00000',row.id)
        let id=row.id;
       this.$ajax({
            method: 'get', //请求方式
            url: 'http://10.103.241.154:8011/installdetail/page', 
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