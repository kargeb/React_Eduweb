// 15 -- Renderowanie list

// Renderowanie list lub kolekcji obiektów
// Stworzony we wczenisejszej lekcji element, zlozony z szablonow
// chce wyrenderowac dynamicznie kilka razy, zmieniajac jego dane


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

var course = function (data) {
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

// << 3 >>  << 6 >>
// var coursesList = function(list) {
//     return (
//         <div>
//             {course(list[0])}
//             {course(list[1])}
//             {course(list[2])}
//         </div>
//     )
// }

// << 7 >>
var coursesList = function (list) {
    return (
        <div>
            {
                list.map(function (data) {
                    return <div key={data.id} > {course(data)} </div>
                })
            }
        </div>
    )
}

// << 5 >>
var list = courses_data.slice(0, 3);

// << 1 >>      << 2 >>!!!    << 3 >>  << 4 >>  << 6 >>
ReactDOM.render( coursesList(list),document.getElementById("root"));
    

/* 
    << 1 >> usuwamy nasze dane, wklejone w nasz skrypt, i zalaczmy cale courses-data.js DO HTMLowego pliku
        W tym skrypcie, podstawiamy go od razu do funkcji "render",
        ALE UWAGA ! TYLKO PIERWSZY ELEMENT Z LISTY  (course(courses_data[0])
    << 2>> Teraz jaja -> przekazuje do funkcji "render" nie samo wywolanie funkcji,
        ALE kurwa wręcz normalną konstrukcję JSX z 3 wywołaniami tej funkcji - OK
                ReactDOM.render(
                    <div>
                        {course(courses_data[0])}
                        {course(courses_data[1])}
                        {course(courses_data[2])}
                    </div>, 
                    document.getElementById("root"));
    << 3 >> wycinamy pierwszy argument funkcji "render" i umieszczamy go w zmiennej (czyli sposob z poprz lekcji)
    << 4 >> oczywiscie od razu tez robimy z tego funkcje
    UWAGA ! Mowi o bardzo dobrej zasadzie:
        Jeżeli wszystkie elementy tego szablonu są statyczne TO MOZE TO BYC PRZEKAZYWANE JAKO ZMIENNA 
        Ale jeśli te elementy mają się zmieniać w trakcie programu TO OD RAZU RÓB TO JAKO FUNKCJA 
    << 5 >> znowu zmiana, po prostu pobierzemy sobie do nowej zmiennej 3 elementy z naszej bazy za pomoca "slice"    
    << 6 >> i właśnie tą listę przekazujemy do funkcji coursesList I DO FUNKCJI RENDER tez jako argumnet cousesList!
    << 7 >> TERAZ PIERDOLI ZE UZYWALISMY WCZESNIEJ FUKNCJI "MAP" A CHUJA KURWA UŻYWALIŚMY
        No więc implementujemy map, chuj wiedząć jak ona dziala,
        no ale dziala tak ze wywoluje sie ja na tablicach i z kazdym elementem robimy co chccemy w returnie,
        wt tym przypadku przekazujemy go do funkcji course     -  OK
        Dobre jest to że jak tylko zmienimy sobie w "list" slice np na 6 to wlasnie tyle elementow wyswietla strona !
    
    Tak więc jeszcze raz:
        ReactDOM.render( coursesList(list),document.getElementById("root"));   
        przekazujemy do coursesList tą listę:   var list = courses_data.slice(0, 3);
        w coursesList trafia jako argument : 
                var coursesList = function (list) {
                    return (
                        <div>
                            {
                                list.map(function (data) {
                                    return course(data)
                                })
                            }
                        </div>
                    )
                }
        no i diva gdzie kazdy z nich ma w sobie wywolanie fukncji map na kazdym elemencie z LIST -> (data) = kazdy element        

      DALEJ
      Mimo ze wszytsko gra to otrzymujemy błąd: Each child in an array or iterator should have a unique "key" prop.
      React mowi ze chce aby kazdy pojedynczy element listy MIAL SWOJ UNIKALNY KLUCZ, zeby w przypadku ponownego renderwaoania,
      nie jebal sie z porównywaniem składni wszystkich pojedynczych elementwó TYLKO RENDEROWAL JE NA PODSTAWIE KLUCZY !

      UWAGA ! No i o ile unikalny klucz to nie jest nic trudnego, nawet durna zmienna mozna to zrobic
      O TYLE STABILNY KLUCZ, ktory zawsze trzyma się konkretnej wartosci tablicy to juz moze byc klopot
      Więc NAJLEPSZYM WYJSCIEM to jest po prostu miec zbior danych Z WLASNYM KLUCZEM np "id" tak jak w naszej bazie !
      Jesli tego nie ma to próbować znalezc inną unikatową wartość "pesel" czy cos, ale często jest to nie mozliwe
      Więc on mowi ze w przypadku jak juz kompletnie nie wiadomo na czym się oprzeć, żeby funkcją haszującą wybrać
      2-3 właściwosci które na 100% się nie powtórzą jednocześnie i wlasnie z nich generowac autonomiczny klucz

      I teraz tak, wygląda na to (bo oczywiscie kurwa nie powiedzial) ze ten klucz ma byc wlasnie w kodzie HTML pod
      nazwą "key". Pytanie w którym momecie powinno się go dołączać. 
      Moglibyśmy w ten sposób:
                W funkcji coursesList przekazac jako drugi argument wlasnie data.id
                    list.map(function (data) {
                        return course(data, data.id)
                    })
       A następnie w "course" dodać ten id jako key np w tym miejscu:
                var course = function (data, key) {   <------
                        return (
                            <div className="media course" key = {key}>  <------
                                <div className="media-left">
                                    {courseMedia(data)}
                                </div>

        To by zadziałało, błąd by zniknął
        ALE UWAGA !!!
        NASZ SZABLON PRZESTAŁBY BYĆ UNIWERSALNY !!! I np gdybysmy chcieli jak poprzedni tylko jedna konretna dana wylowaic
        to juz nie daloby by rady bo ten KEY bylby wymagany !

        WIĘĆ ZAJEBISTA RADA TO TAKA ZEBY TEN KLUCZ NIE RENDEROWAĆ W SZABLONACH 
        ALE W MIEJSCU GDZIE RENDERWOANA JEST LISTA JUZ DO WYŚWIETLENIA !!!
        << 8 >> DOKLADNIE TAK  (czyli dodajemy nowego diva z wlasnie takim kluczem)
                list.map(function (data) {
                    return <div key={data.id} > {course(data)} </div>
                })
        DZIAŁA ! 
        Ciekawe jest to, oczywiście o tym nie mówi, że nie ma tego atrybutu KEY nigdzie w kodzie ! Jest widoczny dopiero w tym 
        dodatku do DevTools React! Ale w normalnym podglądzie DOMu ni chuja 

        Mówi że można to zrobić jeszcze lepiej, ale o tym w dalszej części kursu
*/