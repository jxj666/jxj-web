
/*
 * @LastEditTime: 2020-12-14 14:43:00
 * @LastEditors: jinxiaojian
 */
// 深度遍历整个多叉树
const mainLimit = { '0': { top: 0 } }
const searched = {}
const map = {}

function dfs (obj, nodes = [], edges = [], xindex = 0, yindex = 0, config = { pre: [] }) {
  if (obj) {
    let hasChild = false
    if (obj.children && obj.children.length) {
      hasChild = []
      obj.children.forEach(
        x => {
          hasChild.push(x.pid || x.id)
        })
    }
    map[`${xindex}_${yindex}`] = true
    nodes.push({
      xindex, yindex, id: obj.pid || obj.id,
      pre: config.pre, ...obj, hasChild, parent: config.pre.length > 0 ? config.pre[config.pre.length - 1] : false, children: null
    })
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
          }else if(mainLimit[xindex].top < mainLimit[xindex-1].top){
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
          dfs(x, nodes, edges, xindex, yindexSelf, { pre: [...config.pre, obj.pid || obj.id] })
        }
      )
    }
  }
  return { nodes, edges }
}
function movePre (nodes) {
  nodes.reverse().forEach((x, i) => {
    if (x.parent && !searched[x.parent]) {
      searched[x.parent] = true
      let parentI = undefined
      for (var j = 0; j < nodes.length; j++) {
        if (x.parent === nodes[j].id) {
          parentI = j
          break;
        }
      }
      let total=0
      let totaly=0
      for (var j = 0; j < nodes.length; j++) {
        if (x.parent === nodes[j].parent) {
          total+=1
          totaly += nodes[j].yindex
        }
      }
      nodes[parentI].yindex=totaly/total
    }
  })
  return nodes
}
let list = movePre(dfs(data).nodes)

let max=0

console.log(mainLimit)
console.log(searched)

console.log(JSON.parse(JSON.stringify(list)))