function StateStore(){
	this.state = {}

	this.setState = function(state){
		this.state = {...this.state, ...state}
		this.dispatchEvents()
	}

	this.dispatchEvents = ()=> {
		for(let callback of this.callbacks){
			callback(this.state)
		}
	}	

	this.callbacks = []

	this.addListener = (callback) => {
		this.callbacks.push(callback);
	}

	this.createAction = function(handler){
		var state = this.state;
		return function(){
			handler.apply(state, arguments);

			AppState.dispatchEvents();
		}
	},

	this.createActions = function(handlersMap){
		var actions = {}
		for(let name in handlersMap){
			actions[name] = this.createAction(handlersMap[name])
		}
		return actions;
	}
}