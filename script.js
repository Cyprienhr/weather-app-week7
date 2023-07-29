function getWeatherData(location) {
    let apiKey = '05763633a9b64264b6c12601232506';
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

    let loadingElement = document.getElementById('loading');
    let weatherElement = document.getElementById('weatherData');

    loadingElement.style.display = 'block';

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(data => {
            const weatherData = processWeatherData(data);
            console.log(data);
            displayWeatherData(weatherData);
            updateBackgroundImage(weatherData.condition);
        })
        .catch(error => {
            weatherElement.innerHTML = `<h3>Location does not exist.</h3>`;
            console.error('Error:', error);
            verifyWeatherDisplay();
        })
        .finally(() => {
            loadingElement.style.display = 'none';
        });
}

function updateBackgroundImage(condition) {
    let bodyElement = document.body;
    let lowercaseCondition = condition.toLowerCase();
}

function processWeatherData(information) {
    let location = information.location.name;
    let temperature = information.current.temp_c;
    let condition = information.current.condition.text;
    let humidity =information.current.humidity;
    let precipitation = information.current.precip_mm;
    let windSpeed = information.current.wind_kph;

    return { location, temperature, condition, humidity, precipitation, windSpeed };
}

function displayWeatherData(weatherData) {
    let weatherElement = document.getElementById('weatherData');
    weatherElement.innerHTML = `
    <h2>Weather in ${weatherData.location}</h2>
    <p>Temperature: ${weatherData.temperature}°C</p>
    <p>Condition: ${weatherData.condition}</p>
    <p>Humidity: ${weatherData.humidity}%</p>
    <p>Precipitation: ${weatherData.precipitation}mm</p>
    <p>Wind Speed: ${weatherData.windSpeed} km/h</p>
  `;

  let locationInput = document.getElementById('locationInput');
    locationInput.value = '';

    verifyWeatherDisplay();
}

function verifyWeatherDisplay() {
    let weatherElement = document.getElementById('weatherData');
    if (weatherElement.hasChildNodes()) {
        weatherElement.style.display = '';
    } else {
        weatherElement.style.display = 'none';
    }
}

verifyWeatherDisplay();

let locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', event => {
    event.preventDefault();
    let locationInput = document.getElementById('locationInput');
    let location = locationInput.value.trim();
    getWeatherData(location);
});
