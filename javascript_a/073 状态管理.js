var store = {
    debug: true,
    state: {
        message: 'Hello!'
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
    }
};
var vmA = new Vue({
    data: {
        privateState: {},
        sharedState: store.state
    }
});
var vmB = new Vue({
    data: {
        privateState: {},
        sharedState: store.state
    }
});