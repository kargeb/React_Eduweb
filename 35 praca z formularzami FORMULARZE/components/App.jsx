// 35 praca z formularzami

/*
	Naprawiamy poprzeni formulraz, czyli sytuacje kiedy zmiany w tutulach zmieniaja sie natychmiast po tym
	jak je tam wporowadzamy anie dopiero jak je zatwierdzimy w jakis sposob
	Bedzie tez powiedziane o zdarzeniach tyczacych sie formularzy

*/

const CourseSearch = React.createClass({

	getInitialState: function(){
		return {
			"query": "",
			"filtered_list": []
		}
	},

	filterList: function(event){

		event.persist();

		console.log(event);

		clearTimeout(this.pending);

		this.pending = setTimeout(() => {
			let query = event.target.value;

			this.setState({
				filtered_list: this.props.courses.filter((course) => (
					query.length >= 3 &&
					(course.title.toLowerCase().includes((query).toLowerCase())
						|| course.description.toLowerCase().includes((query).toLowerCase())
						|| course.author.toLowerCase().includes((query).toLowerCase())
					)
				))
			})
		}, 500)
	},

	render: function () {
		return (
			<div>
				<input type="text" className="form-control" onChange={ this.filterList } placeholder="Filtruj listę kursów" />
				<hr />
				<div className="list-group">
					{ this.state.filtered_list.map( (course) => (
						<a href="#" key={course.id} className={ "list-group-item" + (this.props.selected === course ? " active" : "" ) } 
							onClick={ () =>  this.props.onSelect(course) }>
							<h4 className="list-group-item-heading"> {course.title} </h4>
							<p className="list-group-item-text"> {course.author} </p>
						</a>
					))}
				</div>
			</div>
		)
	}
})

const CoursesEditor = React.createClass({

	getInitialState: function(){
		return {
			selected: null
		}
	},

	select: function(course){	
		this.setState({
			selected : course
		})
	},

	render: function(){
		return <div>
			<div className= { this.state.selected ? "col-xs-4" : "col-xs-12" }>
				<h1>Edytor Kursów</h1>
				<hr/>
				<CourseSearch courses={ this.props.courses} onSelect={ this.select } selected={ this.state.selected } ></CourseSearch>
			</div>
			{ this.state.selected ? 
			<div className="col-xs-8">
		
				<CourseForm course={ this.state.selected }
				onCancel={()=> this.select(null) }	// usuwamy zaznaczenie 
				onSave={(course)=> actions.saveCourse(course) } ></CourseForm>
			</div> : null }
		</div>
	}
})

const CourseForm = React.createClass({		

	getInitialState: function(){
		return {
			course: { ...this.props.course}
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			course: {...nextProps.course}
		})
	},

	changedTitle: function(e){

		this.setState({
			course: { ...this.state.course, title: e.target.value }
		})
	},

	onSave: function(event){
		event.preventDefault();
		this.props.onSave(this.state.course)	// JUZ ZMIENIIONY STAN (DOKLADNIE W FUNKCJI U GORY)
	},

	render: function(){
		return <div>
			<form onSubmit={ this.onSave }>
				<div className="form-group">
					<label className="control-label">Nazwa kursu</label>
					<div>			
						<input type="text" className="form-control" value={ this.state.course.title } onChange={ this.changedTitle }/>
					</div>
				</div>
				<div className="form-group">
					<div className="btn-group pull-right">
						<input type="button" className="btn btn-danger" value="Anuluj" onClick={this.props.onCancel}/>
						<input type="submit" className="btn btn-success" value="Zapisz"/>
					</div>
				</div>
			</form>
		</div>
	}
})

const App = React.createClass({

	getInitialState: function () {
		return this.props.store.state;
	},

	componentDidMount: function () {
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	render: function () {
		return (
			<div>
				<div className="container">
					<h3>Lekcja 35 praca z formularzami</h3>
					<Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>

					<div className="row">
					<div className="col-xs-12">
					</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<CoursesEditor courses={ this.state.courses_source } ></CoursesEditor>
								</TabPanel>
								<TabPanel name="Koszyk">
									<ShoppingCartList list={this.state.cart_list} />
								</TabPanel>
								<TabPanel name="Ulubione">
									<FavouritesCoursesList list={this.state.favourites_list} />
								</TabPanel>
								<TabPanel name="Kursy">
									<CoursesList list={this.state.courses_list} />
									<hr />
									<button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>
								</TabPanel>
							</Tabs>
						</div>
					</div>

				</div>
				<footer className="footer">
					<div className="container">
						<p> </p>
					</div>
				</footer>
			</div>
		)
	}
})

/* 
	Aby uchronic sie przed bezposrednim zapisywaniem na oryginalnych danych, ZROBIMY TAK 
	ZE PRACOWAC BEDZIEMY NA KOPIACH

	UWAGA !!!
	--------------  TO JEST PRACA NA ŹRÓDLE !!! CZYLI BEZPOŚRENDIO NA PRZEKAZANYCH WARTOŚCIACH ----------
		getInitialState: function(){
			return {
				course: this.props.course
			}
		},

	----------- A TO JEST PRACA NA KOPIII !!! I WLASNIE TO JEST WYKURWISTA ROZNICA W TYCH ZPISACH !! -------
		getInitialState: function(){
			return {
				course: { ...this.props.course}
			}
		},

	Czyli takim prostym sposobem mozemy juz pracowac na kopiach a nie na orgyginałach!
	robimy tak w kazdej z 3 metod, 
	z changedTitle wywalamy wszystko poza ta linijka, nie potrzebujemy juz tworzenia nowej zmiennej
	
	A oto jak przekazujemy zmiane JEDNEGO POLA:
		changedTitle: function(e){
			this.setState({
				course: { ...this.state.course, title: e.target.value }
			})
		},

	Przekazujemy tez CALA KOPIE a zmieniamy tylko jedno pole title	

	Dziala, teraz nawet jak zmodyfikujemy w inpucie nazwe kursu to nie zostaje zmiana zapisana.

	DODAJEMY 2 PRZYCISKI KTORE BEDA TA ZMIANE ZPIASYWAC KIEDY FAKTYCZNIE BEDZIEMY TEGO CHCIELI
			<div className="form-group">
			<div className="btn-group pull-right">
				<input type="button" className="btn btn-danger" value="Anuluj" onClick={this.props.onCancel}/>
				<input type="button" className="btn btn-success" value="Zapisz" onClick={this.props.onSave}/>

	UWAGA ! Obsluge przyciskow robimy poziom wyzej ! Czyli w CoursesEditor a nie w CourseFomr,
	tak zebysmy ich obluge przekazywali jako parametr

	onSave={(course)=> actions.saveCourse(course) } ></CourseForm>

	Tutaj wracamy sie AZ DO NASZEJ METODY ACTIONS zeby zaktualizowac liste kursow
		saveCourse: function(course){
		let id = course.id;
		if("undefined" === typeof id){
			id = course.id = new Date();
			this.courses_source.push(course);
			this.courses_map[id] = course;
			this.courses_list.unshift(course);
		} else {
			Object.assign(this.courses_map[id], course)
		}
	},

	UWAGA! Pierwszy if to jest dodawanie nowego recordu clakiem do listy i na razie nas to nie interesuje
	ale on juz to dodal. Nas interesuje to co w ELSE, to wlasnie tam podmieniamy wartosci danego recodu
	metoda OBJECT.ASSIGN i chuj wie co to robi ale chyba bierze obiekt z drugiego argumentu
	i wszystkie wartoscni z niego wpierdala w argument pierwszy

	OSTATNIA RZECZ to sytuacja w ktorej na nasicniecie ENTER odswieza nam sie cala strona i chuj wszystko trafia
	ZMIANIMY TO:
		<input type="button" className="btn btn-success" value="Zapisz" onClick={this.onSave}/>
	NA TO:
		<input type="submit" className="btn btn-success" value="Zapisz"/>

	Do <form> dajemy zdarzenie co sie ddzieje na onSubmit	
		<form onSubmit={ this.onSave }>

	i w onSave dopiero dajemy prevent.Default	
		onSave: function(event){
			event.preventDefault();
			this.props.onSave(this.state.course)	// JUZ ZMIENIIONY STAN (DOKLADNIE W FUNKCJI U GORY)
		},

	Działa, teraz zmiany moemy zapisaywac tez eneterem.

	Zajelismy sie tylko jednym polem, w koljenych lekcach bedziemy rozbudowywali ten formularz

*/ 