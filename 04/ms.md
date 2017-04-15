# h5/c3

DOCTYPE告诉浏览器用什么规范解析文档

严格模式规范呈现,混杂模式向后兼容

四大内核雄霸(trident,gecko,webkit,blink),webkit一统天下

正确的标签作正确的事

内容结构化,解析明了化,维护简单化

锚点类似标签,a跳转

label元素可附带for属性

header footer aside article nav section

a:普通,下载,邮件,js,锚点

link与@import(祖先,加载,数,兼容,控制)不同

css层叠
- 继承性:文本,列表,表格
- 层叠性:合多为一
- 优先级:id class 标签

盒模型 浮动 相对,绝对,固定

display:none 消失 visibility:hidden 透明

content padding margin border

伪类:状态 目标 结构 否定

背景颜色优化加载显示

块居中:
- 水平:margin:0 auto;
- 垂直:position:absolute; top:0; bottom:0;

替换字体防意外

任何元素均可浮动

固定表格加速显示,自动表格适应内容

content属性与伪元素配合,插入内容

sprites:减少:请求,大小,命名;麻烦:合成,设置,维护

css3:选择器,转换,渐变,动画,其他

reset:去除默认样式

不建议用*

兼容: 符合标准,前缀,hack(+,_),reset

# dom/bom

区别:
- innerHTML:HTML
- innerText:文本
- textContent:内容(nodeValue)

修改属性
- attributes[]
- getAttribute()
- getAttributeNode()

获取节点:get- query document 关系

事件:HTML JS 监听

windows: screens location history navigator event

# js

类型
- 原始 string number boolean null undefined
- 引用 object


```
&& false 阻断    || true 阻断
```


全局变量:global

- 原型链 查找 对象属性 原型继承的实现方式
- 作用域链 解析 标识符 词法作用域的实现方式

复制对象的核心:JSON化
var newobj =JSON.parse(JSON.stringify(obj))

arguments:类数组对象 访问参数

定义函数:函数声明 函数表达式 构造函数

全局函数:parseInt isNaN eval parseFloat encodeURI decodeURI

数组变栈: push() pop()

正则表达式为字符串描述特定字符串

正则:
- 结合String:replace search match
- 定义RegExp:exec test

匿名无名直调,不重临时无污染

任何js片段都有作用域链,上面有对象,属性为变量;顶层全局,函数局部;区域运行,生成活动,需要变量,向上查找.运行完成,活动回收.


闭包:作用域内保存内变量
- 局部变量
- 内嵌函数
- 外部使用

自定义对象:
- 直接量
- 构造函数
- new
- create

this:制定当前对象
- 方法:this指 函数:this不(全局,undefined)

继承:
- 函数对象有方法与属性.
- prototype存原型,共享属性与方法
-  自有独有:hasOwnProperty
-  继承共有:in


继承:
修改构造函数原型
单独修改一个对象原型

继承都源于原型

```
function B(){}
function A(){}

B.prototye=new A();

B.prototype=A.prototype

var b=new B();
Object.setprotype(b,new A())

function B(){
    Object.setprototype(this,new A())
}
```

call参数,apply数组,间接调用函数

# pc 端兼容
## (1)定义不同
1. 对于各种元素margin和padding的默认值不一样.
2. 早期ie浏览器和其他浏览器的css盒模型不一样,IE6和IE7，对CSS的解析认识不完全一样.

## (2)支持程度不同
3. css3
4. ES5 (IE8只支持defineProperty、getOwnPropertyDescriptor的部分特性和JSon的新特性，IE9支持除了严格模式以外的新特性)
5. html5的标签 

## (3)IE67 bug
7. IE6:定位位置错误,绝对定位1像素偏差,定位元素消失,浮动双边距,浮动3像素空隙
8. IE67:定位元素溢出不动,表单元素偏离,图片链接无效








###### //暂时更到这里
###### //如有错误:webjxj@foxmail.com万分感谢


