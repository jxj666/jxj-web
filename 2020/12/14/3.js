
/*
 * @LastEditTime: 2020-12-13 23:47:36
 * @LastEditors: jinxiaojian
 */
// 深度遍历整个多叉树
const mainLimit = { '0': { top: 0} }
function dfs (obj, nodes = [], edges = [], xindex = 0, yindex = 0, config = { pre: [] }) {
  if (obj) {
    const hasChild = []
    if (obj.children && obj.children.length) {
      obj.children.forEach(
        x => {
          hasChild.push(x.pid)
        })
    }
    nodes.push({ xindex, yindex, id: obj.pid || obj.id, config, ...obj, hasChild, children: null })
    if (obj.children && obj.children.length) {
      xindex += 1
      obj.children.forEach(
        (x, i) => {
          edges.push({
            source: obj.pid,
            target: x.pid,
            has_threat: !!x.threat,
            id: `${obj.pid}_${x.pid}`,
            sourceAnchor: 1,
            targetAnchor: 0
          })
          let yindexSelf;

          if (!mainLimit[xindex]) {
            mainLimit[xindex] = {}
            mainLimit[xindex].top = mainLimit[xindex-1].top
          } else {
            mainLimit[xindex].top += 1
          }
          if (i === obj.children.length - 1) {
            config.pre.forEach((bol, boli) => {
                mainLimit[xindex - 1 - boli].top = mainLimit[xindex - boli].top
            })
          }
          yindexSelf = - mainLimit[xindex].top
          dfs(x, nodes, edges, xindex, yindexSelf, { pre: [...config.pre, obj.pid] })
        }
      )
    }
  }
  return { nodes, edges }
}

let list = dfs(data).nodes
console.log(mainLimit)
console.log(JSON.parse(JSON.stringify(list)))