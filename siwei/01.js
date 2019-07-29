/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-07-05 10:42:44
 * @LastEditTime: 2019-07-22 19:34:33
 * @LastEditors: 靳肖健
 */
var dataArr = [
  // { show:0,title: ``,text:``, img: `` },


  { show: 0, title: `模块方案`, text: `网页越来越像桌面程序,需要一个团队分工协作、进度管理、单元测试等等 . Javascript模块化编程,理想情况下,开发者只需要实现核心的业务逻辑,其他都可以加载别人已经写好的模块`, img: `19/07/模块方案.png` },
  { show: 0, title: `typescript`, text: `TypeScript 是微软2012年推出的一种编程语言,属于 JavaScript 的超集,可以编译为 JavaScript 执行 .  它的最大特点就是支持强类型  `, img: `19/07/typescript.png` },
  { show: 0, title: `webpack`, text: `webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler) . 当 webpack 处理应用程序时,它会递归地构建一个依赖关系图(dependency graph),其中包含应用程序需要的每个模块,然后将所有这些模块打包成一个或多个 bundle`, img: `19/07/webpack.png` },


  { show: 0, title: `选择排序`, text: `第一次从待排序的数据元素中选出最小（或最大）的一个元素,存放在序列的起始位置,然后再从剩余的未排序元素中寻找到最小（大）元素,然后放到已排序的序列的末尾 . 以此类推,直到全部待排序的数据元素的个数为零(不稳定)`, img: `19/07/选择排序.png` },
  { show: 0, title: `插入排序`, text: `每步将一个待排序的记录,按其关键码值的大小插入前面已经排序的文件中适当位置上,直到全部插入完为止(稳定)`, img: `19/07/插入排序.png` },
  { show: 0, title: `冒泡排序`, text: `它重复地走访过要排序的元素列,依次比较两个相邻的元素,如果他们的顺序（如从大到小、首字母从A到Z）错误就把他们交换过来 . 走访元素的工作是重复地进行直到没有相邻元素需要交换,也就是说该元素列已经排序完成(稳定)`, img: `19/07/冒泡排序.png` },
  { show: 0, title: `js异步处理`, text: `在浏览器端,耗时很长的操作都应该异步执行`, img: `19/07/js异步处理.png` },

  { show: 0, title: `canvas`, text: `HTML5 <canvas> 元素用于图形的绘制,通过脚本 (通常是JavaScript)来完成. <canvas> 标签只是图形容器,您必须使用脚本来绘制图形. 你可以通过多种方法使用 canvas 绘制路径,盒、圆、字符以及添加图像.`, img: `19/07/canvas.png` },
  { show: 0, title: `Grid`, text: `网格布局（Grid）是最强大的 CSS 布局方案 . Flex 布局是轴线布局,只能指定"项目"针对轴线的位置,可以看作是一维布局 . Grid 布局则是将容器划分成"行"和"列",产生单元格,然后指定"项目所在"的单元格,可以看作是二维布局`, img: `19/07/Grid.png` },
  {
    show: 0, title: `web 开发框架`, text: `koa2与express 提供的API大致相同,express是大而全,内置了大多数的中间件,更让人省心,koa2不绑定任何的框架,干净简洁,小而精,更容易实现定制化,扩展性好.express是没有提供ctx来提供上下流服务,需要更多的手动处理,express本身是不支持洋葱模型的数据流入流出能力的,需要引入其他的插件.`, img: `19/07/web+开发框架.png`
  },
  { show: 0, title: `JWT`, text: `JSON Web Token（JWT）是目前最流行的跨域认证解决方案`, img: `19/07/JWT.png` },
  { show: 0, title: `RESTful API`, text: `RESTful 是目前最流行的 API 设计规范,用于 Web 数据接口的设计`, img: `19/07/RESTful+API.png` },
  { show: 0, title: `proxy`, text: `Proxy 用于修改某些操作的默认行为,等同于在语言层面做出修改,所以属于一种“元编程”（meta programming）,即对编程语言进行编程 . Proxy 实际上重载（overload）了点运算符,即用自己的定义覆盖了语言的原始定义 . Proxy 这个词的原意是代理,用在这里表示由它来“代理”某些操作,可以译为“代理器” . `, img: `19/07/proxy.png` },
  { show: 0, title: `常见网络攻击`, text: `常见网络攻击:XSS攻击全称跨站脚本攻击是一种在web应用中的计算机安全漏洞,它允许恶意web用户将代码植入到提供给其它用户使用的页面中.CSRF站请求伪造是一种对网站的恶意利用.CSRF通过伪装成受信任用户的请求来利用受信任的网站.CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范,所以被认为比XSS更具危险性`, img: `19/07/常见网络攻击.png` },
  { show: 0, title: `deno`, text: `Node 之父 Ryan Dahl 发布新的开源项目 deno,从官方介绍来看,可以认为它是下一代 Node,使用 Go 语言代替 C++ 重新编写跨平台底层内核驱动,上层仍然使用 V8 引擎,最终提供一个安全的 TypeScript 运行时`, img: `19/07/deno.png` },
  { show: 0, title: `PWA`, text: `PWA（Progressive web apps）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序`, img: `19/07/PWA.png` },
]