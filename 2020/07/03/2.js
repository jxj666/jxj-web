/*
 * @LastEditTime: 2020-07-03 16:00:37
 * @LastEditors: jinxiaojian
 */ 

function reducer(state, action) {
  switch (action.type) {
    case '+':
      return {
        ...state,
        count: state.count + 1
      }
    case '-':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      console.log('error')
      return state;
  }
}
const createStore = function (reducer,initState) {
  let state = initState
  let listeners = [];
  /*订阅*/
  function subscribe (listener) {
    listeners.push(listener);
  }
  function dispatch (action) {
    state =reducer(state,action) ;
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
    dispatch,
    getState
  }
}


let initState = {
  count: 0
}
let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.count);
});
store.dispatch({
  type: '+'
});
store.dispatch({
  type: '-'
});
store.dispatch({
  count: 'abc'
});