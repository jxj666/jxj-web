/*
 * @Description:
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-13 15:21:03
 * @LastEditTime: 2019-06-13 17:59:12
 * @LastEditors: 靳肖健
 */

console.log("test.js")

// // 创建/打开数据库
// var db;
// function openDB (name, version) {
//   version = version || 1;
//   //打开或创建数据库
//   var idbRequest = window.indexedDB.open(name, version);
//   idbRequest.onerror = function (e) {
//     console.warn('error: %s', e.currentTarget.error.message);
//   };

//   idbRequest.onsuccess = function (e) {
//     db = e.target.result; //这里才是 indexedDB对象
//     console.log('idbRequest === e.target: %o', idbRequest === e.target);
//     console.log('db: %o, idbRequest: %o', db, idbRequest);
//   };

//   // 注意: 只能请求>=当前数据库版本号的版本
//   //  大于当前版本号, 则触发 onupgradeneeded, 
//   //  小于当前版本号，则触发 onerror
//   idbRequest.onupgradeneeded = function (e) {
//     var db = e.target.result;
//     if (!db.objectStoreNames.contains('jxj')) {
//       db.createObjectStore('jxj', { keyPath: "id", autoIncrement: true });
//     }
//     console.log('DB version changed to ' + version);
//   };
// }
// openDB('jxj', 2)


// // 删除数据库
// window.indexedDB.deleteDatabase(dbName);

// // 关闭数据库
// db.onclose = function(){
//     //do sth..
// };
// db.close();

// // 删除objectStore
// db.deleteObjectStore(storeName); //注意：需在onupgradeneeded钩子中执行

// // 保存数据到objectStore
// function saveData (dbName, version, storeName, data) {
//   var idbRequest = indexedDB.open(dbName, version);
//   idbRequest.onsuccess = function (e) {
//     var db = idbRequest.result;
//     var transaction = db.transaction(storeName, 'readwrite');//需先创建事务
//     var store = transaction.objectStore(storeName); //访问事务中的objectStore
//     data.forEach(function (item) {
//       store.add(item);//保存数据
//     });
//     console.log('保存成功');
//   }
// }
// saveData('jxj', 2, 'jxj', [{ name: 'js' }, { name: 'java' }])

// // 查找数据
// function getDataByKey (dbName, storeName, key) {
//   var idbRequest = indexedDB.open(dbName);
//   idbRequest.onsuccess = function (e) {
//     var db = idbRequest.result;
//     var transaction = db.transaction(storeName, 'readwrite');
//     var store = transaction.objectStore(storeName);
//     var dataRequest = store.get(key);
//     dataRequest.onsuccess = function (e) {//异步的
//       var ele = e.target.result;
//       console.log(ele.name);
//     };
//   }
// }
// getDataByKey('jxj', 'jxj', 2)


// // 更新数据
// function updateDataByKey (dbName, storeName, item) {
//   var idbRequest = indexedDB.open(dbName);
//   idbRequest.onsuccess = function (e) {
//     var db = idbRequest.result;
//     var transaction = db.transaction(storeName, 'readwrite');
//     var store = transaction.objectStore(storeName);
//     var dataRequest = store.put(item);
//     dataRequest.onsuccess = function (e) {//异步的
//       console.log('存储成功!');
//     };
//   }
// }
// updateDataByKey('jxj', 'jxj', { id: 3, name: "css" })




// 删除数据
// function deleteDataByKey (dbName, storeName, key) {
//   var idbRequest = indexedDB.open(dbName);
//   idbRequest.onsuccess = function (e) {
//     var db = idbRequest.result;
//     var transaction = db.transaction(storeName, 'readwrite');
//     var store = transaction.objectStore(storeName);
//     var dataRequest = store.delete(key);
//     dataRequest.onsuccess = function (e) {//异步的
//       console.log('删除成功!');
//     };
//   }
// }
// deleteDataByKey('jxj', 'jxj', 3)

// //清空数据
// function clearObjectStore (dbName, storeName, key) {
//   var idbRequest = indexedDB.open(dbName);
//   idbRequest.onsuccess = function (e) {
//     var db = idbRequest.result;
//     var transaction = db.transaction(storeName, 'readwrite');
//     var store = transaction.objectStore(storeName);
//     var dataRequest = store.clear();
//     dataRequest.onsuccess = function (e) {//异步的
//       console.log('清空成功!');
//     };
//   }
// }
// clearObjectStore('jxj', 'jxj')

