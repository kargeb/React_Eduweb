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
			rating: this.props.value
		}
	},

	onMouseEnter: function(i){
		return () => this.setIndicator(i); // przekazanie do indykatora
	},

	onMouseLeave: function(i){
		return () => this.setIndicator(this.state.rating);	// ustawienie domyslnej
	},

	onClick: function(i){
		return () => this.setRating(i);	// wstawienie do STANU kopomnentu
	},

	setRating: function(rating){
		this.setState({
			rating: rating
		})
		this.setIndicator(rating);
		this.props.onChange(rating)
	},

	setIndicator: function(rating) {
		this.setState({
			indicator: this._makeIndicator( rating, this.props.max )
		})
	},
	
	_makeIndicator: function(rating,max){
		return [ ...Array(rating).fill(true), ...Array(max-rating).fill(false) ]
	},

	render: function(){
		return <div>
			{ this.state.indicator.map( (item,i) => ( <span key={i} 
				className={"glyphicon " + (item ? "glyphicon-star" : "glyphicon-star-empty")}
				onMouseEnter={this.onMouseEnter(i+1)} onMouseLeave={this.onMouseLeave(i+1)} 
				onClick={this.onClick(i+1)}> 
				</span>) )  }
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
	Zajebiste jest to ze mozesz sobie przeslac nawet 100 gwiazdek i wszystkie od razu sie pokazuja :)

	TWORZYMY OSBLUGE ZDARZEN MYSZY - onMouseEnter i onMouseLeave

	(nie ma raczej nic czego nie mozna zrozumiec z kodu)

	Konczymy dodając funkcję która wywołuje się za każdym razem gdy ZMIENIĄ SIĘ PROPERETIES,
	gdy naprzykład zrobi to jakieś zewnętrzne źródło danych, lub inny komponent
	(np sytuacja w ktorej po naszym zaglosowaniu na serwerze zostanie przeliczona srednia
	i wynik zostanie zwrocony)

		componentWillReceiveProps: function(nextProps){
			if(this.state.rating != nextProps.value){
				this.setRating(nextProps.value)
			}
		},

	Nie wiem tylko jesczze do konca o chuj chodzi z tym że onChange wykoncuje sie w tym miejscu:
	
		const CourseDetails = ({data}) => (
		<div>
			<table className="table course_details">
				<tbody>
					<tr>
						<th>Ocena</th>
						<td>
							<Rating max={5} value={1} onChange= { (rating) => console.log(rating) }/>

	A nie da się kurwa z komponentu Rating						


	DO nauki lub przypomnienia:

		- map
		- metoda fill na tablicach
*/ 
