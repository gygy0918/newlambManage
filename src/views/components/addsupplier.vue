
<template>
  <div class="components-container">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="供应商名称" prop="merchantName">
      <el-input v-model="ruleForm.merchantName"></el-input>
    </el-form-item>

    <el-form-item label="供应商类别" prop="merchantType">
      <el-radio-group v-model="ruleForm.merchantType">
        <el-radio  label="1"  name="local">国内</el-radio>
        <el-radio  label="2" name="foreign">出境</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="提供产品" prop="productType">
      <el-checkbox-group  v-model="ruleForm.productType">
        <el-checkbox label="1"  name="route">路线</el-checkbox>
        <el-checkbox label="2"  name="scenicspot">景区</el-checkbox>
        <el-checkbox label="3" name="traffic">交通</el-checkbox>
        <el-checkbox label="4" name="accommodation">住宿</el-checkbox>
        <el-checkbox label="5" name="ground">地接</el-checkbox>
        <el-checkbox label="6" name="insurance">保险</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="联系姓名" prop="linkman">
      <el-input :disabled="isChecked" v-model="ruleForm.linkman"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" >
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="工作时间" >
      <el-input v-model="ruleForm.workTime"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-select v-model="ruleForm.city" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-select v-model="ruleForm.area" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input type="textarea" v-model="ruleForm.address"></el-input>
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
          merchantName:'',
          merchantType:'',
          productType: [],
          linkman:'',
          phone:'',
          workTime:'',
          city:'',
          area:'',
          address:'',
        },
        rules: {
          merchantName: [
          { required: true, message: '请输入活动供应商名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1 到 10 个字符', trigger: 'blur' }
          ],
          linkman: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
          ],
          phone: [
          { required: true, message: '请输入电话', trigger: 'change' }
          ],    
          merchantType: [
          { required: true, message: '请至少选择一个供应商', trigger: 'change' }
          ],
          productType: [
          {  type: 'array',required: true, message: '请输入产品！', trigger: 'change' }
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
