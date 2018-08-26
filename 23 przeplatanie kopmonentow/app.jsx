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
        <Button label="Dodaj do ulubionych" icon="star" />
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

    <CartButton in_cart={true} /> 
    </div>
)

var Course = (props) => {
    var {data} = props;
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

                {/* promotion */}  
                < CoursePromoLabel {...props} />

                {/* Course actions */}
                < CourseActions {...props} />

                {props.children}
            </div>

            {/* course details column */}
            <div className="media-right">
                < CourseDetails {...props} />
            </div>
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
                {list.map((data) => <Course data={data} key={data.id}>
                    Extra content!
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
                {list.map((data) => < Course data={data} key={data.id} />)}
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
        tak jak inne lememnty JS - w klamerkach
    

*/