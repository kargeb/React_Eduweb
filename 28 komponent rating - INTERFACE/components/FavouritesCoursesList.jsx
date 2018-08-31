const FavouritesCoursesList = ({list}) => (
    <div> 
        <h1>Ulubione Kursy</h1> 
        <hr />
        <div>      
            { list.length == 0 ? <p className="text-center"> Brak kursów </p> : null }
            {list.map((data) => <Course data={data} key={data.id} Details={CourseDetails}>
                {/* Course promo */}
                < CoursePromoLabel data={data} />
                
                {/* Course actions */}
                <div className="btn-group pull-right">
                    <Button label="Szczegóły kursu" />
                    <FavButton  active={AppState.state.favourites_map[data.id]} 
                        onActive={ () => actions.addFavourite(data.id)} 
                        onDeactive={ () => actions.removeFavourite(data.id)}/>
                </div>

            </Course>)}
        </div>
    </div>
)