const CartButton = ({in_cart, className = "btn btn-block", icon, label}) => {
	return (in_cart? 
		<Button className={className + " btn-danger"} icon={icon || "remove"} label={label || "Usuń z koszyka"} /> :
		<Button className={className + " btn-success"} icon={icon || "shopping-cart"} label={label || "Dodaj do koszyka"} />
	)
}

const CartDetails = (props) => (
	<div className="course_details text-center">
		<h1 className="thumbnail">{props.data.price} PLN</h1>
		<CartButton in_cart={true} />
	</div>
)

const ShoppingCartList = ({list}) =>(
	<div>
		<h1> Koszyk </h1>
		<hr />
		<div>
			{list.map((data) => <Course data={data} key={data.id} Details={CartDetails}>
				<div className="btn-group pull-right">
					<Button label="Szczegóły kursu" />
					<Button label="Przenieś do ulubionych" icon="star"/>
				</div>
				<div><b>Autor: </b> {data.author} <br/> <b>Czas trwania: </b> {data.duration} </div>
			</Course>)}
		</div>
	</div>
)