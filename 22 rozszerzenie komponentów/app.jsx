// 22 -- Rozszerzenie komponentów 

/* 
    Idziemy tutaj jeszcze dalej, będziemy dynamicznie zagniezdzac elementy wewnatrz komopnentu,
    a takze trick dzieki ktoremu sam komponent przekazemy do wyrenderowania wewnatrz innego komponentu
*/

var CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )

var Button = (props) => ( 
    <button className="btn btn-default">
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> 
)
// << 5 >>  zwracamy komponent Button
var CartButton = (props) => {
    return <Button {...props}/>
}

var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych" icon="star" />
        {/* << 6 >><Button label="Dodaj do koszyka" icon="shopping-cart"/> */}
    </div>
)

var CourseDetails = ({ data }) => (
    <div>
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
    {/* << 6 >> */}
    <CartButton label="Dodaj do koszyka" icon="shopping-cart"/>
    </div>
)

var Course = (props) => {
    var {data} = props;
    return (
        <div className="media course">
            {/* course media column */} 
            <div className="media-left">
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
    return (
        <div> 
            <h1>Kursy</h1> 
            <hr />
            <div>
                {list.map((data) => < Course data={data} key={data.id} />)}
            </div>
        </div>
    )
}
// << 1 >>  << 2 >>
var ShoppingCartList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1>Koszyk</h1>
            <hr />
            <div>
                {list.map((data) => < Course data={data} key={data.id} />)}
            </div>
        </div>
    )
}

// << 4 >>
var cart_list = courses_data.slice(0,1);
var list = courses_data.slice(0, 3);
// << 3 >>
ReactDOM.render( <div>
        < ShoppingCartList list={cart_list} />
        < CoursesList list={list} />
    </div> ,document.getElementById("root"));
    
/* 
    Tak jak poprzednio zrobilismy jeden uniwersalny komponent buttona,
    tak teraz zrobimy komponent dla calej listy głownej, a takze druga liste przeznaczoną do widoku koszyka
    << 1 >> zaczynamy od zrobienia drugiej listy, czyli od zrobienia kopi tej piewszej
    << 2 >> PRZENOSMY Z PLIKU HTML naglowek listy to naszego komponentu, zeby mozna je bylo latwiej odroznic
    << 3 >> Przerabiamy naszą główną funkcję renderującą, dodajemy diva i drugą listę
    << 4 >> i dorabiamy zmienną z jedną linijką danych z naszej bazy JSON
        no i działa, nad Kursami mamy Koszyk z jednym produktem

    Trzeba sobie teraz poradzic z tym że w koszyku widnieje przycisk "Dodaj do koszyka"
    No i mozna byloby grzebac w tym uniwersalnym komponencie buttona z poprzedniej lekcji,
    robic w nim w chuj wariantow, ale wlasnie to nie jest dobry pomysl, bo on ma byc wielokrotnego 
    uzytku, i takie najebanie w nim tylu opcji to jest zle rozwiązanie
    
    UWAGA ! Tworzymy więc komponent, który ROZSZERZA nasz komponent buttona wlasnie
    << 5 >> czyli chodzi o to zeby nie kopiowac znowu kodu z buttona wyzej, ale wlasnie 
        pozyczyc od niego wszystko co nam trzeba
        Czyli po prostu LADUJEMY DO RETURNA CALY KOMPONENT BUTTON wraz ze zmienna props
    << 6 >> Usuwamy nasz przycisk "dodaj do koszyka" i ladujemy go w w calkiem nowe miejsce
        i robimy to juz przy pomoce wlasnie tego nowego komponentu CartButton
        No i pojawia się ten przycisk w tabelce obok, wygląda identycznie jak reszta buttonów

*/