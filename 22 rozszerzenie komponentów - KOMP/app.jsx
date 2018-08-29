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
    <button className="btn btn-default" {...props}>
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> 
)
// << 5 >>  zwracamy komponent Button   << 7 >> domyslna wartosc "btn-success"
// var CartButton = (props) => {
//     return <Button  className="btn btn-success" {...props}/>
// }

// << 9 >> komponent CartButton od nowa (nie jest zly ale u dołu lepszy)
// var CartButton = (props) => {
//     return (props.in_cart ?
//         <Button className="btn btn-block btn-danger" icon="remove" label="Usuń z koszyka"/> :
//         <Button className="btn btn-block btn-success" icon="shopping-cart" label="Dodaj do koszyka"/>
//     )
// }

// << 10 >> nowa koncepcja - ostateczna
var CartButton = ( { in_cart, icon, label, className="btn btn-block" } ) => {
    return (in_cart ?
        <Button className={className + " btn-danger"} icon={ icon || "remove"} label={label || "Usuń z koszyka"}/> :
        <Button className={className + " btn-success"} icon={ icon || "shopping-cart"} label={label || "Dodaj do koszyka"}/> 
    )
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
    {/* << 6 >>     << 7 >> przekazywanie wartosci wielu*/}
    {/* <CartButton label="Dodaj do koszyka" icon="shopping-cart" className="btn btn-danger"/> */}

    {/* << 8 >> zmiana CartButton na komponent "inteligentny" */}
    <CartButton in_cart={true} />   {/* NAJWAŻNIEJSZE WYWOŁANIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/} 
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
    << 2 >> PRZENOSMY Z PLIKU HTML naglowek listy to naszego komponentu, zeby mozna je bylo latwiej odroznic "koszyk"
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

    Niestety już kurwa tutaj gubie się czy on już przekazuje faktyczną wiedże ostateczną,
    czy kurwa co mozna robic ale jeszcze nie tak zajebiście jak w ostatecznosci ...
    
    << 7 >> Ogólnie bardzo fajnie mozna wykorzystać opcję wartości domuślnych !
        I W CHUJ WAŻANĄ RZECZĄ JEST KOLEJNOŚĆ PRZEKAZYWANIA ATRYBUTÓW

        No więc przekazujemy do CartButton takie atrybuty:
            <CartButton label="Dodaj do koszyka" icon="shopping-cart" className="btn btn-danger"/>

        Będąc w CartButtm mamy taki zapis:

            var CartButton = (props) => {
                return <Button  className="btn btn-success" {...props}/>

        TUTAJ JEST W CHUJ WAZNE BO KORZYSTA Z TEGO W WIELU MIEJSCACH
        Z CartBtton przekazujemy wszystko dalej do Button ALE ZAUWAŻ ŻE {...poros}
        JEST WYPISANE POZNIEJ NIZ className"btn btn-success" !!!
        I właśnie dzięki temu, jeśli nie wysłalibyśmy wczesnieniej klasy
            className="btn btn-danger" (które jest obecnie w {...props})
        DO TO Button POSZLA BY WLASNIE TA WARTOSC DOMYSLNA CZYLI :  className="btn btn-success"
        A więc przeslalismy przycisk CZERWONY a gdyby nie to to poszedłby ZIELONY

        DALEJ JEST DOKLADNIE TO SAMO!
            var Button = (props) => ( 
              <button className="btn btn-default" {...props}>

        Button dostaje {...props} z CartButton, ALE PRZED NIM MA KLASE DOMYSLNA  
            className="btn btn-default"      

        Czyli jeśli nie dostałby ani "btn-danger" ani "btn-success" TO ZOSTALABY WLASNIE TA,
        czyli przycisk mialby kolor szary ! 
        
        CZYLI TAK RADZIMY SOBIE Z WARTOSCIAMI DOMYSLNYMI pamiętając o tym że 
        MAJĄ BYĆ PRZED resztą przekazywanych argumnetów (czyli czysta wiedza z ES6)
        
       JEDZIEMY DALEJ !
       << 8 >>  Teraz robimy juz CALKIEM INTELIGENTNBY KOMPONENT CartButton, któremu nie będziemy 
       przekazywać wszystkiego tak jak własnie poprzednio, po koleji, wszystkich atrybutów,
       TYLKO NA PODSTAWIE JEDNEJ ZMIENNEJ, on już sobie sam wszystko z automatu poustawia.
            czyli zamiast:
        <CartButton label="Dodaj do koszyka" icon="shopping-cart" className="btn btn-danger"/>
       TO, czyli OTO TA ZMIENNA:  in_cart
        <CartButton label="Dodaj do koszyka" in_cart={true}/>
                
        << 9 >> No i pozostaje nam całkiem przerbić deklaracje komponentu, stary WYKOMENTOWYWYUJEMY

            var CartButton = (props) => {
                return (props.in_cart ?
                    <Button className="btn btn-block btn-danger" icon="remove" {...props} /> :
                    <Button className="btn btn-block btn-success" icon="shopping-cart" {...props} /> )}

            Korzystamy juz ze znajomej nam konstrukcji z ? i :
            Czyli w zależnosci od zmienne in_cart szły by inne atrybuty do komponentu Button
            I wszystko działałoby pięknie gdyby nie to ŻE Button NIE ROZPOZNAJE WARTOŚCI in_cart,
            on to chujowo wytlumaczyl ALE PRZEGLĄDARKA MÓWI ŻE
                    Received `true` for a non-boolean attribute `in_cart`.
            Czyli nie chuja nie moze tak, byc, 
            KOMPONENT STATYCZNY BUTTON NIE POTRAFI PRZYJĄĆ ZMIENNYCH Z KOMPONENTU INTELIGENEGO 
            Czyli NIE MOZNA WJEBAC W {...props} WSZYSTKICH ATRYBUTÓW Z NIEGO JAK LECI
            Trzeba zmienić koncepcję

            Wyjebujemy ten {...props}, odświeżamy stronę i patrzymy CZEGO NAM BRAKUJE W TYM KOMPONENCIE,
            I bardzo łatwo zauważyć że brakuje w zasadzie tylko "label" i wlasnie tylko ja dodajemy

        I tak naprawde już by to mogło w zasadzie zostać, ale dorabiamy jeszcze jedną rzecz,
        TAKIE COŚ ŻE BĘDZIEMY MOGLI W KAŻDEJ CHWILI WYSLAC DO CartButton INNĄ WARTOŚĆ, 
        NIŻ TA PRZEWIDZIANA W OPCJACH DOMYŚNYCH ! 
        Np dodaliśmy między czasie btn-block czyli będzie on na całą szerokość komponentu,
        ale w dowolnej chwili np będzie mogli sobie to zmienic, albo zmienic ikone, albo label !!!

        << 10 >> Tworzymy nowąm ostatnią już w tej lekcji koncepcję:

                var CartButton = ( { in_cart, icon, label, className="btn btn-block" } ) => {
            Zastąpiliśmu "props", znanym z ES6 destructuringiem obiektów, 
            DZIĘKI CZEMY JUŻ TUTAJ MOŻEMU PRZYPISAC KTOREMUŚ Z ATRYBUTÓW DOMYŚLNĄ WARTOŚĆ,
            tak jak to ma miejsce w className, czyli jesli nie dodatniemy innej className,
            to zawsze będzie to btn-block a więc przycisk na całej szerokości diva

            return (in_cart ?
    <Button className={className + " btn-danger"} icon={ icon || "remove"} label={label || "Usuń z koszyka"}/> :

        W zaleznosći od "in_cart" ustawiamy własnie tutaj, w tym komponencie CO MA SIE WYSWIETLIC NA STRONIE,
        a nie przy jakims tam przekazywaniu do niego tych atrybutów (oczywiscie chyba ze będziemuy chcieli zmienic cos)

        W CHUJ WAŻNA KONSTRUKCJA !!!   -->  label={label || "Usuń z koszyka"}
        TO NA NIEJ WŁASNIE OPIERA SIĘ TO, że jeśli nic innego nie dostaniemy, to ustawione zostaną właśnie takie parametry,
        jakie ustatliliśmy !
        Czyli jesli in_cart TRUE to label "usuń z koszyka" a jesli FALSE to "Dodaj do koszyka"
        NO I WŁASNIE DZIĘKI TEMY WSZYSTKIEMU W WYWOŁANIU CartButton ZOSTAJE WYŁĄCZNIE TO: !!!

        <CartButton in_cart={true} />   !!!!!!!
        
        A jeśli tylko, dowolną rzecz będziemy chcieli zmienić na inną, niż ustawioną w tym koponencie,
        TO WYSTARCZY ZROBIĆ TO: !!

        <CartButton in_cart{true} label={"dupa"} />  I LABEL WŁASNIE NA TAKI NAPIS SIĘ ZMIENI !!

        Czyli stworzyliśmy INTELIGENTNY KOMPONENT który przekazuje atrybuty DO INNEGO, ZWYKŁEGO KOMPONENTU,
        w zleżności od tego CO SIĘ WYDARZYŁO NA STRONIE !
        Ilość możliwych zagnieżdżeń, własnie w taki sposób, jest NIEOGRANICZONA.

        W dalszej cześci pokazane zostanie JAK KOMPONOWAĆ TAKIE KOMPONENTY DYNAMICZNIE
*/