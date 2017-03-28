# 后端遇到的相关问题
## 数据库要用到的表

### 管理者表
glid
user
password
### 顾客表
gkid 
phone
name
address
credit(信用)
### 商品表
spid
imgsrc
name
introduce
number(编号)
### 交易表
jyid
spid
gkid
number(数量)
unit(单位)
status(订单状态)
time(下单时间)
group(团购状态)

## 遇到的问题
1. 对交易表按时间倒序查询,一开始查20条,下拉,每次增加10条
1. 根据顾客手机号,查询顾客表后查询该账号交易表下的所有交易,一开始查十条,每次增加20条,下拉,每次增加10条
1. 计算交易表中某一类 spid 的数量,将其与预定团购数取余,输出一个数据(在页面上显示还有多少个凑团可以成功) 当取余为0时,标记交易表 status 中不为 true 的为 true(即进入团购状态).
1. 根据交易表 spid (商品种类)查询其中所有 status 为 false(未完成订单) 的订单,将数据按时间倒序输出,并输出数量
1. 根据交易表 gkid (顾客)查询其中所有的订单,将数据按时间倒序输出,并输出数量


