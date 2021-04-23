"use strict";
require("dotenv").config();

//===================== dependencies ============================
const express = require("express");
const cors = require("cors");
const superagent = require("superagent");

const getMoviesHandler = require("./components/movie-api.js");
const weatherHandler = require("./components/weather-api.js");

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

//===================== listen ============================

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
