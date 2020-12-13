
/*
 * @LastEditTime: 2020-12-13 21:35:41
 * @LastEditors: jinxiaojian
 */
// 深度遍历整个多叉树
const mainLimit = {}
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
      const { length } = obj.children
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
          let yindexSelf = 0
          yindexSelf = yindex + (i + 1) - length / 2 - 0.5
          if (!mainLimit[xindex]) {
            mainLimit[xindex] = { left: 0, right: 0 }
          }
          dfs(x, nodes, edges, xindex + 1, yindexSelf, { pre: [...config.pre, obj.pid] })
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