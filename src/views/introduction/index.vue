<template>
  <div class="app-container">
    路灯系统作用bala
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
