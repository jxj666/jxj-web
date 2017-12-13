// get_by_class函数实现获取指定类名的子元素列表，语法如下：
// var elements = get_by_class(element, names);
// 使用示例如下：
// 如果html元素
// <div id="example">
//   <p id="p1" class="aaa bbb">1</p>
//   <p id="p2" class="aaa ccc">2</p>
//   <p id="p3" class="bbb ccc">3</p>
// </div>
// 对应的DOM节点为example, 那么
// get_by_class(example, “aaa”); 运行结果为包含id为p1, id为p2的元素列表
// get_by_class(example, “bbb ccc”);运行结果为包含id为p3的元素列表
// get_by_class(example, “ccc bbb”);运行结果为包含id为p3的元素列表
// 请实现get_by_class方法，要求浏览器兼容。








function get_by_class(element, names) {

    var elements = element.getElementsByTagName('*');
    var result = [];
    var element, classNameStr, flag;
    names = names.split(' ');
    for (var i = 0; i < elements.length; i++) {
        element = elements[i];
        classNamesrtr = " " + element.className + ' ';
        flag = true;
        for (var j = 0, name; j < names.length; j++) {
            name = names[j];
            if (classNameStr.indexOf(' ' + name + ' ') == -1) {
                flag = false;
                break;
            }
        }
        if (flag) {
            result.push(element);
        }
    }
    return result;

}