const getWeather = async() =>{
    
    const weatherOutput = document.getElementById('results')
    weatherOutput.innerHTML = ""

    try{
        const input = document.getElementById("cityNames").value

        if(input.trim() == "")  throw new Error("No data passed")

        var cities = input.split(',')
        cities = cities.map(city => city.trim())

        const res = await fetch('http://localhost:5000/getWeather', {
            method: "POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({"cities": cities})
        })
        console.log(res);
        if (res.status == 200) {
            const data = await res.json()

            for (const city in data.Weather) {
                const temp = data.Weather[city]
                const cityTemp = document.createElement('li')
                cityTemp.textContent = `${city}: ${temp}`
                weatherOutput.appendChild(cityTemp)
            }
        }
        else{
            const output = document.createElement('li')
            output.textContent = res.text
            weatherOutput.appendChild(output)
        }
    }catch(error){

        const output = document.createElement('li')
        output.textContent = error.message
        weatherOutput.appendChild(output)
    }

}