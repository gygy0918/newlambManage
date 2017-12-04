<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline"  style="width:100%;margin:0 auto">
          <el-form-item label="物品名称">
          <el-input size="small" v-model="search.name" placeholder="物品名称"></el-input>
          </el-form-item>
          <el-form-item label="功率">
          <el-input size="small" v-model="search.power" placeholder="功率"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input size="small" v-model="search.price" placeholder="单价"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-input size="small" v-model="search.type" placeholder="类别"></el-input>
          </el-form-item>
          <el-collapse v-model="activeNames" @change="handleChange" style="border: none;display: inline-block">
            <el-collapse-item title="更多查询条件" name="1">
              <el-form-item label="数量">
                <el-input size="small" v-model="search.countDetail" placeholder="数量"></el-input>
              </el-form-item>
              <el-form-item label="生成时间">
                <el-input size="small" v-model="search.createTime" placeholder="生成时间"></el-input>
              </el-form-item>
              <el-form-item label="位置">
                <el-input size="small" v-model="search.location" placeholder="位置"></el-input>
              </el-form-item>
              <el-form-item label="仓库名称">
                <el-input size="small" v-model="search.type" placeholder="仓库名称"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          <a href="javascript:;" id="download" style="float: right;color: #169bd5;font-size: 14px;padding-top: 7px" @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin:0 auto">
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
            prop="countDetail"
            label="数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类别"
            width="100">
          </el-table-column>
          <el-table-column
                  prop="location"
                  label="位置"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="type"
                  label="仓库名称"
                  width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="outrepertory(scope.$index, scope.row)">出库</el-button>
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
    <el-dialog title="出库信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px"  :rules="rules" >
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" style="display: none">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="出库数量" prop="countDetail">
          <el-input  v-model.number="form.countDetail"></el-input>
        </el-form-item>
        <el-form-item label="经办人姓名">
          <el-input v-model="form.operator"></el-input>
        </el-form-item>
        <el-form-item label="经办人编号">
          <el-input v-model="form.operatorNumber"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      <!--  <el-form-item label="类别">
            <el-select v-model="form.type" placeholder="请选择物品类别">
              <el-option label="电灯" value="diandeng"></el-option>
              <el-option label="开关" value="kaiguan"></el-option>
            </el-select>
        </el-form-item>
        -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :loading="editLoading">确定</el-button>
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
        var checkAge = (rule, value, callback) => {
            console.log('value',value)
            console.log('counyt',this.count)
            let count=this.count;
            if (!value) {
                return callback(new Error('数量不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数量'));
                } else {
                    if (value > count) {
                        callback(new Error('请输入数量'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
      return {
          search: {
            name: '',
            power: '',
            price: [],
            type: '',
            countDetail:'',
            location:''
        },
          count:'',
          rules: {
              countDetail: [
                  { validator: checkAge, trigger: 'blur' }
              ] },
        tableData: [],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          name: '',
          id: '',
          countDetail: '',
          operator: '',
          operatorNumber: '',
            remark:''
        },
        currentPage: 1,
        table_index: 999,
      };
    },
      created () {
          this.$ajax({
              method: 'get', //请求方式
              url: 'http://10.103.243.94:8080/warehouse/page',
              params:{
                  size:5,
                  page:this.currentPage
              }
          }).then(
              (res) => {
                  this.tableData=[];
                  this.tableData =res.data.data.results;
                  console.log(this.tableData,'99999999');
              });
      },
    methods: {
        onSubmit () {
            //this.$message('模拟数据，这个方法并不管用哦~');
            this.$ajax({
                method: 'post', //请求方式
                url: 'http://10.103.243.94:8080/commodity/page',
                params:{
                    size:5,
                    page:this.currentPage,
                    name:this.search.name,
                    power:this.search.power,
                    price:this.search.price,
                    type:this.search.type
                }
            }).then(
                (res) => {
                    console.log('=====',res)
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
       outrepertory(index, row){
           this.dialogFormVisible = true;
           this.count=row.countDetail;
           let clear={
               id:row.id,
               code:row.code,
               location:row.location,
               name:row.name,
               type:row.type,
               price:row.price
           }
          this.form=clear;
           console.log(clear,'00000')
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('inform',this.form)
                    delete this.form.creatTime;
                    let para = Object.assign({}, this.form);
                    //para.arr=this.activities;
                    //console.log('00000',this.activities)
                    console.log(para,"======");
                    this.$ajax({
                        method: 'delete', //请求方式
                        url: 'http://10.103.243.94:8080/warehouse',
                        data:para
                    }).then(
                        (res) => {
                            console.log(res);
                        });
                    this.$message({
                        message: "提交成功，请在控制台查看json!！",
                        type: 'success'
                    });
                    // this.$router.push({ path:'repertoryInfo' })
                    this.dialogFormVisible=false;
                    window.location.reload();
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
                url: 'http://10.103.243.94:8080/commodity/pagee',
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
