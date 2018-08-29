// 26 -- Synchronizacja stanu zewnętrznego

/* 
    Stworzymy ZEWNĘTRZNE ŹRÓDŁO STANU dla naszej aplikacji, dzięki któremu będziemuy mogli
    PROPAGOWAĆ stan aplikacji z dowolonego miejsce w dowolne inne.
    Do tej pory mamy dwa komponenty stanowe które mają jak gdyby swoje wewnetrzne stany,
    a komunikują się poprzez przesyłanie atrybutów.
    Nie trudno się domyślić jaki bałagan by wprowadził ten sposób przy większej ilości 
    komponentów! Poza tym nasze 2 są "blisko siebie" a przecież docelowo chcemy panować 
    nad całymi ogromnymi aplikacjami z komponentami całkowiecie od siebie niezależnymi.
    DLATEGO STWORZYMY CAŁKIEM OSOBNY OBIEKT do zarządzania stanami aplikacji,
    I TO Z NIM BĘDĄ SIĘ KOMUNIKAOWAĆ poszczególne komponenty A NIE Z SOBĄ NAWZAJEM.
    I właśnie nasza struktura widoku w REAKCIE będzie REWAKTYWNIE reagować na zmiany 
    w tym obiekcie.
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

// ==========================================================================================================================================================
// ==========================================================================================================================================================
// ==========================================================================================================================================================



// << 2 >>
function StateStore(){
    this.state = {}

    this.dispatchEvents = () => {
        this.callback(this.state)
    }

    this.callback = function(){};   // domyślna funkcja, dopóki nie zostanie nadpisana 

    this.addListener = (callback) => {
        this.callback = callback;
    }

    this.createAction = function(handler){
        var state = this.state;

        return function(){
            handler.apply(state, arguments);
            AppState.dispatchEvents()
        }
    }

    this.createActions = function(handlersMap){
        var actions = {};
        for (let name in handlersMap){
            actions[name] = this.createAction(handlersMap[name]);
        }

        return actions;
    }
}

// << 1 >>
var AppState = new StateStore() 

AppState.state = {
    page: 1,
    courses: courses_data,
    list: courses_data.slice(0,3)
}

var actions = AppState.createActions({

    loadMore: function(event){ 
        var page = this.page + 1;

            console.log(event);
            this.page = page,
            this.list = this.courses.slice(0, this.page * 3)
        }
})



const App = React.createClass({
    // << 3 >> zmiana initialState
    getInitialState: function(){
        return this.props.store.state;
    },

    // << 4 >>
    componentDidMount: function(){
        AppState.addListener((state) => {
            this.setState({
                page: state.page,
                list: state.list
            })
        })
    },

/*     loadMore: function(){
        var page = this.state.page + 1;

        this.setState({
            page: page,
            list: this.props.list.slice(0, page * 3)
        })
    }, */

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

ReactDOM.render(<App store={AppState}/>, document.getElementById("root"));

/* 
    Na ten moment CAŁA LOGIKA (stanowa) APLIKACJI znajdzuje się w komoponencie App.
    Nie chcemy żeby tak było, chcemy ją wyciągnąć i wydzielić jej osobne miejsce.
    Tworzymy więc sobie nasze "źródło stanu" - AppStore.
    << 1 >> Tworzymy je w ten sposób, że będziemy mieć w nim metody do zażądzania stanami.
    << 2 >> Tworzymy także od razu KONSTRUKTOR StateStore
        Będzie w nim przechowywać STAN oraz deklarujmey funkcję, która ten stan będzie "ogłaszać"
        Czyli to AppState to ZMIENNA przechowująca obiekt StateStore

    << 3 >> PRZENOSIMY STATE do naszego AppState:
            AppState.state = {
                page: 1,
                courses: courses_data,
                list: courses_data.slice(0,3)
            }

        A TO: (w App)
            getInitialState: function(){
                return {
                    page: 1,
                    list: this.props.list.slice(0,3)
        Zmieniamy na:
            getInitialState: function(){
                return {    
                    this.props.store.state;
                
        I żeby to grało to zmieniamy w GŁÓWNEJ funkcji render to:
        ReactDOM.render(<App list={courses_data}/>, document.getElementById("root"));
        Na to:  -->  <App store={AppState}/> 
        CZYLI POD ZMIENNĄ store MAMY CAŁY NASZ OBIEKT AppState
        
                    DO 5:00 minury SPOKO, później już kurrrwa ja pierdole

---------------------------------------------------------------------------------------
    PRZEDE WSZYSTKIM PAMIĘTAJ ŻE SETSTATE !!!!!! WYOWŁUJE RENDER !!!!!!!!!!!!!!!!!
---------------------------------------------------------------------------------------

    TERAZ KURWA HARDOKR
    Chcemy w App nasluchiwac na zmiany stanu, czyli na to co się dzieje w funkcji 
        dispatchEvents w:
                function StateStore(){
                    this.state = {}
                    this.dispatchEvents = function(){
                    }
    
    Wtawiamy Reactową metodę:   -->  componentDidMount()   która 
    zostanie wykonana przez REacta WUTOMATYCZNIE W CHWILI POJAWIENIA SIĘ
    NASZEGO KOMPONENTU NA STRONIE !!!
    Czyli wszystko co wniej się zrobi, MAMY PEWNOŚĆ ŻE ZROBI SIĘ GDY 
    KOMPONENT BĘDZIE JUŻ ZAŁADOWANY, GOTOWY, PODPIĘTY NA STRONIE

    Musimy NASŁUCHIWAĆ na zmianach! W czystym JS NIE DA SIĘ OBSERWOWAĆ
    obiektu StateStore, TRZEBA PRZEKAZAĆ mu jakiś HANDLER
    Robimy to tak jak WYWOŁUJE SIĘ ZDARZENIA, np kliknięcia
    Dodajemy eventListener.
        componentDidMount: function(){
            AppState.addListener(function(){
                //
            })}
    FUNCKJA PRZEKAZANA TUTAJ jako CALLBACK, zostanie wywołania
    ZA KAŻDYM RAZEM, gdy ktoś wywoła dispatchEvents w StateStore 



}

            

*/