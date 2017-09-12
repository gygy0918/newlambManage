<template>
  <div class="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="information">
        <!-- Tab基础信息 -->
        <div class="subtitle" id="informationForm">基础信息</div>
        <!-- form1 -->
        <el-form ref="informationForm" :model="informationForm" label-width="80px">
          <el-form-item label="线路类型">
            <el-radio-group v-model="informationForm.lineType">
              <el-radio label="出境游"></el-radio>
              <el-radio label="国内游"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出游类型">
            <el-radio-group v-model="informationForm.outType">
              <el-radio label="跟团游"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出发地">
            <el-select v-model="informationForm.startPlace" placeholder="全国">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目的地">
            <el-select v-model="informationForm.endPlace" placeholder="全国">
              <el-option label="日本" value="jepan"></el-option>
              <el-option label="南京" value="nanjing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行程天数">
            <el-input v-model="informationForm.day" style="width:100px;"></el-input>天
          <el-input v-model="informationForm.night" style="width:100px;"></el-input>晚
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="informationForm.productName"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="informationForm.subTitle"></el-input>
          </el-form-item>
          <el-form-item label="产品头图">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="informationForm.dialogImageUrl" alt="">
          </el-dialog>
          <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
          <span>序号</span><el-input v-model="informationForm.number" style="width:150px;"></el-input>
          <el-button type="primary" @click="alertPic">弹出图片视屏直播</el-button>
          <!-- 弹出图片视屏直播的模态框 -->
          <el-dialog title="添加图片视频直播" :visible.sync="payTheRestDialogVisible">
            <el-form-item>
              <img-upload :uploadSuccess="handlePayTheRestUploadSuccess" :show-file-list="true"></img-upload>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio-group v-model="informationForm.picVideo">
                <el-radio :label="3">
                  图片
                </el-radio><br/>
                <el-radio :label="6">
                  视频
                  <el-input placeholder="请输入内容" v-model="informationForm.videoUrl"></el-input>
                </el-radio><br/>
                <el-radio :label="9">
                  直播
                  <el-input placeholder="请输入内容" v-model="informationForm.direct"></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <br/>
            <el-button type="primary" @click="addPicdetermine">确定</el-button>
            <el-button type="primary" @click="addPicReturn">返回</el-button>
          </el-dialog>
        </el-form-item>
        <el-form-item label="列表页缩略图">
          <!--<el-checkbox v-model="informationForm.checked">使用头图自动裁剪</el-checkbox>-->
          <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->

            <el-form-item>
              <img-upload :uploadSuccess="handlePayTheRestUploadSuccess"></img-upload>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-radio-group v-model="informationForm.picVideo">
                <el-radio :label="3">
                  图片
                </el-radio><br/>
                <el-radio :label="6">
                  视频
                  <el-input placeholder="请输入内容" v-model="informationForm.videoUrl"></el-input>
                </el-radio><br/>
                <el-radio :label="9">
                  直播
                  <el-input placeholder="请输入内容" v-model="informationForm.direct"></el-input>
                </el-radio>
              </el-radio-group>
            </el-form-item>

        </el-form-item>
        </el-form>
        <!-- 故事内容 -->
        <div id="storyContent" class="subtitle">故事内容</div>
        <!-- form2 -->
        <el-form ref="storyForm" :model="storyForm" label-width="80px">
          <el-form-item label="故事标题">
            <el-input v-model="storyForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容详情">
            <!--<div class="editor-container">

            </div>-->
            <Tinymce :height=250 ref="test" v-model="storyForm.content"></Tinymce>
          </el-form-item>
          <!--<div>
                <el-button type="primary" @click="addParagraph">+段落</el-button>
                <el-button type="primary" @click="addVideo">+视频</el-button>
                <el-button type="primary" @click="addAudio ">+音频</el-button>
                <el-button type="primary" @click="addPicture">+图片</el-button>
              </div>-->
        </el-form>
        <!-- 模态框 -->
        <el-dialog title="查看操作" :visible.sync="dialogTableVisible">

        </el-dialog>
        <!-- 行程信息 -->
        <div class="subtitle" id="itineraryInformation">行程信息</div>
        <!-- form3 -->
        <div id="formbox">
          <div class="formthree" id="formthree" v-for="n in zbt">
            <div class="days">day1</div>
            <el-form ref="tripForm" :model="tripForm" label-width="80px">
              <el-form-item label="标题">
                <el-input v-model="tripForm.title"></el-input>
              </el-form-item>
              <el-form-item label="交通">
                <el-checkbox-group v-model="tripForm.traffic">
                  <el-checkbox label="飞机" name="plane"></el-checkbox>
                  <el-checkbox label="火车" name="train"></el-checkbox>
                  <el-checkbox label="巴士" name="bus"></el-checkbox>
                  <el-checkbox label="游轮" name="cruise"></el-checkbox>
                  <el-checkbox label="高铁" name="highiron"></el-checkbox>
                  <el-checkbox label="自驾" name="selfDriving"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="餐食">
                <el-checkbox-group v-model="tripForm.meals">
                  <el-checkbox label="早" name="type">
                    <el-select v-model="tripForm.morning" placeholder="团餐">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-checkbox>
                  <el-checkbox label="中" name="type">
                    <el-select v-model="tripForm.middle" placeholder="团餐">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-checkbox>
                  <el-checkbox label="晚" name="type">
                    <el-select v-model="tripForm.night" placeholder="团餐">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="住宿">
                <el-select v-model="tripForm.accommodation" placeholder="五星或同等酒店">
                  <el-option label="一级酒店" value="nubone"></el-option>
                  <el-option label="二级酒店" value="nubtwo"></el-option>
                </el-select>
                <el-input v-model="tripForm.cityName" style="width:100px;"></el-input>
        </el-form-item>
        <!-- 副标题1 -->
        <div class="subtitle-box" v-for="x in fbt[n-1]">
          <div class="addsmalltitle">
            <el-form-item label="副标题">
              <el-input v-model="tripForm.subtitle" style="width:200px;"></el-input>
              <el-radio-group v-model="tripForm.multiSelect">
                <el-radio :label="1">餐食</el-radio>
                <el-radio :label="2">住宿</el-radio>
                <el-radio :label="3">飞机</el-radio>
                <el-radio :label="4">游轮</el-radio>
                <el-radio :label="5">巴士</el-radio>
              </el-radio-group>
              <el-button type="primary" @click="subtitleClose($event)" class="subtitle-close" size="small" v-if="x>1">关闭</el-button>
            </el-form-item>
        <el-form-item label="行程内容">
          <!--<div class="editor-container">

          </div>-->
          <!-- <Tinymce :height=100 ref="editor" v-model="tripForm.content"></Tinymce> -->
        </el-form-item>
        </div>
        </div>
        <el-button type="primary" @click="addSubtitle($event)" v-bind:value="n" class="addSubtitle" size="small">+添加副标题</el-button>
        </el-form>
        </div>
        </div>
        <el-button type="primary" @click="addtitle" class="addtitle">+添加主标题</el-button>

        <!-- 特殊说明 -->
        <div class="subtitle" id="specialInstructions">特殊说明</div>
        <textarea rows="8" cols="80" v-model="teshushuoming"></textarea>
        <!--<div class="editor-container">
          <Tinymce :height=200 ref="editor" v-model="content"></Tinymce>
        </div>-->
        <!-- 猜你喜欢 -->
        <div class="subtitle" id="guessLike">猜你喜欢</div>
        <!--<div>
            <span style="display: inline-block;padding:10px 50px;">序号</span>
            <span>关联产品</span>
            </div>
            <div>
            <el-input style="width:120px;" v-model="serialNumber" placeholder="请输入序号"></el-input>
            <el-input style="width:200px;" v-model="product" placeholder="请输入产品"></el-input>
            </div>-->
        <el-table ref='youLike1' :data="youLike" style="width: 100%">
        <el-table-column prop="serialNumber" label="序号" width="180">
          <template scope="scope">
            <el-input v-model="youLike1.serialNumber"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="glProduct" label="关联产品" width="180" type='index'>
          <template scope="scope">
            <el-input v-model="youLike1.glProduct"></el-input>
          </template>
        </el-table-column>
        </el-table>
        <el-button type="info" @click="addLeader" style="margin:10px 100px;">+添加</el-button>
        <div class="bottom-button">
          <el-button type="warning" @click="saveDraft">保存草稿</el-button>
          <!--<el-button type="success" @click="onSubmit">提交并跳转下一页</el-button>-->
          <router-link to="lineproducts">
            <el-button @click="cancelReturnAll">返回</el-button>
          </router-link>
          <el-button type="warning" @click="preview">客户端预览</el-button>
        </div>
        <div class="maolianjie" v-if="isTab">
          <el-button @click="toInformationForm" size="large">基础信息</el-button><br/>
          <el-button @click="tostoryContent" size="large">故事内容</el-button><br/>
          <el-button @click="toItineraryInformation" size="large">行程信息</el-button><br/>
          <el-button @click="toSpecialInstructions" size="large">特殊说明</el-button><br/>
          <el-button @click="toGuessLike" size="large">猜你喜欢</el-button>
        </div>
        </el-tab-pane>

        <!-- Tab切换到团期定价 -->
        <el-tab-pane label="团期定价" name="Price">
          <div class="subtitle">基础信息</div>
          <!-- form4 -->
          <el-form ref="priceForm" :model="priceForm" label-width="80px" :rules="rules">
            <el-form-item label="产品标题">
              <strong>【{{informationForm.productName}}】</strong>
            </el-form-item>
            <el-form-item label="起订人数" prop="name">
              <el-input v-model="priceForm.qiding" style="width:100px;"></el-input>人起订
        <el-input v-model="priceForm.group" style="width:100px;"></el-input>人成团
        </el-form-item>
        <el-form-item label="收客类型" prop="name">
          <el-checkbox-group v-model="priceForm.checkList">
            <el-checkbox label="成人价">成人</el-checkbox>
            <el-checkbox label="儿童价">儿童</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="儿童说明" prop="name" v-if="isInformation">
          <el-input v-model="priceForm.explain"></el-input>
        </el-form-item>
        <el-form-item label="销售日期">
          <el-col :span="3">
            <el-date-picker type="date" placeholder="选择日期" v-model="priceForm.date1" style="width:200px;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="1">
          <el-date-picker type="date" placeholder="选择日期" v-model="priceForm.date2" style="width:200px;"></el-date-picker>
        </el-col>
        </el-form-item>
        </el-form>
        <!-- Table -->
        <div class="subtitle">库存价格</div>
        <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" label="全选">
        <el-table-column label="反选" type="selection" width="45">
        </el-table-column>
        <el-table-column label="序号" type="index" width="65">
        </el-table-column>
        <el-table-column label="发团日期" width="150" :filters="[{ text: '全部日期', value: '全部日期' }, { text: '全部周末', value: '全部周末' },{ text: '全部平日', value: '全部平日' }]"
          :filter-method="filterTag">
          <!--<template scope="scope">{{ scope.row.date }}</template>-->
          <template scope="scope">
            <el-date-picker style="width:120px;" v-model="multipleTable.data" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
        </template>
        </el-table-column>
        <!--<el-table-column prop="name" label="成人价" width="120">
              <template scope="scope">
                <el-input v-model="multipleTable.adultPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="儿童价" width="120">
              <template scope="scope">
                <el-input v-model="multipleTable.childPrice"></el-input>
              </template>
            </el-table-column>-->
        <el-table-column :key='price' v-for='(price,index) in priceForm.checkList' :label="price" width="140">
          <template scope="scope">
            <el-input v-model="multipleTable.childPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="单房差" width="120">
          <template scope="scope">
            <el-input v-model="multipleTable.singleDifference"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="支付模式" width="120">
          <template scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="订金(元)/单" width="120">
          <template scope="scope">
            <el-input v-model="multipleTable.deposit"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="库存(可售)" width="120">
          <template scope="scope">
            <el-input v-model="multipleTable.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="提前预订天数" width="120">
          <template scope="scope">
            <el-input v-model="multipleTable.advanceDays"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="是否可售" width="120">
          <template scope="scope">
            <el-checkbox v-model="multipleTable.checked">是</el-checkbox>
          </template>
        </el-table-column>

        </el-table>
        <!-- 规则说明 -->
        <div class="subtitle">规则说明</div>
        <!-- form5 -->
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules">
          <el-form-item label="费用包含">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.textarea1">
            </el-input>
          </el-form-item>
          <el-form-item label="费用不包含">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.textarea2">
            </el-input>
          </el-form-item>
          <el-form-item label="退款须知">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.textarea3">
            </el-input>
          </el-form-item>
          <el-form-item label="预定须知">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.textarea4">
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 添加领队 -->
        <div class="subtitle">添加领队</div>
        <div>
          <span style="display: inline-block;padding:10px 50px;">领队</span>
        <span>所带团期</span>
        </div>
        <div>
          <el-input style="width:120px;" v-model="userId" placeholder="请输入用户Id"></el-input>
        <el-date-picker v-model="periodofOccurrence" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
        </el-date-picker>
        </div>
        <el-button type="info" @click="addLeader" style="margin:10px 100px;">+添加</el-button>
        <!--buttons-->
        <div class="bottom-button">
          <el-button type="warning" @click="saveDraft">保存草稿</el-button>
          <el-button type="warning" @click="onSubmit">提交</el-button>
          <router-link to="lineproducts">
            <el-button @click="cancelReturn">取消返回</el-button>
          </router-link>
          <el-button type="warning" @click="preview">客户端预览</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Tinymce from 'components/Tinymce';
  import ImgUpload from '../../components/custom/ImgUpload';
  // import VueRouter from '../../../vue-router/dist/vue-router.js';
  // 例子，自行對應到你項目的代碼
  // const router = new VueRouter({
  //   routes,
  //   mode: 'history',
  //   scrollBehavior (to, from, savedPosition) {
  //       // 如果你的連結是帶 # 這種
  //       // to.hash 就會有值(值就是連結)
  //       // 例如 #3
  //       if (to.hash) {
  //         return {
  //           // 這個是透過 to.hash 的值來找到對應的元素
  //           // 照你的 html 來看是不用多加處理這樣就可以了
  //           // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
  //           selector: to.hash
  //         }
  //       }
  //     }
  // });
  export default {
    components: {
      Tinymce,
      ImgUpload
    },
    data() {
      return {
        isTab:true,
        isInformation:false,
        payTheRestDialogVisible: false,
        teshushuoming:'',
        zbt: 1,
        fbt: [1],
        activeName: 'information',
        informationForm: {
          lineType: '',
          outType: '',
          startPlace: '',
          endPlace: '',
          day: '',
          night: '',
          productName: '',
          subTitle: '',
          number:'',
          dialogImageUrl:'',
          picVideo:3,
          videoUrl:'Http://',
          direct:'Http://',
          // checked: '',
        },
        dialogVisible: false,
        storyForm: {
          title: '',
          content: '',
        },
        tripForm: {
          title: '',
          traffic: [],
          meals: [],
          morning: '',
          middle: '',
          night: '',
          accommodation: '',
          cityName: '',
          subtitle: '',
          multiSelect: '',
          content: '',
        },
        content: '',
        priceForm: {
          qiding: '',
          explain: '',
          date1: '',
          date2: '',
          checkList: [],
        },
        multipleTable: {
          adultPrice: '',
          childPrice: '',
          singleDifference: '',
          paymentModel: '',
          deposit: '',
          stock: '',
          advanceDays: '',
          isSale: '',
          checked: true,
          data: '',
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        options: [{
          value: '选项1',
          label: '定金模式'
        }, {
          value: '选项2',
          label: '定金+尾款'
        }, {
          value: '选项3',
          label: '全额'
        }, {
          value: '选项4',
          label: '定金&全额'
        }],
        value: '',
        ruleForm: {
          textarea1: '',
          textarea2: '',
          textarea3: '',
          textarea4: '',
        },
        rules: {

        },
        imageUrl: '',

        // 猜你喜欢
        // serialNumber: '',
        // product: '',

        youLike: [{

        }, {

        }],
        youLike1: {
          serialNumber: '1',
          glProduct: '产品',
        },
        // 团期定价
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        dialogTableVisible: false,
        // 领队
        userId: '',
        periodofOccurrence: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      };
    },
    methods: {
      toInformationForm(){
        document.body.scrollTop =document.querySelector('#informationForm').offsetTop;
      },
      tostoryContent(){
        document.body.scrollTop =document.querySelector('#storyContent').offsetTop;
      },
      toItineraryInformation(){
        document.body.scrollTop =document.querySelector('#itineraryInformation').offsetTop;
      },
      toSpecialInstructions(){
        document.body.scrollTop =document.querySelector('#specialInstructions').offsetTop;
      },
      toGuessLike(){
        document.body.scrollTop =document.querySelector('#guessLike').offsetTop;
      },
      handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(tab.name);
        if (tab.name === 'Price') {
          isTab:false;
        }else {
          isTab:true;
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file);
        console.log('删除');
      },
      handlePictureCardPreview(file) {
        this.informationForm.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('放大');
        console.log(this.informationForm.dialogImageUrl);
      },
      // 上传图片视频直播
      alertPic(){
        console.log('___________');
        this.payTheRestDialogVisible = true;
      },
      addPicdetermine(){
        console.log('弹出图片视屏直播确定');
        this.payTheRestDialogVisible = false;
      },
      addPicReturn(){
        console.log('弹出图片视屏直播返回');
        this.payTheRestDialogVisible = false;
      },
      handlePayTheRestUploadSuccess(imgUrl) {
        console.log(imgUrl);
        this.payTheRestData.certificate = imgUrl;
      },
      // 故事内容
      addParagraph() {
        console.log('添加段落');
      },
      addVideo() {
        console.log('添加视频');
        this.dialogTableVisible = true;
      },
      addAudio() {
        console.log('添加音频');
        this.dialogTableVisible = true;
      },
      addPicture() {
        console.log('添加图片');
        this.dialogTableVisible = true;
      },
      addtitle() {
        console.log('添加主标题');
        this.fbt.push(1);
        this.zbt++;
      },
      addSubtitle(e) {
        console.log('添加副标题');
        var index = e.currentTarget.value - 1;
        this.fbt[index]++;
        this.fbt.push(0),
        this.fbt.splice(index + 1, 1);
        console.log(index);
      },
      // 猜你喜欢
      formatter(row, column) {
        return row.address;
      },
      // tableData3
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },

      filterTag(value, row) {
        return row.tag === value;
        console.log(value);
      },
      // 添加
      addLeader() {
        console.log('添加领队');
      },
      saveDraft() {
        console.log('保存草稿');
        console.log(this.informationForm);
        console.log(this.storyForm);
        console.log(this.tripForm);
        console.log(this.youLike1);
        console.log(this.priceForm);
        console.log(this.ruleForm);
      },
      onSubmit() {
        console.log('提交');
        console.log(this.informationForm);
      },
      cancelReturnAll() {
        console.log('返回全部的上一页');
      },
      cancelReturn() {
        console.log('取消返回是返回基本信息页面');
      },
      preview() {
        console.log('客户端预览');
      },
      //关闭副标题
      subtitleClose(e) {
        var a = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
        a.parentNode.removeChild(a);
      }
    },
    mounted(){
      var data={
        merchantId:1
      };
      this.$ajax({
        method: 'post', //请求方式
        url: '/api/bdtrip_manage/merchant/getMerchantInfo.htm',  //   '/api' + 接口后缀
        params: data, //传递的参数
      }).then(
      (res) => {
        let resData = res.data.data;
        console.log(resData);
        res.data.data.productType = res.data.data.productType.split(',');
        console.log(res.data.data.productType);
      });
    },
  };
</script>

<style>
.subtitle {
  background-color: #abc;
  padding: 10px 20px;
  margin: 10px 0;
}

/*form3*/

.formthree {
  border: 1px solid #000;
}

.days {
  background: #0099E7;
  padding: 5px 10px;
}

.subtitle-box {
  border: 1px solid #000;
  /*display: none;*/
}

.subtitle-close {
  float: right;
}
/*传图样式*/

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.addSubtitle {
  margin: 5px 200px;
}

.addtitle {
  margin: 5px 185px;
}

/*底部button*/
.bottom-button {
  margin: 10px 100px;
}
/*猫链接*/
.maolianjie{
  position: fixed;
  right: 0px;
  top: 300px;
}
</style>
