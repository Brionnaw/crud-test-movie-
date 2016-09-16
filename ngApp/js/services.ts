namespace app.Services {

export class MovieService {
      public MovieResource;
      public EditResource;
      public add (movie) {
        console.log(movie)

        return this.MovieResource.save(movie).$promise
      }
      public edit(movie){
          console.log(movie)

      }
      public getAll(){
        console.log('hit')
        return this.MovieResource.query();
      }
      constructor(
        private $resource: ng.resource.IResourceService)
      {
        this.MovieResource = $resource('/api/movies')
        this.EditResource = $resource('/api/movies/edit')
      }

    }

    angular.module('app').service('movieService', MovieService);


}
