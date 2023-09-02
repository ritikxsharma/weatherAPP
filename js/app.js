
const getWeather = async() =>{
    
    const weatherOutput = document.getElementById('results')
    weatherOutput.innerHTML = ""

    try{
        const input = document.getElementById("cityNames").value

        if(input.trim() == "")  throw new Error("No data passed")

        var cities = input.split(',')
        cities = cities.map(city => city.trim())

        // const res = await fetch('http://localhost:5000/getWeather', {
        //     method: "POST",
        //     headers:{
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify({"cities": cities})
        // })

        const weather = {}
        for(const city of cities){
            weather[city] = await getTemperature(city)
            console.log(weather);
        }

        for (const city in weather) {
            const temp = weather[city]
            const cityTemp = document.createElement('li')
            cityTemp.textContent = `${city}: ${temp}`
            weatherOutput.appendChild(cityTemp)
        }

    }catch(error){

        const output = document.createElement('li')
        output.textContent = error.message
        weatherOutput.appendChild(output)
    }

}


async function getTemperature(city){
    try{
        const API_KEY = "b8ac4999c21240194810d8e33caab140"
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

        const res = await fetch(API_URL, {
            method: "GET"
        })
        const data = await res.json()

        // const res = await axios.get(API_URL);

        return `${data.main.temp} \u00B0C`

    }catch(error){
        console.log("Error: ",error);
        return "error"
    }
}