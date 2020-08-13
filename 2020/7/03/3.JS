/*
 * @LastEditTime: 2020-07-07 11:10:28
 * @LastEditors: jinxiaojian
 */

// 拆分reducer

function counterReducer (state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

function InfoReducer (state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

function combineReducers (reducers) {
  /* reducerKeys = ['counter', 'info']*/
  const reducerKeys = Object.keys(reducers)
  /*返回合并后的新的reducer函数*/
  return function combination (state = {}, action) {
    /*生成的新的state*/
    const nextState = {}
    /*遍历执行所有的reducers，整合成为一个新的state*/
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const stateCell = state[key]
      /*执行 分 reducer，获得新的state*/
      const newStateCell = reducers[key](stateCell, action)
      nextState[key] = newStateCell
    }
    return nextState;
  }
}


const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}
const createStore = function (reducer, initState) {
  let state = initState
  let listeners = [];
  /*订阅*/
  function subscribe (listener) {
    listeners.push(listener);
  }
  function dispatch (action) {
    state = reducer(state, action);
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

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
});