const Draggable = (props) => {
	return <div>{ props.children} </div>
}

const Droppable = (props) => {
	return <div>{ props.children} </div>
}



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
					<h3>Lekcja 31 drag and drop - obluga zdarzen</h3>
					<Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>

					<div className="row">
					<div className="col-xs-12">

						<Draggable>Przeciągnij mnie</Draggable>

						<Droppable>Upuść tutaj</Droppable>

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
