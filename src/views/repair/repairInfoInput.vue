<template>
  <section class="form-section">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label=" 维修单编号" prop="weixiunumber">
        <el-input v-model="ruleForm.puchernumber"></el-input>
      </el-form-item>
      <el-form-item label="录入人编号" prop="lurunumber">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="录入人姓名" prop="luruname">
        <el-input v-model="ruleForm.number"></el-input>
      </el-form-item>
      <el-form-item label="维修人编号" prop="weixiurennumber">
        <el-input v-model="ruleForm.tianxienumber"></el-input>
      </el-form-item>
      <el-form-item label="维修人姓名" prop="weixiurenname">
        <el-input v-model="ruleForm.tianxiename"></el-input>
      </el-form-item>
      <el-form-item label="维修完成时间" required>
        <el-row>
          <el-form-item prop="endtime">
              <el-date-picker
                    v-model="ruleForm.endtime"
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
          weixiurenname: '',
          weixiurennumber: '',
          weixiunumber:'',
          luruname: '',
          lurunumber: '',
          endtime: '',
          other:''
        },
         //验证信息
        rules: {
          weixiurenname: [
            {required: true, message: '请输入维修人姓名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          weixiurennumber: [
            {required: true, message: '请输入维修人编号', trigger: 'change'}
          ],
           weixiunumber: [
            {type: 'date', required: true, message: '请输入维修单号', trigger: 'change'}
          ],
          luruname: [
            {required: true, message: '请填录入人姓名', trigger: 'blur'}
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
