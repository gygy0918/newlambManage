<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path">
        <sidebar-item :routes='custom'></sidebar-item>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    export default {
      components: { SidebarItem },
      computed: {
        // 使用对象展开运算符将 store中的getters 混入 computed 对象中
        custom() {//去掉订单详情页面的路由显示
          let filteredPermission = this.$store.getters.permission_routers;
          filteredPermission.map((item, index) => {
            if( item.path === '/deal' ) {
              item.children.map((subItem, subIndex) => {
                if( subItem.path === '/order' ) {
                  subItem.children = subItem.children.filter((grandItem) => grandItem.path != 'detail/:orderid');
                }
              });
            }
          });
          // return this.$store.getters.permission_routers
          return filteredPermission
        },
        // ...mapGetters([
        //   'permission_routers'
        // ])
      },
      // mounted() {
      //   console.log(mapGetters([
      //     'permission_routers'
      //   ]));
      // },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }
</style>
