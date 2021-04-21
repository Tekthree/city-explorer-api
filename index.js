"use strict";

//===================== dependencies ============================
const express = require("express");
const cors = require("cors");
const weatherData = require("./weather.json");

//===================== setting up app ============================
const app = express();
const PORT = process.env.PORT || 3001;

// app config
app.use(cors());

//===================== routes ============================

app.get("/", (req, res) => {
  res.status(200).send("hello World");
});

app.get("/weather", weatherHandler);

//===================== Handlers ============================

function weatherHandler(req, res) {

  const newWeather = weatherData.data.map(weather=>{
    return new Forecast(weather.datetime,weather.weather.description);
  })

  res.status(200).send("hello World");
  const body = req.body;
  console.log(newWeather);
  console.log(weatherData);
}

//===================== Constructors ============================

function Forecast(date, description) {
  this.date = date;
  this.description = description || 'no description';
}

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
