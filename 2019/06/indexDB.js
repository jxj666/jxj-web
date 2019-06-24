/*
 * @Description: 
 * @Author: jinxiaojian
 * @Email: jinxiaojian@youxin.com
 * @Date: 2019-06-13 11:02:16
 * @LastEditTime: 2019-06-13 15:17:13
 * @LastEditors: 靳肖健
 */
var request = window.indexedDB.open('jxj', 1);
request.onerror = function (event) {
  console.log('数据库打开报错');
};
var db;
request.onsuccess = function (event) {
  db = request.result;
  console.log('数据库打开成功');
};
request.onupgradeneeded = function (event) {
  db = event.target.result;
}

var objectStore;
request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains('jxj')) {
    objectStore = db.createObjectStore('jxj', { keyPath: 'index' });
    objectStore.createIndex('java', 'java', { unique: false });
    objectStore.createIndex('js', 'js', { unique: true });
  }
}

function add () {
  var request = db.transaction(['jxj'], 'readwrite')
    .objectStore('jxj')
    .add({ id: 1, java: 5, js: 5 });

  request.onsuccess = function (event) {
    console.log('数据写入成功');
  };

  request.onerror = function (event) {
    console.log('数据写入失败');
  }
}

add();