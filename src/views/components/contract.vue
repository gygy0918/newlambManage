<template>
  <div class="app-container">
    <div class="wrapper">
      <template>
          <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 供应商信息</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="合同资质">
      <p style="text-align:center">合同信息</p>
      <div>
  <el-form-item label="活动名称" prop="name"
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules" >
        <el-form-item label="合同编号">
          <el-input v-model="ruleForm.contractNum"></el-input>
        </el-form-item>
          <el-form-item label="合同名称">
          <el-input v-model="ruleForm.contractName"></el-input>
        </el-form-item>
          <el-form-item label="合同有效期">
            <div class="block">
            <span class="demonstration"></span>
              <el-date-picker
              v-model="ruleForm.startTime"
              type="date"
              placeholder="选择起始日期"
              :picker-options="ruleForm.startTime">
            </el-date-picker>
          </div>
          至
             <div class="block">
            <span class="demonstration"></span>
              <el-date-picker
              v-model="ruleForm.endTime"
              type="date"
              placeholder="选择截止日期"
              :picker-options="ruleForm.endTime">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="电子合同">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="returnUrl">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p>支持JPG,PNG格式，单张不大于5M</p>
        </el-form-item>
      </el-form>
      </div>

      <p style="text-align:center">资质信息</p>
      <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules" >
        <el-form-item label="电子资质">
          <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <p>营业执照，旅行社业务经营许可证，组织机构代码证，税务登记证，法人身份证</p>
        </el-form-item>
      </el-form>
      </div>
          <p style="text-align:center">财务结算</p>
      <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
  <el-form-item label="结算周期" prop="settleCycle">
    <el-radio-group v-model="ruleForm.settleCycle">
      <el-radio label="1" name="settleCycle">月结</el-radio>
      <el-radio label="2" name="settleCycle">周结</el-radio>
      <el-radio label="3" name="settleCycle">日结</el-radio>
      <el-radio label="4"name="settleCycle">一单一结（实时）</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="结算日期" prop="settleDate">
    每月<el-input v-model="ruleForm.settleDate" style="width:100px;"></el-input>
    日结算
  </el-form-item>
  <el-form-item label="佣金方式" prop="settleMode">
    <el-radio-group v-model="ruleForm.settleMode">
      <el-radio label="1" name="settleMode">按比例（%）</el-radio>
      <el-input v-model="ruleForm.settleAmount" style="width:100px;"></el-input> （%）
      <el-radio label="2" name="settleMode">按定额（元/份）</el-radio>
      <el-input v-model="ruleForm.settleAmount" style="width:100px;"></el-input>（元/份）
    </el-radio-group>
  </el-form-item>
    <el-form-item>
    <el-button @click="subSettle('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
      </div>

    <p style="text-align:center">收款账号备案表</p>
        <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="财务联系人" prop="contactsname">
        <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="（主）开户行：">
      <el-input v-model="ruleForm.bankName"></el-input>
    </el-form-item>
    <el-form-item label="开户名：">
      <el-input v-model="ruleForm.accountName"></el-input>
    </el-form-item>
    <el-form-item label="账号：">
      <el-input v-model="ruleForm.accountNumber"></el-input>
    </el-form-item>
    <el-form-item label="（副）开户行：">
      <el-input v-model="ruleForm.ViceBankName"></el-input>
    </el-form-item>
    <el-form-item label="开户名：" >
      <el-input v-model="ruleForm.ViceAccountName"></el-input>
    </el-form-item>
      <el-form-item label="账号：" >
      <el-input v-model="ruleForm.ViceAccountNumber"></el-input>
    </el-form-item>
      <el-form-item label="支付宝账号：">
      <el-input v-model="ruleForm.alipayNumber"></el-input>
    </el-form-item>
  <el-form-item label="账户名：" >
      <el-input v-model="ruleForm.alipayName"></el-input>
    </el-form-item>
      <el-form-item label="微信账号：">
      <el-input v-model="ruleForm.wechatNumber"></el-input>
    </el-form-item>
  </el-form>
        </div>

      <p style="text-align:center">发票信息</p>
        <div>
     <el-form ref="ruleForm" :model="ruleForm" label-width="100px" :rules="rules" >
             <el-form-item label="发票项目">
    <el-select v-model="ruleForm.invoiceType" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

        <el-form-item label="发票抬头">
          <el-input v-model="ruleForm.invoiceTitle"></el-input>
        </el-form-item>
          <el-form-item label="快递地址">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
          <el-form-item label="收件人">
          <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
          <el-form-item>
  </el-form-item>
      </el-form>
      </div>

      <div style="text-align:center">
      <el-button type="primary" @click="submitForm('ruleForm')">保存为草稿</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm()">清空</el-button>
      </div>

     </el-tab-pane>
    </el-tabs>
    </template>
    
    </div>
  </div>
</template>
<script> 
      export default {
        data() {
          return {
            radio: '',
            radio1:'',
            dialogImageUrl: '',
            dialogVisible: false,
            activeName: 'second',
            
              ruleForm: {
              contractNum:'',
              contractName: '',
              //合同有效期
              startTime:'',
              endTime:'',
              merImgList:'',
              //电子资质
              quaImgList:'',
              settleCycle:'',
              settleDate:'',
              settleMode:'',
              //财务联系人
              name:'',
              phone:'',
              bankName:'',
              accountName:'',
              accountNumber:'',
              ViceBankName:'',
              ViceAccountName:'',
              ViceAccountNumber:'',
              alipayNumber:'',
              alipayName:'',
              wechatNumber:'',
              invoiceType:'',
              invoiceTitle:'',
              address:'',
              realName:'',
              mobile:''
        },
        rules: {
          settleDate: [
            { /*type: 'date',*/ required: true, message: '请输入结算日期', trigger:  'blur'  }
          ],
           settleAmount: [
            { /*type: 'date',*/ required: true, message: '请输入日期', trigger:  'blur'  }
          ],
          settleMode: [
            { required: true, message: '请选择结算方式', trigger: 'change' }
          ],
          settleCycle: [
            { required: true, message: '请选择财务结算周期', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请填写电话号码', trigger: 'blur' }
          ]
        }
        };
         },
        methods: {
          subSettle(formName){
           this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });

          },
          returnUrl(file, fileList){
            console.log(file.url);
            console.log(dialogImageUrl);
          },
            formatDate (date) {  
            var y = date.getYear()+1900;  
            var m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            return y + '-' + m + '-' + d;  
          },
          submitForm(formName) {
            console.log(formName);
            this.$refs[formName].validate(
              (valid) =>{
                if (valid){
                 var data=this.ruleForm;
                 console.log(data.startTime);
                 let st=data.startTime;
                 let et=data.endTime;
                 data.startTime=this.formatDate(st);
                 data.endTime=this.formatDate(et);
                 console.log(data.startTime);
                  console.log(data.endTime);
                  console.log(data);
                 this.$ajax({
                  method:'post',
                  url: '/api/bdtrip_manage/merchant/saveMerchantContract.htm',  
                  params:data,
                }).then((res)=>{ 
                  console.log(res);
                })
              }else{
                console.log('error submit!!');
                return false;
              }
            }
            );
          },
          resetForm() {
            const resetObj ={};
            this.ruleForm = Object.assign({},resetObj);
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log(dialogImageUrl);
            this.dialogVisible = true;
          },
          handleClick(tab, event) {
            console.log(tab, event);
          },
          onSubmit() {
            console.log('submit!');
          }
        }
      };
    </script>

<style scoped>
  .wrapper{
      width: 800px;
      margin: 30px auto;
  }
</style>
