// 17 -- Konstruktory i funkcje lambda

// różnice między zapisem funkcji międzu starym a nowym JS

// << 1 >>
function nazwa_funkcji(argument){
    return "wartość zwracana"
}
// << 2 >>
console.log(nazwa_funkcji.name);

// << 3 >>
function Konstruktor(nazwa){
    this.name = nazwa;
    this.value =123;
}

// << 4 >> 
Konstruktor.prototype.sayHello = function(){
    return "Witam, jestem " + this.name;
}

// << 5 >>
var o = new Konstruktor("pies");
console.log(  o.sayHello() );

// ----- nowy zapis funkcji ES6 -----
// << 6 >>
var strzalka = (argumentFunkcji) => {
    return argumentFunkcji + "!";
}
console.log( strzalka("czosz") );

// << 7 >>
var drugaStrzalka = (argumentFunkcji) => ( argumentFunkcji + "!!!" );
console.log( drugaStrzalka("czosz z drugiej") );

// << 8 >>
console.log( [1, 2, 3, 4].map(strzalka) ); 

// << 9 >> 
console.log( [1, 2, 3, 4].map( x => x + 2 ) );

// << 10 >>
console.log( [1, 2, 3, 4, 5, 6].map(x => x * 10).map( x => x - 12 ).filter( x => x < 30 ) );

// << 11 >>

function KonstruktorDwa(nazwa) {

    this.name = nazwa;
    this.value = 999;

    this.strzalka = (argument) =>  console.log( argument + " " + this.name + " !" );

    this.zwykla = function(argument) {
        console.log( argument + " " + this.name + " !" );
    }
}

var obj = new KonstruktorDwa("OBIEKT");

// console.log(obj.strzalka(" Ze srzałki "));
// console.log(obj.zwykla(" Ze zwyklej "));

setTimeout(function () {
    obj.strzalka();
}, 2000)

setTimeout(function () {
    obj.zwykla();
}, 3000)



/* 
    << 1 >> to jest zwykla funkcja
    << 2 >> dzięki temu mozemy podejzec jej nazwe
    << 3 >> Tutaj tworzymy konstruktor z dwiema wartościami
    << 4 >> tak dodajemy funkcje do konstruktora (klasy)
    << 5 >> tworzenie nowego obiektu i wywolanie jego funkcji
    << 6 >> oto nowy zapis funkcji STRZAŁKOWY i jej wywołanie
    << 7 >> oto KRÓTSZY zapis tej samej funkcji ! 
        Zwroc uwagę czym się różni!
        zamiast bloków {} treść funkcji jest w () !!!
        ALE ROWNIE DOBRZE MOGŁO BY ICH NIE BYĆ i tak by przeszło !
        Dzięki temu mozna BŁYSKAWICZNIE tworzyć małe funkcje
        i to się strasznie przydaje w funkcjach CALLBACK !!!
        Czyli tworzymy krutko żyjącą funkcję tylko po to 
        żeby ją przekazać do funkcji jako argument
     << 8 >> przykład z map -> pacz jakie cuda !
        ["1!", "2!", "3!", "4!"]
     << 9 >> JAK PROSTO MOZNA WPIERDZIELAC OD RAZU JAKIES OBLICZENIA !
     << 10 >> no i tu juz PETARDA ! "map" zwraca TABLICĘ! A więc
     po "." mozna dalej jechac z wszystkimi funkcjami ktore na takich 
     tablicach działają !
     Najpierw wszystkie elementy * 10, pozniej od kazdego minus 12 i
     na koniec wybranie jedynie tych ktore są mniejsze niz 30 [-2, 8, 18, 28] MEGA



*/
