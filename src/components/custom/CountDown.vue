<template>
      <div class="count-down">{{time}}</div>
</template>

<script>
   export default{
       data () {
           return {
               time : '',
               flag : false
           }

       },
       mounted () {
       	let now = new Date().getTime();
       	if( this.endTime <= now ) {
       		this.$emit('invalid-time');
       		this.time = '倒计时：invalid end time';
       		return ;
       	}
		let time = setInterval(()=>{
		   if(this.flag == true){
		       clearInterval(time)
		   }
		   this.timeDown()
		},500)
       },
       props : {
           endTime : [Number, String]
       },
       methods : {
           timeDown () {
               const endTime = new Date(this.endTime)
               const nowTime = new Date();
               let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
               let d = parseInt(leftTime/(24*60*60))
               let h = this.formate(parseInt(leftTime/(60*60)%24))
               let m = this.formate(parseInt(leftTime/60%60))
               let s = this.formate(parseInt(leftTime%60))
               if(leftTime <= 0){
                   this.flag = true
                   this.$emit('time-end')
               }
               this.time = `${d}天${h}小时${m}分${s}秒`
           },
           formate (time) {
               if(time>=10){
                   return time
               }else{
                   return `0${time}`
               }
           }
       }
   }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.count-down {
		i {
			font-style: normal;
		}
	}
</style>