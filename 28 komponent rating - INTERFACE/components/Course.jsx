const CourseDetails = ({data}) => (
	<div>
	  	<table className="table course_details">
	  		<tbody>
		  		<tr>
		  			<th>Autor</th>
		  			<td>{data.author}</td>
	  			</tr>
		  		<tr>
		  			<th>Czas trwania</th>
		  			<td>{data.duration}</td>
	  			</tr>
		  		<tr>
		  			<th>Cena</th>
		  			<td>{data.price} PLN</td>
	  			</tr>
	  		</tbody>
	  	</table>
		<CartButton in_cart={false} />
	</div>
)

const CourseMedia = ({data}) => ( <img src={data.image} alt="cover" />)

const NewLabel = ({data}) => ( data.is_new? <span className="label label-default">Nowy!</span> : null)

const CoursePromoLabel = ({data}) => ( data.is_promo? <b>Kurs jest w PROMOCJI!</b> : null)

const Course = (props) => {
	const {data, Details} = props;

	return (
	  	<div className="media course">

	  		{/* Course media column */}
	  		<div className="media-left">
	  			<CourseMedia {...props} />
	  		</div>

	  		{/* Course content column */}
	  		<div className="media-body">
		  		<h3>{data.title} <NewLabel {...props} /></h3>
	  			<p>{data.description}</p>

		  		{props.children}
	  		</div>

		  	{/* Course details column */}
		  	{Details?
		  		<div className="media-right">
		  			<Details {...props} />
			  	</div> : null
			}
		</div>
	)
}