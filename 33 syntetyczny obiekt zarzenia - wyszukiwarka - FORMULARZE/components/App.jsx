// 33 syntetyczny obiekt zarzenia - wyszukiwarka

/*
	Zapamiątaj że w Reackt przeplyw danych jest z rogoly JEDNOKIERUNKOWY
	czyli idzie ZE ZRODLA DANYCH DO WIDOKU
	Zanim przejdziemy do zaawansowanych rzeczy na początek zrobimy prostą
	wyszukiwarke kursów.

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
					{/* {this.props.courses.map((course) => ( */}
					{ this.state.filtered_list.map( (course) => (
						<a href="#" key={course.id} className="list-group-item">
							<h4 className="list-group-item-heading"> {course.title} </h4>
							<p className="list-group-item-text"> {course.author} </p>
						</a>
					))}
				</div>
			</div>
		)
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
					<h3>Lekcja 33 syntetyczny obiekt zarzenia - wyszukiwarka</h3>
					<Nav onChange={actions.navigateTo} activeTab={this.state.activeTab}></Nav>

					<div className="row">
					<div className="col-xs-12">
					</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
								<TabPanel name="Wyszukiwarka">
									<h1>Wyszukiwarka</h1>
									<CourseSearch courses={ this.state.courses_source } ></CourseSearch>
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
	dodajemy TabPanel "wyszukiwarka". zmieniamy tez zeby to ta karta pokazywala sie domyslnie jako pierwsza 
	- tworzymy mkomopnent CouerseSearch i przekazujemy tam WSZYSTKIE kursy z bazy
	- robimy to z bootsrapem i oczyweiscie korzystajac z "map"
	- tworzymy wyszukiwarke i zastanawiamy sie jakie zdarzee urzyc do rozpoczecia wyszukiwania,
		no bo chcemy zrobic tak zeby nie zaczynalo szukac po kliknieciu jakiegos przycisku,
		tylko zeby robilo to z automatu juz podczas wprowadzania tekstu
		onKeyUp nie będzie do konca dobre bo NIE DZIALA JAK KTOS COS KOPIUJE LUB UZYWA T9 na komorce!
		onInput z koleji NIE JEST WSZEDZIE WSPIERANY
		KORZYSTAMY WIEC Z REACTOWEGO ZDARZENIA ktory po prostu nasluchuje zmian na elementach
		CZYLI onChange !!!
		I chuj z tego ze juz wykorzystalismy go w ciul razy ale dopiero teraz kuwra mowi co to w ogole jest ...
		OTO JAK GO MOZNA ZAJEBISCIE PRZEETSTOWAC:
			onChange={ (e)=>console.log(e.target.value) }
		Bardzo wazne jest to ze on doskonale dziala nawet jak sie cos wkleja do rpzegladarki

		W funkcji render jedyne co zmieniamy to to:
		
		Robimy nowey setInitialState:
			
		Robimy zdarzenie filterList i tutaj się dzieje magia!!!

			filterList: function(event){

				event.persist();
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

		Wszystko co się dzieje w tym zdrazeniu DZIEJE SIE PO WPISANIU KAZDEJ LITRY W WYSZUKIWARKE
		- W funkcji FILTER szukamy dopiero wyzej 3 ZNAKOW ORAZ sprawdzamy zarowno title jak i descryption jak i author
		- SETTIMEOUT robimy po to zeby NIE ZAJEBAC SEWRERA 100 pytaniami na raz, tylko wysylamy zapaytania
			po 500 MILISEKUNDACH od OSTATNIEGO wywolania tej funkcji
			DZIEJE SIE TO DZIEKI TEMU ze zaraz na jej poczatku CZYSCIMI POPRZEDNI HANDLER setTimout	clearTimeout(this.pending);

		UWAGA ! TUTAJ JEST CHYBA NAJWAZNIEJSZA RZECZ
		Jak nasze kolejne zapyatnie przekroczy te 500 ms NO TO zostaje skasowane wiadomo, I WTEDY REACT SIE WKURWIA !!
		No bo on wszystkie EVENTY ktory sie zakonczyly KASUJE sobie a my sie do niego odwolujemy w  clearTimeout !!
		Otrzymujemy taki blad:	

		react.js:20209 Warning: This synthetic event is reused for performance reasons. 
		If you're seeing this, you're accessing the property `target` on a released/nullified synthetic event. 
		This is set to null. If you must keep the original synthetic event around, use event.persist().			
	 	
		I robimy to co wlasnie tam pisze, czyli dodajemy jedną liniję jeszcze przed clearTimeout
			event.persist();
		KTORA MOWI REACTOWI ZEBY PRZETRZYMAL TO ZDARZENIE !!!
		 persist - utzrymywac się, nie ustępować

		 Mozna sobie jeszcze w consol.loga wpisac EVENT i zoabczyc ze nie jest to zwykle zapytanie ale
		 zapytanie PROXY ktore sie nazywa SYNTETYCZNE chuj wie czemu

*/ 