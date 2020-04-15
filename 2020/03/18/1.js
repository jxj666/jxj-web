/*
 * @LastEditTime: 2020-03-18 20:59:06
 * @LastEditors: jinxiaojian
 */
var ro=3.7
var ro_day=14
var day_riben_2_16=1581782400000
var people_riben_2_16=53
var day_yidali_2_24=1582473600000
var popple_yidali_2_24=230

function sum(startDay,day,people,ro,ro_day){
    var sum =people
    var time=startDay
    var day_ro=ro
    for(var i=0;i<day;i++){
        time+=24*60*60*1000
        sum= sum*(1+(day_ro/ro_day))
          day_ro=day_ro*0.99
        var k=new Date(time)
        console.log(`${k.getMonth()+1}-${k.getDate()}`,sum.toFixed(0))
    }
}
// sum(day_riben_2_16,50,people_riben_2_16,ro,ro_day)
// sum(day_riben_2_16,50,people_riben_2_16,ro*0.5,ro_day)

sum(day_yidali_2_24,50,popple_yidali_2_24,ro,ro_day)