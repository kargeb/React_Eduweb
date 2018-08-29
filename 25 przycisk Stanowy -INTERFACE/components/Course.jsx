const CourseDetails = ({ data }) => (
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
)

const CourseMedia = function({data}){ 
    return <img src={data.image} alt="cover" />;
} 

const NewLabel = ({data}) => ( data.is_new ? <span className="label label-default"> NOWY! </span> : null )

const CoursePromoLabel = ({data}) => ( data.is_promo ? <b> Kurs jest w PROMOCJI! </b> : <span> Nie jest w promocji! </span> )

const CourseActions = ({ data }) => (
    <div className="btn-group pull-right">
        <Button label="Szczegóły kursu" />
        <Button label="Dodaj do ulubionych" icon="star" />
    </div>
)

const Course = (props) => {
    var {data, Details} = props;

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
            </div>

            {/* course details column */}
            {Details ? 
            <div className="media-right">
                <Details {...props}/>
            </div> : null
            }
        </div>
    )
} 