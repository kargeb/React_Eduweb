const FavButton = React.createClass({

	getInitialState: function(){
		return {
			active: this.props.active
		}
	},

	getDefaultProps: function(){
		return {
			active: false,
			onActivate: function(){},
			onDeactivate: function(){}
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			active: nextProps.active
		})
	},

	setActive: function(){
		this.setState({
			active: true
		})
		this.props.onActivate()
	},

	setInactive: function(){
		this.setState({
			active: false
		})
		this.props.onDeactivate()
	},

	render: function(){
		return (this.state.active?
			<Button label="Usuń z ulubionych" icon="star" onClick={this.setInactive} /> :
			<Button label="Dodaj do ulubionych" icon="star-empty" onClick={this.setActive} />
		)
	}
})