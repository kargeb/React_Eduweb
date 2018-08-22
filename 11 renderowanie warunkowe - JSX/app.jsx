// 11 -- Renderowanie warunkowe

// Wiesz już jak dynamicznie pokazywać dane w JSX to teraz je poukrywamy i popokazujemy

var data = {
    title: "Temat Kursu",
    description: "Opis kursu wykorzystujący tym razem zmienne w JSX...",
    image: "http://placehold.it/150x150x",
    is_new: true,  // << 3 >>
    is_promo: true // << 2 >>
}

// << 1 >>  << 2 >>  << 3 >> 
var course = (
    <div className="media">
        <div className="media-left">
            <img src= {data.image} alt="cover" />
        </div>
        <div className="media-body">
            <h3> {data.title} { data.is_new ? <span className="label label-default"> NOWY! </span> : null } </h3>  
            <p> {data.description}</p>
            {  data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> }
        </div>
    </div>
)

ReactDOM.render(course, document.getElementById("root"));

/* 
    << 1 >> OK no więc wychodzimy z założenia że nasz kurs jest w promocji i dodajemy BOLDA o tym mówiącego
        Poza tym w h3 dodajemy SPANA informujacego o tym że jest NOWY, no i małe stylowanko do niego classNAME
    << 2 >> Dodajemy praktycznie takie same dane jak w lekcji poprzedniej z danymi JSON
        No i teraz jeszcze raz, NIE MA OPCJI ŻEBY ZROBIĆ COŚ TAKIEGO !!! : 
                    <p> {data.description} </p>
            {
                if(data.is_promo) {
                    
                }
            }
            <b> Kurs jest w PROMOCJI! </b>
        Dodstaniemy od razu potężny błąd o niedozwolonych konstrukcjach !!!
        No i własnie RATUJE NAS TA ZAJEBISTA KONSTRUKCJA JS czyli wyrażenie z PYTAJNIKIEM

         ---->   WARUNEK ? co jeśli TRUE : co jeśli FALSE  <----

        PAMIĘTAJ że wszystko to co w JSX, każdy element, to można to traktować jako DANE, jako ZMIENNA
        I już zgodnie z tym wszystkim tworzymy piękne wyrażenie:
        
          {  data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> }

        DZIAŁA! ZAJEBISTE! - zmiana na TRUE i wszystko!

    << 3 >> Robimy dokładnie to samo z is_new, tyle że teraz, żeby miało to więcej sensu to nie piszemy
            że coś nie jest nowe (jak nie jest) tylko w drugim argumencie dajemu "NULL" i po prostu tego nie będzie

    BARDZO WAŻNA RZECZ!!! Zauważ że JSX możesz też śmiało używać w tych {} wraz z JS !!! ZAJEBISTE !!!      
    
    PODSUWOWANIE:
            - wiesz już jak renderować statyczne szablony HTML przy użyciu JSX
            - jak dynamicznie wstawiać zarówno atrybuty jak i treść
            - jak dynamicznie pokazywać i ukrywać elementy w Twoim szablonie

    W następnych lekcjach rozbudujemy nasz szbalon, zoabzcymy więcej róznic między HTML a JSX
    i przede wszystkim zrobimy rzeczy w JSX których za chuja nie zrobiłbyś w zwykłym HTMLu        
*/