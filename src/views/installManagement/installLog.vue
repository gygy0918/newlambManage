
<template>
  <div class="components-container">
  安装单日志记录
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
        }
      }
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
