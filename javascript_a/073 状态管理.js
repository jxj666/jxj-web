/*
 * @Description:
 * @Author: 靳小健
 * @Email: jinxiaojian@youxin.com
 * @LastEditors: 靳小健
 * @Date: 2018-08-15 11:34:44
 * @LastEditTime: 2019-03-05 16:34:28
 */
var store = {
  debug: true,
  state: {
    message: "Hello!",
  },
  setMessageAction(newValue) {
    if (this.debug) {
      console.log(`new ${newValue}`);
    }
    this.state.message = newValue;
  },
  clearMessageAction() {
    if (this.debug) {
      console.log(`clear`);
    }
    this.state.message = undefined;
  },
};
var vmA = new Vue({
  data: {
    privateState: {},
    sharedState: store.state,
  },
});
var vmB = new Vue({
  data: {
    privateState: {},
    sharedState: store.state,
  },
});
