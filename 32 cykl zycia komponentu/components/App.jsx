const LifeCycle = React.createClass({

	getDefaultProps: function(){
		console.log('getDefaultProps',arguments, this.props);	
		return { 
			name: ''
		}
	},

	getInitialState: function(){
		console.log('getInitialState',arguments, this.props);	
		return { 
			name: ''
		}
	},

	componentWillMount: function(){
		console.log('componentWillMount',arguments);			
	},

	componentDidMount: function(){
		console.log('componentDidMount',arguments);			
	},

	componentWillReceiveProps:function(nextProps){
		console.log('componentWillReceiveProps',arguments,nextProps,this.props);	
	},

	shouldComponentUpdate: function(nextProps, nextState){
		console.log('shouldComponentUpdate',arguments);	
		return true;	
	},

	componentWillUpdate: function(nextProps, nextState){
		console.log('componentWillUpdate',arguments);	
	},

	componentDidUpdate: function(prevProps,prevState){
		console.log('componentDidUpdate',arguments);
	},

	componentWillUnmount: function(){
		console.log('componentWillUnmount',arguments);	
	},

	render: function(){
		console.log('render',arguments);	

		return <div></div>
	}

})

/* 
	LIFE CYCLE HOOKS - metody obługi cyklu życia komponentu !

	Każdy komponent ma swój cykl życia: od momentu kiedy jest pierwszy raz użyty, kiedy jesy umieszczony w DOM, 
	kiedy jest aktuazlizowany, renderowany, aż do momentu kiedy jest usuwany z drezwa DOMi wtedy zdycha.
	
	OTO METODY CYKLU ZYCIA KOPMONENTU, opis kiedy należy i można z nich korzystać, i jakie dodatkowe korzyści daje
	dostęp do cyklu życia Reacta.

	Zanim je opisze, oto co on przesyła do tego komonentu:

		<LifeCycle name="LifeCycle" changingProp={this.state.favourites_list.length} />

	I oto co wyrzuca consola po odpaleniu:
	
				getDefaultProps Arguments [callee: (...), Symbol(Symbol.iterator): ƒ] undefined
				getInitialState Arguments [callee: (...), Symbol(Symbol.iterator): ƒ] {name: "LifeCycle", changingProp: 0}
				componentWillMount Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
				render Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
				componentDidMount Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]


	--- METODY NA START ---

	getDefaultProps  -  WYKONYWANA JEDEN JEDYNY RAZ by ustawić te properities które są opcjonalne, czyli na wypadek
					gdyby programista nie podał ich. I służy to np do tego żeby nie sprawdzac w innych metodach cyklu życia,
					czy dana właściwośc w ogóle istnieje tylko raz zapisać sobie ją jako domyślną i mieć spokój.
					Każda przesłana przez użytkownika wartośc zostaje w nich natychmiast nadpisana.
					W TYM KOPONENCIE NIE PORÓWNUJEMY tych domyślnych wartości z tymi co przychodzą, bo nie ma to sensu, 
					one i tak czy srak zostaną natychmiast nadpisane.
					Najelpiej zwracać w niej po prostu zwykły obiekt z tymi defaultowymi wartościami.
					Jak widzimy w wywołaniu - nie zwraca nic no bo nic nie ustawił gość

	getInitialState  -  tutaj PODSTAWOWA RÓŻNICA TO TAKA że już możemy porównywać wartości z tej metody,
					z tymi przesłanymi przez użytkownika, lub z domuślnymi z getDefaultProps LUB z domyślnymi
					nadpisanymi przez użytkownika! Czyli tutaj dostajemy już gotowe propereties które możemy użyć.
					UWAGA! Nie kożystamu tutaj z setState! Tylko podobnie jak wyżej, zwracamy prosty obiekt,
					ALE UWAGA BO WLASNIE TUTAJ STWORZYMY BIEKT this.state!!! (chyba) I dzięki temu też możemy poustawiać sobie
					wartości, tak żeby nie sprawdzać w następnych metodach czy one w ogóle istnieją.			
					Zwróć uwagę na wywoałnie! - dostaliśmy dokładnie te properities które on przesłał do komponentu!!!

		componentWillMount  -  Wydawałoby się że powinna wywołać się jako tzrceia metoda "render" ALE NIE! Przed nią
					mamy jeszcze własnie tą. I tutaj możemy zrobic rzeczy które są wymagane jeszcze przed wyrenderowaniem np.
					ustawineie zmienych lub pobranie danych. 
					
		redner - no i DOPIERO TERAZ wywoluje się nasza render, gdzie mamy już gotwy nasz STATE i nasze PROPERTIES
		
		componentDidMount  -  no i już po renderwoaniu wykonuje się ta metoda. W tym momencie nasz komponent 
					JUŻ ISTNIEJE W DOM, NIE MOŻEMY ZMIENIAĆ STANU! Ale możemy tutaj podejrzeć co się w tym DOMIE wyrenderowalo
					I EWENTUALNIE ZMIENIĆ DOM RĘCZNIE. Ale pamiętaj że nie możemy tutaj zmieniać ani properties ani stanu!

		------- TERAZ KILKAMY W ZAKŁADKĘ "Ulubione" W NASZEJ APLKIACJI I POJAWIA SIĘ KOLEJNA METODA W KONSOLI-------
		
			componentWillUnmount Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]

			componentWillUnmount  -  Przejscie do nowej zakładki spowodowało że cały poprzedni komponent ZOSTAŁ WYMAZANY!
					I TO WŁAŚNIE TA METODA POJAWIA SIĘ OSTATNIA PRZED TYM FAKTEM. Czyli możemy w niej coś np. posprzątać,
					zrobić ostatnie rzeczy przed końcem życia komponentu. 

		------- TERAZ KILKAMY Z POWROTEM W ZAKŁADKĘ "kursy" W NASZEJ APLKIACJI I POJAWIAJĄ SIĘ JEDYNIE 4 METODY  ------			

				getInitialState Arguments [callee: (...), Symbol(Symbol.iterator): ƒ] {name: "LifeCycle", changingProp: 0}
				componentWillMount Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
				render Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
				componentDidMount Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]		

		NIE POJAWIA NAM SIĘ JUZ METODA getDefaultProps !!! React dochodzi do wniosku że te propertoes już są zapisane
				w aplikacji. DLATEGO NIGDY NIE UŻYWAJ TUTAJ ZMIENNYCH DYNAMICZNYCH !

		------------- UWAGA MAMY JESZCZE 4 METODY KTÓRE NAM SIĘ NIE POJAWIŁY ------------------------
		--- POJAWIAJĄ SIĘ ONE W MOMENCIE KIEDY ZMIENIAJĄ SIĘ DANE KTÓRE SĄ JUŻ WIDOCZNE NA STRONIE !!!!!!!!!!---
		--- KLIKAMY ZATEM W PRZYCISK "Dodaj do ulubionych" ŻEBY ZMIENIŁ NAM SIĘ:   changingProp={this.state.favourites_list.length}

				componentWillReceiveProps Arguments(2) [{…}, {…}, callee: (...), Symbol(Symbol.iterator): ƒ] {name: "LifeCycle", changingProp: 1} {name: "LifeCycle", changingProp: 0}
				shouldComponentUpdate Arguments(3) [{…}, {…}, {…}, callee: (...), Symbol(Symbol.iterator): ƒ]
				componentWillUpdate Arguments(3) [{…}, {…}, {…}, callee: (...), Symbol(Symbol.iterator): ƒ]
				render Arguments [callee: (...), Symbol(Symbol.iterator): ƒ]
				componentDidUpdate Arguments(3) [{…}, {…}, {…}, callee: (...), Symbol(Symbol.iterator): ƒ]		

		componentWillReceiveProps  -  Jako pierwsza wywołuje się po zmianie properties! Uwaga MOŻEMY W NIEJ NADCHODZĄCE PROPERTIES
				porównać Z OBECNYMI!		
																	componentWillReceiveProps:function(nextProps){
																		console.log('componentWillReceiveProps',arguments,nextProps,this.props);
				Mamy dostęp zarówno do tych co nadejdą - "nextProps" i tych które już mamy - "this.props"						
				Czyli możemy sobie odpiednio zmodyfukować stan w zalezności od tego co przyszło.
				
		shouldComponentUpdate  -  NIEZWYKLE WAŻNA METODA! Jezli zmieniły się gdziekowliek PROPERTIES albo zmnieł się stan, na przykład
				poprzez wywołanie setState, TO MOŻESZ W NIEJ NIE TYLKO SPRAWDZIĆ CO SIĘ ZMIENIŁO:
									componentWillUpdate: function(nextProps, nextState)
				ALE PRZEDE WSZYSTKIM MASZ TUTAJ WŁADZĘ NA TYM CZY KOMPONENT SIĘ WYRENDERUJE CZY NIE!
				Decyduje o tym to co zwróci ta funkcja w returnie:
									return true;
				JEŻELI ZAMIAST FALSE będzie wartośc negatywna, TO PRZY KOLEJNYCH AKCJACH W APLIKACJI NIE WYWOŁA SIĘ RENDER!
				Czyli np. może zrobic coś takiego:
									return nextProps.name !== this.props.name;
						Czyli jeśli nie zmieniło się imię to nie widzę potrzeby żeby renderować aplikację!
				JEST TA METODA BARDZO WAŻNA, BO PRZY DUŻYCH APLIKACJACH POZWALA ZAJEBIŚCIE ZOPTYMALIZOWAĆ JEJ DZIAŁANIE!
								------------------------------------------------------------------------------------				
								----ZAPAMIĘTAJ - NAJSZYBSZY KOD TO TAKI KTÓRY NIE MUSI SIĘ W OGÓLE WYKONAC !!!------		
								------------------------------------------------------------------------------------
				Czyli jesli render jest faktycznie sporych rozmiarów, a sens działania aplikacji zależy właściwie od
				jednego głównego parametru, TO JEST TO DOSKONAŁA OKAZJA DO WYKORZYSTANIA WŁASNIE TEJ METODY!
				
		DOPIERO JEŚLI W 	shouldComponentUpdate		mamy TRUE no to wtedy wykonują się jeszcze te metody:

		componentWillUpdate  -  czyli coś co się dzieje zaraz przed ponownym wyrenderwoaniem NA TEJ SAMEJ STRONIE,
				rówmnież mamy dostęp do nextProps i this.props

		 --- teraz wykonuje się render ---
		 
		 componentDidUpdate  -  no i praktycznie ostatnia funkcja NA TEJ SAMEJ STRONIE, czyli już po zmianie STATE
				możemy sobie coś w DOM podziałać - podejżeć stan jakiegoś elementu, albo nawet go zmodyfikować

		TERAZ JESZCZE RAZ PORÓWCIMY DO componentWillUnmount  -  bo skoro ona pojawia się zawsze przed śmiercią koponentu,
		to jest to świetne miejsce żeby usnąc zmiany w DOM zrobione w componentDidUpdate, odpiąć nasłuchiwane
		zdarzenia korzystając z innych bibliotek, pousuwać jakieś komponenty NIEREACTOWE i tego typu rzeczy,
		ALBO PO PROSTU ZAPISAĆ STAN KOMPONENTU DO JAKIEGOŚ ZEWNĘTRZNEGO ŹRÓDŁA DANYCH nim ten komponent zostanie odpięty.
		Np tutaj można obsłużyć KOMPONENT RATING z poprzednich lekcji!


		JAK COŚ JEST NIE JASNE DO ZAPIERDALAJ DO DOKUMENTACJI I CZYTAJ O TYM ! KIEDY JAKIEJ UŻYWAĆ, KIEDY JAKIEJ 
		NIE UŻYWAĆ I POPATRZ NA PRZYKŁADY ICH UŻYWANIA !

		wyróźnił: componentWillUnmount, shouldComponentUpdate i componentWillReceiveProps
*/


const App = React.createClass({

	getInitialState: function(){
		return this.props.store.state;
	},

	componentDidMount: function(){
		this.props.store.addListener((state) => {
			this.setState({
				page: state.page,
				courses_list: state.courses_list,
				favourites_list: state.favourites_list,
				activeTab: state.activeTab
			})
		})
	},

	render: function(){
		return (
		  <div>
		    <div className="container">
				<h3>Lekcja 32 - Cykl zycia komponentu</h3>
		      <Nav onChange={actions.navigateTo} activeTab={this.state.activeTab} ></Nav>
		      <div className="row">
		        <div className="col-xs-12">
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

							<LifeCycle name="LifeCycle" changingProp={this.state.favourites_list.length} />
						
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
