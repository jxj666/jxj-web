// es6 去重排序
let arr = [...new Set(['2018', '2018', '2017'])].sort(function(a, b) {
    return a - b;
});