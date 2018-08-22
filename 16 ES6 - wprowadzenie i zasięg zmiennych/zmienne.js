// 16 -- ES6 wprowadzenie i zasięg zmiennych

// << 1 >>
var zmiennaVarGlobalna = true;

{
    // let pies = "pies";  << 3 >>
}

if (true) {
    var dupa = "zmiennaVarBlokowa";  // << 2 >>
    // console.log(pies)  BEDZIE BLAD, pies jest let w innym bloku!
}

(function(){
    // console.log(pies)  BEDZIE BLAD, pies jest let w innym bloku! 
})()

// console.log(pies)  BEDZIE BLAD, pies jest let w innym bloku!

// << 4 >> ----------------------------------
for (var element in [10, 20, 30, 40, 50]) {
    console.log(element);
}

for (var element of [10, 20, 30, 40, 50]){
    console.log(element);
}
// ------------------------------------------

// << 5 >>
for (var itemVar of [1, 2, 3, 4, 5]){
    setTimeout(function(){
        console.log("setTimeout z VARem " + itemVar);
    }, 10)
}
console.log("zmienna var ze srdodka petli for of " + itemVar);

for (let itemLet of [1, 2, 3, 4, 5]){
    setTimeout(function(){
        console.log("setTimeout z LETem " + itemLet);
    }, 10)
}
// console.log("zmienna let ze srdodka petli for of " + itemLet);

// ----------------------------------------
// << 6 >>
const stala = 123;
console.log(stala);
// stala = 345;     // NATYCHMIASTOWY BLĄD

// << 7 >>
const obiekt = { value: 123 };
console.log(obiekt);
obiekt.value = 345;     // MOŻNA! Nie ma błędu !!!
console.log(obiekt);     // MOŻNA! Nie ma błędu !!!


/* 
    << 1 >> stary zapis zmiennych
        No i wiadomo o co chodzi, dostępna ona jest W KAZDYM MIEJSCY W TYM PLIKU,
        czy to w bloku IF CZY TO NAWET W "zamknietej" zamowywolujacej sie funkcji
    << 2 >> zmienna var tworzona w bloku IF (np) ma dokladnie taki sam zasieg jak globalna!
    << 3 >> ALE ZMIENNA TWORZONA W BLOKU zadeklarowana przez let, 
        WIDOCZNA JEST JUZ TYLKO W TYM BLOKU I NIGDZIE NAZEWNATRZ

    VAR  ma ZASIEG FUNKCYJNY - deklarowany WSZEDZIE POZA FUNKCJA ma zasieg w calym pliku,
    jedynie deklarowany wewnatrz funkcji ma zasieg tej wlasnie funkcji
    LET deklarowany w dowolnym bloku {} ma zasieg TYLKO TEGO BLOKU   

    << 4 >>
        Ja pierdole ale petarda !
    ----------------------------------------------------------------   
        ROZNICA MIEDZY PĘTLĄ "FOR IN" A PĘTLĄ "FOR OF" !!!

            Pętla FOR IN jako element WYŚWIETLA KLUCZE :
                0, 1, 2, 3, 4

            Pętla FOR OF jako element WYŚWIETLA WARTOŚCI 
                10, 20, 30, 40, 50
    -----------------------------------------------------------------

    << 5 >>
        Kolejna petarda, zajebiste zeby zagiac jakiegos kutasa na rozmowie !

        Gdy uzywasz petli FOR OF z VARem to JS dla oszczedzenia czasu 
        WSZYSTKIE ZMIENNE W PETLI ZAPISUJE POD TYM SAMYM ADRESEM, DO JEDNEJ ZMIENNEJ!
        I wszystko jest ok dopóki wlasnie nie skorzystasz z jakiegos opóźniacza timeOut
        lub innej asynchronicznosci !
        Wtedy wszystkie wartości w pętli mają taką samą wartość !!!
        "(5x) setTimeout z VARem 5"
        Poza tym zmienna widoczna jest poza funkcją ! I ma wartość ostatniego przypisania:
        "zmienna var ze srdodka petli for of 5"

        Gdy uzyjesz petli FOR OF z LETem TO KAZDA ZMIENNA JEST ZAPISYWANE W INNE MIEJSCE
        W PAMIECI< DO INNEJ ZMIENNEJ ! 
        Dlatego nawet z timeOut wszsytko wyśiwetla się tak jak ma się wyświetlać 
        "setTimeout z LETem 1
         setTimeout z LETem 2
         setTimeout z LETem 3
         setTimeout z LETem 4
         setTimeout z LETem 5"
         Poza tym próba wywołania tej zmiennej poza pętlą WYWALĄ BŁĄD OD RAZU !

         Sam widzisz ile błędów można się pozbyć stosując LET.

    Z LET KORZYSTAJ DOMYŚLNIE! ZAWSZE!
    Z varu jedynie wtedy gdy chcesz mieć jakieś dane dostępnie zawsze i wszędzie
    aczkolwiek podejrzewam że i na to są sposoby lepsze     

    << 6 >> Oczywiście jescze mowa o CONST czyli stałych, które pod jednorazowym zadeklarowniu
        są wyłącznie read-only i nie nadpiszesz już takiej zmiennej

        CONST jest zajebiście przydatne właśnie pod kątem komponentów! No bo jak sobie jakiś
        szablon przypiszesz do zmienej "button" to nawet jakbyś zapomnial ze taka zmienna juz jest
        zajeta to JS od razu ci o tym przypomni, i nie nadpiszesz jednego szablonu drugim !

    << 7 >> No i oczywiście przykłąd z obiekatmi o CONST !
        CONST DZIALA TYLKO NA "JEDNYM POZIOMIE" czyli jeśli zmienna jest no OBIEKTEM
        który w sobie zawiera jakies właściwości NO TO ON NIE SĄ JUŻ STAŁYMI! Stałą jest tylko
        to na jaki obiekt CONST pokazuje a nie TO CO ON SOBIE TAM TRZYMA W ŚRODKU !!!
        Absolutny MUST HAVE jeśli chodzi o wiedzę o ES6 i kruczki 

    W dalszej częsci kursu głównie będziemy wykorzystywać CONST, 
    zmienna LET będzie tylko w sutuacjach gdzie coś będziemy modyfikować
    VAR jedynie w uzasdnionych przypadkach, gdy potrzebny będzie większy zasięg
    
    W następnych lekcjach dalsze konstrukcje ES6, troche bardziej skomplikowane 
    ale za to bardzo przydatne
*/