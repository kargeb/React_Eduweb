// 27 synchronizacja stanu komponentow

/* 
    Poprzednio udało nam się KOMPLETNIE oddzielić STAN aplikacji od Struktury komponentów, tak
    żeby odbywało się wszytsko w sposób reaktwny. Zorbiliśmy to dla tylko jednego elementu,
    dla przycisku "pokaz wiecej". Teraz idziemy dalej, zajmiemy się przyciskiem "dodaj do ulubionych"
    tak żeby modyfikował drugą listę odpowiadającą za pozyje ulubione.
*/

const CoursesList = ({list}) => (
    // var list = props.list;
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
                        <StateButton  active={AppState.state.favourites_map[data.id]} onActive={actions.addFavourite} onDeactive={actions.removeFavourite}/>
                    </div>

                </Course>)}
            </div>
        </div>
)
// << 1 >>  Utworzenie listy ulubionych
const FavouritesCoursesList = ({list}) => (
        <div> 
            <h1>Ulubione Kursy</h1> 
            <hr />
            <div>      
                { list.length == 0 ? <p className="text-center"> Brak kursów </p> : null }
                {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                    
                    {/* Course promo */}
                    < CoursePromoLabel data={data} />
                    {/* Course actions */}
                    <div className="btn-group pull-right">
                        <Button label="Szczegóły kursu" />
                        <StateButton  active={AppState.state.favourites_map[data.id]} onActive={actions.addFavourite} onDeactive={actions.removeFavourite}/>
                    </div>

                </Course>)}
            </div>
        </div>
)

var StateButton = React.createClass({

    getInitialState: function () { 
        return { 
            active: this.props.active 
        } 
    },
    getDefaultProps: function () { 
        return { 
            active: false, 
            onActive: function() {},
            onDeactive: function() {}
        } 
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            active: nextProps.active
        })
    },

    setActive: function () { 
        this.setState({ 
            active: true,
        })
        this.props.onActive() 
    },
    setInactive: function () { 
        this.setState({ 
            active: false 
        }) 
        this.props.onDeactive()
    },

    render: function () {
        return (this.state.active ?
            <Button label="Usuń z ulubionych" icon="star" onClick={this.setInactive} /> :
            <Button label="Dodaj do ulubionych" icon="star-empty" onClick={this.setActive} /> 
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

function StateStore() {
    this.state = {}

    this.dispatchEvents = () => {
        this.callback(this.state)
    }

    this.callback = function () { };

    this.addListener = (callback) => {
        this.callback = callback;
    }

    this.createAction = function (handler) {
        var state = this.state;

        return function () {
            handler.apply(state, arguments);
            AppState.dispatchEvents()
        }
    }

    this.createActions = function (handlersMap) {
        var actions = {};
        for (let name in handlersMap) {
            actions[name] = this.createAction(handlersMap[name]);
        }

        return actions;
    }
}

var AppState = new StateStore()
// << 2 >>  nowa lista FavouritesCoursesList
AppState.state = {
    page: 1,
    courses: courses_data,
    list: courses_data.slice(0, 3),
    favourites_list: [],
    favourites_map: {}
}

var actions = AppState.createActions({

    loadMore: function (event) {
        var page = this.page + 1;

        this.page = page;
        this.list = this.courses.slice(0, this.page * 3)
    },
    // << 4 >>  Dodajemy dwie nowe akcje, THIS to STATE !
    addFavourite: function(){
        let id = 0;
        this.favourites_map[id] = true;
        this.favourites_list.push(this.courses[id])
    },
    removeFavourite: function(){
        let id = 0;
        this.favourites_map[id] = false;
        this.favourites_list.pop()
    },
})



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
                            <h3>Lekcja 27 synchronizacja stanu komponentow</h3>
                            {/* << 1 >>  DODANIE LISTY ULUBIONYCH */}
                            <FavouritesCoursesList list={ this.state.favourites_list } />
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
    << 1 >>  Zaczynamy od skopiowania komponentu CoursesList i przekształceniu go w FavouritesCoursesLists,
        po czym dodanie go w App zaraz nad wywolaniem CoursesList właśnie.
    << 2 >> Tworzymy nową listę "FavouritesCoursesList" w AppState.state, żeby to do niej wskakiwały ulubione kursy,
        i inicjujemy ją także w "componentDidMount:" oraz wklejamy jej wyrenderowanie do returna kilka linijek niżej
    << 3 >> W komponencie FavouritesCoursesList dodajemy taką liniję, na wypadek braku ulubnonych:
        { list.length == 0 ? <p className="text-center"> Brak kursów </p> : null }
        UWAGA ! Trzeba było poprawić kilka rzeczy w CoursesList (no i w tym nowych tez),
        - przyjowoanie {list} zamiast (props), wyjebanie returna i nawiasy zamiast klamer
    << 4 >> DODAJEMY DWIE NOWE AKCJE:  PAMIĘTAJ ŻE THIS ODNOSI SIĘ TUTAJ ZMIENNEJ STATE !
            addFavourite: function(){
                this.favourites_list.push(this.courses_data[0])
            },
            removeFavourite: function(){
                this.favourites_list.pop()
            },     
        DZIĘKI TEMU że funkcje wpadają do CreateActions, z której z koleji przechodzą przez CreateAction,
        mają w sobie od razu dispatchEvent który za każdym jej wywołaniem będzie renderował Aplikację    
    << 5 >> Chcielibyśmy teraz wywołać nasze zdarzenie w ten sposób, na przyscisku StateButton
            <StateButton onClick={actions.addFavourite}/>    
        Ale NIE DA SIĘ, ponieważjest to PRZYCISK STANOWY, który sam zarządza swoim stanem !
        Gdybyśmy dla przykładu zrobili to z przyciskiem wyżej:
            <Button label="Szczegóły kursu" onClick={actions.addFavourite} />
        To tutaj wszystkie zajebiście działą!

        Czyli rozumiem to tak że nie możemy już po prostu przesłać sobie zdarzenia do takiego 
        przycisku, bo logika zdarzeń już żądzi się w nim całkiem innymi prawami.
        Takrze zamiast zdarzenia PRZEKAZUJEMY DWA HANDLERY DO NASZYCH FUNKCJI:

        <StateButton onActive={actions.addFavourite} onDeactive={actions.removeFavourite}/>

        I TERAZ JUŻ BEZPOŚREDNIO W StateButton:
        Na początku, USTAWIAMY ICH DEFAULTOWY STAN NA PUSTĄ FUNKCJĘ:
                    getDefaultProps: function () { 
                        return { 
                            active: true, 
                            onActive: function() {},
                            onDeactive: function() {}
                        } 
                    },
        A właściwą obsługę w metodach, odpowiadających za zmianę ikonki przycisku - nadaje się idelanie:
                    setActive: function () { 
                        this.setState({ 
                            active: true,
                        })
                        this.props.onActive() 
                    },
        ZAWUWAŻ że wywołyjemy tutaj naszą wymyśloną nazwę przekazanego argumentu (handlera) czyli "onActive" !           

        ----------- pierwsza częśc za nami -----------------
        Teraz mamy problem, bo jak wkleimy tą samą obsługę przycisku do komponentu "FavouritesCoursesList",
        czyli koszyka, to nie działa jego usunięcie z tamtąd. DLATEGO ŻE KOMPONENTY CourseList i FavouritesCoursesList
        NIE INFORMUJĄ SIEBIE NAWZAJEM O SWOICH STANACH ! No i aplikacja głupieje.

        Tak więc trzeba dodać informacje do STANU NASZEJ APLIKACJI o tym które kursy są już w ulubionych.
        Tworzymy więc taką listę, ale nie zwykłą listą tylko OBIEKTEM MAP (który kojarzysz).
        A mapie chodzi o to że nie chodzi o kolejność, jest to zbiór wartości z kluczem,
        czyli można po prostu szybko sprawdzić czy coś się w tym zbirze znajduje czy nie.
                        favourites_map: {}

        Narazie na przykladzie jednej danej, robimy dodawanie i usuwanie z tej listy:

                    addFavourite: function(){
                        let id = 0;
                        this.favourites_map[id] = true;
                        this.favourites_list.push(this.courses[id])
                    },
                    removeFavourite: function(){
                        let id = 0;
                        this.favourites_map[id] = false;
                        this.favourites_list.pop()
                    },

        I w ten sposób przekazujemy to do obydwu list:
        <StateButton  active={AppState.state.favourites_map[data.id]} onActive={actions.addFavourite} onDeactive={actions.removeFavourite}/>

        Wszystko działa, tylko że jak cofnie się kurs z listy ulubionych to jego przycisk na zwykłej liście
        dalej ma etykiete "Usun z ulubionych".
        NO I CHUJ, kolejny popis prowadzącego, dołożył specjlaną funkcję Reacta I CHUJA O NIEJ KURWA POWIEDZIAŁ !



        




*/