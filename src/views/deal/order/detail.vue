<template>
    <div>
        <el-tabs type="border-card" class="tab-container">
          <el-tab-pane class="order-tab" label="订单详情">
            <!-- 订单表单 -->
            <div class="order-info">
              <div class="order-header">
                <span>订单信息</span>
                <!-- 暂定倒计时24h -->
                <count-down v-if="this.orderInfoData.type === 'paying'" @time-end="onTimerEnd" @invalid-time="onTimeInvalid" :endTime='orderInfoData.endTime'></count-down>
              </div>
              <div class="order-items">
                <div>
                  <span>
                    <i>订单编号:</i>
                    <i>{{ orderInfoData.number }}</i>
                  </span>
                  <span>
                    <i>订单状态:</i>
                    <i>{{ orderInfoData.status }}</i>
                  </span>
                </div>
                <div>
                  <span>
                    <i>产品名称:</i>
                    <i>{{ orderInfoData.productName }}</i>
                  </span>
                  <span v-if="!orderInfoData.isRefunded">
                    <i>订单金额:</i>
                    <i>￥{{ orderInfoData.orderMoney }}</i>
                  </span>
                  <span v-if="orderInfoData.isRefunded">
                    <i>退款金额:</i>
                    <i>￥{{ orderInfoData.refundMoney }}</i>
                  </span>
                </div>
                <div>
                  <span>
                    <i>创建时间:</i>
                    <i>{{ orderInfoData.creatTime }}</i>
                  </span>
                </div>
              </div>
            </div>
            <!-- 按钮组 -->
            <div class="buttons">
              <el-button size="small" type="info" @click="followOrder">跟进订单</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" @click="cancelOrder">取消订单</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" @click="insufficientPeople">未成团</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" @click="applyRefund">申请退款</el-button>
              <el-button size="small" type="info" v-if="hasAppliedRefund && !hasRefundedOver" @click="refundOver">退款完成</el-button>
              <el-button size="small" type="info" v-if="hasAppliedRefund && hasRefundedOver" @click="checkRefundOver">查看退款</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" @click="checkTheRest">查看尾款</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" @click="payTheRest">支付尾款</el-button>
              <el-button size="small" type="info" v-if="!hasAppliedRefund" v-show="!this.bookInfoData[0].edit" @click="modifyMoney">修改金额</el-button>
              <el-button size="small" type="warning"  v-if="!hasAppliedRefund" v-show="this.bookInfoData[0].edit" @click="modifyMoneyOver">完成修改</el-button>
              <file-upload  v-if="!hasAppliedRefund" :uploadSuccess="updateNotification" style="margin-left: 10px;">
                上传出团通知书
              </file-upload>
              <file-upload  v-if="!hasAppliedRefund" :uploadSuccess="updateContract" style="margin-left: 10px;">
                上传合同
              </file-upload>
              <file-upload  v-if="!hasAppliedRefund" :uploadSuccess="updateTraveller" style="margin-left: 10px;">
                上传旅客信息
              </file-upload>
            </div>
            <!-- 预订信息 -->
            <div class="book-info">
              <div class="book-top">
                <span v-if="!this.hasAppliedRefund">预订信息</span>
                <span v-if="this.hasAppliedRefund">退订信息</span>
                <span @click="bookInfoFeeNotice">费用须知</span>
                <span @click="bookInfoRecommendReason">推荐理由</span>
                <span @click="bookInfoOrderNotice">预订须知</span>
              </div>
              <el-table class="book-detail" :data="bookInfoData" border fit highlight-current-row style="width: 100%">

                  <el-table-column align="center" label="产品编号">
                    <template scope="scope">
                      <span>{{scope.row.id}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" width="220" label="行程时间">
                    <template scope="scope">
                      <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" width="220" label="人数">
                    <template scope="scope">
                      <span>{{scope.row.totalPeople}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="原价销售">
                    <template scope="scope">
                      <span>{{scope.row.originalPrice}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="实际销售价">
                    <template scope="scope">
                      <el-input v-show="scope.row.edit" size="small" v-model="scope.row.discountPrice"></el-input>
                      <span v-show="!scope.row.edit">{{ scope.row.discountPrice }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="应付金额">
                    <template scope="scope">
                      <span>{{scope.row.shouldPay}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="定金支付">
                    <template scope="scope">
                      <span>{{scope.row.subscription}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="尾款支付">
                    <template scope="scope">
                      <span>{{scope.row.restMoney}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column class-name="status-col" label="已优惠">
                    <template scope="scope">
                      <span>{{scope.row.concessinal}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column v-if="this.hasAppliedRefund" class-name="status-col" label="线下退款金额">
                    <template scope="scope">
                      <span>{{scope.row.offlineRefundMoney}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column v-if="this.hasAppliedRefund" class-name="status-col" label="线上退款金额">
                    <template scope="scope">
                      <span>{{scope.row.onlineRefundMoney}}</span>
                    </template>
                  </el-table-column>

               </el-table>
               <!-- 查看通知书、合同、旅客信息按钮组 -->
               <div class="buttons" style="margin-top: 20px;">
                  <el-button size="small" type="info" v-show="notificationData.visible" @click="checkNotification">查看通知书</el-button>
                  <el-button size="small" type="info" v-show="contractData.visible" @click="checkContract">查看合同</el-button>
                  <el-button size="small" type="info" v-show="travellerData.visible" @click="checkTraveller">查看旅客信息</el-button>
               </div>
            </div>
             <!-- 旅客信息 -->
             <div class="traveller-info" v-if="!hasAppliedRefund">
               <div class="traveller-info-top">
                 <span>旅客信息</span>
               </div>
               <div class="traveller-info-detail">
                 <el-input type="text" v-model="otherTavellerData.photos" placeholder="输入所有旅客手机号，逗号隔开" style="width: 60%;"></el-input>
                 <el-button type="info" @click="connectProduct">关联本产品</el-button>
               </div>
             </div>
             <!-- 联系人信息 -->
             <div class="contractor-info">
               <div class="contractor-info-top">
                 <span>联系人信息</span>
               </div>
               <div class="contractor-info-detail">
                 <span>
                   <i>联系人姓名：</i>
                   <i>{{ contractorData.name }}</i>
                 </span>
                 <span>
                   <i>手机号：</i>
                   <i>{{ contractorData.phone }}</i>
                 </span>
                 <span>
                   <i>邮箱：</i>
                   <i>{{ contractorData.email }}</i>
                 </span>
               </div>
             </div>
             <!-- 支付信息 -->
             <div class="payment-info" v-if="!hasAppliedRefund">
               <div class="payment-info-top">
                 <span>支付信息</span>
               </div>
               <div class="payment-info-detail">
                 <span>
                   <i>支付模式：</i>
                   <i>{{ paymentData.model }}</i>
                 </span>
                 <span>
                   <i>订单总额明细：</i>
                   <i>{{ paymentData.totalMoneyDetail }}</i>
                 </span>
                 <span>
                   <i>订金金额：</i>
                   <i>{{ paymentData.orderMoney }}</i>
                 </span>
                  <span>
                   <i>尾款金额：</i>
                   <i>{{ paymentData.restMoney }}</i>
                 </span>
               </div>
               <el-table class="payment-table-data" :data="paymentData.paymentTableData" border fit highlight-current-row style="width: 100%">
  
                  <el-table-column
                    prop="payTime"
                    label="支付时间">
                  </el-table-column>
                  <el-table-column
                    prop="payBy"
                    label="支付方式">
                  </el-table-column>
                  <el-table-column
                    prop="payBatchNumber"
                    label="交易批次号">
                  </el-table-column>
                  <el-table-column
                    prop="payMoney"
                    label="支付金额">
                  </el-table-column>

               </el-table>
             </div>
             <!-- 订单日志 -->
             <div class="order-log">
               <div class="order-log-top">
                 <span>订单日志</span>
               </div>
               <el-table class="order-log-table-data" :data="orderLogData" border fit highlight-current-row style="width: 100%">

                  <el-table-column
                    prop="operateTime"
                    label="操作时间">
                  </el-table-column>
                  <el-table-column
                    prop="operator"
                    label="操作员">
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="操作类型">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>

               </el-table>
             </div>
          </el-tab-pane>
          <!-- <el-tab-pane class="refund-teb" label="退款详情">退款详情</el-tab-pane> -->
        </el-tabs>
        

        <!-- 模态框 -->
        <!-- 跟进订单 -->
        <el-dialog title="跟进订单" :visible.sync="followOrderDialogVisible">
            <el-form :model="followOrderData" label-width="80px" label-position="left">
              <el-form-item label="跟进内容">
                <el-input type="textarea" :rows="3" v-model="followOrderData.content" placeholder="请输入您要跟进的内容"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveFollowOrder">保存</el-button>
                <el-button type="warning" @click="cancelFollowOrder">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 申请退款 -->
        <el-dialog title="申请退款" :visible.sync="applyRefundDialogVisible">
            <el-table :data="applyRefundData1" border style="width: 100%">
              <el-table-column label="线下退款金额">
                <template scope="scope">
                  ￥&nbsp;<el-input style="width: 90%;" v-model="applyRefundData.offline"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="线上退款金额">
                <template scope="scope">
                  ￥&nbsp;<el-input style="width: 90%;" v-model="applyRefundData.online"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="退款说明">
                <template scope="scope">
                  <el-input v-model="applyRefundData.desc"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer">
              <el-button type="warning" @click="applyRefundConfirm">退款</el-button>
              <el-button @click="cancelRefund">取消</el-button>
            </div>
        </el-dialog>
        <!-- 支付尾款 -->
        <el-dialog title="支付尾款" :visible.sync="payTheRestDialogVisible">
            <el-form :model="payTheRestData" label-width="80px" label-position="left">
              <el-form-item label="支付方式">
                <el-radio class="radio" v-model="payTheRestData.way" label="1">转账</el-radio>
              </el-form-item>
              <el-form-item label="支付金额">
                <el-input v-model="payTheRestData.total" placeholder="请输入支付金额"></el-input>
              </el-form-item>
              <el-form-item label="上传凭证">
                <img-upload :uploadSuccess="handlePayTheRestUploadSuccess"></img-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="payTheRestConfirm">确认到账</el-button>
                <el-button type="warning" @click="cancelPayTheRest">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 未成团 -->
        <el-dialog title="未成团" size="tiny" :visible.sync="insufficientPeopleDialogVisible">
            <div>未成团，确认后将全款给用户</div>
            <div slot="footer">
              <el-button type="primary" @click="insufficientPeopleConfirm">确认</el-button>
              <el-button type="warning" @click="cancelInsufficientPeople">取消</el-button>
            </div>
        </el-dialog>
        <!-- 取消订单 -->
        <el-dialog title="取消订单" size="tiny" :visible.sync="cancelOrderDialogVisible">
            <div>确认取消该订单吗？</div>
            <div slot="footer">
              <el-button type="primary" @click="cancelOrderConfirm">确认</el-button>
              <el-button type="warning" @click="cancelCancelOrder">取消</el-button>
            </div>
        </el-dialog>
        <!-- 退款完成 -->
        <el-dialog title="退款完成" :visible.sync="refundOverDialogVisible">
            <el-form :model="refundOverData" label-width="80px" label-position="left">
              <el-form-item label="支付方式">
                <el-radio class="radio" v-model="refundOverData.way" label="1">转账</el-radio>
              </el-form-item>
              <el-form-item label="支付金额">
                <el-input v-model="refundOverData.total" placeholder="请输入支付金额"></el-input>
              </el-form-item>
              <el-form-item label="上传凭证">
                <img-upload :uploadSuccess="handleRefundOverUploadSuccess"></img-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="refundOverConfirm">确认到账</el-button>
                <el-button type="warning" @click="cancelRefundOver">取消</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
          <el-dialog
            :title="bookInfoDialog.title"
            :visible.sync="bookInfoDialog.visible"
            size="tiny">
            <span>{{ bookInfoDialog.content }}</span>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="bookInfoDialog.visible = false">取 消</el-button> -->
              <el-button type="primary" @click="bookInfoDialog.visible = false">确 定</el-button>
            </span>
          </el-dialog>
    </div>
</template>

<script>

    import CountDown from '../../../components/custom/CountDown'
    import FileUpload from '../../../components/custom/FileUpload'
    import ImgUpload from '../../../components/custom/ImgUpload'

    import { parseTime } from '../../../utils';

    export default {
      name: 'orderDetail',
      components: {
        CountDown,
        FileUpload,
        ImgUpload
      },
      computed: {
        orderLogData() {
          return this.$store.getters.order_log
        },
      },
      data() {
        return {
          //弹窗是否显示
          followOrderDialogVisible: false,
          applyRefundDialogVisible: false,
          payTheRestDialogVisible: false,
          insufficientPeopleDialogVisible: false,
          cancelOrderDialogVisible: false,
          refundOverDialogVisible: false,
          //判断状态是不是已经变化的变量
          hasAppliedRefund: false,
          hasRefundedOver: false,

          followOrderData: {
            content: '',
          },
          orderInfoData: {
            type: 'paying',
            number: 'BD-20160407001', 
            status: '待支付尾款',
            productName: '产品名',
            orderMoney: '90',
            creatTime: '2016.03.01 12:00:00',
            refundMoney: '90',
            isRefunded: false,
            payedTime: 1498006971021,
            efficientTime: 86400000,
            endTime: 1498008100021
          },
          applyRefundData1: [{}],
          applyRefundData: {
            offline: '',
            online: '',
            desc: ''
          },
          payTheRestData: {
            way: '',
            total: '',
            certificate: ''
          },
          refundOverData: {
            way: '',
            total: '200',
            certificate: ''
          },
          bookInfoData: [
            {
              id: '1',
              timestamp: '1497578644764',
              totalPeople: '1个儿童3个成人',
              originalPrice: '2000',
              discountPrice: '1800',
              shouldPay: '1800',
              subscription: '200',
              restMoney: '1600',
              concessinal: '200',
              edit: false,
              offlineRefundMoney: '1800',
              onlineRefundMoney: '200'
            },
          ],
          bookInfoDialog: {
            title: '',
            content: '',
            visible: false
          },
          notificationData: {
            url: '',
            visible: false
          },
          contractData: {
            url: '',
            visible: false
          },
          travellerData: {
            url: '',
            visible: false
          },
          otherTavellerData: {
            phones: '',
          },
          contractorData: {
            name: '孙女士',
            phone: '13621189888',
            email: 'hhh@qq.com'
          },
          paymentData: {
            model: '订金模式',
            totalMoneyDetail: '成人￥2000*2 + 儿童￥1000*2 +单房差￥1000*2 =￥8000',
            orderMoney: '￥2000（已支付）',
            restMoney: '￥6000（已支付）',
            paymentTableData: [
              {
                payTime: '2016.03.01 12:00:00',
                payBy: '微信支付',
                payBatchNumber: 'BD1211343234435-W825LYZF',
                payMoney: '￥2000'
              },
            ]
          },

        }
      },
      methods: {
        followOrder() {
          console.log('跟进订单');
          this.followOrderDialogVisible = true;
        },
        saveFollowOrder() {
          console.log(this.followOrderData);
          this.followOrderDialogVisible = false;
          this.createOperateLog('跟进订单', '跟进订单备注');
        },
        cancelFollowOrder() {
          this.followOrderDialogVisible = false;

        },
        cancelOrder() {
          console.log('取消订单');
          this.cancelOrderDialogVisible = true;
        },
        cancelOrderConfirm() {
          console.log('确认取消该订单');
          this.cancelOrderDialogVisible = false;
          this.createOperateLog('取消订单', '取消订单备注');
        },
        cancelCancelOrder() {
          console.log('停止取消该订单');
          this.cancelOrderDialogVisible = false;
        },
        insufficientPeople() {
          console.log('未成团');
          this.insufficientPeopleDialogVisible = true;
        },
        insufficientPeopleConfirm() {
          console.log('确认未成团');
          this.insufficientPeopleDialogVisible = false;
          this.createOperateLog('未成团', '未成团备注');
        },
        cancelInsufficientPeople() {
          this.insufficientPeopleDialogVisible = false;
        },
        applyRefund() {
          console.log('申请退款');
          this.applyRefundDialogVisible = true;
        },
        applyRefundConfirm() {
          console.log('退款中...');
          console.log(this.applyRefundData);
          this.hasAppliedRefund = true;
          this.applyRefundDialogVisible = false;
          this.orderInfoData.status = '退款中';
          this.orderInfoData.refundMoney = '90';
          this.orderInfoData.isRefunded = true;
          this.orderInfoData.type = 'refunding';
          this.createOperateLog('申请退款', '申请退款备注');
        },
        cancelRefund() {
          console.log('取消退款');
          this.applyRefundDialogVisible = false;
        },
        refundOver() {
          console.log('确认退款完成');
          this.refundOverDialogVisible = true;
        },
        handleRefundOverUploadSuccess(imgUrl) {
          console.log(imgUrl);
        },
        refundOverConfirm() {
          console.log('确认退款完成点击按钮');
          console.log(this.refundOverData);
          this.refundOverDialogVisible = false;
          this.hasRefundedOver = true;
          this.createOperateLog('确认退款完成', '确认退款完成备注');
        },
        cancelRefundOver() {
          console.log('取消退款完成');
          this.refundOverDialogVisible = false;
        },
        checkRefundOver() {
          console.log('查看退款');
          this.createOperateLog('查看退款', '查看退款备注');
        },
        checkTheRest() {
          console.log('查看尾款');
          this.createOperateLog('查看尾款', '查看尾款备注');
        },
        payTheRest() {
          console.log('支付尾款');
          this.payTheRestDialogVisible = true;
        },
        handlePayTheRestUploadSuccess(imgUrl) {
          console.log(imgUrl);
          this.payTheRestData.certificate = imgUrl;
        },
        payTheRestConfirm() {
          this.payTheRestDialogVisible = false;
          console.log(this.payTheRestData);
          this.createOperateLog('支付尾款', '支付尾款备注');
        },
        cancelPayTheRest() {
          this.payTheRestDialogVisible = false;
        },
        handleRefundOverAvatarSuccess(res, file) {
          
        },
        modifyMoney() {
          console.log('修改金额');
          this.bookInfoData[0].edit = true;
        },
        modifyMoneyOver() {
          console.log('完成修改金额');
          this.bookInfoData[0].edit = false;
          this.createOperateLog('修改金额', '修改金额备注');
        },
        updateNotification(fileUrl) {
          console.log('上传出团通知书地址为:');
          console.log(fileUrl);
          this.notificationData = {
            url: fileUrl,
            visible: true
          }
        },
        checkNotification() {
          window.open(this.notificationData.url);
        },
        updateContract(fileUrl) {
          console.log('上传合同地址为：');
          console.log(fileUrl);
          this.contractData = {
            url: fileUrl,
            visible: true
          }
        },
        checkContract() {
          window.open(this.contractData.url);
        },
        updateTraveller(fileUrl) {
          console.log('上传旅客通知书地址为:');
          console.log(fileUrl);
          this.travellerData = {
            url: fileUrl,
            visible: true
          }
        },
        checkTraveller() {
          window.open(this.travellerData.url);
        },
        bookInfoFeeNotice() {
          this.bookInfoDialog = {
            title: '费用须知',
            content: '我是费用须知',
            visible: true
          };
        },
        bookInfoRecommendReason() {
          this.bookInfoDialog = {
            title: '推荐理由',
            content: '我是推荐理由',
            visible: true
          };
        },
        bookInfoOrderNotice() {
          this.bookInfoDialog = {
            title: '预订须知',
            content: '我是预订须知',
            visible: true
          };
        },
        connectProduct() {
          console.log('关联本产品');
          console.log(this.otherTavellerData);
        },
        onTimerEnd() {
          console.log('倒计时结束');
        },
        onTimeInvalid() {
          console.log('结束时间不能小于当前时间');
          this.$message.error('结束时间不能小于当前时间');
        },
        createOperateLog(type, remark='') {
          this.$store.dispatch('AddLog', {
            operateTime: parseTime( new Date().getTime() ),
            operator: 'admin',
            type,
            remark
          });
        }

      },
      mounted() {
        
        
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-tabs--border-card, .el-tabs__header {
    border: none;
  }
  .tab-container {
    i {
      font-style: normal;
    }
    .order-tab {
      .order-info {
        margin-bottom: 20px;
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        .order-header {
          overflow: hidden;
          border-bottom: 1px dashed #888888;
          height: 30px;
          span:first-child {
            float: left;
          }
          .count-down {
            float: right;
          }
        }
        .order-items {
          div {
            width: 100%;
            overflow: hidden;
            span:nth-child(odd) {
              float: left;
              width: 400px;
              line-height: 40px;
            }
            span:nth-child(even) {
              float: right;
              width: 400px;
              line-height: 40px;
            }
          }
        }
      }
      .buttons {
        margin-bottom: 20px;
      }
      /*预订信息*/
      .book-info {
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 20px;
        .book-top {
          overflow: hidden;
          padding-bottom: 6px;
          border-bottom: 1px dashed #666666;
          span {
            float: left;
            margin-right: 20px;
            &:not(:first-child) {
              color: #0000ff;
              cursor: pointer;
              &:hover {
                color: #0000aa;
              }
            }
          }
        },
        .book-detail {
          margin-top: 10px;
        }
      }
      /*旅客信息*/
      .traveller-info {
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 20px;
        .traveller-info-top {
          padding-bottom: 6px;
          border-bottom: 1px dashed #666666;
        }
        .traveller-info-detail {
          margin-top: 10px;
        }
      }
      /*联系人信息*/
      .contractor-info {
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 20px;
        .contractor-info-top {
          padding-bottom: 6px;
          border-bottom: 1px dashed #666666;
        }
        .contractor-info-detail {
          margin-top: 10px;
          overflow: hidden;
          span {
            float: left;
            margin-right: 10%;
            font-size: 14px;
          }
        }
      }
      /*支付信息*/
      .payment-info {
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 20px;
        .payment-info-top {
          padding-bottom: 6px;
          border-bottom: 1px dashed #666666;
        }
        .payment-info-detail {
          margin-top: 10px;
          overflow: hidden;
          span {
            display: block;
            font-size: 14px;
            line-height: 30px;
          }
        }
        .payment-table-data {
          margin-top: 16px;
        }
      }
      /*日志信息*/
      .order-log {
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 20px;
        .order-log-top {
          padding-bottom: 6px;
          border-bottom: 1px dashed #666666;
        }
        .order-log-table-data {
          margin-top: 16px;
        }
      }
  

    }
  }
  
  
</style>
