// 23 Nawigacja - Problem gubienia stanu

/* 
	Wstawiamy zakładki zeby nasza palikacja byla przejzystsza
*/

var AppState = new StateStore();

AppState.setState({
	page: 1,
	courses_source: courses_data,

	courses_map: courses_data.reduce((map, course) => {
		map[course.id] = course;
		return map;
	},{}),
	courses_list: courses_data.slice(0,3),

	favourites_list: [],
	favourites_map: {},

	cart_list: [],
	cart_map: {},

	activeTab: "Kursy",
})


// << 5 >>

const actions = AppState.createActions({
	loadMore: function(event){
		var page = this.page + 1;

		this.page = page,
		this.courses_list = this.courses_source.slice(0, this.page * 3)
	},
	addFavourite: function(id){
		this.favourites_map[id] = true;
		this.favourites_list.push(this.courses_map[id])
	},
	removeFavourite: function(id){
		this.favourites_map[id] = false;
		let index = this.favourites_list.findIndex((c)=>c.id === id)
		if(index !== -1)
		this.favourites_list.splice(index,1)
	},
	addToCart: function(id){
		this.cart_map[id] = true;
		this.cart_list.push(this.courses_map[id])
	},
	removeFromCart: function(id){
		this.cart_map[id] = false;
		let index = this.cart_list.findIndex( (c) => c.id === id )
		if(index!== -1)
			this.cart_list.splice(index,1)
	},
	navigateTo: function(tabName){
		this.activeTab = tabName
	}
})


ReactDOM.render(<App store={AppState} actions={actions} />, document.getElementById('root'));

/* 
	OCZYWISCIE POROBIL SOBIE KURWA KOLEJNE POPRAWKI
	- poakzal wszystkie listy na ktorych pracowalismy, czyli ulubione i koszyk
	- do koszyka Cart nie przesyla juz tylko jednej zmiennj in_cart ale caly obiekt course (czuli AppState chyba w zasadzie)
	- trzeba było pododawać kilka rzeczy, mozna porównac koncowke ostatniej lekcji z pocatkiem tej

	Chcemy zeby wszystkie listy z App byly w osobnych zakladkach, i zeby bylo to na tyle 
	uniwersalne zeby zawsze nowa zakladke mozna bylo dodac
	<< 1>> App.jsx
			<ShoppingCartList list={this.state.cart_list} />
			<FavouritesCoursesList list={this.state.favourites_list} />
			<CoursesList list={this.state.courses_list} />

	<< 2 >> Tworzymy jeden komponent Tabs i 3 mniejsze na kazda liste <Tab>
			SĄ TO PROSTE KOMPONENTY BEZSTANOWE 
		I TERAZ UWAGA ! Chcemy sie dostac to elementow w tyhc komopnentach wiec
		pamietamy o mertodzie "props.children"
		ALE, ona zwraca nam 1 element gdy bedzie tylko jeden, A LISTE gdy jest
		elementow wiecej. MY CHCEMY ZEBY ZAWSZE BYLA TO LISTA, nawet jak nie bedzie
		zadnego elementu, KOZYSTAMY WIEC Z REACTOWEJ FUNKCJI
			const Tabs = (props) => {
				let tabs = React.Children.toArray(props.childern)	
			}
		-----------------------------------------------------------------------------------------	
		-- W PROPSACH POJAWIA SIE WSZYTSKO TO CO PRZESLEMY JAKO ATRYBUT w elemencie komponentu --
		-----------------------------------------------------------------------------------------





	<< 3 >> wyswietlanie activeTabs na podsatwie ich nazw, na ten moment po prostu 
			nazwa w activeTab musi zgadzac sie z "name" konkretnrgo Tab i wtedy tylko jest wyswietona
		-----------------------------------------------------------------------------------------	
			 Jesli chcesz wyrenderowac komponent taki jaki jest to po prostu robisz to
					const Tabs = (props) => {
						return props.children
					} 
		-----------------------------------------------------------------------------------------

		-----------------------------------------------------------------------------------------	
		------------------- KOMOPNENT MUSI ZAWSZE ZWRACAC JEDEN ELEMENT--------------------------
		-----------------------------------------------------------------------------------------
			więc jak zwracamy np jaka kolekcje elementow, to trzeba to pakowac w jednego diva !!!
			ZAMIAST:
				return tabs.filter( tab => props.activeTab === tab.props.name )		
			TO: 
				return  <div> {tabs.filter( tab => props.activeTab === tab.props.name )} </div>	
	<< 4 >> ZMIENIAMY NAZEWNICTWO Tab na TabPanel itp
			pokazyjemy zakladki stylujac je w bootstrapie 
			za "key" w map odpowiada "name" bo wychodzimy z zalozenia ZE NIE POWTROZY SIE 

		return <ul className="nav nav-tabs">
			{ tabs.map( tab => <li key={tab.props.name} > <a href="#">{ tab.props.name }</a>  </li> ) }
		</ul>
	
		TERAZ DODAJEMY JUZ LOGIKE CZYLI KLINIECIA I AKCJE

		onClick umieszczamy zaraz za "key" czyli jeszcze zanim zamkniemy <li key onClick> !
		
		-----------------------------------------------------------------------------------
		UWAGA ! Takie coś to jest funkcja wywołana! :
			onClick= { props.onChange(tab.props.name, e) }
		MUSIMY WIĘC TO OPAKOWAĆ, ŻEBY ZWRÓCIĆ FUNKCJĘ A NIE WYNIK FUNKCJI! :
			onClick= { (e) => props.onChange(tab.props.name, e) }
		------------------------------------------------------------------------------------

		-----------------------------------------------------------------------------------------	
		----------------------- onChange JEST EVENTEM REACTOWYM! --------------------------------
		-----------------------------------------------------------------------------------------
	<< 5 >> tworzymy "action" i opisujemy ją w app.jsx w naszym "actions"	
		<TabsNav onChange={actions.navigateTo}>

	CALE WYTLUMACZENIE DZIALANIA TEJ LEKCJI WYJASNIONE ZAJEBISCIE W 18 MINUCIE  - działą wszystko
	
	<< 6 >> poprawiamy to ze "pokaz wiecej" wyswietla sie w kazdej zakladce a nie tylko w kursach,
		NO I UWAGA ! po przekopiowaniu "pokaz wiecej" TUTAJ:
				<TabPanel name="Kursy">
								<CoursesList list={this.state.courses_list} />
								<hr />
					<button className="btn btn-default btn-block" onClick={this.props.actions.loadMore}> Pokaż więcej ... </button>	
				</TabPanel>
		NASZ TabPanel ZWRACA WIECEJ NIZ JEDEN KOMPONENT ! Czyli to na co uczulamy wyzej !!!
		Wiec trzeba to:
					const TabPanel = (props) => {
						return props.children
					}
		Zamienic na to:
			const TabPanel = (props) => {
				return <div> {props.children} </div>
			}			

	<< 7 >> TYM ROBIMY ZE ZAZNACZONA ZAKLADKA SIE WYROZNIA !!!
			{tabs.map(tab => <li key={tab.props.name}
				className={ props.activeTab === tab.props.name ? "active" : "" }		


*/ 
