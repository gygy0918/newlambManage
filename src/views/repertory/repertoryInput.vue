<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="库存编号" prop="purchaseNumber">
        <el-input v-model="ruleForm.purchaseNumber"></el-input>
      </el-form-item>
      <el-form-item label="商品编号" prop="commodityNumber">
        <el-input v-model="ruleForm.commodityNumber"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="功率" prop="power">
        <el-input v-model="ruleForm.power"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input v-model="ruleForm.count"></el-input>
      </el-form-item>
      <el-form-item label="采购类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="1">电灯</el-radio>
          <el-radio label="2">开关</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="录入人编号" prop="purchaseManagerNumbert">
        <el-input v-model="ruleForm.purchaseManagerNumber"></el-input>
      </el-form-item>
      <el-form-item label="录入人姓名" prop="purchaseManagerName">
        <el-input v-model="ruleForm.purchaseManagerName"></el-input>
      </el-form-item>
      <el-form-item label="填写时间" required>
        <el-row>
          <el-form-item prop="date">
              <el-date-picker
                    v-model="ruleForm.date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
          </el-form-item>
        </el-row>
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
      //日期组件值和方法
       pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        ruleForm: {
          name :'',
          power:'',
          price:'',
          type :'',
          commodityNumber:'',
          purchaseNumber:'',
          purchaseManagerNumber:'',
          purchaseManagerName:'',
          count:'',
          date: '',
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
            console.log(para);
            //发送请求
            this.$message({
              message: "提交成功，请在控制台查看json!！",
              type: 'success'
            });
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
