// 22 -- Rozszerzenie komponentów 

/* 

*/

var CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

var NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

var CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )

var Button = (props) => ( 
    <button className="btn btn-default">
        { props.icon ? <span className={ "glyphicon glyphicon-" + props.icon } ></span> : null }
        {" "}
        { props.label }
    </button> )

var CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych" icon="star" />
        <Button label="Dodaj do koszyka" icon="shopping-cart"/>
    </div>
)

var CourseDetails = ({ data }) => (
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
            {list.map((data) => < Course data={data} key={data.id} />)}
        </div>
    )
}

var list = courses_data.slice(0, 3);

ReactDOM.render( < CoursesList list={list} /> ,document.getElementById("root"));
    

/* 
    
*/