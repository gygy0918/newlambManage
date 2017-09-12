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
            <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="合同编号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="合同名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="合同有效期">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电子合同">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      </div>


      <p style="text-align:center">资质信息</p>
      <div>
            <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="电子合同">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      </div>
          <p style="text-align:center">财务结算</p>
      <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="结算日期" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="财务结算周期" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="月结"></el-radio>
      <el-radio label="周结"></el-radio>
      <el-radio label="日结"></el-radio>
      <el-radio label="一单一结（实时）"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="佣金方式" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="按比例（%）"></el-radio>
      <el-radio label="按定额（元/份）"></el-radio>
    </el-radio-group>
  </el-form-item>
</el-form>
      </div>

        <p style="text-align:center">收款账号备案表</p>
        <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="财务联系人" prop="name">
      <el-input v-model="ruleForm.name"></el-input>

    </el-form-item>

    <el-form-item label="联系电话" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="（主）开户行：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="开户名：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="账号：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="（副）开户行：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="开户名：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
      <el-form-item label="账号：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
      <el-form-item label="支付宝账号：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  <el-form-item label="账户名：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
      <el-form-item label="微信账号：" prop="resource">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
  </el-form>
        </div>

      <p style="text-align:center">发票信息</p>
        <div>
     <el-form ref="form" :model="form" label-width="100px">
             <el-form-item label="发票项目" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>

        <el-form-item label="发票抬头">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="快递地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="收件人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      </div>





     </el-tab-pane>
      <el-tab-pane label="产品管理">角色管理</el-tab-pane>
      <el-tab-pane label="拜访记录">定时任务补偿</el-tab-pane>
    </el-tabs>
    </template>
    
    </div>
  </div>
</template>
<script>
      export default {
        data() {
          return {
            activeName: 'second',
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
              ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
        };
         },
        methods: {
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
