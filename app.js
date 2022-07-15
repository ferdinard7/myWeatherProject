
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
  const query = req.body.cityName;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=7fe43cc6fe9a61db74264b2986408b88&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius</h1>");
      res.write("<h1> it is " + description + "</h1>");
      res.write("<img src=" + iconUrl + ">")
       res.send();

    })
  })



  })












app.listen("4000", function(req, res){
  console.log("server started at port 4000");
})
