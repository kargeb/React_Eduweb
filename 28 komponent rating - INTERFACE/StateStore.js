function StateStore() {
    this.state = {}

    this.dispatchEvents = () => {
        this.callback(this.state)
    }

    this.callback = function () { };

    this.addListener = (callback) => {
        this.callback = callback;
    }

    this.createAction = function (handler) {
        var state = this.state;

        return function () {
            handler.apply(state, arguments);
            AppState.dispatchEvents()
        }
    }

    this.createActions = function (handlersMap) {
        var actions = {};
        for (let name in handlersMap) {
            actions[name] = this.createAction(handlersMap[name]);
        }

        return actions;
    }
}