// 20 -- Atrybuty i własciwosci komponentow

/* 
    Tutaj dowiesz się więcej o atrybutach, jak przekazywac dane między zagniezdzonymi komponentami.
    oraz wykorzytamy kilka nowych konstrukcji z ES6
*/

// << 2 >> // zamiana funkcji na komponenty czyli props zamiast data w argumencie
// << 3 >> // zmiana nazw wszystkich komponentów na DUZA litere z przodu
var CourseMedia = function(props){
    var data = props.data;
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = function(props){
    var data = props.data;
    return data.is_new ? <span className="label label-default"> NOWY! </span> : null;
} 

var CoursePromoLabel = function(props){ 
    var data = props.data;
    return data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span>;
}

var CourseActions = function (props) {
    var data = props.data;
    return (
        <div className="btn-group pull-right">
            <button className="btn btn-default">Szczegóły kursu</button>
            <button className="btn btn-default">Dodaj do ulubionyvh</button>
            <button className="btn btn-default">Dodaj do koszyka</button>
        </div>
    )
} 

var CourseDetails = function (props) {
    var data = props.data;
    return (
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
} 

var Course = function (props) {
    var data = props.data;
    return (
        // << 1 >> // zamiana wszystkich tutaj funkcji na komponenty
        //  np. {CourseMedia(data)}   -->  < CourseMedia data={data} /> 
        <div className="media course">
            {/* course media column */} 
            <div className="media-left">
                < CourseMedia data={data} /> 
            </div>

            {/* course content column */}
            <div className="media-body">
                <h3> {data.title} < NewLabel data={data} /> </h3>
                <p> {data.description}</p>

                {/* promotion */}  
                < CoursePromoLabel data={data} />

                {/* Course actions */}
                < CourseActions data={data} />
            </div>

            {/* course details column */}
            <div className="media-right">
                < CourseDetails data={data} />
            </div>
        </div>
    )
} 

var CoursesList = function (props) {
    var list = props.list;
    return (
        <div>
            {
                list.map(function (data){ 
                    return < Course data={data} key={data.id} />
                })
            }
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
    
    

*/