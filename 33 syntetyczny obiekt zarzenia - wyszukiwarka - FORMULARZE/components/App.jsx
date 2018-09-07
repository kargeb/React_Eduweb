// 31 drag and drop - obluga zdarzen 

/* NA RAZIE NIE WIADOMO CO Z RĄZWIĄZANIEM RATINGU
	WYkorzytamy bardziej skomplikowane zdarzenia typu drag and drop - wykorzystanie HTML5Ks
*/


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
						{/* << 1 >> */}
						{/* <Draggable>Przeciągnij mnie</Draggable> */}
						{/* <Droppable>Upuść tutaj</Droppable> */}

					</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<Tabs activeTab={this.state.activeTab}>
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
	- dodanie Nav do osobnego pliku
	- << 1 >> dodajemy Komponenty Dropppable i Draggable
	- dzięki HTML5 bez zadnych bibliotek mozemy przeciągać elementy i korzystac ze związancyh z tym zdarzen
	- Dopóki w komponentach nie umiescilismy zadnych atrybutów, mozna ich zawartosc (tekst) na stronie
	zaznaczyc jak kazdy inny. ALE oznaczamy obiekt jako "draggable" i od teraz nie mozemy zaznaczyc tekstu, ale 
	klikajac na niego mozemy go przeniesc co sugeruje jego poswiata pod kursore.

	Mamy teraz do dysapozycji wlasnie nowe zdarzenia i implementujemy pierwsze: W ELEMENCIE DRAGGABLE
		onDragStart  z consollogiem pojawiajacym sie w momencie przenoszenia obiektu
	Pod kursorem podczas przenosszenia MAMY ZNAK ZAKAZU POSTOJU (:P) co oznacza ze nic nie da upuszczenie go w danym miejscu.

	Teraz w elemecie DROPPABLE robimy dwa zdarzenia:
		onDragOver - odpala sie gdy PRZECIAGANY element znajduje sie nad nim
		onDrop - gdy przeciagany elemnt wpada do niego

	UWAGA sam fakt ze robimy cos w zdarzeniu "onDragOver" nie sprawia ze przegladarka juz pozwala tam cos puszczac,
	TRZEBA DO JASNO POWIEDZIEC POPRZEZ BLOKOWANIE DOMYSLNEJ OPCJI PRZEGLĄDARKI A WIĘC:
				function onDragOver(e){
					e.preventDefault()
				}

	UWAGA! PRZESYLANIE INFORMACJI MIEDZY ELEMENTAMI DRAG AND DROP !!!
		aby takie elementy mogly sie komunikowac ze soba TRZEAB SKRZYSTAC ZE SPECJALNEJ WLASCITOWSCI eventu:
		
		W DRAGGABLE:
			e.dataTransfer.setData("application/x-edukursy-kurs", "Kurs id=0")

			"dataTransfer" to wlasnie specjalne API (chyba html5) i ustawiamy pierwszy argument set data 
			na to CO SIE MA TAM ZNAJDOWAC, my robimy niestandardowa wartosc wiec nadajemy WLASNA NAZWE,
			a w argumencie drugim CO CHCEMY PRZESLAC pod ta nazwa wlasnie

		W DROPPABLE:
			po prostu odbieramy sobie ten komunikat wpisując zamiast SET to getData
				function onDrop(e){
					console.log( e.dataTransfer.getData("application/x-edukursy-kurs") )
				}
		<< 2 >>
		wycinamy stad i umieszczamy droppable w koszyku w Nav.jsx	
			<Droppable onDrop={ (data) => actions.addToCart(data) } >	
		Robimy od razu osbluge zdarzenia onDrop (dalej kurwa nie wiem czemu tutaj ...)

		<< 3 >>
		A to wydarzenie onDrop deklarujemy w tym pliku w DROPPABLE
				

		<< 4 >> z koleji DRAGGABLE umieszczamy w "CoursesList.jsx" , I ŁADUJEMY TAM CAŁY KURS !!!
			{list.map((data) => 

					<Draggable data={data} key={data.id} image={data.image} >
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

		UWAGA ! przenosimy 	key={data.id} z <Course .. do <Draggable... zeby przegladarka nie pierdolila

		<< 5 >> 			
		TUTAJ JEST PETARDA !	
		Zauwaz ze pod w << 4 >> w DRAGGABLE przesylamy image={data.image} ktore jest adresem obrazka,
		ODBIERAMY TO W DRAGGABLE TUTAJ:
		<< 6 >> 
				if(props.image){
					let img = new Image();
					img.src = props.image;
					e.dataTransfer.setDragImage(img,10,10)
				}

		I piewrszej lini tworzymy zmienna do obrazka uzywjac KONSTRUKTORA JS Image()
		pozniej przypisujemy mu nasze zrodlo czyli link
		I UMIESZCZAMY W SPECALNEJ WLASCIWOSCI TEGO API dataTransfer !!!
		Podając wlasnie obrazek (adres) I JEGO WYMIARY !!!

		No i jeszcze PODMIENIAMY DRUGI ARGUMENT NASZEGO seData:
			e.dataTransfer.setData("application/x-edukursy-kurs", props.data.id)
		
		DZIĘKI TEMU TO CO BĘDZIEMY SOBIE PRZENOSCIĆ, OBOK KURSORA BĘDZIE MIAŁO WŁAŚNIE TEN OBRAZEK !!!! - działa !

		<< 7 >> 
		Dodajemy jeszcze w Nav.jsx widok ile obecnie mamy rzeczy w koszyku

		<< 8 >> 
		Jeszcze jedna rzecz, on poustawial ze mozna kilka takich samych kursow dodac do koszyka,
		ale chujowo to zrobil bo nie zwieksza sie wtedy liczba prodoktow, powiedzial ze jeszcze to dorobi
		Zmieniamy to w app.jsx :
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
		Na to:
			addToCart: function(id){
				if(!this.cart_map[id]){
					this.cart_map[id] = 1;
					this.cart_list.push(this.courses_map[id])
				} else {
					this.cart_map[id]++
				}
			},
			removeFromCart: function(id){
				this.cart_map[id] === 0 ? 0 : this.cart_map[id]--;
				if(!this.cart_map[id]){
					let index = this.cart_list.findIndex( (c) => c.id === id )
					if(index!== -1)
					this.cart_list.splice(index,1)
				}
			},		

		Całkiem nieźle on to rozwiązał, więc można sobie póścić ostatnie minuty tej lekcji jeśli chcesz to rozkminic

		PRZENOSIMY NASZE DRAG END DROP TO INNEGO PLIKU !!! więc uwazaj na numerki << >>
		
		ZATEM WIDZISZ ZE DZIĘKI NIESTANDARDOWYM ZDARZENIOM i instenijacych elementow HTML mozesz robic tutaj dokladnie to
		co robiles przy uzyciu zwyklego JS lub jQuery, MAJĄĆ PONAD TO całe udogodnienia REACTA w postaci jednolitego STANU i
		autonomicznych komponentów
*/ 