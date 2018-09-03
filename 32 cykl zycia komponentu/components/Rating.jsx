const Rating = React.createClass({

	getDefaultProps: function(){
		return {
			max: 5,
			value: 0,
			onChange: function(){}
		}
	},

	componentWillReceiveProps: function(nextProps){
		if(this.state.rating != nextProps.value){
			this.setRating(nextProps.value)
		}
	},

	getInitialState: function(){
		return {
			indicator: this._makeIndicator(this.props.value, this.props.max),
			rating: this.props.value,
		}
	},

	onMouseEnter: function(i){
		return () => this.setIndicator(i);
	},

	onMouseLeave: function(i){
		return () => this.setIndicator(this.state.rating);
	},

	onClick: function(i){
		return () => this.setRating(i);
	},

	setRating: function(rating){
		this.setState({
			rating: rating
		});
		this.setIndicator(rating);
		this.props.onChange(rating);
	},

	setIndicator: function(rating){
		this.setState({
			indicator: this._makeIndicator(rating, this.props.max)
		})
	},

	_makeIndicator: function(rating, max){
		return [ ...Array(rating).fill(true), ...Array(max-rating).fill(false) ]
	},

	render: function(){
		return <div>
			{this.state.indicator.map((item, i) => (<span key={i} 
				className={"glyphicon " + (item? "glyphicon-star" : "glyphicon-star-empty")}
				onMouseEnter={this.onMouseEnter(i+1)} 
				onMouseLeave={this.onMouseLeave(i+1)}
				onClick={this.onClick(i+1)}></span>)) }
		</div>
	}
})