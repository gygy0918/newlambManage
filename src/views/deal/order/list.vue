<template>
    <div class="list">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="searchForm" class="search-form" ref="searchForm">
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNumber" placeholder="订单编号或产品编号"></el-input>
          </el-form-item>
          <el-form-item label="预订日期">
            <el-date-picker
              v-model="searchForm.orderDate"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="searchForm.phone" placeholder="输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="searchForm.productName" placeholder="输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="出团日期">
            <el-date-picker
              v-model="searchForm.beginDate"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button type="warning" @click="resetSearch">清空</el-button>
          </el-form-item>
        </el-form>
        <!-- 筛选区 -->
        <Filter-zone>
          <Filter-item :itemData="statusItemData" :onItemClick="statueFilter" />
          <Filter-item :itemData="typeItemData" :onItemClick="typeFilter" />
        </Filter-zone>
        <!-- 表格区 -->
        <el-table
          :data="orderTableData"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column
            label="报名信息"
            width="340"
          >
            <template scope="scope">
              订单：<a style="color: #1D8CE0; text-decoration: underline;" @click="toDetail(scope.row.applyInfo.orderid)" href="javascript:;">{{ scope.row.applyInfo.order }}</a><br />
              产品：<a style="color: #1D8CE0; text-decoration: underline;" @click="toDetail(scope.row.applyInfo.orderid)" href="javascript:;">{{ scope.row.applyInfo.product }}</a><br />
              类别：{{ scope.row.applyInfo.type }}
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="creatTime"
            width="170"
          >
          </el-table-column>
          <el-table-column
            label="联系人"
            width="180"
          >
            <template scope="scope">
              <a href="javascript:;" style="cursor: default;">{{ scope.row.contractor.name }}</a><br />
              <a href="javascript:;" style="cursor: default;">{{ scope.row.contractor.phone }}</a><br />
              <a href="javascript:;" style="cursor: default;">{{ scope.row.contractor.email }}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="行程时间"
            prop="journeyTime"
            width="140"
          >
            <template scope="scope">
              <a href="javascript:;" style="cursor: default;">{{ scope.row.journeyTime.startTime }}</a><br />
              <a href="javascript:;" style="cursor: default;">{{ scope.row.journeyTime.endTime }}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="人数"
            width="90"
          >
            <template scope="scope">
              <a href="javascript:;" v-if="scope.row.type === 'parent-child'" style="cursor: default;">成人：{{ scope.row.peopleCount.adult }}</a><br />
              <a href="javascript:;" v-if="scope.row.type === 'parent-child'" style="cursor: default;">儿童：{{ scope.row.peopleCount.children }}</a>
              <a href="javascript:;" v-if="scope.row.type === 'student'" style="cursor: default;">学生：{{ scope.row.peopleCount.student }}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="交易金额"
            prop="transactionAmount"
          >
          </el-table-column>
          <el-table-column
            label="订单状态"
            prop="orderStatus"
          >
          </el-table-column>
          <el-table-column
            label="受理人"
            prop="handlePerson"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="140"
          >
            <template scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleCheck(scope.$index, scope.row)">处理/查看</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.handlePerson === ''"
                @click="handleAccept(scope.$index, scope.row)">受理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]"
            :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
    </div>
</template>

<script>
    import FilterZone from '../../../components/custom/Filter';
    import FilterItem from '../../../components/custom/FilterItem';

    import { parseTime } from '../../../utils/index'

    const statusItemData = {
      name: '订单状态',
      options: [
          {key: '全部', value: 'all'},
          {key: '待支付', value: 'paying'},
          {key: '待出团', value: 'grouping'},
          {key: '已出团', value: 'grouped'},
          {key: '退款中', value: 'refunding'},
          {key: '已结束', value: 'over'},
          {key: '退款完成', value: 'refunded'},
          {key: '已取消', value: 'canceled'},
          {key: '已支付订金', value: 'payed'}
      ],
    };
    const typeItemData = {
      name: '产品类型',
      options: [
        {key: '全部', value: 'all'},
        {key: '国内游', value: 'inland'},
        {key: '出境游', value: 'abroad'},
      ],
    };
    //表格信息
    const tableData = [];
    for(let i=0; i<5; i++) {
      let single = {
        id: i,
        type: 'parent-child',
        applyInfo: { orderid: 1, type: '跟团游', product: '西安出发澳大利亚黄金海岸5晚6日自由行', order: 'LV20171396126742632' },
        creatTime: '1497926766722',
        contractor: { name: '孙大圣', phone: '13621189888', email: 'justdoit_hhh@163.com' },
        journeyTime: { startTime: '1497926766722', endTime: '1497926766799' },
        peopleCount: { adult: '2', children: '1', student: '2' },
        transactionAmount: '8000',
        orderStatus: '已支付订金',
        handlePerson: '',
      }
      tableData.push(single);
    }

    export default {
      name: 'orderList',
      components: {
        FilterZone,
        FilterItem
      },
      data() {
        return {
          statusItemData,
          typeItemData,
          searchForm: {
            orderNumber: '',
            orderDate: '',
            phone: '',
            productName: '',
            beginDate: '',
          },
          //订单表格信息
          listLoading: true,
          orderTableData: tableData,
          //页码相关
          pageTotal: 20,
          listQuery: {
            page: 1,
            limit: 20,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id'
          },
        }
      },
      methods: {
        onSearch() {
          console.log(this.searchForm);
        },
        resetSearch() {
          this.searchForm = {
            orderNumber: '',
            orderDate: '',
            phone: '',
            productName: '',
            beginDate: '',
          }
        },
        statueFilter(val) {
          console.log('开始过滤状态' + val);
        },
        typeFilter(val) {
          console.log('开始过滤类别' + val);
        },
        getTableData(pn) {
          this.listLoading = false;
        },
        handleAccept(rowIndex, data) {
          console.log(rowIndex);
          console.log(data);
          data.handlePerson = '猪八戒'
        },
        handleCheck(rowIndex, data) {
          console.log(rowIndex);
          console.log(data);
          this.$router.push('/order/detail/' + data.id);
        },
        handleSizeChange(size) {
          console.log('每一页${ size }条');
        },
        handleCurrentChange(val) {
          console.log('当前第${ val }页');
        },
        toDetail(id) {
          console.log(id);
          this.$router.push('/order/detail/' + id);
        },
      },
      mounted() {
        this.getTableData();
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .list {
    margin: 10px;
    .search-form {
      border: 1px solid #eaeefb;
      border-radius: 4px;
      transition: .2s;
      padding: 10px 10px 0 10px;
      margin-bottom: 10px;
    }
    .filter-area {
      width: 100%;
      background: #eeeeee;
      margin: 10px 0 10px;
      padding: 10px;
      div {
        span {
          font-size: 14px;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          color: blue;
          padding: 3px 8px;
          &.active {
            background: blue;
            color: #ffffff;
          }
        }
      }
    }
  }

</style>
