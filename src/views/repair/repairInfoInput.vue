<template scope="scope">
  <section class="form-section">
    <el-form :inline="true"  class="demo-form-inline" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
    <el-form-item label="物品类型" prop="type">
        <el-radio-group v-model="newForm.type" @change="getType(newForm.type)">
          <el-radio label="1">电灯</el-radio>
          <el-radio label="0">开关</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="添加维修物品">
            <el-select v-model="newForm.goodsName" @change="getLocation(newForm.goodsName)" :placeholder="activityValue">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
            </el-select>
      </el-form-item>
      <el-form-item label="物品位置" prop="lightAddress">
        <el-input v-model="newForm.lightAddress"></el-input>
      </el-form-item>
      <el-form-item label="维修物品编号" prop="id">
        <el-input v-model="newForm.id"></el-input>
      </el-form-item>
        <el-form-item label="所属开关" prop="switchNumber">
            <el-input v-model="newForm.switchNumber"></el-input>
        </el-form-item>
        <!--
<el-dialog size="tiny" title="物品信息" :visible.sync="dialogFormVisible" :model="newForm">
  <el-form :model="newForm" ref="newForm" :rules="rules">
     <el-form-item label="所属开关" prop="switchNumber">
            <el-input v-model="newForm.switchNumber"></el-input>
       </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addActivity('newForm')">确 定</el-button>
  </div>
</el-dialog>-->
      <el-form-item label="决策人编号" prop="decisionMakerNumber">
        <el-input v-model="ruleForm.decisionMakerNumber"></el-input>
      </el-form-item>
      <el-form-item label="决策人姓名" prop="decisionMakerName">
        <el-input v-model="ruleForm.decisionMakerName"></el-input>
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
                prop="goodsName"
                label="商品名称"
                align="cneter"
                width="120">
              </el-table-column>
              <el-table-column
                prop="switchNumber"
                label="所属开关"
                align="cneter"
                width="120">
              </el-table-column>
              <el-table-column
                prop="lightAddress"
                align="cneter"
                label="安装位置">
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
        value: '',
          currentPage: 1,
        dialogFormVisible: false,
        newForm: {
          id:'',
          goodsName:'',
          lightAddress: '',
          switchNumber: '',
          type: '1',
        },
        formLabelWidth: '20px',
      //日期组件值和方法
//      kgoptions:[ {
//                value: '4',
//                label: '节能灯'
//            }],
     options: [],
          switchs:[],
            activityValue: '测试111',
        activities: [{
              id:'11111',
              type: '灯',
              goodsName: '测试',
              lightAddress:'12',
              switchNumber:'12',
          }],
        ruleForm: {
          arr:[],
          decisionMakerNumber:'',
          decisionMakerName:'',
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
        getLocation(type){
            let newForm=this.newForm;
            console.log('0000',type)
            console.log('11111',this.options);
            this.options.map(function(item) {
                if(item.name==type){
                    let goodsNumber=item.id;
                    let switchNumber=item.switchNumber;
                    let lightAddress=item.location;
                    console.log('9999',goodsNumber)
                    newForm.goodsNumber=goodsNumber;
                    newForm.switchNumber=switchNumber;
                    newForm.lightAddress=lightAddress;


                }
            })
            this.dialogFormVisible = true;
            this.$ajax({
                method: 'get', //请求方式
                url: 'http://10.103.241.154:8080/switch'
            }).then(
                (res) => {
                    this.switchs=res.data.data;
                    console.log('888',this.switchs);
                });
            this.$message({
                message: "提交成功，请在控制台查看json!！",
                type: 'success'
            });
        },
        getType(value){
            let newForm=this.newForm;
        console.log('****',value)
            if(value!='电灯'){
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/warehouse/page',
                    params:{
                        size:5,
                        page:this.currentPage,
                        type:value
                    }
                }).then(
                    (res) => {
                        this.options=[];
                        this.options =res.data.data.results;
                    });
            }else{
                this.$ajax({
                    method: 'get', //请求方式
                    url: 'http://10.103.243.94:8080/warehouse/page',
                    params:{
                        size:5,
                        page:this.currentPage,
                        type:'电灯'
                    }
                }).then(
                    (res) => {
                        this.options=[];
                        this.options =res.data.data.results;

                        console.log(this.options);
                    });
            }
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
                    goodsName: this.activityValue,
                    count: value,
                    switchNumber:'12w',
                    lightAddress:'0990p'
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
            url: 'http://10.103.241.110:8080/maintainOrder',
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
          this.$router.push({ path:'repairInfo' }) 
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
