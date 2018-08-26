// 23 -- Przeplatanie komponentow

/* 
    Przekazywanie, czyli przeplatanie ze sobą komopnentów.
*/

var CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )

var Button = (props) => ( 
    <button className="btn btn-default" {...props}>
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> 
)

var CartButton = ( { in_cart, icon, label, className="btn btn-block" } ) => {
    return (in_cart ?
        <Button className={className + " btn-danger"} icon={ icon || "remove"} label={label || "Usuń z koszyka"}/> :
        <Button className={className + " btn-success"} icon={ icon || "shopping-cart"} label={label || "Dodaj do koszyka"}/> 
    )
}

var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        {/* << 5 >> Pożyczamy sobie komponent */}
        <Button label="Dodaj do ulubionych" icon="star" />
    </div>
)

// << 8 >>
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
        {/* << 12 >>  zmiana na false */}
    <CartButton in_cart={false} /> 
    </div>
)
// << 10 >>
var CartDetails = (props) => (
    <CartButton in_cart={true} />
)

var Course = (props) => {
    var {data, Details} = props;
    console.log(props);  // << 2 >>  podgląd props z childrenem
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

                 {/* << 3 >> umieszczamy nasz tekst na stronie*/}
                {props.children}
            </div>

            {/* course details column */}
            {Details ? 
            <div className="media-right">
                <Details {...props}/>
            </div> : null
            }
        </div>
    )
} 
// << 1 >> zrobienie Course jako dwuelement i wpisanie tekstu w nim
var CoursesList = (props) => {
    var list = props.list;
    return (
        <div> 
            <h1>Kursy</h1> 
            <hr />
            <div>
                                     {/* << 7 >> przeslanie calego komponentu << 9 >> Duza litera*/}
                {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                    

                {/* << 4 >> zmiana polozenia komponentów  */}  
                < CoursePromoLabel data={data} />
                {/* Course actions */}
                < CourseActions data={data} />

                </Course>)}
            </div>
        </div>
    )
}

var ShoppingCartList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1>Koszyk</h1>
            <hr />
            <div>
                                                                {/* << 11 >> nowy komponent */}
                {list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
                {/* << 6 >> Wklejamy pozyczony komponent z <<5>> zmieniajac slowo w label */}
                    <Button label="Przenieś do ulubionych" icon="star" />
                </Course>)}
            </div>
        </div>
    )
}

var cart_list = courses_data.slice(0,1);
var list = courses_data.slice(0, 3);

ReactDOM.render( <div>
        < ShoppingCartList list={cart_list} />
        < CoursesList list={list} />
    </div> ,document.getElementById("root"));
    
/* 
    Poprzednio podzieliliśmy nasza aplikację na 2 listy - główną i koszyk
    Obie korzystają z tego samego komonnentu "media course"
    Chcemy jednak zrobic tak, zeby skłądowe tych komponentów bardziej się od siebie
    różnniły, żeby np ptzycisk "dodaj do koszyka" nie wyglądał tak samo w kursach
    i w koszyku.
    Czyli WSTRZYKNIEMY inny komponent do tych większych komponentów w zależności od tego
    w której liście będzie się on znajdować.
    Na początke zajmiemy się 2 pozostałymi przyciskami "szczególy" oraz "ulubione"

    << 1 >> Zaczynamy od CourseList i z elementu <Course ... /> ROBIMY ELEMENT BLOKOWY
            {list.map((data) => <Course data={data} key={data.id}>
                    "Extra content!"
                </Course>)}
        po czym wpisujemy w nim jakis dowolony tekst.

    OKAZUJE SIĘ, że ten wpisany tam tekst JEST RÓWNIEŻ PRZEKAZYWANY DO OBIEKTZU PROPS,
    w postaci właściwości "children" !
    << 2 >>  w Course robimy consolLoga i patrzymy co tam:
        {data: {…}, children: ""Extra content!""}
        Jak widać, FAKTYCZNIE JEST TAM children z wpisanym przez nas tekstem 

    << 3 >> W tym momencie nigdzie go na stronie nie widac, dlatego montujemy go w DOM
        tak jak inne lememnty JS - w klamerkach -DZIAŁA

    NO UWAGA! w tym samym miejscu możemy umiescić DOWOLONY KOD HTML, JSX lub KOMPONENTY!
    << 4 >> Wycinamy więc 2 komponenty z ogólnego Course i wklejamy je tylko do pierwszej listy.
        Otrzymujemy błąd, bo musimy przekazać inne atrybuty niż było to przekazwyane w Course:
        Zmamieniamy to:  < CoursePromoLabel {...props} />
        Na to:  < CoursePromoLabel data={data} />  
        No i wszystko gra, w liście KOSZYK nie ma przycisków, a w gównej są
    << 5 >> Teraz z koleji dodawmy sobie jakis przycisk do koszyka, i zrobimy to w taki sposób
        że pożyczymy sobie po prostu komponen <Button>    
    << 6 >> wklejamy go do ShoppingCart oczywiscie wczenisej robiac z Course element 2 czesciowy,
        zmieniamy takze tekst w label na "przenies"    

    I to była pierwsza częśc tej lekcji - JAK WIDZISZ, jesli wszystko sobie ładnie ogarniesz,
    TO DOWOLONY KOMPONENT NA TEJ STORNIE MOŻESZ SOBIE WKLEJAC W INNY I WSZYSTKO PIĘKNIE GRA !
    
    Teraz zajmiemy się częścią strony "Course detail" czyli tabelką po prawej,
    zastanowimy się jak możemy sobie ją "parametrycznie" schować
    
    UWAGA! Moglibysmy to zrobic na piechote w ten sposób że w CoursesList do funkcji MAP
    dodalibysmy dodatkowy parametr "details":  
        {list.map((data) => <Course data={data} key={data.id} details={true}>
    Następnie w Course wyłowić go z props    
        var Course = (props) => {
        var {data, details} = props;
    i pozniej juz w Course zrobic doskonale nam znany warunek:
            {details ? 
                <div className="media-right">
                    < CourseDetails {...props} />
                </div> : null }
    i to faktycznie działa !

    Ale przy kazdym kolejnym przycisku, musielibysmy najebac znowu takich warunkow, kodu JSX,
    pisac na nowo co chcemy a co nie, dlatego chcemy wykorzystać tutaj KOD ktory już na stornie mamy !

    TAK WIĘC SPRÓBUJEMY SOBIE PRZESŁAĆ CAŁY KOMPONENT JAKO PARAMETR, ZMIENNĄ
    << 7 >> tak więc zamieniamy to:
        {list.map((data) => <Course data={data} key={data.id} details={details}>
        Na to:
        {list.map((data) => <Course data={data} key={data.id} details={CourseDetails}>
    Pamiętajmy że nasz CourseDetails do po prostu ZMIENNA do której przypisaliśmy funkcje ! << 8 >>
    Tak więc trafia ona do naszego Course, nie inaczej jako właściwość "props" czyli "props.details":
    Z tym że, trzebaby dopisać klamerki bo jest to JS a nie JSX:
        { <props.details {...props} />}
    No ale zauważ że przecież zaraz na początku Course wyłowiliśmy tą zmienną:
            var {data, details} = props;
    Więc wystaczy samo details bez props.details:
        { <details {...props} />}
    Ale pojawia się bład! Błąd już znany nam z pierwszych lekcji tego kursu!

    KOMOPNENTY MUSZĄ BYĆ PISANE DUŻĄ LITERĄ !!!
    TAK WIĘĆ PAMIĘTAJ ŻEBY WSZYSTKIE ZMIENNE SŁUŻĄCE DO PRZEKAZYWANIA KOPOMONENTÓW
    OD RAZU PISAĆ DUŻĄ LITERĄ !!!

    << 9 >> zmieniamy TU:   Details={CourseDetails}
            TU:     var {data, Details} = props;
            I TU:
                {Details ? 
                <div className="media-right">
                    { <Details {...props} />}
                </div> : null   }
        No i mało tego! Zauważ że teraz jest to po prostu komponent JSX więc można WYJEBAĆ KLAMRY:
            { <Details {...props} />}   -->     <Details {...props} />
    DZIAŁA!

    << 10 >> I ostatnia już rzecz
        TWORZYMY SZYBCIUTKO NOWY KOMPONENT KTÓRY WYKORZYSTA TO CO ROBILIŚMY TERAZ, 
        I WSTAWI SOBIE PRZYCISK "usun z koczyka" DO SEKCJI "KOSZYK"
    << 11 >> Wstawiamy sobie go to ShoppingCartList:
        Zamiast:
         {list.map((data) => <Course data={data} key={data.id}>
         To:
          {list.map((data) => <Course data={data} key={data.id}>
    
    WSZYSTKO PIĘKNIE GRA ! 
    << 12 >>    Ostatnie co robimy to zmiana "in_cart" w CoursesList na FALSE 

    TAK WIĘC DO KOMPONENTÓW możemy przekazwyać NIE TYLKO SAME DANE ale również 
    CAŁE INNE KOMPONENTY, a gdy będziemy te przekazane komponenty renderowac, 
    to do nich również możemy przekazać inne atrybuty

    Tak jak poprzenia lekcja, możeby być właśnie nazwana ROZSZERZANIEM, KOMPONOWANIEM
    LUB DZIEDZICZENIEM KOMPONENTÓW, tak tutaj dobrą nawzą jest WSTRZYKIWANIE, PRZENOSZENIE,
    ale on poleca mówić na to PRZEPLATANIE. W innych frameworkach, podobne zachowania 
    nazywa się TRANSKLUZJĄ.
    Daje to oczywiście potężne możliwości - jeden, ten sam kopomnent, wykorzystaliśmy w dwuch
    różnych miejscach w dwa zupełnie inne sposoby.
    Jeśli coś jest nie jasne, to wracaj kurwa i wszystko powtarzaj bo dalsza część kursu to właśnie
    ciągłe wykorzystywanie już napisanego kodu, żeby wszystko się ze wszystkim w ten sposób łączyło

    Następna lekcja to UPORZĄDKOWANIE naszego kodu, bo już całkiem sporo go najebało.
    A następne częsci to już bardziej interaktwyne rozwiązania w bibliotece React.
*/