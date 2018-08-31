const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state;
	},

	componentDidMount: function(){
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list
			})
		})
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
		      <div className="row">
		        <div className="col-xs-12">
					{/* <ShoppingCartList list={cart_list} /> 
					<FavouritesCoursesList list={this.state.favourites_list} />*/}
					<CoursesList list={this.state.courses_list} />
		        </div>
		      </div>
		      <div className="row">
		        <div className="col-xs-12">
		          <hr />
		          <button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>
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
