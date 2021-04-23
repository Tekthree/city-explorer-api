const superagent = require("superagent");

///>>>>>>>>>>>>>>>>   handler  <<<<<<<<<<<<<<<<<<<

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

///>>>>>>>>>>>>>>>>   constructor  <<<<<<<<<<<<<<<<<<<

function Forecast(date, description) {
  this.date = date;
  this.description = description || "no description";
}

module.exports = weatherHandler;
