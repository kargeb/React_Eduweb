// 24 -- Przykład interaktywnej aplikacji

/* 
   Wykorzystanie komponentów STANOWYCH do konstrukcji prostej ale już INTERAKTYWNEJ APLIKACJI
   TYPU SINGLEPAGE APLICATION 

   Nosz kurwa mać, znowy sobie poza lekcjami dodał funkcjonalności ja pierdole a teraz tylko
   powiedzial co zrobil !!!
   - Podzielil kurwa na rozne pliki posczegolne komponenty
   - zmienne do komponentow zadeklarowal jako const
   - no i kurwa jeszcze z 5 lekcji temu dodal dowawanie kolejnych danych na glownej liscie za 
    pomoca przycisku
        Obsługa przycisku napisana jest w czystym JS poza React
    - do styli dodal margin-top: 3.5em;
    - no i do CartDetails dodal <h1> z ceną kursu! 

    --- ok nadgonione ...

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
// << 1 >>  nowy komponent  << 3 >> props i props.children
const App = React.createClass({

    getInitialState: function(){
        return {
            page: 1,
            list: this.props.list.slice(0,3)
        }
    },

    // loadMore: function(){

    // },

    render: function(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Lekcja 24 -- Przykład interaktywnej aplikacji</h3>
                                        {/* << 2 >>  wywalamy  -->  <div id="root"> </div>  << 3 >> props.children*/}
                                        {/* { props.children }*/}
                            {/* << 8 >> przeniesienie z rendera  << 11 >> pobranie danych z THIS*/}
                            {/* <ShoppingCartList list={cart_list} /> */}
                            <CoursesList list={ this.state.list } />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr /> 
                                                        {/* << 12 >> onClick */}
                            {/* <button className="btn btn-default btn-block" onClick={this.loadMore} > Pokaż więcej ... </button> */}
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

// << 4 >>  podamiana div na App  << 8 >> wywalamy wszystko poza App  << 10 >> przekazujemy liste
ReactDOM.render(<App list={courses_data}/>, document.getElementById("root"));

/*   << 7 >>  Wywalamy wszystko co JS
    var list = [],
    page = 1,
    perpage = 3;
    document.getElementById("show_more").addEventListener("click", function(){
        page++;
        update();
    })    
    var cart_list = courses_data.slice(0,1);
    function update(){
        var count = page * perpage;
        list = courses_data.slice(0,count); 
*/



// update();

/* 
    Na ten moment nasza aplikacja renderuje się w elemencie "root" na stronie, a chcąc zeby
    byla to prawdizwa SINGLEpage application, trzeba zrobić tak żeby renderwoała się na
    bierząco  CAŁA strona a nie tylko jej częśc.
    No i żeby to zrobić, TRZEBA CAŁĄ NASZĄ STRONĘ HTML (tzn samo BODY) przerobić
    na kod JSX

    WPISUJEMY W GOOGLE "html to jsx" i wchodzimy w pierwszy wynik,
    dostajemy stronkę która HTML przekształca od razu ma JSX !!! (odznaczamy ptaszek)
    Zamiana polega głównie na zamianie "class" na "className" i na domknięciu niektórych el HTML
    
    Gdy tylko mamy nasz kod JSX, tworzymy sobie nowy komponent, na takim oto szkielecie:
                const App = () => {
                    return (
                        
                    )
                }
    << 1 >> i wklejamy do retruna caly nasz kod JSX z tamtej strony intenretowej     
    << 2 >> teraz wywalamy z naszego App element "root", a nasze KOMOPNENTY,
        Będą lądować w tym miejscu za pomocą "props.children" !
    << 3 >> (2x) dodajemy wiec argument props i tam gdzie root to wlasnie porps.children     
    << 4 >> no i zeby to wszystko działało, w funkcji render zmieniamy "div" na "App" !
        no i tak jak bylo to tlumaczone w poprzednich lekcjach, WSZYSTKO CO TRAFIA MIĘDZY
        TE ZNACZNIKI TO WLASNIE LĄDUJE W props.children WIĘC zosatwiamy tam nasze listy,
        (jedną na ten moment wywalamy zeby nie bylo zamieszania)
    << 5 >> (index) pozostaje nam już tylko wyjebać PRAWIE CAŁE BODY z pliku HTML,
        no bo przecież wszystko renderujemy etraz prosto z REacta
        UWAGA !!! PRAWIE WSZYSTKO no bo ZOSTAWIAMY W HTMLU WSZYSTKIE ZAŁĄCZENIA PLIKÓW
        I SKRYPTÓW !!!
        OPRÓCZ TEGO, JEDYNE CO ZOSTAWIAMT TO ELEMENT DO KTÓREGO BĘDZIEMY RENDEROWAĆ:
                <div id="root"></div>
        NIE RENDERUJEMY DO ELEMENTU "body" wlasnie z tego samego powodu, z którego 
        zostawiliśmy linkowanie skryptów! Czyli zeby nam się w ogóle mógł nasz React odpalic        
    << 6 >> Pojawia się jednak błąd:
        Cannot read property 'addEventListener' of null
         Ponieważ JS NIE MOZE ZNALEZC "show_more" z którym powiązany było zdarzenie na naszej stronie

        No i bardzo ważne pytanie, JAK MOŻNA W REACIE OBSŁUŻYĆ ZDARZENIA SKORO ELEMENTY RENDERUJĄ SIĘ
        PÓŹNIEJ NIŻ OBSŁUGA PRZYPISANIA DO NICH ZDARZEN ???

        ABY TO ZROBIĆ niestety już nasz prosty komponent App nie da sobie rady, trzeba posłużyć się
        nowymi metodami Reacta.
            
    << 7 >> tak wieć WYJEBUJEMY CAŁĄ OBSŁUGĘ ZDARZENIA napisaną przez JS, i wogole wszystko co JS,
        ZOSTAWIAMY JEDYNIE NASZĄ FUNKCJĘ WYWOŁUJĄCĄ render
    << 8 >> aby jeszcze przejżyściej było, wywalamy z "render" wszystko poza samą naszą "App",
        i przenosimy do naszego szkieletu w JSX
    
    CHCEMY ZEBY TO NASZ APLIKACJA, czyli nasz komponent WEWNĄTZR obsłużył sobie ten przycisk "show_more"
    Jeżeli chcemy ze komponent OBSŁUGIWAŁ INTERAKCJĘ i PRZECHOWYWAŁ STAN czyli np informację o tym ile
    elementow chciałbym wyświetlić, musimy porzucić tą naszą prostą formę, 
    a skorzystać z metody CreateClass !!!!!

    << 9 >> TAK WIĘC ZAMIENIAMY TO: 
                const App = (props) => {
                    return (
                        <div>
            NA TO:
                const App = React.createClass({
                    render: function(props){
                        return (
                            <div>
   ---------------------------------------------------------------------------------------
    UWAGA ! OKAZUJE SIĘ ŻE NAJNOWSZA WERSJA REACT 16 NIE OBSŁUGUJE JUŻ createClas !!!!
    Z tego co wyczytalem to powinno się to przenieść do zwykłej klasy JS, skoro od ES6
    mozna takie klasy tworzyć.
    TAK WIĘC PRZECHODZE NA WERSJE 15 a już później będziemy się martwić jak to zrobić w 16
    --------------------------------------------------------------------------------------

    << 10 >> pojawia nam się dalej bład:
            list is not defined
        Więc przekazujemy ją w funkcji render, a w App wyjebyjemy z argumrntu (props)
    << 11 >> a tą listę POBIERAMY Z ELEMENTU THIS !!!  -->  <CoursesList list={ this.props.list } />

    Działa wszystko poza przyciskiem

    << 12 >> Obsługę przycisku dodajemy specjlanym Reactowym atrybutem onClick !!! 
        Zwróć uwagę na DUŻĄ LITERĘ przy "Click" dzięki czemu to nie jest to chujowe onclik z HTMLa
        usuwamy z tamtąd "id" bo nie jest nam juz do niczego potzebne
        DO onClick przekazujemy już naszą własną funkcję:
    <button className="btn btn-default btn-block" onClick={this.loadMore} > Pokaż więcej ... </button>

    << 13 >> KURWA WKURWIA MNIE TEN CHŁOP !!! NA PIERDOLIŁ KURWA CZEGOŚ I CHUJ WIE KURWA CO TO
        I CHUJ WIE KURWA PO CO !!! Ja pierdole, myśle że poźniej wszystko wytłumaczy dokladnie bo JA PIERDOLE !



*/