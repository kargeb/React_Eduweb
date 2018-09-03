const Tabs = (props) => {
	let tabs = React.Children.toArray(props.children)

	return <div> {tabs.filter(tab => props.activeTab === tab.props.name)} </div>
}

const TabPanel = (props) => {
	return <div> {props.children} </div>
}

const Tab = (props) => {
	return props.children || <a href="#">{props.name}</a>
}

const TabsNav = (props) => {
	let tabs = React.Children.toArray(props.children)

	return <ul className={ props.className || "nav nav-tabs" }>
		{tabs.map(tab => <li key={tab.props.name}
			className={props.activeTab === tab.props.name ? "active" : ""}
			onClick={(e) => props.onChange(tab.props.name, e)}
		>

		{tab}
			
		</li>)}
	</ul>
}

const Nav = (props) => {
	return <nav className="navbar navbar-default">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="#">EduKursy</a>
					</div>
					<TabsNav className="nav navbar-nav navbar-left" onChange={props.onChange} activeTab={props.activeTab}>
								<Tab name="Kursy"></Tab>
								<Tab name="Ulubione"></Tab>
					</TabsNav>
					<TabsNav className="nav navbar-nav navbar-right" onChange={props.onChange} activeTab={props.activeTab}>
								<Tab name="Koszyk">
								<a href="#">
								{/* << 2 >> /> */}
								<Droppable onDrop={ (data) => actions.addToCart(data) } >
									<span className="glyphicon glyphicon-shopping-cart"></span>Koszyk
								</Droppable>
								</a>
								</Tab>
					</TabsNav>
			</div>
	</nav>
}