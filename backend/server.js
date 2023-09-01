const express = require('express');
const axios = require('axios');
const cors = require('cors')

const port = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.post("/getWeather", async(req, res) =>{
    var cities = req.body
    cities = cities.cities

    const weather = {}

    for(const city of cities){
        weather[city] = await getWeather(city)
    }

    res.status(200).json({"Weather": weather})

})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})


//methods
async function getWeather(city){
    try{

        const API_KEY = "b8ac4999c21240194810d8e33caab140"
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        // const res = await fetch(API_URL, {
        //     method: "GET"
        // })
        //const data = await res.json()

        const res = await axios.get(API_URL);

        return `${res.data.main.temp} \u00B0C`

    }catch(error){
        console.log("Error: ",error);
        return 'N/A'
    }
}