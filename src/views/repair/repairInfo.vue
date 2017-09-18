<template>
  <section style="margin:50px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="维修单号">
            <el-input size="small" v-model="formInline.search.puchernumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="监控人姓名">
            <el-input size="small" v-model="formInline.search.puchername" placeholder="采购人姓名"></el-input>
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
            prop="puchernumber"
            label="维修单号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="监控人姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="power"
            label="人编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="price"
            label="安装人编号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="number"
            label="安装人姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="number"
            label="安装完成时间"
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
    <el-dialog title="修改采购单信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="采购单号">
          <el-input v-model="form.puchernumber"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="功率">
          <el-input v-model="form.power"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="下单人员编号">
          <el-input v-model="form.xiafanumber"></el-input>
        </el-form-item>
        <el-form-item label="下单人员姓名">
          <el-input v-model="form.xiafaname"></el-input>
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
            puchernumber: '',
            puchername: '',
            xiafaname: '',
            address: [],
            place: ''
          }
        },
        tableData: [{
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄',
            power:'12',
            price:'13',
            puchernumber:'123',
            xiafanumber:'456',
            xiafaname:'张三'
          }, {
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄',
            power:'12',
            price:'13',
            puchernumber:'123',
            xiafanumber:'456',
            xiafaname:'张三'
          }, {
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄',
            power:'12',
            price:'13',
            puchernumber:'123',
            xiafanumber:'456',
            xiafaname:'张三'
          }, {
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄',
            power:'12',
            price:'13',
            xiafanumber:'456',
            puchernumber:'123',
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
      this.$http.get('/api/getTable').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.tableData = response.datas;
        }
      });
      this.$http.get('/api/getOptions').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.options = response.datas;
          this.places = response.places;
        }
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
