<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="采购单号">
            <el-input size="small" v-model="search.purchaseNumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="采购人姓名">
            <el-input size="small" v-model="search.buyerName" placeholder="采购人姓名"></el-input>
          </el-form-item>
          <!--  <el-form-item label="下发人姓名">
              <el-input size="small" v-model="search.xiafaname" placeholder="采购人姓名"></el-input>
            </el-form-item>
            -->
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
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="buyerName"
                  label="采购人姓名"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="buyerNumber"
                  label="采购人编号"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="recorderNumber"
                  label="录入人编号"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="recorderName"
                  label="录入人姓名"
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="createTime"
                  label="采购完成时间"
                  width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">入库</el-button>
            </template>
          </el-table-column>
        </el-table>
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
                <el-button type="primary" size="mini" @click="handleIn(scope.$index, scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog title="入库信息" v-model="dialogFormVisible" size="tiny">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="仓库名称">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库编号">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经办人姓名">
              <el-input v-model="form.jingbanrem"></el-input>
            </el-form-item>
            <el-form-item label="经办人编号">
              <el-input v-model="form.xiafanumber"></el-input>
            </el-form-item>
            <!--  <el-form-item label="类别">
                  <el-select v-model="form.type" placeholder="请选择物品类别">
                    <el-option label="电灯" value="diandeng"></el-option>
                    <el-option label="开关" value="kaiguan"></el-option>
                  </el-select>
              </el-form-item>
              -->
            <el-form-item>
              <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
                    purchaseNumber: '',
                    buyerName: ''
                },
                tableData: [],
                options: [],
                places: [],
                dialogFormVisible: false,
                editLoading: false,
                dialogTableVisible:false,
                forme: {
                    name:'',
                    countDetail:'',
                    price:'',
                    power:'',
                    type:''
                },
                form:[],
                currentPage: 1,
                table_index: 999,
            };
        },
        created () {
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
        },
        methods: {
            onSubmit () {
                //this.$message('模拟数据，这个方法并不管用哦~');
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseLog/page',
                    params:{
                        size:5,
                        page:this.currentPage,
                        purchaseNumber:this.search.purchaseNumber,
                        buyerName:this.search.buyerName
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
            handleEdit (index, row) {
                this.dialogFormVisible = true;
                console.log('00000',row)
                this.form = Object.assign({}, row);
                this.table_index = index;
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
            handleIn(index, row){
                this.dialogFormVisible = true;
                console.log('入库',row)
                let id=row.id;
                //请求入库接口
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseDetail/page',
                    params: {
                        purchaseNumber: id,
                        size: 5,
                        page: this.currentPage
                    }
                }).then((res)=>{

                })

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
<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="采购单号">
            <el-input size="small" v-model="search.purchaseNumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="采购人姓名">
            <el-input size="small" v-model="search.buyerName" placeholder="采购人姓名"></el-input>
          </el-form-item>
          <!--  <el-form-item label="下发人姓名">
              <el-input size="small" v-model="search.xiafaname" placeholder="采购人姓名"></el-input>
            </el-form-item>
            -->
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
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="buyerName"
                  label="采购人姓名"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="buyerNumber"
                  label="采购人编号"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="recorderNumber"
                  label="录入人编号"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="recorderName"
                  label="录入人姓名"
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="createTime"
                  label="采购完成时间"
                  width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">入库</el-button>
            </template>
          </el-table-column>
        </el-table>
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
                <el-button type="primary" size="mini" @click="handleIn(scope.$index, scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog title="入库信息" v-model="dialogFormVisible" size="tiny">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="仓库名称">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库编号">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经办人姓名">
              <el-input v-model="form.jingbanrem"></el-input>
            </el-form-item>
            <el-form-item label="经办人编号">
              <el-input v-model="form.xiafanumber"></el-input>
            </el-form-item>
            <!--  <el-form-item label="类别">
                  <el-select v-model="form.type" placeholder="请选择物品类别">
                    <el-option label="电灯" value="diandeng"></el-option>
                    <el-option label="开关" value="kaiguan"></el-option>
                  </el-select>
              </el-form-item>
              -->
            <el-form-item>
              <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
                    purchaseNumber: '',
                    buyerName: ''
                },
                tableData: [],
                options: [],
                places: [],
                dialogFormVisible: false,
                editLoading: false,
                dialogTableVisible:false,
                forme: {
                    name:'',
                    countDetail:'',
                    price:'',
                    power:'',
                    type:''
                },
                form:[],
                currentPage: 1,
                table_index: 999,
            };
        },
        created () {
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
        },
        methods: {
            onSubmit () {
                //this.$message('模拟数据，这个方法并不管用哦~');
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseLog/page',
                    params:{
                        size:5,
                        page:this.currentPage,
                        purchaseNumber:this.search.purchaseNumber,
                        buyerName:this.search.buyerName
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
            handleEdit (index, row) {
                this.dialogFormVisible = true;
                console.log('00000',row)
                this.form = Object.assign({}, row);
                this.table_index = index;
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
            handleIn(index, row){
                this.dialogFormVisible = true;
                console.log('入库',row)
                let id=row.id;
                //请求入库接口
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseDetail/page',
                    params: {
                        purchaseNumber: id,
                        size: 5,
                        page: this.currentPage
                    }
                }).then((res)=>{

                })

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
<template>
  <section style="margin:30px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="采购单号">
            <el-input size="small" v-model="search.purchaseNumber" placeholder="采购单号"></el-input>
          </el-form-item>
          <el-form-item label="采购人姓名">
            <el-input size="small" v-model="search.buyerName" placeholder="采购人姓名"></el-input>
          </el-form-item>
          <!--  <el-form-item label="下发人姓名">
              <el-input size="small" v-model="search.xiafaname" placeholder="采购人姓名"></el-input>
            </el-form-item>
            -->
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
                  prop="name"
                  label="物品名称"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="operator"
                  label="经办人姓名"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="operatorNumber"
                  label="经办人编号"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="codeName"
                  label="仓库名称"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="location"
                  label="具体位置"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="createTime"
                  label="操作时间"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="totalPrice"
                  label="总价"
                  width="80">
          </el-table-column>
          <el-table-column
                  prop="countDetail"
                  label="操作数量"
                  width="80">
          </el-table-column>
          <el-table-column
                  prop="remark"
                  label="备注"
                  width="80">
          </el-table-column>
          <el-table-column
                  prop="typeName"
                  label="类型"
                  width="80">
          </el-table-column>

          <!-- <el-table-column label="操作">
             <template scope="scope">
               <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">入库</el-button>
             </template>
           </el-table-column>
           -->
        </el-table>
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
                <el-button type="primary" size="mini" @click="handleIn(scope.$index, scope.row)">入库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog title="入库信息" v-model="dialogFormVisible" size="tiny">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="仓库名称">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库编号">
              <el-select v-model="form.type" placeholder="请选择物品类别">
                <el-option label="电灯" value="diandeng"></el-option>
                <el-option label="开关" value="kaiguan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经办人姓名">
              <el-input v-model="form.jingbanrem"></el-input>
            </el-form-item>
            <el-form-item label="经办人编号">
              <el-input v-model="form.xiafanumber"></el-input>
            </el-form-item>
            <!--  <el-form-item label="类别">
                  <el-select v-model="form.type" placeholder="请选择物品类别">
                    <el-option label="电灯" value="diandeng"></el-option>
                    <el-option label="开关" value="kaiguan"></el-option>
                  </el-select>
              </el-form-item>
              -->
            <el-form-item>
              <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
                    purchaseNumber: '',
                    buyerName: ''
                },
                tableData: [],
                options: [],
                places: [],
                dialogFormVisible: false,
                editLoading: false,
                dialogTableVisible:false,
                forme: {
                    name:'',
                    countDetail:'',
                    price:'',
                    power:'',
                    type:''
                },
                form:[],
                currentPage: 1,
                table_index: 999,
            };
        },
        created () {
            this.$ajax({
                method: 'get', //请求方式
                url: 'http://10.103.243.94:8080/warehouseLog/page',
                params:{
                    size:8,
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
                //this.$message('模拟数据，这个方法并不管用哦~');
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseLog/page',
                    params:{
                        size:8,
                        page:this.currentPage,
                        purchaseNumber:this.search.purchaseNumber,
                        buyerName:this.search.buyerName
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
            handleEdit (index, row) {
                this.dialogFormVisible = true;
                console.log('00000',row)
                this.form = Object.assign({}, row);
                this.table_index = index;
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
                        size: 8,
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
            handleIn(index, row){
                this.dialogFormVisible = true;
                console.log('入库',row)
                let id=row.id;
                //请求入库接口
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/purchaseDetail/page',
                    params: {
                        purchaseNumber: id,
                        size: 8,
                        page: this.currentPage
                    }
                }).then((res)=>{

                })

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
                        size: 8,
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
                    url: 'http://10.103.243.94:8080/warehouseLog/page',
                    params:{
                        size:8,
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
