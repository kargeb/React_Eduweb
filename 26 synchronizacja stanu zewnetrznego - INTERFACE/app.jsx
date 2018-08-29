// 26 -- Synchronizacja stanu zewnętrznego

/* 
    
*/

const CoursesList = (props) => {
    var list = props.list;
    return (
        <div> 
            <h1>Kursy</h1> 
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                    
                    {/* Course promo */}
                    < CoursePromoLabel data={data} />
                    {/* Course actions */}
                    <div className="btn-group pull-right">
                        <Button label="Szczegóły kursu" />
                        <StateButton />
                    </div>

                </Course>)}
            </div>
        </div>
    )
}

var StateButton = React.createClass({

    getInitialState: function(){
        return {
            active: this.props.active
        }
    },

    getDefaultProps: function(){
        return {
            active: true
        }
    },

    setActive: function(){
        this.setState({
            active: true
        })
    },

    setInactive: function(){
        this.setState({
            active: false
        })
    },

    render: function(){
        return (this.state.active ? 
            <Button label="Usuń z ulubionych" icon="star" onClick={ this.setInactive }/> :
            <Button label="Dodaj do ulubionych" icon="star-empty" onClick={ this.setActive } />
        )
    }
})

const ShoppingCartList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1>Koszyk</h1>
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
                    <Button label="Przenieś do ulubionych" icon="star" />
                </Course>)}
            </div>
        </div>
    )
}

const App = React.createClass({

    getInitialState: function(){
        return {
            page: 1,
            list: this.props.list.slice(0,3)
        }
    },

    loadMore: function(){
        var page = this.state.page + 1;

        this.setState({
            page: page,
            list: this.props.list.slice(0, page * 3)
        })
    },

    render: function(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Lekcja 26 -- Synchronizacja stanu zewnętrznego</h3>
                            <CoursesList list={ this.state.list } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr /> 
                            <button className="btn btn-default btn-block" onClick={this.loadMore} > Pokaż więcej ... </button>
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

ReactDOM.render(<App list={courses_data}/>, document.getElementById("root"));

/* 
        
*/