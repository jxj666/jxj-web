/*
 * @Author: your name
 * @Date: 2020-08-12 21:52:45
 * @LastEditTime: 2020-08-12 21:53:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxj-web\2020\8\12\1.js
 */

var combinationSum = function(candidates, target) {
    let 
        //查找总结果
        res = [],
        //待查子结果
        tmpPath = [],
        //寻找符合要求的子数组(暂存子数组,目标数,母数组位置))
        findChild = (tmpPath, target, start) => {
            for (let i = start; i < candidates.length; i++) {
                //实验性加入
                tmpPath.push(candidates[i]);
                //判断当前是否符合结果
                if(target - candidates[i] === 0){
                    res.push(tmpPath.slice())
                }else if(target - candidates[i] > 0){
                    findChild(tmpPath.slice(), target - candidates[i], i);
                }
                //复位
                tmpPath.pop();
            }
        }
    findChild(tmpPath, target, 0);
    return res;
};
