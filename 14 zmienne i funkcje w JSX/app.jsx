// 14 -- Zmienne i funkcje w JSX

/* 
    Porządkowanie i ponowne wykorzystywanie elementów szablonu przy użyciu zmiennych oraz funkcji,
    podonie jak robiliśmy to we wczesniejszych lekcjach ale teraz przy użyciu szablonow JSX
*/


// << 3 >>
/* var courseOLD = (
    <div className="media course">
        <div className="media-left">
            <img src= {data.image} alt="cover" />
        </div>

        <div className="media-body">
            <h3> {data.title} { data.is_new ? <span className="label label-default"> NOWY! </span> : null } </h3>  
            <p> {data.description}</p>

            {  data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> }

            <div className="btn-group pull-right">
                <button className="btn btn-default">Szczegóły kursu</button>
                <button className="btn btn-default">Dodaj do ulubionyvh</button>
                <button className="btn btn-default">Dodaj do koszyka</button>
            </div>
        </div>

        <div className="media-right">
            <table className="table course_details">
                <tbody> 
                    <tr>
                        <th>Autor</th>
                        <td>{data.author}</td>
                    </tr>
                    <tr>
                        <th>Czas trwania</th>
                        <td style={ {color:"green"} }>{data.duration}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
) */

// << 8 >>      << 9 >>
var courseMedia = function(data){
    return <img src={data.image} alt="cover" />;
} 
// << 4 >>      << 9 >>
var newLabel = function(data){
    return data.is_new ? <span className="label label-default"> NOWY! </span> : null;
} 
// << 5 >>      << 9 >>
var coursePromoLabel = function(data){ 
    return data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span>;
}
// << 6 >>      << 9 >>
var courseActions = function (data) {
    return (
        <div className="btn-group pull-right">
            <button className="btn btn-default">Szczegóły kursu</button>
            <button className="btn btn-default">Dodaj do ulubionyvh</button>
            <button className="btn btn-default">Dodaj do koszyka</button>
        </div>
    )
} 

// << 7 >>      << 9 >>
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

// << 10 >>  - zmiany wywolania zmiennych na wywołania funkcji
// << 11 >> - sama zmiana course na funkcje
var course = function (data) {
    return (
        <div className="media course">
            {/* course media column */}  {/*<< 8 >> */}
            <div className="media-left">
                {courseMedia(data)}
            </div>

            {/* course content column */}
            <div className="media-body">
                {/* << 4 >> */}
                <h3> {data.title} {newLabel(data)} </h3>
                <p> {data.description}</p>

                {/* promotion */}  { /* << 5 >> */}
                {coursePromoLabel(data)}

                {/* Course actions */}    {/*<< 6 >> */}
                {courseActions(data)}
            </div>

            {/* course details column */}   {/*<< 7 >> */}
            <div className="media-right">
                {courseDetails(data)}
            </div>
        </div>
    )
} 

var data = {   // << 1 >>
    "id": 0,
    "title": "Kurs Programowanie w jQuery - w Praktyce",
    "description": "Poznaj jQuery, czyli najbardziej popularną bibliotekę JavaScript na Świecie! Z jQuery korzystają niemal wszystkie nowoczesne serwisy WWW, a nasz Kurs stanowi niezwykle praktyczne i wyczerpujące omówienie tej biblioteki od podstaw, aż po bardziej zaawansowane techniki. Jeśli znasz już HTML i CSS oraz przynajmniej podstawy JavaScript, jQuery to kolejna obowiązkowa pozycja na Twojej drodze do tworzenia świetnych serwisów internetowych. ",
    "image": "http://eduweb.pl/Images/Training/miniaturka-do-opisu-kursu_27ded9b2-af48-4118-a02a-e35fe950a9be.png",
    "author": "Piotr Palarz",
    "duration": "8 godzin",
    "price": 99.00,
    "rating": 4,
    "categories": ["JavaScript", "jQuery"],
    "is_new": true,
    "is_promo" : true
}

                // << 12 >>
ReactDOM.render(course(data), document.getElementById("root"));

/* 
    Zanim przejdziemy do własciwej lekcji, jeszcze pododajemu kilka rzeczy do naszego szablonu,
    zeby jeszcze bardziej go skomplikować żebyś sobaczył jak później posprzątamy to właśnie zmiennymi i funkcjami
    Dzięki temu zobaczysz jak duże szablony można komponować z mniejszych, częsciowych szablonów
    
    << 1 >> podmieniamy poprzednie dane dokładnie na te co w pliku dołączonym do wczesniejszych lekcji
    << 2 >> dodajemy przyciski opakowane bootstrapem
    << 3 >> ROBIĘ KOPIĘ PRZED PORZĄDKOWANIEM - courseOLD - zeby mozna bylo przyrownac efekty
    << 4 >> (2x) część z NOWOŚCIA kopiujemy do zmiennej newLabel
    << 5 >> (2x) część z PROMOCJĄ kopiujemy do zmiennej coursePromolabel
    << 6 >> (2x) to samo robimy nawet z przyciskami
        UWAGA ! pamiętając o tym ze to juz jest w kilku linijkach dlatego PRZYPISUJEMY DO ZMIENNEJ W NAWIASACH () !!!
    << 7 >> (2x) Dokladnie ta sama sytuacja z tabelą, rowniez w nawiasach
    << 8 >> to samo tez robimy z pierwszą zmienną czyli ze wstawionym obrazkiem
    Ogolnie to z tego co mówi, robimy to ZE WSZYSTKIM co kiedys byc moze bedzięmy na stronie zmieniać
    Juz teraz widać jak ten widok naszego szablonu się zajebiście przeczyścil

    UWAGA ! Pojawił się POWAZNY BARDZO problem z naszymi zmiennymi w szablonie.
    Tutaj najpierw w kodzie mamay dane a dopiero pozniej sobie szablon je pobiera - RZADKOSĆ !
    Najczęściej jest tak że najpierw renderuje się strona A DOPIERO POZNIEJ DANE SĄ BRANE Z SERVERA
    I jak tylko przneiesieniemy nasze dane na koniec skryptu, automatycznie mamy wypierdolke

    << 9 >> ROZWIĄZANIE JEST DOKŁADNIE TAKIE SAMO JAK WE WCZESNIEJSZYCH LEKCJACH - nie przypisujemy do zmienych
        suchego kodu, ALE PRZYPISUJEMY FUNKCJE KTORA ZWRACA NAM ZA KAZDYM RAZEM NA NOWO TEN KAWALEK SZABLONU
        Zamiast:    var courseMedia = <img src={data.image} alt="cover" />;
        Robimy:     var courseMedia = function(data){
                        return <img src={data.image} alt="cover" />;
                    } 
        I tak ze wszystkmimi naszymi kawałkami
        PAMIĘTAJ O PRZEKAZANIE DO FUNKCJI NASZYCH DANYCH ! (data)     
    << 10 >> Pamiętaj też żeby zmienić też WYWOŁANIE ZMIENNYCH NA WYWOŁANIE FUNKCJI oczywiscie z argumentem "data"
        {courseMedia}  -->  {courseMedia(data)}

    No i teraz wydawałoby się ze juz wszystko gra ALE gdy tylko przeniesiemy nasze "data" NA SAM SPÓD skryptyu,
    czyli nawet pod zmienna "course" to znowu mamy podonny błąd, JS nie wie gdzie są dane które ma wywołać
    ROBIMY TO SAMO CO ZE SKŁADNIKAMI SZABLONU ! 
    << 11 >> "course" ze zmiennej robimy na FUNKCJĘ !
    << 12 >> Pamiętamy też o przerobieniu wywołania !

    Wszystko pięknie działa - stworzyliśmy szablony które można wykorztsać WIELOKROTNIE ! 
    I właśnie w następnej lekcji przekonamy się jak tego w praktyce korzystać 
*/