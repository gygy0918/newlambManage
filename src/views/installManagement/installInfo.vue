<template>
  <div class="app-container">
    安装单信息
  </div>
</template>
<script>
      export default {
        data() {
          return {         
            methods: {
              handleClick(tab, event) {
                console.log(tab, event);
              },
               onSubmit() {
                console.log('submit!');
              }
            }
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
