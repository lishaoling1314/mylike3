//每天倒计时 年天时分秒 
function timeFormat(param){
　　return param < 10 ? '0' + param : param;//等于一位数的时候前面加0
};
function countDown(enddowntime){
       let date = new Date();
　　　　// 获取当前时间，同时得到活动结束时间数组
　　　　let newTime = date.getTime();
　　　　// 对结束时间进行处理渲染到页面
　　　　let endTime = new Date(enddowntime.replace(/-/g,'/')).getTime();//replace(/-/g,'/')解决ios兼容性
　　　　let obj = null;
       let flag=1;//这里可以不用，但为了在vue判断来清setInterval
　　　　// 如果活动未结束，对时间进行处理
　　　　if (endTime - newTime > 0) {
    　　　　let time = (endTime - newTime) / 1000;
    　　　　// 获取天、时、分、秒
    　　　　let day = parseInt(time / (60 * 60 * 24));
    　　　　let hou = parseInt(time % (60 * 60 * 24) / 3600);
    　　　　let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    　　　　let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    　　　　obj = {
    　　　　　　day: timeFormat(day),
    　　　　　　hou: timeFormat(hou),
    　　　　　　min: timeFormat(min),
    　　　　　　sec: timeFormat(sec),
               flag:0//这里可以不用，但为了在vue判断来清setInterval
    　　　　};
　　　　} else { // 活动已结束，全部设置为'00'
　　　　　　obj = {
　　　　　　　　day: '00',
　　　　　　　　hou: '00',
　　　　　　　　min: '00',
　　　　　　　　sec: '00',
              flag:1 //这里可以不用，但为了在vue判断来清setInterval
           };
       };
       return obj;
    //var countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec+'秒';
    //var countDownList=null;
    //return countDownList = obj.hou + ':' + obj.min + ':' + obj.sec;
    //console.log(countDownList);
};
export{
    countDown
};