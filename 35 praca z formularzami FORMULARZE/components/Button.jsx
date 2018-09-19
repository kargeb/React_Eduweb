const Button = (props) => ( 
	<button className="btn btn-default"  {...props}>
		{props.icon? <span className={ "glyphicon glyphicon-" + props.icon }></span> : null}
		{' '}
		{props.label}
	</button>
)