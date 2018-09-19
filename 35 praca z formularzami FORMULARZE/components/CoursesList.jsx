const CoursesList = ({list}) => (
	<div>
		<h1> Kursy </h1>
		<hr />
		<div>
			{list.map((data) => 
				
			<Draggable key={data.id} data={data}  image={data.image} >
{/* << 4 >> */}
							<Course data={data}  Details={CourseDetails}>
		
							<CoursePromoLabel data={data} />

							<div className="btn-group pull-right">
								<Button label="Szczególy kursu" />
								<FavButton active={AppState.state.favourites_map[data.id]} 
									onActivate={()=>actions.addFavourite(data.id)} 
									onDeactivate={()=>actions.removeFavourite(data.id)}  />
							</div>
						</Course>
			</Draggable>
			
			)}
		</div>
	</div>
)