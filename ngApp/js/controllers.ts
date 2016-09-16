namespace app.Controllers {
  export class HomeController {
      public movies;
      public edit (){

      }
      constructor(
        private movieService: app.Services.MovieService

      ) {
        this.movies = this.movieService.getAll();
        console.log(this.movies);
      }
    }
  export class AddMovieController {
    public title;
    public genre;
    public id;
     public save (

     ) { let movies = {
        title:this.title,
        genre:this.genre,
        id:this.id
     }
     this.movieService.add(movies).then(() => {
       this.$state.go('Home');

     })
     }
     constructor(
       private movieService: app.Services.MovieService,
       public $state:ng.ui.IStateService,
       public $stateParams: ng.ui.IStateParamsService
     ){
       if($stateParams)  {
        this.id = $stateParams["id"];
        }
   }
 }

  angular.module('app').controller('HomeController', HomeController);
  angular.module('app').controller('AddMovieController', AddMovieController);


}
