// 28 komponent rating

/* 
     Stworzymy komponent służacy do oceny poszczególnych kursów
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
	favourites_map: {}
})

const Rating = React.createClass({

	getDefaultProps: function() {
		return {
			max: 5,
			value: 0
		}
	},

	getInitialState: function(){
		return {
			indicator: this._makeIndicator(this.props.value, this.props.max)
		}
	},

	_makeIndicator: function(rating,max){
		return [ ...Array(rating).fill(true), ...Array(max-rating).fill(false) ]
	},

	render: function(){
		return <div>
			{ this.state.indicator.map( (item,i) => ( <span key={i} className={"glyphicon " + (item ? "glyphicon-star" : "glyphicon-star-empty")}> </span>) )  }
		</div>
	}
})


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
})


ReactDOM.render(<App store={AppState} actions={actions} />, document.getElementById('root'));

/* 
    ZROBIŁ SOBIE KURWA PORZĄDKI:
    - porozdzielal na pliki kopmonenty
    - wywolaniu render jest dodatkowo aciotns={actions} jest teraz
	- zrobil z callbaka listę zamiat jedej zmiennej w StateStore
	
	 O JAK DOBRZE ze w jego plikach są foldery START i FINISH
	 Tak pojebał ze musieliśmy podmienić wszystkie pliki na te z jego kursu!

	-----------------
	tworzymy Rating i umieszczamy go w Course
	pozniej od razu robimy wlasciwosc render i wstawiamy tam gwiazdki
	gwiazdki wstawiamy jako zmapowana tablica 5 elemtnwo i dodajemy tez index jako key

	JESLI MAMY DYNAMICZNE DANE TO KOZYSTAMY Z OBIEKTU STATE
	A JESLI MAMY STAN O OCZYWISCIE UZYWAMY METODY GETINITIALSTATE

	W gwiazdach robimy warunek : kiedy zamknieta a kiedy otwarta
	dodajemy indicator jako tablca do gwiazdek w state

	w getinitialstate ustawiamy indicator za pomoca MEGAZAJEBISTEJ funkcji -makeIndicator

	DO nauki lub przypomnienia:
		
		- map
		- metoda fill na tablicach
*/ 
