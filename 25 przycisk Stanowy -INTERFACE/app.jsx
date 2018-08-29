// 25 -- Przyciks stanowy

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
                    < CourseActions data={data} />

                </Course>)}
            </div>
        </div>
    )
}

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
                            <h3>Lekcja 25 -- Przyciks stanowy</h3>
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