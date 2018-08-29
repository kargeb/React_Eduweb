// 25 -- Przyciks stanowy - INTERFEJS

/* 
    W tej części kursku skupiwmy się na interakcjach z użytkownikiem.
    Poprzedniu używaliśmy JSX i komponentów to stworzeniu szablonu interfejsu,
    ale był on jednak dość statyczny.
    Dodamy sobie kolejne komponenty stanowe do przycisków, zobaczymy tez 
    JAK PRZEKAZYWAC STAN między komponenanmi, tak zeby np przycisk
    komunikowal sie z reszta aplikacji

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
                    {/* << 4 >>  Course actions przekopiowane z pliku Course.jsx !!!! */}
                    {/* < CourseActions data={data} /> */}
                    <div className="btn-group pull-right">
                        <Button label="Szczegóły kursu" />
                        {/* <Button label="Dodaj do ulubionych" icon="star" ZAMIENONY NA StateButton /> */}
                        <StateButton />
                    </div>

                </Course>)}
            </div>
        </div>
    )
}



// << 1 >> nowa klasa reacta do przycisku Ulubione
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
// << 6 >>
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
        return (this.state.active ?         //  << 5 >> Dodajemy obsluge click
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
    Na początek zajmujemy się obłsugą przycisku "Dodaj do ulubionych", zeby zmienial 
    sie w zaleznoscy czy cos jest w tych ulubionych czy nie.

    << 1 >> tworzymy nowa Reactową klasę StateButton która przypisuje stan początkowy komponentu
        na taki ze przycisk nie jest w ulubionych -->  active: false
    << 2 >> teraz kurwa mac okazuje sie że poza funkcja getInitialState,
        mozemy ustwaic funkcje getDefaultProps KTÓRE BĘDZIE USTAWIALA DOMYSLNA
        WARTOSC KONKRETNEGO PARAMETRU, np na wypadek gdyby ktos w innym
        miejscu tego parametru nie przekazal TP BYŁBY BŁĄD !!! Robiąc to
        ustrzegamy się przed nim -> te 2 funkje nas zabezpieczają
        I mając tą defaultową zmienna, WŁASNIE JĄ PRZEKAZUJEMY TO getInitialState !!!
                    getInitialState: function(){
                        return {
                            active: this.props.active

                    getDefaultProps: function(){
                        return {
                            active: true
        Czyli te paramtery MOZEMY ALBO PRZESŁAĆ ALBO USTAWIĆ DOMYŚLNIE

    << 3 >> następnie stosujemy juz znana technike zeby w zaleznosci od atrybutu,
        wstawic na strone dwie roznie wersje danego elementu, tutaj przycisku.
        ROBIMY TO W OBIECIE (?) render !
                render: function(){
                    return (this.state.active ? 
                        <Button label="Usuń z ulubionych" icon="star" /> :
                        <Button label="Dodaj do ulubionych" icon="star-empty" />         
          
    << 4>>  KURWA MAC on sobie przekopiowal komonent courseAction prosto do 
        Courseslist, trzeba zrobic to samo ...
        ZAUWAŻ TEŻ że zrobił on znowu dziedziczenie
        i w nowym kopomnencie StateButton ZWRACA BUTTON !!! 

    Na ten moment wszystko się wyświetla, pozostaje INTERAKCJA do zrobienia    

    << 5 >> Dodajemy obsluge klikniecia "onClick":
            <Button label="Usuń z ulubionych" icon="star" onClick={ this.setInactive }/> :
            <Button label="Dodaj do ulubionych" icon="star-empty" onClick={ this.setActive } />
        
    UWAGA ! NIGDY BEZPOŚREDNIO NIE MODYFIKUJEMY STANU !!! ROBIMY TO UŻYWAJĄC HELPERÓ (funckji pomocniczych)

    << 6 >> Oto jeden z heleprow:
            setActive: function(){
                    this.setState({
                        active: true  }) },

       PAMIĘTAJ ! ZA KAŻDYM RAZEM WYWOŁUJĄC FUNKCJĘ setState AUTMATYCZNIE KOMUNIKUJEMY WYWOŁYWANIE render !!!

       Sprawdza ona od razu sobie stan, i wywołuje odpowiednią akcję:
           render: function(){
                return (this.state.active ?   ...

     Wszystko działa, przycisk się zmienia.
     
     W następnej lekcji sprawimy że to kliknięcie przycisku faktycznie wpływało na naszą aplokację i robiło
     to co ma robić
        
     PODSUMOWANIE:
     - w komponentach stanowych (niektórych ?) poza funckjcą inicjującą stan właściwości komponentu getInitialState,
     dobrze jest dodać również funkcję getDefaultProps. W naszym przypadku wręcz wartosc z getDefaultProps
     jest pobierana w getInitialState. ZAPOBIEGA TO BŁĘDOM wynikającym z nie przesłania tej wartości w 
     parametrze elementu. (okaze się czy to faktycznie wiodący sposób)
     - komponent StateButton dziedziczy po Button, zwracając go w returnie
     - obługa zdarzenia (click) dodana w ten sam sposób co poprzednio, czyli jako atrybut elementu: 
      <Button label="Usuń z ulubionych" icon="star" onClick={ this.setInactive }/> :
     - równiez w ten sam sposób co wczesniej, rozwiązano wybór opcji względem zmiennej ( zm ? op1 : op2)
     - dodane są 2 helpery, stworzone wyłącznie po to żeby obsłużyć zmianę zmiennej "active"
     - wszystko to funkcjonuje w ciele klasy StateButton, jako jej właściwości z przypisanymi funkcjami 
*/