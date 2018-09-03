const LifeCycle = React.createClass({

	getDefaultProps: function(){
		console.log('getDefaultProps',arguments, this.props);	
		return { 
			name: ''
		}
	},

	getInitialState: function(){
		console.log('getInitialState',arguments, this.props);	
		return { 
			name: ''
		}
	},

	componentWillMount: function(){
		console.log('componentWillMount',arguments);			
	},

	componentDidMount: function(){
		console.log('componentDidMount',arguments);			
	},

	componentWillReceiveProps:function(nextProps){
		console.log('componentWillReceiveProps',arguments,nextProps,this.props);	
	},

	shouldComponentUpdate: function(nextProps, nextState){
		console.log('shouldComponentUpdate',arguments);	
		return true;	
	},

	componentWillUpdate: function(nextProps, nextState){
		console.log('componentWillUpdate',arguments);	
	},

	componentDidUpdate: function(prevProps,prevState){
		console.log('componentDidUpdate',arguments);
	},

	componentWillUnmount: function(){
		console.log('componentWillUnmount',arguments);	
	},

	render: function(){
		console.log('render',arguments);	

		return <div></div>
	}

})



const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state;
	},

	componentDidMount: function(){
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
				<h3>Lekcja 32 - Cykl zycia komponentu</h3>
		      <Nav onChange={actions.navigateTo} activeTab={this.state.activeTab} ></Nav>
		      <div className="row">
		        <div className="col-xs-12">
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xs-12">

		        	<Tabs activeTab={this.state.activeTab}>
						<TabPanel name="Koszyk">
							<ShoppingCartList list={this.state.cart_list} /> 
						</TabPanel>
						<TabPanel name="Ulubione">
							<FavouritesCoursesList list={this.state.favourites_list} />
						</TabPanel>
						<TabPanel name="Kursy">

							<LifeCycle name="LifeCycle" changingProp={this.state.favourites_list.length} />
						
							<CoursesList list={this.state.courses_list} />
		          			<hr />
		          			<button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>
						</TabPanel>
		        	</Tabs>
		        </div>
		      </div>
		    </div>
		    <footer className="footer">
		      <div className="container">
		        <p> </p>
		      </div>
		    </footer>
		  </div>
		)
	}
})
