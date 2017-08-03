"use strict"
/* 此文件为一些过渡性代码 */
/*use ES5 defineProperty*/
function Observer (data) {
  this.data = data;
  this.dep = new Dep();

  if(Array.isArray(data)){
    //暂不考虑数组
  }else{
    this.makeObserver(data);
  }
}

Observer.prototype.setterAndGetter = function (key, val) {
  let dep = new Dep();
  if(typeof val === 'object'){
    var childOb = new Observer(val);
  }

  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function(){
      console.log('你访问了' + key);

      if(Dep.target){
        dep.depend();
        if(childOb){
          childOb.dep.depend();
        }
      }
      return val;
    },
    set: function(newVal){
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);

      if(newVal === val) return
      val = newVal;

      if(typeof val === 'object'){
        childOb = new Observer(newVal);
      }

      dep.notify();
    }
  })
}
Observer.prototype.makeObserver = function (obj) {
  let val;
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      val = obj[key];
      //深度遍历
      if(typeof val === 'object'){
        new Observer(val);
      }
    }
    this.setterAndGetter(key, val);
  }
}
Observer.prototype.$watch = function(attr, callback){
  //this.eventsBus.on(attr, callback);
  for(let key in this.data){
    if(this.data.hasOwnProperty(key) && typeof this.data[key] === 'object'){
      this.data[key].__ob__.eventsBus.on(attr, callback);
    }
  }
}

//观察者
function Dep(){
  this.subs = [];
}
Dep.target = null;

Dep.prototype.depend = function(){
  Dep.target.addDep(this);
}

Dep.prototype.addSub = function(sub){
  this.subs.push(sub);
}
Dep.prototype.notify = function(){
  for(let i = 0, len = this.subs.length; i < len; i++ ){
    this.subs[i].update();
  }
}


//watcher
function Watcher(value, attr){
  this.value = value;
  this.attr = attr;
  this.get();
}

Watcher.prototype.beforeGet = function(){
  Dep.target = this;
}

Watcher.prototype.get = function(){
  this.beforeGet();

  let val = this.value[this.attr];

  if(typeof val === 'object'){
    for(let childAttr in val){
      new Watcher(val[childAttr], childAttr);
    }
  }
}

Watcher.prototype.addDep = function(dep){
  dep.addSub(this);
  console.log("我订阅了basicInfo的变化")
}
Watcher.prototype.update = function(){
  console.log('name或者age变了，导致basicInfo变了，但是我要根据数据的变化来做一些牛逼的事情');
}





let app2 = new Vue({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});





//dom绑定
button.onclick = function() {
    eval(input.value);
    input.value = '';
}