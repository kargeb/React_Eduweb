// 10 - DYNAMICZNE SZABLONY JSX

// << 2 >>
var data = {
    title: "Temat Kursu",
    description: "Opis kursu wykorzystujący tym razem zmienne w JSX...",
    image: "http://placehold.it/150x150x"
}
// << 3 >>
var courseOLD  = (
    <div className="media">
        <div className="media-left">
            <img src="http://placehold.it/150x150x" alt="cover" />
        </div>
        <div className="media-body">
            {/* << 1 >> <h3>Temat kursu</h3>  TAK WYGLĄDAJĄ KOMENTY W SEKCJI JSX*/}
            <h3>{ "Temat Kursu " + " Dynamiczny " }</h3>  
            <p>Opis kursu ... </p>
        </div>
    </div>
)

// << 3 >>  << 4 >>
var course = (
    <div className="media">
        <div className="media-left">
            <img src= {data.image} alt="cover" />
        </div>
        <div className="media-body">
            <h3> {data.title} </h3>  
            <p> {data.description} </p>
        </div>
    </div>
)

ReactDOM.render(course, document.getElementById("root"));

/* 
    No więc rozdzdzieliliśy pliki
    UWAGA tak jak robiliśmy to w React, tak teraz rownież będziemy mieszac JS z kodem HTML
    << 1 >> OTO JAK WSTAWIAMY JS W JSX, używamy do tego właśnie takich klamr
        Ja jebie, nie działało dopóki nie wyłączyłem cache while devtool open, teraz OK
        Czyli wszystko to co w klamrach są to wyrażenia JS
        Oczywiśnie znowy możesz podejrzeć ile więcej trzebaby się opisać w zwykłym React
    << 2 >> WSZYTSKIE ZMIENNE w tym opliku są oczywiście widoczne równiez w JSX na dole
    << 3 >> Tworze zupełnie nową zmeinna "course" a tamtą zmieniam na "courseOLD"
    << 4 >> No i proszę, wszystkie dane wstawiam sobie jako zmienne w {} a nie suchy string 
        On przestrzega żeby W ATRYBUTACH ROWNIEŻ WSZYSTKO PODAWAĆ W KLAMRACH a nie w cudzyslowie
        ale dla mnie to w sumie oczywiste  (zeby nie robic np.  src="{dane}" tylko  src = {dane})

    UWAGA! NAJWAŻNIEJSZE! W {} MOŻESZ PODAWAĆ WYŁĄCZNIE WYRAŻENIA czyli zwykłe zmienne z danymi !!!
    Nie możesz tam umieszczać żadnych IFów, funkcji ani innych WYRAŻEŃ BLOKOWYCH
    no bo pamiętaj że BABEL transpiluje to do zwykłego JS a tam to co podajemy w  {} 
    trafia jak zwykły argument do funkcji ! A nie możesz do niej przekazać czegokolwiek blokowego !

            React.createElement(
            "h3",
            null,
            " ",
            data.title,  -->  ZWYKŁA ZMIENNA -> suche dane, bez zdziwnień !!!
            " "
            ),

    Jeśli właśnie chodzi o wszelkie elemnety warunkowe i logikę, no to tym zajemimiy się właśnie w 
    kolejnych lekcjach
*/