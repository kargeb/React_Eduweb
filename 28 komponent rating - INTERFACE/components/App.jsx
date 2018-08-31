const App = React.createClass({

    getInitialState: function(){
        return this.props.store.state;
    },

    componentDidMount: function(){

        AppState.addListener((state) => {
            this.setState({
                
                page: state.page,
                list: state.list,
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
                            <h3>Lekcja 28 komponent rating</h3>
                            {/* <FavouritesCoursesList list={ this.state.favourites_list } /> */}
                            <CoursesList list={ this.state.list } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr /> 
                            <button className="btn btn-default btn-block" onClick={actions.loadMore} > Pokaż więcej ... </button>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <p />
                    </div>
                </footer>
            </div>
        )
    }
})