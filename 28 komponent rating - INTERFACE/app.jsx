// 28 komponent rating

/* 
    Stworzymy komponent służacy do oceny poszczególnych kursów
*/

var AppState = new StateStore()

AppState.state = {
    page: 1,
    courses: courses_data,
    courses_map: courses_data.reduce((map, course) => {
        map[course.id] = course;
        return map;
    },{}),
    list: courses_data.slice(0, 3),
    favourites_list: [],
    favourites_map: {}
}

var actions = AppState.createActions({

    loadMore: function (event) {
        var page = this.page + 1;

        this.page = page;
        this.list = this.courses.slice(0, this.page * 3)
    },
    addFavourite: function(id){
        this.favourites_map[id] = true;
        this.favourites_list.push(this.courses_map[id])
    },
    removeFavourite: function(id){
        this.favourites_map[id] = false;
        let index = this.favourites_list.findIndex( (c) => c.id === id );
        if(index !== -1)
            this.favourites_list.splice(index, 1);
    },
})



 

ReactDOM.render(<App store={AppState} actions={actions}/>, document.getElementById("root"));

/* 
    ZROBIŁ SOBIE KURWA PORZĄDKI:
    - porozdzielal na pliki kopmonenty
    - wywolaniu render jest dodatkowo aciotns={actions} jest teraz
    - zrobil z callbaka listę zamiat jedej zmiennej w StateStore

    O JAK DOBRZE ze w jego plikach są foldery START i FINISH
*/