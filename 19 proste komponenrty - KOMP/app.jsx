// 19 -- Proste komponenty

var courseMedia = function(data){
    return <img src={data.image} alt="cover" />;
} 

var newLabel = function(data){
    return data.is_new ? <span className="label label-default"> NOWY! </span> : null;
} 

var coursePromoLabel = function(data){ 
    return data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span>;
}

var courseActions = function (data) {
    return (
        <div className="btn-group pull-right">
            <button className="btn btn-default">Szczegóły kursu</button>
            <button className="btn btn-default">Dodaj do ulubionyvh</button>
            <button className="btn btn-default">Dodaj do koszyka</button>
        </div>
    )
} 

var courseDetails = function (data) {
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
// << 5 >>  przekazanie "props" i wyjecie z niego "data" linijka nizej
var Course = function (props) {
    var data = props.data;
    return (
        <div className="media course">
            {/* course media column */} 
            <div className="media-left">
                {courseMedia(data)}
            </div>

            {/* course content column */}
            <div className="media-body">
                <h3> {data.title} {newLabel(data)} </h3>
                <p> {data.description}</p>

                {/* promotion */}  
                {coursePromoLabel(data)}

                {/* Course actions */}
                {courseActions(data)}
            </div>

            {/* course details column */}
            <div className="media-right">
                {courseDetails(data)}
            </div>
        </div>
    )
} 
// << 3 >>
var CoursesList = function (props) {
    var list = props.list;  // wylowienie z props "list"
    return (
        <div>
            {
                list.map(function (data){   {/* << 1 >> */ }
                                            {/* return <div key={data.id} > {course(data)} </div> */}
                    {/* << 4 >>   << 6 >> DODANIE KLUCZA ID */}
                    return < Course data={data} key={data.id} />
                })
            }
        </div>
    )
}
// << 2 >>
var list = courses_data.slice(0, 3);

ReactDOM.render( < CoursesList list={list} /> ,document.getElementById("root"));
    

/* 
    << 1 >> Zaczynamy od tego że o ile szablonyu JSX podobają mu się bardzo, to już
        funkcja courseList nie. 
            var CoursesList = function (list) {
                return (<div>
                            {
                                list.map(function (data) {
                                    return <div key={data.id} > {course(data)} </div>
                                })
                            }
                        </div>

        Przede wszystkim to że część dotycząca renderowania
        "course(data)" miesza sie z kodem JSX, a już w ogóle ciule jest że to w tym
        miejscy tworzymy unikalny klucz dla poszczególnych elementów, że ten KEY
        jest wrzucony tak z dupy, żeby tylko przeglądarka nie pierdolila
        Trzeba zorbić tak żeby już ten renderowany szablon miał w sobie KEY,
        a ten stąd wyjebujemy.

        JSX i React posiadają jeszcze jeden zajebisty trik - JSX integruje się z funkcjami
        Czyli że jak mamy naszą główną funkcje  "CoursesList = function (list) {}"
        To w funcji renderującej MOŻEMY WYWOŁAĆ JĄ JAKO ELEMENT HTML !!!
             ReactDOM.render( CoursesList(list),document.getElementById("root")); -->
        -->  ReactDOM.render( < CoursesList />,document.getElementById("root"));

        << 2 >> Trzeba sobie jeszcze tylko poradzić z argumentami,
        a przekazujemy je dokładnie tak jak atrybuty do JSX:
            < courseList list={list} />

        ALE trzeba widzieć co robi React jeśli tych argumentów mielibyśmy więcej ! 
        otóż nie robimy czegoś takiego:
            < courseList list={list} count={} innosc={}/>
        poniewaz lista argumentow przy fukncji courseList robilaby sie w ciul dluga:
            var CoursesList = function (list, count, innosc) {}

        << 3 >> Zamiast tego React WSZYSTKIE argumenty do tej funkcji przekaze nam 
        w JEDNYM ELEMENCIE properties, i zniego wezmiemy sobie wlasnie nasze list:
        var CoursesList = function (props) {
            var list = props.list;

        CZYLI:
        nasze list:
            var list = courses_data.slice(0, 3);
        przekazane do funkcji "courseList" w funkcji "render":
            ReactDOM.render( < CoursesList list={list} />,document.getElementById("root"));
        przekazane zostanie do deklaracji courseLIst JAKO "PROPS":
            var CoursesList = function (props) {
            var list = props.list;
        i tam wlasnie sobie mozemy przypisać nasze przekazane LIST to nowej zmiennej (list)    

        TO NIE KONIEC, jedziemy dalej:
        << 4 >> w przekazywaiu danych do "course" robimy dokladnie to samo:
            return  {course(data)} 
        przekształcamy na JSX, przekazujemy "data" jako parametr
            return < course data={data} />
        << 5 >> I W DEKLARACJI "course" TEZ PRZEKAZUJEMY GO JAKO PROPS

        ALE JAJA, dostalem opierdol od przegladarki ze Komponenty React MUSZA BYC WIELKA LITERA,
        i musiałem wszystkie pozmieniac wszystko na "CoursesList" i na "Course"

        UWAGA ! WSZYSTKO DZIAŁA !!!
        Ale ponownie mamy porblem z unikalnym kluczem do kazdego elementu.
        << 6 >> No i robimy to ZAJEBIŚCIE PROSTYM SPOSOBEM dodając go TUTAJ:
                return < Course data={data} key={data.id} />  w CoursesList 
            I to jest zajebiste że zostanie on dodany to KAŻDEGO WYGENEROWANEGO ELEMENTU
            i nie musimy tworzyc zadnych skomplikowanych konstrukcji        

        I TAK OTO POWSTAŁ PIERWSZY KOMPONENT !!!        
        KAŻDA FUNKCJA KTÓRA PRZYJMUJE PROPERITIES I ZWRACA ELEMENT JSX JEST AUTOMATYCZNIE KOMPONENTEM !

        Jest to bardzo wygodne i przyjemne, szczególnie przesyłanie props jest przejżyste i czytelne

        I właśnie teraz mówi ze wszystkie komponenty MUSZĄ BYĆ Z DUŻEJ LITERY zeby React mógł
        je odróżnić od zwyklych elementów HTML pisanych literami małymi
        To się zmieniło po jakimś czasie bo dawniej w Reacie mozna bylo z malych tyle
        ze byly jakies specjalne listy dozwolonych elementów, wyjebali to w chuj

        W następnej lekcji będzie dalsza rozbudowa komponentów
        ALE TAKŻE zobaczysz jak dzięki nowym właściwościom ES6 można jeszcze bardziej
        ulepszyć to co napisaliśmy teraz.
*/