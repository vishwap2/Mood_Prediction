const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = 'af405e20b714716ba717a06dfcca7838';
var ml = require('ml-sentiment');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! Describe an activity you'd do in this weather.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
/*
var message = "";
app.post('/activityinfo', function (req, res) {
   let activity = req.body.activity;
   let value = ml.classify(activity);
   if (value >= 3 && value < 6) {
    message = "Your mood is 😄";
   }
   else if (value > 0 && value < 3) {
    message = "Your mood is 😃";
   }
   else if (value == 0) {
    message = "Your mood is 😐";
   }
   else if (value > -2 && value < 0) {
    message = "Your mood is 😑";
   }
   else {
    message = "Your mood is 😢";
   }
  res.render('index.ejs', {mood: message});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
*/