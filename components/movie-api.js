const superagent = require("superagent");
let cache = require('../modules/cache.js');

///>>>>>>>>>>>>>>>>   handler  <<<<<<<<<<<<<<<<<<<


function getMoviesHandler(req, res) {
  const city = req.query.city;
  let cacheKey = "movies -" + city;
  const cachedMovieInfo = cache[cacheKey];
  const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&include_adult=true`;

  superagent
    .get(moviesUrl)

    .then((data) => {
      let moviesResponse = data.body.results.map((movies) => {
        return new movieResults(
          movies.title,
          movies.overview,
          movies.vote_average,
          movies.poster_path,
          movies.popularity,
          movies.release_date
        );
      });

      res.status(200).send(moviesResponse);
    })
    .catch((error) => console.log(error));
}

///>>>>>>>>>>>>>>>>   constructor  <<<<<<<<<<<<<<<<<<<

function movieResults(
  title,
  overview,
  averageVotes,
  imageUrl,
  popularity,
  releasedDate
) {
  this.title = title;
  this.overview = overview;
  this.averageVotes = averageVotes;
  this.imageUrl =
    imageUrl ||
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80";
  this.popularity = popularity;
  this.releasedDate = releasedDate;
}

module.exports = getMoviesHandler;
