// 35 praca z formularzami

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
					{ this.state.filtered_list.map( (course) => (
						<a href="#" key={course.id} className={ "list-group-item" + (this.props.selected === course ? " active" : "" ) } 
							onClick={ () =>  this.props.onSelect(course) }>
							<h4 className="list-group-item-heading"> {course.title} </h4>
							<p className="list-group-item-text"> {course.author} </p>
						</a>
					))}
				</div>
			</div>
		)
	}
})

const CoursesEditor = React.createClass({

	getInitialState: function(){
		return {
			selected: null
		}
	},

	select: function(course){	
		this.setState({
			selected : course
		})
	},

	render: function(){
		return <div>
			<div className= { this.state.selected ? "col-xs-4" : "col-xs-12" }>
				<h1>Edytor Kursów</h1>
				<hr/>
				<CourseSearch courses={ this.props.courses} onSelect={ this.select } selected={ this.state.selected } ></CourseSearch>
			</div>
			{ this.state.selected ? 
			<div className="col-xs-8">
		
				<CourseForm course={ this.state.selected }></CourseForm>
			</div> : null }
		</div>
	}
})

const CourseForm = React.createClass({		

	getInitialState: function(){
		return {
			course: this.props.course
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			course: nextProps.course
		})
	},

	changedTitle: function(e){

		let course = this.state.course;
		course.title = e.target.value;

		this.setState({
			course: course
		})
	},

	render: function(){
		return <div>
			<form>
				<div className="form-group">
					<label className="control-label">Nazwa kursu</label>
					<div>			
						<input type="text" className="form-control" value={ this.state.course.title } onChange={ this.changedTitle }/>
					</div>
				</div>
			</form>
		</div>
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
					<h3>Lekcja 35 praca z formularzami</h3>
					<Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>

					<div className="row">
					<div className="col-xs-12">
					</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<CoursesEditor courses={ this.state.courses_source } ></CoursesEditor>
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