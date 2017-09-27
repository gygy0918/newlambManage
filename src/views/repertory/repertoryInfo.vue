<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  style="width:80%;margin:0 auto">
          <el-form-item label="物品名称">
          <el-input size="small" v-model="formInline.search.name" placeholder="物品名称"></el-input>
          </el-form-item>
          <el-form-item label="录入人编号">
          <el-input size="small" v-model="formInline.search.kururennumber" placeholder="录入人编号"></el-input>           
          </el-form-item> 
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          <a href="javascript:;" id="download" style="float: right;color: #169bd5;font-size: 14px;padding-top: 7px" @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 80%;margin:0 auto">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="power"
            label="功率"
            width="100">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="100">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            width="100">
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
    <el-dialog title="修改个人信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="库存单号">
          <el-input v-model="form.kucunnumber"></el-input>
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
        <el-form-item label="数量">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="下发人员姓名">
          <el-input v-model="form.xiafaname"></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-select v-model="form.type" placeholder="请选择物品类别">
              <el-option label="电灯" value="diandeng"></el-option>
              <el-option label="开关" value="kaiguan"></el-option>
            </el-select>
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
            name: '',
            lururennumber: '',
            address: [],
            kucunnumber: ''
          }
        },
        tableData: [{
            kucunnumber: '123',
            name: '王小虎',
            power: '12w',
            price:'12元',
            number:'13',
            type:'电灯',
            xiafaname:'张三1'
          }, {
            kucunnumber: '123',
            name: '王小虎',
            power: '12w',
            price:'12元',
            number:'13',
            type:'电灯',
            xiafaname:'张三2'
          }, {
            kucunnumber: '123',
            name: '王小虎',
            power: '12w',
            price:'12元',
            number:'13',
            type:'开关',
            xiafaname:'张三3'
          }, {
            kucunnumber: '123',
            name: '王小虎',
            power: '12w',
            price:'12元',
            number:'13',
            type:'电灯',
            xiafaname:'张三4'
          }],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          name: '',
          power: '',
          price: '',
          number: '',
          type: '',
          xiafaname: '',
          kucunnamber: '',
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
