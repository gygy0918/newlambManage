<template>
    <div class="dashboard-container" style="background:black">
        <h3 　style="text-align:center;color:white">欢迎进入校园路灯监控后台管理系统</h3>
        <div style="text-align:center">
        <img  src="../../assets/1.gif" >
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import EditorDashboard from './editor/index';
    import DefaultDashboard from './default/index';
    export default {
      name: 'dashboard',
      components: { EditorDashboard, DefaultDashboard },
      data() {
        return {
          currentRole: 'EditorDashboard',
          imgurl:'../../assets/401.gif'
        }
      },
      computed: {
        ...mapGetters([
          'name',
          'avatar',
          'email',
          'introduction',
          'roles'
        ])
      },
      created() {
        if (this.roles.indexOf('admin') >= 0) {
          return;
        }
        // const isEditor = this.roles.some(v => v.indexOf('editor') >= 0)
        // if (!isEditor) {
        //   this.currentRole = 'DefaultDashboard';
        // }
        this.currentRole = 'DefaultDashboard';
      }
    }
</script>
