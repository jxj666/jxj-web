/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2020-03-09 11:40:01
 * @LastEditTime: 2020-03-09 14:24:24
 * @LastEditors: 靳肖健
 */

let tree = {
  value: '1',
  left: {
    value: '2',
    left: {
      value: '3',
    },
    right: {
      value: '4',
      left: {
        value: '5',
      },
      right: {
        value: '6',
      }
    }
  },
  right: {
    value: '7',
    left: {
      value: '8',
    },
    right: {
      value: '9',
    }
  }
}




//深度
function deep (node) {
  let left = 0, right = 0
  if (node.left) {
    left = deep(node.left) + 1
  } else if (node.right) {
    right = deep(node.right) + 1
  } else {
    return 1
  }
  return left > right ? left : right
}

//广度
function range (node) {
  if (!node.left && !node.right) {
    return 1
  }
  return range(node.left) + range(node.right)
}