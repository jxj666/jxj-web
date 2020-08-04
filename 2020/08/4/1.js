function composeTree(list) {
  const depMap = new Map();
  list.forEach(d => depMap.set(d.id, d));

  for (const d of list) {
    const parentId = d.parentId;
    if (depMap.has(parentId)) {
      const parentDep = depMap.get(parentId);
      parentDep.children = parentDep.children || [];
      parentDep.children.push(d);
    }
  }

  list.sort((a, b) => a.parentId - b.parentId);
  const [{ parentId }] = list;
  const newList = list.filter(dep => dep.parentId === parentId);

  return newList;
}
