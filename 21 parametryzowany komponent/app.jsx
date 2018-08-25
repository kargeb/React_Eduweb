// 21 -- Parametryzowany komponent

/* 
    Będziemy parametryzować komopnenty PO TO ŻEBY MOŻNA BYŁO JE WYKORZYSTAĆ WIELOKROTNIE
*/

var CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )
// << 1 >> << 3 >> dodawanie ikon do przycisków   << 4 >>  czy jest ikonka << 5 >> dodanie konkretnej ikony << 6 >> spacja
var Button = (props) => ( 
    <button className="btn btn-default">
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> )

// << 2 >>    
var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych" icon="star" />
        <Button label="Dodaj do koszyka" icon="shopping-cart"/>
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
            {list.map((data) => < Course data={data} key={data.id} />)}
        </div>
    )
}

var list = courses_data.slice(0, 3);

ReactDOM.render( < CoursesList list={list} /> ,document.getElementById("root"));
    

/* 
    << 1 >> Tworzymy komponent Buttona. przekazujemu props a wyciagamy props.label
    << 2 >> a tak go wywołujemy:
        czyli zamiast:
            <button className="btn btn-default">Szczegóły kursu</button>
        to:
            <Button label="Szczegóły kursu" />
        Zauważ że jest to element bez zawartości czyli mozemy go zamknac -> />    
        Działa - musisz ogarnąć składnię bo wszystko naprawde się fajnie dodaje
    << 3 >> Udokonalamy 2 nasze przyciski poprzed dodanie ikon do nich
        UWAGA ! Aby w bootstrapie dodac ikonki, trzeba stworzyc pusty <span>
            i nadac mu 2 klasy "glyphicon glyphicon-star"
    << 4 >> PIerwszy krok to zrobioenie warunky czy w ogole ten przycisk ma miec jakas ikonke
        <button className="btn btn-default">
            { props.icon ? <span className="glyphicon glyphicon-star"></span> : null }
            { props.label }
        </button> )
    << 5 >> teraz juz posotaje dodac konkretną ikone do konkretnego przycisku
        No i wlasnie TAK TWORZYMY KOMPONENTY NADRZEDNE zeby nie mowic JAK cos ma wygladac
        TYLKO CO MA ZAWIERAC!
        dlatego wyglada to tak - wylacznie najwazniejsze informacje:
            <Button label="Dodaj do ulubionych" icon="star" />
        znamy tresc i co sie ma znajdowac na ikonie, a jaka juz dokladnie ma ona miec klase
        to juz pozostawiamy koponentowi podrzednemu.
        TRZEBA ZAPAMIĘTAĆ że w JSX nie musisz przekazywać klasy jako string, ALE MOZE TEZ TO BYC OBIEKT
        no i z tą wiedzą wiemy juz jak połaczyć statyczną częśc nazwy klasy, z częścią dynamiczną
            ZAMIAST:
                { props.icon ? <span className="glyphicon glyphicon-star"></span> : null }
            TO:
                { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
    << 6 >> ostatnie zagwostka to to ze ta ikonka praktycznie dotyka tektu znajdującego się po niej,
        no i najłatwiej będzie tam po prostu wtawić spację. No ale w JSX nie da się tego zrobić bo nie dość
        że wszystkie białe znaki w kodzie są ignorowane to na dodtaek sam JSC usuwa nadmiar białych znaków.
        Rozwiązanie jest banalne - trzeba po prostu jeszcze raz otworzyć {} aby w samym JS tą spacje jako 
        string przekazać  {" "}            

    PODSUMOWANIE:
        - wiesz juz jak tworzyc proste komponenty
        - jak korzystając z dyanmicznych szablonów oraz z właściwości komponentu sworzyć 
            konfigurowalne, sparametryzowane komponenty: tak żeby każdy przypadek mógł być inny,
            a jednoczesnie żeby ten sam kod wykorzystać w chuj razy, w różnych miejscach na Twojej stronie
*/