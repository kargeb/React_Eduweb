// 18 -- Konstrukcja i dekonstrukcja obiektów

/* 
    Poprzednio było o deklaracjach zmiennych
    i o nowym typie funkcji (anonimowej) strzałkowej
    Teraz o szybkiej KONSTRUKCJI i DEKONSTRUKCJI obiektów oraz tablic 
*/

// << 3 >>
    var materiał = "koks";

// << 1 >>
    var obj = {
        value: 123,
        szybkość: "paaaanie",
        materiał,   // << 3 >>
        user: {
            id: 33,
            name: "Testowy",
            // city: "Manasterz",
        }
    }
// << 2 >>
    var parametr = "kolor";

    obj[parametr] = "czerwony";
    obj["kształt"] = "kwadrat";

console.log(obj);

// << 4 >>
    var kolorOld = obj.kolor;
    var wartośćOld = obj.value;

// << 5 >>
    var {value, kolor, user:{name}} = obj;
    console.log(value, kolor, name);
// << 6 >>
    var {value: jeden, kolor: dwa, user:{id: czy}} = obj;
    console.log(jeden, dwa, czy);
    
// << 7 >>
    var [a, b] = [1, 2, ,3 ,4];
    var tab = [45, 67, 89, "piessss", "myszszsz"];
    var [q, w, e, r] = tab;
// << 8 >>    
    var [,,,,mysz] = tab;
    console.log(a, b, q, w ,e ,r);
    console.log(mysz);    

// << 9 >>  Szybkie wyławianie właściwości obiektu
    var getName = (data) => ( {imie : data.user.name} );
    console.log( getName(obj) );

// << 10 >> Bezpośrednie podanie scieżki jako parametr
    var getID = ({user:{id}}) => ({id});
    var getIDsecond = ({user:{id: ajdi}}) => ({ajdi});
    console.log( getID(obj), getIDsecond(obj) );

// << 11 >>  Wartość domyślna
    var getPlace = ( {user:{city = "brak danych"}} ) => ({city});
    console.log( getPlace(obj) );

// << 12 >>  Rozpakowywanie tablic
    var tablica = [1, 2, 3, 4, 5];
    console.log( [...tablica, 6, 7] );

// << 13 >>  Nieznana ilosć argumentów w funkcji
    var nieznaniosc = (...argumenty) => { console.log(argumenty) }
    console.log( nieznaniosc(1, 2, 34, 4545, "dupa", 12312) );
// << 14 >>  Przekazanie tablicy do takiej funkcji JAKO OSOBNE PARAMETRY
    console.log( nieznaniosc(...tablica) );

/* 
    << 1 >> Poprzednio aby stworzyć obiekt ROBILISMY TO ZA POMOCĄ NEW
        Można zrobić to też inaczej porzez taką właśnie konstrukcję
        właściwości mozna dopisywać bezpośrednio w obiekcie
    << 2 >> albo właśmnie w ten sposób, czyli tworząc je jakby po fakcie
    << 3 >> (2x) od ES6 mozna robić coś takiego ! Czyli jesli sobie
        gdzieś wcześniej swtorzylismy jakąs zmienną, to możemy sobie 
        ją wstawić do obietku jako właściwość PODAJĄC SAMĄ NAZWĘ TEJ ZMIENNEJ !
        dawniej trzeba było robić tak:
            materiał : materiał  ->  czyli po prostu unikamy zbędnych powtórzeń
    << 4 >> Poprzednio wlasnie tak trzebabylo wydobywac poszczególne właściwości
        z obiektów, widzimy jaka powtarzalność kodu        
    << 5 >> A OTO NOWY SPOSÓB NA TO żeby do lokalnych zmiennych przypisać 
        właściwości obiektu! Zwróć uwagę na zagnieżdżenie !!!
        Można wyciągać nawet wartości z obiektów w obiekcie user.name
    << 6 >> A OTO JAK MOŻEMY TE WŁAŚCIWOŚCI ZAPISYWAC POD WŁASNYMI NAZWAMI !!!
        Mówi żeby jeszcze wgłębić się na własną rekę w tą technikę bo ma ona
        jeszcze wiele innych możliwości a to jest tylko takie szybkie wprowadznie
    << 7 >> DOKŁADNIE DO SAMO MOŻNA ROBIC Z TABLICAMI !!!     
    << 8 >> W TEN SPOSÓB MOZNA POMIJAĆ KOLEJNE ELEMENTY W TABLICY !

    CZYLI zwróć uwagę na to że W JEDNEJ LINNI możesz sobie rozebrać 
    zarowno OBIEKT jak i TABLICE i wyciągnąź dowolne wartości dowolnie nazwane !

    I TERAZ UWAGA! Takie własnie jednolinijkowe DEKONSTRUKTURYZAJCE obiektów
    zajebiście przydadzą się w funkcjach strzałkowych !
    << 9 >> za pomocą jednej liniki możesz sobie zrobić funkcję która własnie
        pobiera sobie imię z takiego już dość zagnieżdżonego obiektu
        Tylko kurwa czemu tutaj jest na odwrót, że najpierw nazwa zmiennej a pozniej wydobycie 
    << 10 >> MOŻNA JESZCZE PROŚCIEJ !!!
        Mozna od razu jako parametr podać miejsce gdzie ta funkcja ma szukać w przekazanym obiekcie !
        A póżniej już tylko co ma zwrócić! No i tak samo można wyłowić oryginalną nazwę albo ją przyisać
        PETARDA !  

    To wygląda teraz na bardzo skomplikowane ale z czasem docenisz to w chuj, że nie musisz pisać ciul
    wie jakich konstrukcji tylko jak dostaniesz w chuj danych z jakiegos serwera to wlasnie takimi
    prostymi funkcjami powyciągasz dokładnie to co chcesz, szczególnie z jakihs JSONów    

    << 11 >> KOLEJNA ZAJEBISTA OPCJA - WARTOŚCI DOMYŚLNE ! 
        robi się je najprościej na świecie, po prostu podając po znaku = co ma być przypisane jeśli danej 
        wartości nie ma w tym obiekcie ! Jesli jej nie ma, to BEZ WARTOŚCI domyślnej byłoby UNDEFINED
        a tak to mozeny sobie wpisać właśnie np taki komunikat "brak danych".
    << 12 >> TUTAJ ZNAJOMY OPERATOR "..." pozwala na BEZPOŚREDNIE ROZPAKOWANIE TABLICY
        gdyby nie te kropki to byłoby w consoli  --> (3) [Array(5), 6, 7]
        ale dzięki nim JS odczytuje to porostu jako nową tablicę  -->  (7) [1, 2, 3, 4, 5, 6, 7]
    << 13 >> KOLEJNA PETARDA ! - funkcje z nieznaną ilością argumnentów
        Przed ES6 trzebabyło używać zmiennej ARGUMENTS w takich sytuacjach gdy nie wiedzieliśmy dokłandnie
        ile będzie podanych wartości do danej funkcji - było to troche uciążliwe
        TERAZ DZIĘKI "..." możemy własnie taką zmienną wrzucić w miejce arkgumentu "...zmienna"
        i w kodzie pod "zmienna" będzie TABLICĄ ze wszystkimi danymi które do funkcji zostaną przesłane!
    << 14 >> ta sama konstrukcja "...tablica" doskonale sprawdza się gdy chcemy przekazaną tablicę
        od razu rozbić NA POSZCZEGÓLNE PARAMETRY, to właśnie przesyłamy ją w ten sposób
    
    W TEN SPOSÓB OGARNELIŚMY NAJWAZNIEJSZE ELEMENTY ES6, z których bardzo często będziemy korzystać 
    w dalszej częsci kursu. Trzeba to przyswoić na blachę, jak Ojcze Nasz
    Oczywiście to tylko cząstka nowego ES6 więc zapierdalaj do osobnego kursu PALARZA !


*/
