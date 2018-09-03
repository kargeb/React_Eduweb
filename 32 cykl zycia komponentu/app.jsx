
const AppState = new StateStore();

AppState.setState({
	page: 1,
	courses_source: courses_data,

	courses_map: courses_data.reduce((map, course) => {
		map[course.id] = course;
		return map;
	},{}),
	courses_list: courses_data.slice(0,3),

	favourites_list: [],
	favourites_map: {},

	cart_list: [],
	cart_map: {},

	activeTab: 'Kursy',
})


const actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.courses_list = this.courses_source.slice(0, this.page * 3)
	},
	addFavourite: function(id){
		this.favourites_map[id] = true;
		this.favourites_list.push(this.courses_map[id])
	},
	removeFavourite: function(id){
		this.favourites_map[id] = false;
		let index = this.favourites_list.findIndex((c)=>c.id === id)
		if(index !== -1)
		this.favourites_list.splice(index,1)
	},
	addToCart: function(id){
		if(!this.cart_map[id]){
			this.cart_map[id] = 1;
			this.cart_list.push(this.courses_map[id])
		}else{
			this.cart_map[id]++
		}
	},
	removeFromCart: function(id){
		this.cart_map[id] === 0? 0 : this.cart_map[id]--;
		if(!this.cart_map[id]){
			let index = this.cart_list.findIndex((c)=>c.id === id)
			if(index !== -1)
			this.cart_list.splice(index,1)
		}
	},
	navigateTo: function(tabName){
		this.activeTab = tabName
	}
})


ReactDOM.render(<App store={AppState} actions={actions} />, document.getElementById('root'));

