const express = require("express");
const https = require("https");
const bodyParser =require("body-parser");
const { ClientRequest } = require("http");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
    // res.send("Server is up and running");
});
app.post("/",(req,res)=>{
    // console.log(req.body.cityname);
    // console.log("post req received");
    const query = req.body.cityname;
    const apikey = "30024102b7357f161315941a26dc0c44 ";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit + "&appid="+ apikey;

    https.get(url,(response)=>{
     console.log(response.statusCode);
     

     response.on("data", (data)=>{
        // console.log(data);
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const wetherDiscription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        // console.log(temp+ " " + wetherDiscription);
        res.write("<h1 >The Tempratue in "+query+ " is "+ temp + " degrees celcius.</h1> ");
        res.write("<h3> The weather is currently "+ wetherDiscription +"</h3>");
        res.write("<img src=" +imageURL +">" );
        res.send();
     })
    })
})





app.listen(3000, ()=>{
    console.log("server started on port 3000");
});