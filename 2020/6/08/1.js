var removeNthFromEnd = function (head, n) {
  let dummy = head;
  let l = dummy;
  let r = dummy;
  let offset = n + 1;
  while (offset--) {
    if (!r) {
      return dummy.next;
    } else {
      r = r.next;
    }
  }
  while (r) {
    r = r.next;
    l = l.next;
  }
  l.next = l.next.next;
  return dummy;
};
