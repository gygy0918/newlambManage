
<template>
  <div class="components-container">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="部门名称" prop="depaName">
      <el-input v-model="ruleForm.depaName"></el-input>
    </el-form-item>

    <el-form-item label="报修类别" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio  label="1"  name="local">路灯</el-radio>
        <el-radio  label="2" name="foreign">开关</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="提供产品" prop="productType">
      <el-checkbox-group  v-model="ruleForm.productType">
        <el-checkbox label="1"  name="route">编号</el-checkbox>
        <el-checkbox label="2"  name="scenicspot">景区</el-checkbox>
        <el-checkbox label="3" name="traffic">交通</el-checkbox>
        <el-checkbox label="4" name="accommodation">住宿</el-checkbox>
        <el-checkbox label="5" name="ground">地接</el-checkbox>
        <el-checkbox label="6" name="insurance">保险</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input :disabled="isChecked" v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="报修人编号" >
      <el-input v-model="ruleForm.baoxiunumber"></el-input>
    </el-form-item>
    <el-form-item label="报修人姓名" >
      <el-input v-model="ruleForm.baoxiuname"></el-input>
    </el-form-item>
    <el-form-item label="报修原因">
      <el-select v-model="ruleForm.baoxiuyuanyin" placeholder="请选择报修原因">
        <el-option label="监控信息显示" value="shanghai"></el-option>
        <el-option label="人为观察" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="ruleForm.other"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存为草稿</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">取消</el-button>
    </el-form-item>
  </el-form>

</div>
</template>
<script>
  export default {
    data() {
      return {
        isChecked: false,
        ruleForm: {
          depaName:'',
          type:'',
          productType: [],
          name:'',
          baoxiunumber:'',
          baoxiuname:'',
          baoxiuyuanyin:'',
          other:'',
          address:'',
        },
        rules: {
          depaName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1 到 10 个字符', trigger: 'blur' }
          ],
          baoxiunumber: [
          { required: true, message: '请输入联系人ID', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
          ],
          baoxiuname: [
          { required: true, message: '请输入联系人姓名', trigger: 'change' }
          ],    
          productType: [
          { required: true, message: '请选择物品类别', trigger: 'change' }
          ],
          name: [
          {  type: 'array',required: true, message: '请输入物品名称', trigger: 'change' }
          ],

        }
      };
    },
    mounted(){
      var data={
          merchantId:this.$route.params.id
        };    
        this.$ajax({
                method: 'post', //请求方式
                url: '/api/bdtrip_manage/merchant/getMerchantInfo.htm',  //   '/api' + 接口后缀
                params: data, //传递的参数
            }).then( 
            (res) => {
              let resData = res.data.data;
              console.log(resData );
              this.ruleForm.merchantName = resData.merchantName;
              this.ruleForm.merchantId = resData.merchantId;
              this.ruleForm.merchantType = resData.merchantType;
              this.ruleForm.linkman =resData.linkman;
              this.ruleForm.phone=resData.phone;
              this.ruleForm.workTime =resData.workTime;
              this.ruleForm.city =resData.city;
              this.ruleForm.area =resData.area;
              this.ruleForm.address =resData.address;
              this.ruleForm.productType = res.data.data.productType.split(','); 
              console.log(this.ruleForm);
            });  
    },
    methods: {
      //提交方法
     /* var schema = require('async-validator');
      var validator = new schema(rules);*/
      submitForm(formName) {
        this.$refs[formName].validate(
          (valid) =>{
            if (valid){
             var data=this.ruleForm;
             console.log(this.ruleForm);
             data.productType=data.productType.toString();
             this.$ajax({
              method:'post',
              url: '/api/bdtrip_manage/merchant/saveMerchant.htm',  
              params:data,
            }).then((res)=>{ 
          this.ruleForm.productType=data.productType.split(',');
            })
          }else{
            console.log('error submit!!');
            return false;
          }
        }
        );
       
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>
