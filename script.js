var cityEl = document.querySelector("#city")
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&appid=a35536613023136e4915b74f3f80575a"
function findWeather() {
    var city = cityEl.value;
    console.log(city)
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
                    console.log(((data.daily[0].feels_like.morn-273.15)*1.8)+32)
                    console.log(((data.daily[0].feels_like.day-273.15)*1.8)+32)
                    console.log(((data.daily[0].feels_like.night-273.15)*1.8)+32)
            });
        })   
}


const URL = 'https://aztro.sameerkumar.website/?sign=Scorpio&day=today';
fetch(URL, {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        const date = data.description;
        console.log(data);
    });



var selectEl = document.querySelector('#selection');
var buttonEl = document.querySelector('#btn')

buttonEl.addEventListener('click', function () {
    findWeather()
    var sign = selectEl.value;
    const URL = 'https://aztro.sameerkumar.website/?sign=' + sign + '&day=today';
    fetch(URL, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.description);
            console.log(data.mood);
            console.log(data.lucky_number);
        });
    });

                    
