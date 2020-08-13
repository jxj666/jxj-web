/*
 * @LastEditTime: 2020-03-23 11:36:00
 * @LastEditors: jinxiaojian
 */
var arr=['backups',
'mainframe',
'confirm',
'rise',
'menace',
'guard',
'recomplete',
'pass',
'umbrella',
'safe',
'fire',
'affect',]


var text1=''
var text2=''

arr.forEach((x)=>{
  text1+=`import icon_${x} from "@images/svg/dashboard/${x}.svg";`
})

arr.forEach((x)=>{
  text2+=`
  export const ${x}Icon = {
    threat: icon_${x},
  }; `
})

console.log(text1)
console.log(text2)