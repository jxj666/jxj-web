/*
 * @Author: 靳肖健
 * @Date: 2020-08-12 22:49:07
 * @LastEditors: jinxiaojian
 * @LastEditTime: 2020-08-13 14:05:24
 * @Description: //jxjweb.top
 */

var combinationSum2 = function (candidates, target) {

  // 数组排序配合第二步
  const candidates2 = candidates.sort(
    (a,b)=>a-b
  );
  console.log("candidates2", candidates2)

  let //查找总结果
    res = [],
    //待查子结果
    tmpPath = [],
    //寻找符合要求的子数组(暂存子数组,目标数,母数组位置))
    findChild = (tmpPath, target, start) => {
      console.log('findChild', tmpPath, target, start)
      for (let i = start; i < candidates2.length; i++) {

        //这道题的重点在于如何去重。巧妙的第二步是,内循环区分总元素重复(重点是递归可以加重复的数值,但是内循环就不可以)
        if (i > start && candidates2[i] == candidates2[i - 1]) {
          console.log('continue',tmpPath, i, start)
          continue;
        }v 

        //实验性加入
        tmpPath.push(candidates2[i]);
        //判断当前是否符合结果
        if (target - candidates2[i] === 0) {
          console.log('res.push =>', tmpPath.slice())
          res.push(tmpPath.slice());
        } else if (target - candidates2[i] > 0) {
          findChild(tmpPath.slice(), target - candidates2[i], i + 1);
        }
        //复位
        tmpPath.pop();
      }
    };
  findChild(tmpPath, target, 0);
  return res;
};