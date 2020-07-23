/*
 * @Author: your name
 * @Date: 2020-06-21 21:34:19
 * @LastEditTime: 2020-07-08 21:56:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jxj-web\2020\06\21\1.js
 */ 
//翻转
const reverse = (total, now) => {
    let prev = now.next;
    let p = total;
    while (prev !== now) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }

    return [now, total];
}
var reverseKGroup = function(head, k) {
    //初始循环体
    let total=head
    
    //添加前置节点
    const head0 = new ListNode(0);
    head0.next = total;

    //初始循环首
    let pre = head0;

    while (total) {
        let now = pre;

        // 查看剩余部分长度是否符合条件,大于等于 k
        for (let i = 0; i < k; ++i) {
            now = now.next;
            if (!now) {
                return head0.next;
            }
        }

        const next = now.next;
        [total, now] = reverse(total, now);
        console.log(total)
        console.log(now)
        
        // 节点交换
        pre.next = total;
        now.next = next;

        //循环首
        pre = now;
        //循环体
        total = now.next;
    }

    return head0.next;
};


