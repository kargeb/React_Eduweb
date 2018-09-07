// 34 formularze kontrolowane

/*

*/

const CourseSearch = React.createClass({

	getInitialState: function(){
		return {
			"query": "",
			"filtered_list": []
		}
	},

	filterList: function(event){

		event.persist();

		console.log(event);

		clearTimeout(this.pending);

		this.pending = setTimeout(() => {
			let query = event.target.value;

			this.setState({
				filtered_list: this.props.courses.filter((course) => (
					query.length >= 3 &&
					(course.title.toLowerCase().includes((query).toLowerCase())
						|| course.description.toLowerCase().includes((query).toLowerCase())
						|| course.author.toLowerCase().includes((query).toLowerCase())
					)
				))
			})
		}, 500)
	},

	render: function () {
		return (
			<div>
				<input type="text" className="form-control" onChange={ this.filterList } placeholder="Filtruj listę kursów" />
				<hr />
				<div className="list-group">
					{/* {this.props.courses.map((course) => ( */}
					{ this.state.filtered_list.map( (course) => (
						<a href="#" key={course.id} className="list-group-item">
							<h4 className="list-group-item-heading"> {course.title} </h4>
							<p className="list-group-item-text"> {course.author} </p>
						</a>
					))}
				</div>
			</div>
		)
	}
})


const App = React.createClass({

	getInitialState: function () {
		return this.props.store.state;
	},

	componentDidMount: function () {
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	render: function () {
		return (
			<div>
				<div className="container">
					<h3>Lekcja 34 formularze kontrolowane</h3>
					<Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>

					<div className="row">
					<div className="col-xs-12">
					</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<h1>Wyszukiwarka</h1>
									<CourseSearch courses={ this.state.courses_source } ></CourseSearch>
								</TabPanel>
								<TabPanel name="Koszyk">
									<ShoppingCartList list={this.state.cart_list} />
								</TabPanel>
								<TabPanel name="Ulubione">
									<FavouritesCoursesList list={this.state.favourites_list} />
								</TabPanel>
								<TabPanel name="Kursy">
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

/* 

*/ 