<template>
  <div class="border">
    <!-- 查询 -->
    <el-row :gutter="10">
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="产品编号">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="目的地">
              <el-input v-model="form.destination"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="发团日期">
              <el-date-picker v-model="form.beginDate" type="daterange" placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="支付模式">
              <el-select v-model="form.payment" placeholder="全部">
                <el-option label="定金模式" value="depositMode"></el-option>
                <el-option label="定金+尾款" value="retainage"></el-option>
                <el-option label="全款" value="fullPayment"></el-option>
                <el-option label="全款OR定金" value="allDeposit"></el-option>
              </el-select>
              <el-button @click="resetSearch">清空</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="产品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="行程天数">
              <el-select v-model="form.days" placeholder="全部">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="供应商">
              <el-input v-model="form.supplier"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="产品状态">
              <el-select v-model="form.state" placeholder="全部">
                <el-option label="全部" value="6"></el-option>
                <el-option label="草稿" value="7"></el-option>
                <el-option label="暂停销售" value="8"></el-option>
                <el-option label="销售中" value="9"></el-option>
                <el-option label="已发布" value="10"></el-option>
                <el-option label="以结束" value="11"></el-option>
              </el-select>
              <el-button type="warning" @click="onSearch">搜索</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <!-- 筛选区 -->
    <Filter-zone>
      <Filter-item :itemData="statusItemData" :onItemClick="statueFilter" />
      <Filter-item :itemData="typeItemData" :onItemClick="typeFilter" />
    </Filter-zone>
    <!-- button -->
    <div class="buttons">
      <el-button type="primary" @click="batchRelease">批量发布</el-button>
      <el-button type="primary" @click="batchPausesales">批量暂停销售</el-button>
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <el-button type="primary" @click="complete">完成</el-button>
      <router-link to="information"><el-button type="primary" @click="createLine">创建线路</el-button></router-link>
    </div>
  
    <!-- 表格区 -->
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" prop="selection" label="全选/反选" width="50">
      </el-table-column>
      <el-table-column prop="number" label="产品编号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="产品名称" width="250">
      </el-table-column>
      <el-table-column prop="place" label="出发地" width="80">
      </el-table-column>
      <el-table-column prop="destination" label="目的地" width="120">
      </el-table-column>
      <el-table-column prop="days" label="行程天数" width="100">
      </el-table-column>
      <el-table-column prop="group" label="团期" width="150">
      </el-table-column>
      <el-table-column prop="onlinestate" label="上线状态" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <router-link to="information"><el-button type="text" size="small" @click="edit">编辑</el-button></router-link>
          <el-button type="text" size="small" @click="copy">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="journal" label="日志" width="90">
        <template scope="scope">
          <el-button @click="handleRefund" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog title="查看操作" :visible.sync="dialogTableVisible">
      <el-table :data="dialogGridData">
        <el-table-column property="operation" label="操作" width="150"></el-table-column>
        <el-table-column property="operator" label="操作人" width="200"></el-table-column>
        <el-table-column property="operatingTime" label="操作时间"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import FilterZone from '../../components/custom/Filter';
import FilterItem from '../../components/custom/FilterItem';
const statusItemData = {
  name: '产品状态',
  options: [{
    key: '全部',
    value: 'all'
  },
  {
    key: '草稿',
    value: 'draft'
  },
  {
    key: '销售中',
    value: 'insales'
  },
  {
    key: '暂停销售',
    value: 'stopsales'
  },
  {
    key: '已发布',
    value: 'releaseout'
  },
  {
    key: '已结束',
    value: 'over'
  },
  {
    key: '已售罄',
    value: 'soldout'
  }
  ],
};
const typeItemData = {
  name: '线路类型',
  options: [{
    key: '全部',
    value: 'all'
  },
  {
    key: '国内游',
    value: 'inland'
  },
  {
    key: '境外游',
    value: 'abroad'
  },
  ],
};
export default {
  name: '',
  components: {
    FilterZone,
    FilterItem
  },
  data() {
    return {
      // 1lan
      form: {
        number: '',
        destination: '',
        beginDate: '',
        payment: '',
        name: '',
        days: '',
        supplier: '',
        state: ''
      },
      // 2lan
      statusItemData,
      typeItemData,
      // 3lan
      tableData: [{
        selection: '',
        number: '12345',
        name: '产品名称',
        place: '上海',
        destination: '普陀区',
        days: '几天',
        group: '团期',
        onlinestate: '上线状态',
        journal: '日志'
      }, {
        selection: '',
        number: '12345',
        name: '产品名称2',
        place: '上海2',
        destination: '普陀区2',
        days: '几天2',
        group: '团期2',
        onlinestate: '上线状态2',
        journal: '日志2'
      }],
      // 4lan
      total: 0,
      currentPage1: 5,
      // 模态框
      dialogGridData: [{
        operation: '发布',
        operator: '王小虎',
        operatingTime: '2017.06.06 12:00:00'
      }, {
        operation: '草稿',
        operator: '王小虎',
        operatingTime: '2017.06.06 12:00:00'
      }],
      dialogTableVisible: false,
    }
  },
  computed: {

  },
  methods: {
    // 2lan
    onSearch() {
      console.log(this.form);
    },
    resetSearch() {
      this.form = {
        number: '',
        destination: '',
        beginDate: '',
        payment: '',
        name: '',
        days: '',
        supplier: '',
        state: ''
      }
    },
    statueFilter(val) {
      console.log('开始过滤状态' + val);
    },
    typeFilter(val) {
      console.log('开始过滤类别' + val);
    },
    // 3lan
    handleClick() {
      console.log(1);
    },
    batchRelease() {
      console.log('批量发布');
    },
    batchPausesales() {
      console.log('批量暂停销售');
    },
    batchDelete(index) {
      console.log('批量删除');
      console.log(index);

    },
    complete() {
      console.log('完成');
    },
    createLine() {
      console.log('创建线路');
    },
    handleRefund() {
      this.dialogTableVisible = true;
    },
    edit(index, row) {
      console.log('编辑');
    },
    copy() {
      console.log('复制');
    },
    // 4lan
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
  }
}
</script>



<style scoped>
.border {
  margin: 10px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  /*background: #d3dce6;*/
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.buttons{
  margin: 10px 0;
}
.block{
  text-align: right;
  margin: 10px 20px;
}
</style>
