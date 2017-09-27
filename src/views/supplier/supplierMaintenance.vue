<template scope="scope">
  <section class="form-section">
    <el-form :inline="true"  class="demo-form-inline" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
      <el-form-item label="物品名称">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
      </el-form-item>
      <el-button type="text" @click="dialogFormVisible = true">新增物品</el-button>
<el-dialog size="tiny" title="新物品信息" :visible.sync="dialogFormVisible" :model="newForm">
  <el-form :model="newForm" ref="newForm" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="newForm.name"></el-input>
      </el-form-item>
      <el-form-item label="功率" prop="power">
        <el-input v-model="newForm.power"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="newForm.price"></el-input>
      </el-form-item>
     <el-form-item label="采购类型" prop="type">
        <el-radio-group v-model="newForm.type">
          <el-radio label="1">电灯</el-radio>
          <el-radio label="2">开关</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采购数量" prop="count">
        <el-input v-model="newForm.count"></el-input>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addActivity('newForm')">确 定</el-button>
  </div>
</el-dialog>

      <el-form-item label="下发采购单人编号" prop="purchaseManagerNumbert">
        <el-input v-model="ruleForm.purchaseManagerNumber"></el-input>
      </el-form-item>
      <el-form-item label="下发采购单人姓名" prop="purchaseManagerName">
        <el-input v-model="ruleForm.purchaseManagerName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <h3>已添加商品列表</h3>
    <el-table
              :data="activities"
              style="min-width: 600px;margin-bottom: 20px;"
            align="cneter"
              :row-class-name="tableRowClassName">
              <el-table-column
                prop="name"
                label="商品名称"
                align="cneter"
                width="120">
              </el-table-column>
              <el-table-column
                prop="price"
                label="单价"
                align="cneter"
                width="120">
              </el-table-column>
              <el-table-column
                prop="power"
                align="cneter"
                label="功率">
              </el-table-column>
              <el-table-column
                prop="count"
                align="cneter"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="type"
                align="cneter"
                label="类型">
                <template scope="scope">
                      <el-tag
                        :type="scope.row.type ==true? 'success' :'danger' "
                        close-transition>{{scope.row.type==true?'电灯':'开关'}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column 
                label="操作" 
                width="120">
              <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index)">删除</el-button>
              </template>
              </el-table-column>
          </el-table>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        newForm: {
          power: '',
          price: '',
          type: '1',
          count: '',
          delivery: false,
          type: '',
          resource: '',
          desc: ''
        },
        formLabelWidth: '20px',
      //日期组件值和方法
     options: [{
                value: '飞利浦',
                label: '飞利浦'
            }, {
                value: '路灯',
                label: '路灯'
            }, {
                value: '开关',
                label: '开关'
            }, {
                value: '节能灯',
                label: '节能灯'
            }],
            activityValue: '测试111',
        activities: [{
              type: '灯',
              name: '测试',
              price:'12',
              power:'12',
              count: '2',
          }],
        ruleForm: {
          arr:[],
          purchaseManagerNumber:'',
          purchaseManagerName:'',
        },
         //验证信息
        rules: {
          name: [
            {required: true, message: '请输入物品名称', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          type1: [
            {required: true, message: '请选择待办物品类型', trigger: 'change'}
          ],
          date: [
            {type: 'date', required: true, message: '请选择提醒时间', trigger: 'change'}
          ],
          other: [
            {required: true, message: '请填写其他信息', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
          tableRowClassName(row, index) {
            if (index === 1) {
              return 'info-row';
            } else if (index === 3) {
              return 'positive-row';
            }
            return '';
        },
        addActivity(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let para = Object.assign({}, this.newForm);
                console.log('****',para);
                this.activities.push(para);
                 console.log('+========__s',this.activities);
                //发送请求
                this.$message({
                  message: "提交成功，请在控制台查看json!！",
                  type: 'success'
                });
                this.dialogFormVisible = false
              } else {
                return false;
              }
            });
        },
    selectActivity(){
          this.$prompt('请输入数量', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
              if (value == null) {
                this.$message({
                    type: 'info',
                    message: '请输入数量'
                }); 
                return
              }
                let newObj = {};
                console.log('8888',this.activityValued)
                if(this.activityValue){
                  newObj= {
                    type: '灯',
                    name: this.activityValue,
                    count: value,
                    power:'12w',
                    price:'0990p'
                    }
                     this.activities.push(newObj);
                }
                
            }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                });       
            });
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            para.arr=this.activities;
            console.log('00000',this.activities)
            console.log(para);
            //发送请求
            this.$ajax({
            method: 'post', //请求方式
            url: 'http://10.103.243.94:8011/purchaseDetail', 
            data:para
            }).then( 
            (res) => {
            this.tableData=[];
           this.tableData =para;
            console.log(this.tableData);
            }); 
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
          this.$router.push({ path:'allInfo' }) 
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .form-section {
    padding: 10px;
    width: 500px;
  }
</style>
