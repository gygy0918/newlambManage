<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="维修单编号" prop="maintainNumber">
        <el-input v-model="ruleForm.maintainNumber"></el-input>
      </el-form-item>
     <el-form-item label="维修人编号" prop="maintainerNumber">
        <el-input v-model="ruleForm.maintainerNumber"></el-input>
      </el-form-item>
      <el-form-item label="维修人姓名" prop="maintainerName">
        <el-input v-model="ruleForm.maintainerName"></el-input>
      </el-form-item>
      <el-form-item label="录入人编号" prop="inputNumber">
        <el-input v-model="ruleForm.inputNumber"></el-input>
      </el-form-item>
      <el-form-item label="录入人姓名" prop="inputName">
        <el-input v-model="ruleForm.inputName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          maintainNumber: '',
          maintainerNumber:'',
          maintainerName:'',
          inputName: '',
          inputNumber:'',
          maintainerName:'',
          remarks: '',
        },
         //验证信息
        rules: {
          name: [
            {required: true, message: '请输入物品名称', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          type: [
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            var data=para;
            console.log('*****s',data);
        this.$ajax({
            method: 'post', //请求方式
            url: 'http://10.103.241.110:8080/maintainInput/save', 
            data:data
            }).then( 
            (res) => {
            this.tableData=[];
           this.tableData =data;
            console.log(this.tableData);
            }); 
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
            this.$router.push({ path: 'repairLogInfo' }) 
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
