import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '../views/layout/Layout';

/* login */
import Login from '../views/login/';
const authRedirect = () => import('../views/login/authredirect');
const sendPWD = () => import('../views/login/sendpwd');
const reset = () => import('../views/login/reset');

/* dashboard */
const dashboard = () => import('../views/dashboard/index');

/* Introduction */
const Introduction = () => import('../views/introduction/index');

/* components */
const componentsIndex = () => import('../views/components/addsupplier');
const Tinymce = () => import('../views/components/tinymce');
const Markdown = () => import('../views/components/markdown');
const JsonEditor = () => import('../views/components/jsoneditor');
const DndList = () => import('../views/components/dndlist');
const AvatarUpload = () => import('../views/components/avatarUpload');
const Dropzone = () => import('../views/components/dropzone');
const Sticky = () => import('../views/components/sticky');
const SplitPane = () => import('../views/components/splitpane');
const CountTo = () => import('../views/components/countTo');
const Mixin = () => import('../views/components/mixin');

/*交易管理*/
const OrderIndex = () => import('../views/deal/order/index');
const OrderList = () => import('../views/deal/order/list');
const OrderDetail = () => import('../views/deal/order/detail');
// const RefundIndex = () => import('../views/deal/refund/index');
// const RefundList = () => import('../views/deal/refund/list');
// const RefundDetail = () => import('../views/deal/refund/detail');

/*采购管理*/
const AllSuppliers = () => import('../views/supplier/allSuppliers');
const SupplierMaintenance = () => import('../views/supplier/supplierMaintenance');
const SupplierLogInput = () => import('../views/supplier/supplierLogInput');
const SupplierLogInfo = () => import('../views/supplier/supplierLogInfo');
/*库存管理*/
const repertoryInfo = () => import('../views/repertory/repertoryInfo');
const repertoryInput = () => import('../views/repertory/repertoryInput');

/*安装管理*/
const InstallInfo = () => import('../views/installManagement/installInfo');
const InstallLog = () => import('../views/installManagement/installLog');
const InstallLogInput = () => import('../views/installManagement/installLogInput');
const InstallInfoInput = () => import('../views/installManagement/installInfoInput');

/*维修管理*/
const RepairInfo = () => import('../views/repair/repairInfo');
const RepairInfoInput = () => import('../views/repair/repairInfoInput');
const RepairLogInput = () => import('../views/repair/repairLogInput');
const RepairLogInfo = () => import('../views/repair/repairLogInfo');

//路灯信息
const LambInfo  = () => import('../views/lamb/lambiformation');
const LambMap= () => import('../views/lamb/lambMap');

/* 人员管理 */
const PersonInfo = () => import('../views/person/personInfo');
const PersonInput = () => import('../views/person/personInput');

/* charts */
const chartIndex = () => import('../views/charts/index');
const KeyboardChart = () => import('../views/charts/keyboard');
const KeyboardChart2 = () => import('../views/charts/keyboard2');
const LineMarker = () => import('../views/charts/line');
const MixChart = () => import('../views/charts/mixchart');

/* error page */
const Err404 = () => import('../views/error/404');
const Err401 = () => import('../views/error/401');


/* excel */
const ExcelDownload = () => import('../views/excel/index');

/* theme  */
const Theme = () => import('../views/theme/index');

/* example*/
const TableLayout = () => import('../views/example/table/index');
const DynamicTable = () => import('../views/example/table/dynamictable');
const Table = () => import('../views/example/table/table');
const DragTable = () => import('../views/example/table/dragTable');
const InlineEditTable = () => import('../views/example/table/inlineEditTable');
const Form1 = () => import('../views/example/form1');

// lineproducts
const Lineproducts = () => import('../views/lineproducts/lineproducts');
const Information = () => import('../views/lineproducts/information');


/* permission */
const Permission = () => import('../views/permission/index');


Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/sendpwd', component: sendPWD, hidden: true },
    { path: '/reset', component: reset, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    icon: 'xinrenzhinan',
    noDropdown: true,
    children: [{ path: 'index', component: Introduction, name: '简述' }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    name: '权限测试',
    icon: 'quanxian',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Permission, name: '权限测试页', meta: { role: ['admin'] } }]
  },
  {
    path: '/supplier',
    component: Layout,
    redirect: 'noredirect',
    name: '采购管理',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['purchaser','admin'] },
    children: [
      { path: 'allInfo', component: AllSuppliers, name: '采购单信息' },
      { path: 'newInfo', component: SupplierMaintenance, name: '新增采购单' },
      { path: 'supplierLogInput', component: SupplierLogInput, name: '采购日志录入'},
      { path: 'supplierLogInfo', component: SupplierLogInfo, name: '采购日志'},
    ]
  },
    {
    path: '/repertory',
    component: Layout,
    redirect: 'noredirect',
    name: '库存管理',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['purchaser','admin'] },
    children: [
      { path: 'repertoryInfo', component: repertoryInfo, name: '库存信息' }
      // ,
      // { path: 'repertoryInput', component: repertoryInput, name: '库存录入' }
      // { path: 'newInfo', component: SupplierMaintenance, name: '新增采购单' },
      // { path: 'contract', component: SupplierContract, name: '库存信息' },
    ]
  },
    {
    path: '/install',
    component: Layout,
    redirect: 'noredirect',
    name: '安装管理',
    icon: 'zonghe',
    meta: { role: ['installer','admin'] },
    children: [
      { path: 'installInfo', component: InstallInfo, name: '安装单信息' },
      { path: 'installInfoInput', component: InstallInfoInput, name: '安装信息录入' },
      { path: 'installLog', component: InstallLog , name: '安装日志' },
      { path: 'installLogInput', component: InstallLogInput , name: '安装日志录入' }   
    ]
  },
  {
    path: '/lamb',
    component: Layout,
    redirect: '/components/index',
    name: '路灯状态',
    icon: 'zujian',
    meta: { role: ['repair','admin'] },
    children: [
      { path: 'lambiformation', component:LambInfo, name: '路灯基本信息' },
      { path: 'lambMap', component:LambMap, name: '地图信息' },
      // { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      // { path: 'markdown', component: Markdown, name: 'Markdown' },
      // { path: 'jsoneditor', component: JsonEditor, name: 'JSON编辑器' },
      // { path: 'dndlist', component: DndList, name: '列表拖拽' },
      // { path: 'splitpane', component: SplitPane, name: 'SplitPane' },
      // { path: 'avatarupload', component: AvatarUpload, name: '头像上传' },
      // { path: 'dropzone', component: Dropzone, name: 'Dropzone' },
      // { path: 'sticky', component: Sticky, name: 'Sticky' },
      // { path: 'countto', component: CountTo, name: 'CountTo' },
      // { path: 'mixin', component: Mixin, name: '小组件' }
    ]
  },
  {
    path: '/repair',
    component: Layout,
    redirect: 'noredirect',
    name: '维修管理',
    icon: '404',
    meta: { role: ['repair','admin'] },
    children: [
     { path: 'repairInfo', component:RepairInfo, name: '维修信息' },
     { path: 'repairInfoInput', component:RepairInfoInput, name: '维修信息录入' },
     { path: 'repairLogInfo', component:RepairLogInfo, name: '维修日志' },
     { path: 'repairLogInput', component:RepairLogInput, name: '维修日志录入' }
      // {
      //   path: '/order',
      //   component: OrderIndex,
      //   redirect: '/order/list',
      //   name: '维修单单管理',
      //   children: [
      //     { path: 'list', component: OrderList, name: '订单列表' },
      //     { path: 'detail/:orderid', component: OrderDetail, name: '订单详情' },
      //   ],
      // }
      //,
      // {
      //   path: '/refund',
      //   component: RefundIndex,
      //   redirect: '/refund/list',
      //   name: '退款管理',
      //   children: [
      //     { path: 'list', component: RefundList, name: '退款单列表' },
      //     { path: 'detail', component: RefundDetail, name: '退款单详情' },
      //   ],
      // },
    ]
  },

  // {
  //   path: '/charts',
  //   component: Layout,
  //   redirect: '/charts/index',
  //   name: '图表',
  //   icon: 'tubiaoleixingzhengchang',
  //   children: [
  //     { path: 'index', component: chartIndex, name: '介绍' },
  //     { path: 'keyboard', component: KeyboardChart, name: '键盘图表' },
  //     { path: 'keyboard2', component: KeyboardChart2, name: '键盘图表2' },
  //     { path: 'line', component: LineMarker, name: '折线图' },
  //     { path: 'mixchart', component: MixChart, name: '混合图表' }
  //   ]
  // },
  // {
  //   path: '/errorpage',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '错误页面',
  //   icon: '404',
  //   children: [
  //     { path: '401', component: Err401, name: '401' },
  //     { path: '404', component: Err404, name: '404' }
  //   ]
  // },
  {
    path: '/person',
    component: Layout,
    redirect: 'noredirect',
    name: '人员管理',
    icon: 'bug',
    meta: { role: ['develop','admin'] },
  //  noDropdown: true,
    children: [
    { path: 'personInfo', component: PersonInfo, name: '人员信息' },
    { path: 'personInput', component: PersonInput, name: '新增人员' }
    ]
  },
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'excel',
  //   icon: 'EXCEL',
  //   noDropdown: true,
  //   children: [{ path: 'download', component: ExcelDownload, name: '导出excel' }]
  // },
  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'theme',
  //   icon: 'theme',
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Theme, name: '换肤' }]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '综合实例',
  //   icon: 'zonghe',
  //   children: [
  //     {
  //       path: '/table',
  //       component: TableLayout,
  //       redirect: '/table/table',
  //       name: 'table',
  //       children: [
  //         { path: 'dynamictable', component: DynamicTable, name: '动态table' },
  //         { path: 'dragtable', component: DragTable, name: '拖拽table' },
  //         { path: 'inline_edit_table', component: InlineEditTable, name: 'table内编辑' },
  //         { path: 'table', component: Table, name: '综合table' }
  //       ]
  //     },
  //     { path: 'form1', component: Form1, name: '综合form1' }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true },

  //线路产品管理
  // {
  //   path: '/lineproducts',
  //   component: Layout,
  //   name: '线路产品管理',
  //   children: [
  //     { path: 'lineproducts', component: Lineproducts, name: '线路产品管理(全部)' },
  //     { path: 'information', component: Information, name: '发布产品信息/定价' }
  //   ]
  // }
];
