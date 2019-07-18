const BASE_URL = 'https://weather-app-rails.herokuapp.com'

document.addEventListener("DOMContentLoaded", function(){
    let searchForm = document.getElementById("search")
    searchForm.addEventListener("submit", function(e){
        e.preventDefault();
        let searchTerm = e.target[1].value;
        let locationUrl = `https://weather-app-rails.herokuapp.com/location/${searchTerm}`;
        locationUrl = encodeURI(locationUrl);
        let locationJSON = getLocation(locationUrl)
        //console.log(locationJSON)
        e.target[1].value = ""
    })
})


async function getLocation(url){
    resp = await fetch(url)
    json = await resp.json();
    //console.log(json);
    getWeather(json)
    
}

async function getWeather(json){
    lat = json.results[0].geometry.location.lat
    lng = json.results[0].geometry.location.lng
    let weatherUrl = `https://weather-app-rails.herokuapp.com/weather?loc=${lat}_${lng}`
    weatherUrl = encodeURI(weatherUrl)
    resp = await fetch(weatherUrl)
    json = await resp.json();
    displayWeather(json)
}

function displayWeather(json){
    let summary = json.currently.summary
    let temperature = json.currently.temperature
    temperature = Math.round(temperature)
    let humidity = json.currently.humidity
    let windSpeed = json.currently.windSpeed
    let highTemp = json.daily.data[0].temperatureHigh
    highTemp = Math.round(highTemp)
    let lowTemp = json.daily.data[0].temperatureLow
    lowTemp = Math.round(lowTemp)
    if(temperature > 98){
        answer = "YES!"
    }
    else{
        answer = "NO!"
    }
    let answerDiv = document.getElementById("answer").innerText = answer
    setTimeout(function(){let answerDiv = document.getElementById("answer").innerText = "";}, 3000);
    let summaryDiv = document.getElementById("summary").innerText = summary
    let temperatureDiv = document.getElementById("temperature").innerText = `${temperature} degrees fahrenheit`
    let humidityDiv = document.getElementById("humidity").innerText = humidity
    let windSpeedDiv = document.getElementById("windSpeed").innerText = windSpeed
    let highTempDiv = document.getElementById("highTemp").innerText = `The high temperature today is ${highTemp} degrees fahrenheit`
    let lowTempDiv = document.getElementById("lowTemp").innerText = `The low temperature is ${lowTemp} degrees fahrenheit`

    
}