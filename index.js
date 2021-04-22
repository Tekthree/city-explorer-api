"use strict";
require("dotenv").config();

//===================== dependencies ============================
const express = require("express");
const cors = require("cors");
const superagent = require("superagent");

//===================== setting up app ============================
const app = express();
const PORT = process.env.PORT || 3002;

// app config
app.use(cors());

//===================== routes ============================

app.get("/", (req, res) => {
  res.status(200).send("hello World");
});

app.get("/weather", weatherHandler);
app.get("/movies", getMoviesHandler);

//===================== Handlers ============================

function weatherHandler(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const city = req.query.city;
  const weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  superagent
    .get(weatherUrl)

    .then((data) => {
      let weatherResponse = data.body.data.map((weather) => {
        return new Forecast(weather.datetime, weather.weather.description);
      });
      res.status(200).send(weatherResponse);
    })
    .catch((error) => console.log(error));
}

function getMoviesHandler(req, res) {
  const city = req.query.city;
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

//===================== Constructors ============================

function Forecast(date, description) {
  this.date = date;
  this.description = description || "no description";
}

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

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
