// 24 -- Przykład interaktywnej aplikacji

/* 
   Wykorzystanie komponentów STANOWYCH do konstrukcji prostej ale już INTERAKTYWNEJ APLIKACJI
   TYPU SINGLEPAGE APLICATION 

   Nosz kurwa mać, znowy sobie poza lekcjami dodał funkcjonalności ja pierdole a teraz tylko
   powiedzial co zrobil !!!
   - Podzielil kurwa na rozne pliki posczegolne komponenty
   - zmienne do komponentow zadeklarowal jako const
   - no i kurwa jeszcze z 5 lekcji temu dodal dowawanie kolejnych danych na glownej liscie za 
    pomoca przycisku
    - do styli dodal margin-top: 3.5em;
    - no i do CartDetails dodal <h1> z ceną kursu! 


*/

/* var CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> ) */

/* var Button = (props) => ( 
    <button className="btn btn-default" {...props}>
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> 
) */

/* var CartButton = ( { in_cart, icon, label, className="btn btn-block" } ) => {
    return (in_cart ?
        <Button className={className + " btn-danger"} icon={ icon || "remove"} label={label || "Usuń z koszyka"}/> :
        <Button className={className + " btn-success"} icon={ icon || "shopping-cart"} label={label || "Dodaj do koszyka"}/> 
    )
} */

/* var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych" icon="star" />
    </div>
) */

// << 8 >>
/* var CourseDetails = ({ data }) => (
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
    <CartButton in_cart={false} /> 
    </div>
) */

/* var CartDetails = (props) => (
    <CartButton in_cart={true} />
) */

/* var Course = (props) => {
    var {data, Details} = props;

    return (
        <div className="media course">
          
            <div className="media-left">
               
                < CourseMedia {...props} /> 
            </div>

         
            <div className="media-body">
                <h3> {data.title} < NewLabel {...props} /> </h3>
                <p> {data.description}</p>
            </div>

        
            {Details ? 
            <div className="media-right">
                <Details {...props}/>
            </div> : null
            }
        </div>
    )
}  */

/*  // PRZED PRZYCISKIEM POBIERAJĄCY WIĘCEJ 
var list = courses_data.slice(0, 3);

ReactDOM.render( <div>
        < ShoppingCartList list={cart_list} />
        < CoursesList list={list} />
    </div> ,document.getElementById("root")); 
*/

const CoursesList = (props) => {
    var list = props.list;
    return (
        <div> 
            <h1>Kursy</h1> 
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                    
                    {/* Course promo */}
                    < CoursePromoLabel data={data} />
                    {/* Course actions */}
                    < CourseActions data={data} />

                </Course>)}
            </div>
        </div>
    )
}

const ShoppingCartList = (props) => {
    var list = props.list;
    return (
        <div>
            <h1>Koszyk</h1>
            <hr />
            <div>
                {list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
                    <Button label="Przenieś do ulubionych" icon="star" />
                </Course>)}
            </div>
        </div>
    )
}

var list = [],
page = 1,
perpage = 3;

document.getElementById("show_more").addEventListener("click", function(){
    page++;
    update();
})    

var cart_list = courses_data.slice(0,1);

function update(){
    var count = page * perpage;
    list = courses_data.slice(0,count);

    ReactDOM.render(
        <div>
            <ShoppingCartList list={cart_list} />
            <CoursesList list={list} />
        </div>,
        document.getElementById("root"));
}
update();

/* 
    
*/