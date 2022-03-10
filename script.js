var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&appid=a35536613023136e4915b74f3f80575a"
function findWeather() {
    var city = inputEl.value;
    var url = queryUrl + city + apiKey;
    fetch(url)
        .then(function(response) {
            if (response.ok)
                response.json().then(function(data) {
                    getWeather(data)