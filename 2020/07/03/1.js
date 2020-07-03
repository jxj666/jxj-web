/*
 * @LastEditTime: 2020-07-03 11:25:07
 * @LastEditors: jinxiaojian
 */
// /*
//  * @LastEditTime: 2020-07-03 11:19:12
//  * @LastEditors: jinxiaojian
//  */ 
// /*------count 的发布订阅者实践------*/
// let state = {
//   count: 1
// };
// let listeners = [];

// /*订阅*/
// function subscribe(listener) {
//   listeners.push(listener);
// }

// function changeCount(count) {
//   state.count = count;
//   /*当 count 改变的时候，我们要去通知所有的订阅者*/
//   for (let i = 0; i < listeners.length; i++) {
//     const listener = listeners[i];
//     listener();
//   }
// }

// subscribe(() => {
//   console.log(state.count);
// });

// changeCount(2);
// changeCount(3);
// changeCount(4);


const creatStore = function (initState) {
  let state = initState
  let listeners = [];
  /*订阅*/
  function subscribe (listener) {
    listeners.push(listener);
  }
  function changeState (newState) {
    state = newState;
    /*当 state 改变的时候，我们要去通知所有的订阅者*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function getState () {
    return state
  }
  return {
    subscribe,
    changeState,
    getState
  }
}

let initState = {
  record: {
    num: 1
  }
}
let store = creatStore(initState)
store.subscribe(() => {
  {
    let state = store.getState()
    console.log(state)
  }
})
store.changeState({
  ...store.getState(),
  info: {
    type: 0
  }
})