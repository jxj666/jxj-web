
/*
 * @LastEditTime: 2020-12-13 22:14:22
 * @LastEditors: jinxiaojian
 */
// 深度遍历整个多叉树
const mainLimit = { '0': { left: 0, bottom: 0 } }
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
            mainLimit[xindex].top = 0
            mainLimit[xindex].bottom = 0
          } else {
            mainLimit[xindex].top += 1
          }
          yindexSelf = - mainLimit[xindex].top
          dfs(x, nodes, edges, xindex , yindexSelf, { pre: [...config.pre, obj.pid] })
        }
      )
    }
  }
  console.log(mainLimit)
  return { nodes, edges }
}
const data = {
  id: 0,
  name: 0,
  children: [
    {
      id: 1,
      name: 1,
      children: [
        {
          id: 11,
          name: 11,
          children: [
            {
              id: 111,
              name: 111
            },
            {
              id: 112,
              name: 112
            },
            {
              id: 113,
              name: 113
            }
          ]
        },
        {
          id: 12,
          name: 12,
          children: [
            {
              id: 121,
              name: 121
            },
            {
              id: 122,
              name: 122
            }
          ]
        }
      ]
    }
  ]
}

let list = dfs(data).nodes
console.log(list)