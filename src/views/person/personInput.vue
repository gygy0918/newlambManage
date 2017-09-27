<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="员工编号" prop="staffNumber">
        <el-input v-model="ruleForm.staffNumber"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="staffName">
        <el-input v-model="ruleForm.staffName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="ruleForm.gender"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="ruleForm.department"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="job">
        <el-input v-model="ruleForm.job"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="ruleForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
       <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="其他信息" prop="other">
        <el-input type="textarea" v-model="ruleForm.other"></el-input>
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
          staffNumber:'',
          staffName:'',
          department:'',
          job:'',
          gender :'',
          idNumber:'',
          phoneNumber:'',
          address:'',
          other: ''
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
            url: 'http://10.103.243.94:8011/purchaseLog', 
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

            this.$router.push({ path: 'personInfo' }) 
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
