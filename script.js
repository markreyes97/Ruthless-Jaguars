var cityEl = document.querySelector("#city")
var zodiacEl = document.querySelector("#zodiac-sign")
var zodiacResultsEl = document.querySelector("#zodiac-results")
var weatherEl = document.querySelector("#city-text")
var weatherResultsEl = document.querySelector("#weather-results")
var openingEl = document.querySelector(".opening")
var resultsEl = document.querySelector(".results")


var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&appid=a35536613023136e4915b74f3f80575a"
var findWeather = function() {
    var city = cityEl.value;
    var cityText = document.createElement("h2")
    cityText.classList.add("title", "is-1")
    cityText.innerHTML = city
    weatherEl.append(cityText)
    var url = queryUrl + city + apiKey;
    fetch(url)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    useOneCall(data)
                })
        })
}

var useOneCall = function (cityData) {
    var cityLat = cityData.coord.lat
    var cityLon = cityData.coord.lon
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=alerts,minutely,hourly" + apiKey
    fetch(oneCall)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    console.log(data.daily[0])
                    var morning = document.createElement("p")
                    morning.innerHTML = "Morning feels like: <strong>" + Math.round(((data.daily[0].feels_like.morn-273.15)*1.8)+32) +"</strong>°F";
                    morning.classList.add("is-size-2")
                    weatherResultsEl.append(morning)
                    var day = document.createElement("p")
                    day.innerHTML = "Daytime feels like: <strong>" + Math.round(((data.daily[0].feels_like.day-273.15)*1.8)+32) +"</strong>°F";
                    day.classList.add("is-size-2")
                    weatherResultsEl.append(day)
                    var night = document.createElement("p")
                    night.innerHTML = "Night feels like: <strong>" + Math.round(((data.daily[0].feels_like.night-273.15)*1.8)+32) +"</strong>°F";
                    night.classList.add("is-size-2")
                    weatherResultsEl.append(night)
                });
        })   
}

var selectEl = document.querySelector('#selection');
var buttonEl = document.querySelector('#btn')

var buildResults = function() {
    var sign = selectEl.value;
    openingEl.classList.add("none")
    resultsEl.classList.remove("none")
    var signText = document.createElement("h2")
    signText.classList.add("title", "is-1")
    signText.innerHTML = sign
    zodiacEl.append(signText)
}

var zodiacResults = function() {
    var sign = selectEl.value;
    const URL = 'https://aztro.sameerkumar.website/?sign=' + sign + '&day=today';
    fetch(URL, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            var zodiacDesc = document.createElement("p");
            zodiacDesc.innerHTML = "Daily Horoscope: <strong>" + data.description + "</strong>";
            zodiacDesc.classList.add("is-size-3");
            zodiacResultsEl.append(zodiacDesc);
            var zodiacMood = document.createElement("p");
            zodiacMood.innerHTML = "Mood: <strong>" + data.mood + "</strong>";
            zodiacMood.classList.add("is-size-2");
            zodiacResultsEl.append(zodiacMood);
            var zodiacNum = document.createElement("p");
            zodiacNum.innerHTML = "Lucky Number: <strong>" + data.lucky_number + "</strong>";
            zodiacNum.classList.add("is-size-2");
            zodiacResultsEl.append(zodiacNum);
            
        });
};




buttonEl.addEventListener('click', function () {
    findWeather();
    buildResults();
    zodiacResults();
});