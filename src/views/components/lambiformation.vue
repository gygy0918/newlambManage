<template>
  <section style="margin:50px">
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="路灯编号">
            <el-input v-model="formInline.search.ludengnumber" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属开关">
             <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.kaiguannumber"
                :label="item.kaiguannumber"
                :value="item.kaiguannumber">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="路灯位置">
             <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.location"
                :label="item.location"
                :value="item.location">
              </el-option>
            </el-select>
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
            prop="ludengnumber"
            label="路灯编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="ludengname"
            label="路灯名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="location"
            label="所在位置"
            width="100">
          </el-table-column>
          <el-table-column
            prop="kaiguannumber"
            label="所属开关编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="switch"
            label="状态"
            width="80">
                <template scope="scope">
                      <el-tag
                        :type="scope.row.switch ==true? 'success' :'danger' "
                        close-transition>{{scope.row.switch==true?'开':'关'}}</el-tag>
                </template>
          </el-table-column>
          <el-table-column
            prop="voltage"
            label="电压"
            width="80">
          </el-table-column>         
          <el-table-column
            prop="current"
            label="电流"
             width="80">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button type="danger" size="mini"       @click="handleDelete(scope.$index, scope.row)">报修</el-button>
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
    <el-dialog title="修改路灯信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="路灯编号">
          <el-input v-model="form.ludengnumber"></el-input>
        </el-form-item>
        <el-form-item label="路灯名称">
          <el-input v-model="form.ludengname"></el-input>
        </el-form-item>
        <el-form-item label="所在位置">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="所属开关编号">
          <el-input v-model="form.kaiguannumber"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.switch"></el-input>
        </el-form-item>
        <el-form-item label="电压">
          <el-input v-model="form.voltage"></el-input>
        </el-form-item>
        <el-form-item label="电流">
          <el-input v-model="form.current"></el-input>
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
       value1: true,
        value2: true,
        formInline: {
          search: {
            ludengnumber: '',
            kaiguanname: '',
            location: [],
            place: ''
          }
        },
        tableData: [{
            ludengnumber:'123',
            date: '2016-05-02',
            ludengname: '飞利浦－ecece13',
            location: '北京1518 路',
            kaiguannumber:'456',
            switch:true,
            voltage:'34v',
            current:'98A'
          }, {
            ludengnumber:'345',
            date: '2016-05-02',
            ludengname: '飞利浦－ecece21',
            location: '北京1516 路',
            kaiguannumber:'012',
             switch:false,
            voltage:'30v',
            current:'99A'

          }, {
            ludengnumber:'987',
            date: '2016-05-02',
            ludengname: '飞利浦－ecece09',
            location: '北京1519 路',
            kaiguannumber:'335',
             switch:true,
            voltage:'33v',
            current:'90A'
          }, {
            ludengnumber:'098',
            date: '2016-05-02',
            ludengname: '飞利浦－ecece765',
            location: '北京1523 路',
            kaiguannumber:'987',
             switch:true,
            voltage:'58v',
            current:'78A'
          }],
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
            ludengnumber:'',
            date: '',
            ludengname: '',
            location: '',
            kaiguannumber:'',
            switch:'',
            voltage:'',
            current:''
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
