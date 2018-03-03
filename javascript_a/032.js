// 快速打乱一个数组(存在规律瑕疵)
var arr = [1, 2, 3, 4, 5]
arr.sort(function() {
    return Math.random() - 0.5
})