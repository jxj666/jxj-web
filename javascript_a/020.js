// $class函数实现获取指定类名的子元素列表，语法如下：
// var elements = $class(element, names);
// 使用示例如下：
// 如果html元素
// <div id="example">
//   <p id="p1" class="aaa bbb">1</p>
//   <p id="p2" class="aaa ccc">2</p>
//   <p id="p3" class="bbb ccc">3</p>
// </div>
// 对应的DOM节点为example, 那么
// $class(example, “aaa”); 运行结果为包含id为p1, id为p2的元素列表
// $class(example, “bbb ccc”);运行结果为包含id为p3的元素列表
// $class(example, “ccc bbb”);运行结果为包含id为p3的元素列表
// 请实现$class方法，要求浏览器兼容。


function $class(element, names) {
    var elements = element.getElementsByTagName('*');
    var result = [];
    var classNameStr = '';
    var has_class = true;
    names = names.split(' ');
    for (var i = 0; i < elements.length; i++) {
        classNameStr = " " + elements[i].className + ' ';
        has_class = true;
        for (var j = 0, name; j < names.length; j++) {
            if (classNameStr.indexOf(' ' + names[j] + ' ') == -1) {
                has_class = false;
                break;
            }
        }
        if (has_class) {
            result.push(elements[i]);
        }
    }
    return result;
}