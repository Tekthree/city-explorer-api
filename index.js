"use strict";
require("dotenv").config();

//===================== dependencies ============================

const cors = require("cors");
const express = require("express");

const getMoviesHandler = require("./components/movie-api.js");
const weatherHandler = require("./components/weather-api.js");
const weather = require('./modules/weather.js');

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
app.get('/weathers', weatherStarterHandler);

function weatherStarterHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  



//===================== listen ============================

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
