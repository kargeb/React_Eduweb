// 20 -- Atrybuty i własciwosci komponentow

/* 
    Tutaj dowiesz się więcej o atrybutach, jak przekazywac dane między zagniezdzonymi komponentami.
    oraz wykorzytamy kilka nowych konstrukcji z ES6
*/

// << 2 >> // zamiana funkcji na komponenty czyli props zamiast data w argumencie
// << 3 >> // zmiana nazw wszystkich komponentów na DUZA litere z przodu

var CourseMedia = function({data}){ 
    // << 4 >> DESTRUCTURING obiektów (zamiast var data = props.data)
    // następnie zamiast var data = props.data -- > var CourseMedia = function({data})
    return <img src={data.image} alt="cover" />;
} 

// << 6 >> Zamiana funkcji zwykłych na strzałkowe                   << 7 >> usuniecie srednikow na koncu!
var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )

var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <button className="btn btn-default">Szczegóły kursu</button>
        <button className="btn btn-default">Dodaj do ulubionyvh</button>
        <button className="btn btn-default">Dodaj do koszyka</button>
    </div>
)

var CourseDetails = ({ data }) => (
    <table className="table course_details">
        <tbody>
            <tr>
                <th>Autor</th>
                <td>{data.author}</td>
            </tr>
            <tr>
                <th>Czas trwania</th>
                <td style={{ color: "green" }}>{data.duration}</td>
            </tr>
        </tbody>
    </table>
)

// << 8 >> bardziej skomplikowana funkcja zamieniona na strzałkową
var Course = (props) => {
    var {data} = props;
    return (
        // << 1 >> // zamiana wszystkich tutaj funkcji na komponenty
        //  np. {CourseMedia(data)}   -->  < CourseMedia data={data} /> 
        <div className="media course">
            {/* course media column */} 
            <div className="media-left">
                {/* << 5 >>  ZMIANA data = {data} --> {...props}*/}
                {/* < CourseMedia data={data} />  */}
                < CourseMedia {...props} /> 
            </div>

            {/* course content column */}
            <div className="media-body">
                <h3> {data.title} < NewLabel {...props} /> </h3>
                <p> {data.description}</p>

                {/* promotion */}  
                < CoursePromoLabel {...props} />

                {/* Course actions */}
                < CourseActions {...props} />
            </div>

            {/* course details column */}
            <div className="media-right">
                < CourseDetails {...props} />
            </div>
        </div>
    )
} 

var CoursesList = (props) => {
    var list = props.list;
    // << 9 >> zmiana funkcji w "map"
    return (
        <div>
            {list.map((data) => < Course data={data} key={data.id} />)}
        </div>
    )
}

var list = courses_data.slice(0, 3);

ReactDOM.render( < CoursesList list={list} /> ,document.getElementById("root"));
    

/* 
    Zaczynamy dość grubo, zauważ że wszystkie poszczegółbne elementy szablonu z którego korzystamy,
    są w postaci funkcji, a teraz jak juz wiemy, nie musi to tak wyglądać
    << 1 >> wszystkie te funkcje zamienimy sobie na komponenty
        np. {CourseMedia(data)}   -->  < CourseMedia data={data} /> 
    << 2 >> Oczywiście po zmianie WYWOLANIA z funkcji na atrybut
        trzeba zmienić też samą deklarację z funkcji na KOMPONENT,
        czyli zamiast przekazywac do niego "data" to dajemy tam "props"
        a "data" wylawiamy z propsa linikje nizej    
    << 3 >> Zmieniamy tez nazwy wszystkich kopmonentow na duza litere
        var courseMedia = function(data){ .. }  -->
        --> var CourseMedia = function(props){
                 var data = props.data; ... }
    << 4 >> Teraz wchodzi ES6. Zwroc uwage na konstrukcje:
            "var data = props.data;"             
        i wlasnie tutaj wykorzystamy DESTRUCTURING OBIEKTOW z ES6 czyli zmienimy na to:
            var {data} = props
        ALE ZAUWAŻ że niewiele nam to dało w kwestii powtórzonego kodu bo powtarza się on w każdym komponocnie
        Więc zrobimy to jeszcze krócej! Skup się! 
        Zamieniamy to   ;
            var NewLabel = function(props){
                var {data} = props;
        Na to:
            var NewLabel = function( {data} ) { ... } !!!
        Czyli zamiast wyciągać ten atrybut w ciele funkcji to 
        WYCIĄGAMY GO OD RAZU Z PRZEKAZYWANEGO ARGUMENTU !!!    - OK
        Jeżeli chcielibysmy wyciagnac więcej pól to nie ma zadnego problemu, robimy tak:
                var NewLabel = function( {data, key, czosz} ) { ... }
    << 5 >> Teraz musisz wiedziec (przypomniec sobie) jak przekopiowac jeden obiekt do drugiego
        robimy to z uzyciem znowu ES6:   var propsCopy = {...props};
        więc idąc tą drogą zmieniamy wszystkie wywołania {data} tutaj:
                 < CourseMedia data={data} /> 
        na wlasnie takie rozbity obiekt         
                < CourseMedia {...props} /> 
        Tutaj przekazujemy tylko jeden parametr więc nie ma to takiej mocy, ale gdybyśmy przekazwyalić więcej
        no to już zajebista przejżystośc i oszczędniość kodu
    << 6 >> No i ostatnia W CHUJ zmiana to ZAMIANA WSZYSTKICH TYCH KOMPONENTOWYCH FUNKCJI NA STRZAŁKOWE !
    << 7 >> Pamiętaj o tym żeby usunąć średnik, BO NIE MOŻE ON KOŃCZYĆ WYRAŻEŃ (trzeba doczytac chyba)
        CZYLI ZAMIENIAMY TO:
            var NewLabel = function({data}){
                return data.is_new ? <span className="label label-default"> NOWY! </span> : null;
            } 
        NA TO:
            var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )
    << 8 >>
        UWAGA jak mamy bardziej skomplikowane ciało funkcji to zmieniamy jedynie to:
            var CoursesList = function (props) {
        no to:
            var CoursesList = (props) => {        
        czyli nie zmieniamy klamer {} na nawiasy () i zosatwiamy również słowo "return"    
    << 9 >> no i tutaj też bardzo istotna zmiana        
        Z TEGO:
            <div>
                {   // << 9 >> zmiana funkcji w "map"
                    list.map(function (data){ 
                        return < Course data={data} key={data.id} />
                    })
                }
            </div>
        NA TO:
            <div> 
                { list.map( (data) => < Course data={data} key={data.id} />) }
            </div>
        CZYLI W JEDNEJ LINI MOZEMY GENEROWAC CAŁA LISTE KOMPONENTOW

        Wg niego JEST TO NAJBARDZIEJ JUŻ CZYTELNY FORMAT PRACY Z REACTem
        w natępnych lekcjach własnie z tegkiego formatu będziemy korzystać

        W dalszej częsci następne przykłady opcji parametryzowania komponentów

        

    
    

*/