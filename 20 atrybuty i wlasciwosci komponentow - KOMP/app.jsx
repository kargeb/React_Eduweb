// 20 -- Atrybuty i własciwosci komponentow

var courseMedia = function(data){
    return <img src={data.image} alt="cover" />;
} 

var newLabel = function(data){
    return data.is_new ? <span className="label label-default"> NOWY! </span> : null;
} 

var coursePromoLabel = function(data){ 
    return data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span>;
}

var courseActions = function (data) {
    return (
        <div className="btn-group pull-right">
            <button className="btn btn-default">Szczegóły kursu</button>
            <button className="btn btn-default">Dodaj do ulubionyvh</button>
            <button className="btn btn-default">Dodaj do koszyka</button>
        </div>
    )
} 

var courseDetails = function (data) {
    return (
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
} 

var Course = function (props) {
    var data = props.data;
    return (
        <div className="media course">
            {/* course media column */} 
            <div className="media-left">
                {courseMedia(data)}
            </div>

            {/* course content column */}
            <div className="media-body">
                <h3> {data.title} {newLabel(data)} </h3>
                <p> {data.description}</p>

                {/* promotion */}  
                {coursePromoLabel(data)}

                {/* Course actions */}
                {courseActions(data)}
            </div>

            {/* course details column */}
            <div className="media-right">
                {courseDetails(data)}
            </div>
        </div>
    )
} 

var CoursesList = function (props) {
    var list = props.list;
    return (
        <div>
            {
                list.map(function (data){ 
                    return < Course data={data} key={data.id} />
                })
            }
        </div>
    )
}

var list = courses_data.slice(0, 3);

ReactDOM.render( < CoursesList list={list} /> ,document.getElementById("root"));
    

/* 
    
*/