/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2020-03-09 11:40:01
 * @LastEditTime: 2020-03-09 11:54:20
 * @LastEditors: 靳肖健
 */
function deep (node, nodeList) {
  if (node) {
    nodeList.push(node);
    var children = node.children;
    for (var i = 0; i < children.length; i++)
      deep(children[i], nodeList);
  }
  return nodeList;
}

function range (node, nodeList) {
  let i = 0;
  if (!(node == null)) {
    nodeList.push(node);
    range(node.nextElementSibling, nodeList);
    range(node.firstElementChild, nodeList);
  }
  return nodeList;
}