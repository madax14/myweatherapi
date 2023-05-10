require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const PORT = process.env.PORT || 3030;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Get the content from app.post and update the url with new city chosen by the user
var country = "Porto Velho";

app.get("/", function (req, res) {
    const apiKey = process.env.SECRET_KEY;
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+country+"&aqi=no&lang=pt";
    
    const https = require('node:https');

    https.get(url, (response) => {

    response.on('data', (data) => {
        // process.stdout.write(data);
        const weatherData = JSON.parse(data);
        // console.log(weatherData)
        const temp = weatherData.current.temp_c;
        const city = weatherData.location.name;
        const humidity = weatherData.current.humidity;
        const windSpeed = weatherData.current.wind_kph;
        const condition = weatherData.current.condition.text;
        const conditionImg = weatherData.current.condition.icon;
        const feelsLike = weatherData.current.feelslike_c;
        const localTime = weatherData.location.localtime;
        

        res.render("home", {
            temp : temp,
            city : city,
            humidity: humidity,
            windSpeed : windSpeed,
            condition : condition,
            conditionImg : conditionImg,
            feelsLike : feelsLike,
            localTime : localTime
        })
    });

    }).on('error', (e) => {
    console.error(e);
    });
});  

app.post("/", function (req, res) {
    //update the country variable to the new city put in the form
    country = req.body.country;
    res.redirect("/");

})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
