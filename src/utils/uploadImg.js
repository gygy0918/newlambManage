/**
 * Created by tanghaibo on 17/6/14.
 */
import CryptoJS from 'crypto-js';

export default function getEncodedFileName(filename, token='') {
  let fileSuffix = filename.split(".")
  let fileType = fileSuffix[fileSuffix.length - 1]
  let date = new Date()
  let formatedDate = date.format('yyyyMMdd')
  let timestamp = date.getTime().toString()
  let randomInt = ''
  for(let i = 0; i < 6; i++){
    randomInt += Math.floor(Math.random()*10);
  }
  let encodedString = formatedDate + '/' + CryptoJS.MD5(token +timestamp + randomInt).toString() + '.' + fileType
  return encodedString
}

// 扩展日期原型
Date.prototype.format = function(format) {
      var formatMinute = this.getMinutes().toString().length > 1 ? this.getMinutes() : "0" + this.getMinutes()
      var formatSecond = this.getSeconds().toString().length > 1 ? this.getSeconds() : "0" + this.getSeconds()
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": formatMinute,
              "s+": formatSecond,
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}
