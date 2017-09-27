<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="采购单编号" prop="purchaseNumber">
        <el-input v-model="ruleForm.purchaseNumber"></el-input>
      </el-form-item>
     <el-form-item label="采购人编号" prop="buyerNumber">
        <el-input v-model="ruleForm.buyerNumber"></el-input>
      </el-form-item>
      <el-form-item label="采购人姓名" prop="buyerName">
        <el-input v-model="ruleForm.buyerName"></el-input>
      </el-form-item>
      <el-form-item label="录入人编号" prop="recorderNumber">
        <el-input v-model="ruleForm.recorderNumber"></el-input>
      </el-form-item>
      <el-form-item label="录入人姓名" prop="recorderName">
        <el-input v-model="ruleForm.recorderName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="other">
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
          purchaseNumber: '',
          recorderNumber: '',
          recorderName:'',
          buyerNumber: '',
          buyerName: '',
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
            this.$router.push({ path: 'supplierLogInfo' }) 
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
