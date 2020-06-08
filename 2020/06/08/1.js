

var removeNthFromEnd = function (head, n) {
  let dummy = head 
  let l = dummy 
  let r = dummy 
  let offset = n+1  
  while (offset--) {
    r = r.next 
    if (offset > 1 && r === null) {
      return dummy.next
    }
  }
  while (r) {
    r = r.next 
    l = l.next 
  }
  l.next = l.next.next 
  return dummy 
} 

  

