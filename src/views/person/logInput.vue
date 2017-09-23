<template>
  <div class="errPage-container">
     <!--error code-->
   <err-code/>
    <!--error code-->
    <h3>新增人员记录</h3>

  </div>
</template>
<script>
    import errCode from './errcode';
    // import code1Img from
    export default {
      components: { errCode },
      data() {
        return {

        }
      },
      methods: {
        back() {
          this.$router.go(-1)
        }
      }
    };
</script>
<style scoped>
.errPage-container{
  padding: 30px;
}
</style>
