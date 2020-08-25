/*
 * @LastEditTime: 2020-08-25 10:49:38
 * @LastEditors: jinxiaojian
 */

let list = [{
  id: '1',
  children: [{
    id: '11',
    children: [{
      id: '111'
    }, {
      id: '112'
    }]
  }]
}];
const fn = (data, value) => {
  let res = []
  const dfs = (arr, temp = []) => {
    for (const node of arr) {
      if (node.children) {
        dfs(node.children, temp.concat(node.id))
      } else {
        if (node.id == value) {
          res = temp.concat(node.id)
          return
        }

      }
    }
  }
  dfs(data)
  return res

}
fn(list, '112')
