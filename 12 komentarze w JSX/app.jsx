// 12 -- Komentarze w JSX

// Popracujemy nad przejżystością kodu i nad tym żeby go troche uporządkować,
// Zrobimy to za pomocą komentarzy,
// Ogólnie juz teraz widac ze kod staje się co raz mniej czytelny,
// a i tak jest czytelniejszy niz gdyby byl to zwykly JS jak w pierwszych lekcjach

var data = {
    title: "Temat Kursu",
    description: "Opis kursu wykorzystujący tym razem zmienne w JSX...",
    image: "http://placehold.it/150x150x",
    is_new: true, 
    is_promo: true 
}

var course = (
    <div className="media">
        {/* <<1 >> course media column */}
        <div className="media-left">
            <img src= {data.image} alt="cover" />
        </div>

        {/* << 1 >> course content column */}
        <div className="media-body">
            <h3> {data.title} { data.is_new ? <span className="label label-default"> NOWY! </span> : null } </h3>  
            <p> {data.description}</p>
            {/* << 1 >>promotion */}
            {  data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> }
        </div>
    </div>
)

ReactDOM.render(course, document.getElementById("root"));

/* 
    Przede wszystkim to JSX NIE ROZPOZNAJE KOMENTARZA HMTLowego !  <!-- ... --> !
    A tak w ogole to ciekawostka - HMTLowski komentarz to tak naprawde SGML
    i tak jak np deklarujemy doctype <!DOCTYPE> no to to jest wlasnie SGML
    i to w SGMLu dwie kreski -- oznaczają komentarz, czyli to tak naprawde nie jest skladnia HTML
    << 1 >> (3x) OTO JAK WSTAWIAMY KOMENTARZ W JSX !
        Uwaga pamiętaj że jeśli w jednej lini chcesz go umiescic to musi to byc komentarz BLOKOWY !
        NO bo liniiowy // zakomentuje CI zamykającą klamrę } !
        ewentulanie coś takiego można : 
        {
            // komentarz liniowy
        }
        ale to juz 3 linijki zurzyte

    W dalszych lekcjach kolejne konstrukcje JSX ułatwiające pracę    
*/