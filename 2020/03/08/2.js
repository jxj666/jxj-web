class ClassLazyMan {
  constructor(name) {
    this.taskList = [];
    this.name = name;
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  sleepFirst(time) {
    var that = this;
    var fn = (function(t) {
      return function() {
        setTimeout(() => {
          console.log(`等待了${t}秒...`);
          that.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.unshift(fn);
    return this;
  }
  eat(name) {
    var that = this;
    var fn = (function(n) {
      return function() {
        console.log(`I am eating ${n}`);
        that.next();
      };
    })(name);
    this.taskList.push(fn);
    return this;
  }
  sleep(time) {
    var that = this;
    var fn = (function(t) {
      return function() {
        setTimeout(() => {
          console.log(`等待了${t}秒...`);
          that.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.push(fn);
    return this;
  }
  next() {
    var fn = this.taskList.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new ClassLazyMan(name);
}

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(1)
  .sleep(2)
  .eat("junk food");
// Hi I am Tony
// 等待了1秒...
// I am eating lunch
// I am eating dinner
// 等待了2秒...
// I am eating junk food
