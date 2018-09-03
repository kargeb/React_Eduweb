const FavouritesCoursesList = ({list}) => (
	<div>
		<h1> Ulubione Kursy </h1>
		<hr />
		<div>
			{list.length == 0? <p className="text-center">Brak kursów </p> : null }
			{list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
		  		{/* Promotion */}
	  			<CoursePromoLabel data={data} />

		  		{/* Course Actions */}
				<div className="btn-group pull-right">
					<Button label="Szczególy kursu" />
					<FavButton active={AppState.state.favourites_map[data.id]}  
								onActivate={()=>actions.addFavourite(data.id)} 
								onDeactivate={()=>actions.removeFavourite(data.id)}  />
				</div>
			</Course>)}
		</div>
	</div>
)