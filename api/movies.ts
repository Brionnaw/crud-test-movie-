import express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Movie = mongoose.model('Movie', {
  title: String,
  genre: String
});
// create static list of movies
let movies = [
   {id:1, title:"Star Wars", director:"Lucas" },
   {id:2, title:"The Martian", director:"Scott" },
   {id:3, title:"Ex Machina", director:"Garland" },
   {id:4, title:"Superman", director:"Donner" },
   {id:5, title:"Shrek", director:"Adamson" }

];
// unique movie id
let movieId = movies.length;

router.post('/movies', function (req,res){

    let movie = req.body;

    let newMovie = new Movie(
      {
      title: movie.title,
      genre: movie.genre
    });
      newMovie.save((err, movies) => {
        if (err) {
          console.log(err);
        } else {
          console.log(movies);
          res.send(movies)
        }
      })

})

/* GET movies */
router.get('/movies', function(req, res) {
  Movie.find({}).then((movies) => {
    res.json(movies)

  })
});

// /* GET movie by id */
// router.get('/movies/:id', function(req, res, next) {
//   let id = parseInt(req.params['id']);
//   let movie = findMovie(id);
//   if (movie) {
//     res.json(movie);
//   } else {
//     res.sendStatus(404);
//   }
// });



/* delete movie by id */
router.delete('/movies/:id', function(req, res, next) {
  let id = parseInt(req.params['id']);
  if (!findMovie(id)) {
    res.sendStatus(404);
  } else {
    movies = movies.filter((movie)=> {
      return movie.id != id;
    });
    res.sendStatus(200);
  }
});

/* find matching movies */
router.get('/movies/search/:search', function(req, res, next) {
    let search = req.params['search'];
    let matches = movies.filter((movie)=>{
      return movie.title.indexOf(search) == 0;
    });
    res.json(matches);
});

function findMovie(id:number) {
  let matches = movies.filter((movie) => {
    return movie.id == id;
  });
  return matches.length ? matches[0] : null;
}

export = router;
