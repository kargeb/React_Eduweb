// 14 -- Zmienne i funkcje w JSX

/* 
    Porządkowanie i ponowne wykorzystywanie elementów szablonu przy użyciu zmiennych oraz funkcji,
    podonie jak robiliśmy to we wczesniejszych lekcjach ale teraz przy użyciu szablonow JSX
*/

var data = {
    title: "Temat Kursu",
    description: "Opis kursu wykorzystujący tym razem zmienne w JSX...",
    image: "http://placehold.it/150x150x",
    author: "Testowy autor",
    duration: "6 godz",
    is_new: true, 
    is_promo: true 
}

var course = (
    <div className="media course">
        {/* course media column */}
        <div className="media-left">
            <img src= {data.image} alt="cover" />
        </div>

        {/* course content column */}
        <div className="media-body">
            <h3> {data.title} { data.is_new ? <span className="label label-default"> NOWY! </span> : null } </h3>  
            <p> {data.description}</p>
            {/* promotion */}
            {  data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> }
        </div>

        {/* course details column */} 
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
)

ReactDOM.render(course, document.getElementById("root"));

/* 
    Zanim przejdziemy do własciwej lekcji, jeszcze pododajemu kilka rzeczy do naszego szablonu,
    zeby jeszcze bardziej go skomplikować żebyś sobaczył jak później posprzątamy to właśnie zmiennymi i funkcjami
    
*/