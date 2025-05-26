// Weather API functionality
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector("#Location-btn");
const currentWeatherDiv = document.querySelector("#current-weather");
const forecastCardsDiv = document.querySelector("#forecast-cards");
const API_key = "5d73a99ff554352719be2118aab73699";

// Weather icon mapping
const weatherIcons = {
  "01d":
    "https://lottie.host/ecd831ba-ef29-43d3-a346-b4b1a96277bf/9YBlUd6sy1.json", // clear sky (day)
  "01n":
    "https://lottie.host/ecd831ba-ef29-43d3-a346-b4b1a96277bf/9YBlUd6sy1.json", // clear sky (night)
  "02d":
    "https://lottie.host/b0994fba-3818-438e-922e-28a56e8fd8e2/s61xua1agq.json", // few clouds
  "02n":
    "https://lottie.host/b0994fba-3818-438e-922e-28a56e8fd8e2/s61xua1agq.json",
  "03d":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json", // scattered clouds
  "03n":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json",
  "04d":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json", // broken clouds
  "04n":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json",
  "09d":
    "https://lottie.host/2ba67172-46ba-43ca-a56c-4b392154b706/vpQ4Dkj4HW.json", // shower rain
  "09n":
    "https://lottie.host/2ba67172-46ba-43ca-a56c-4b392154b706/vpQ4Dkj4HW.json",
  "10d":
    "https://lottie.host/2ba67172-46ba-43ca-a56c-4b392154b706/vpQ4Dkj4HW.json", // rain
  "10n":
    "https://lottie.host/2ba67172-46ba-43ca-a56c-4b392154b706/vpQ4Dkj4HW.json",
  "11d":
    "https://lottie.host/134ddd03-fa28-4e3a-b615-e55a2657e1ea/RP2VqpQfBp.json", // thunderstorm
  "11n":
    "https://lottie.host/134ddd03-fa28-4e3a-b615-e55a2657e1ea/RP2VqpQfBp.json",
  "13d":
    "https://lottie.host/28ac0eb5-bd18-4135-8b96-6740c2295855/uoGu3NA0XH.json", // snow
  "13n":
    "https://lottie.host/28ac0eb5-bd18-4135-8b96-6740c2295855/uoGu3NA0XH.json",
  "50d":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json", // mist
  "50n":
    "https://lottie.host/6d1e51b7-7767-4e81-9579-3e4bf7668d93/GJdfgyjydj.json",
};

const showDefaultLocation = () => {
  // Coordinates for Anand, Gujarat
  const defaultCity = "Anand";
  const defaultLat = 22.5565;
  const defaultLon = 72.9489;
  getWeatherDetails(defaultCity, defaultLon, defaultLat);
};

const createWeatherCard = (cityName, weatherItem, index) => {
  const date = new Date(weatherItem.dt_txt);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tempCelsius = (weatherItem.main.temp - 273.15).toFixed(1);
  const feelsLike = (weatherItem.main.feels_like - 273.15).toFixed(1);
  const tempMin = (weatherItem.main.temp_min - 273.15).toFixed(1);
  const tempMax = (weatherItem.main.temp_max - 273.15).toFixed(1);
  const pressure = weatherItem.main.pressure;
  const humidity = weatherItem.main.humidity;
  const weatherIcon =
    weatherIcons[weatherItem.weather[0].icon] || weatherIcons["01d"];
  const weatherDescription = weatherItem.weather[0].description;
  const cloudCover = weatherItem.clouds.all;
  const windSpeed = weatherItem.wind.speed;
  const windDeg = weatherItem.wind.deg;
  const visibility = weatherItem.visibility / 1000; // Convert to km
  const pop = (weatherItem.pop * 100).toFixed(0); // Precipitation probability
  const rain = weatherItem.rain ? weatherItem.rain["3h"] || 0 : 0; // Rain volume in last 3 hours
  const snow = weatherItem.snow ? weatherItem.snow["3h"] || 0 : 0; // Snow volume in last 3 hours

  if (index === 0) {
    // Current weather
    return `
                    <div class="flex flex-col-reverse md:flex-row justify-between items-center">
                        <div class="mb-6 md:mb-0">
                            <h2 class="text-2xl font-semibold text-gray-800">${cityName} • ${formattedDate}</h2>
                            <div class="mt-4 space-y-2">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                    <span class="text-gray-600">Temperature: ${tempCelsius}°C</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                    <span class="text-gray-600">Feels Like: ${feelsLike}°C</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                    <span class="text-gray-600">Min/Max Temp: ${tempMin}°C / ${tempMax}°C</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18" />
                                    </svg>
                                    <span class="text-gray-600">Pressure: ${pressure} hPa</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span class="text-gray-600">Humidity: ${humidity}%</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                    <span class="text-gray-600">Cloud Cover: ${cloudCover}%</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                                    </svg>
                                    <span class="text-gray-600">Wind: ${windSpeed} m/s, ${windDeg}°</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="text-gray-600">Visibility: ${visibility} km</span>
                                </div>
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span class="text-gray-600">Precipitation Probability: ${pop}%</span>
                                </div>
                                ${
                                  rain > 0
                                    ? `
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span class="text-gray-600">Rain: ${rain} mm</span>
                                </div>`
                                    : ""
                                }
                                ${
                                  snow > 0
                                    ? `
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span class="text-gray-600">Snow: ${snow} mm</span>
                                </div>`
                                    : ""
                                }
                            </div>
                        </div>
                        <div class="text-center mb-5 md:mb-0">
                            <dotlottie-player
                                src="${weatherIcon}"
                                background="transparent"
                                speed="1"
                                style="width: 120px; height: 120px"
                                loop
                                autoplay
                            ></dotlottie-player>
                            <p class="text-gray-600 capitalize">${weatherDescription}</p>
                        </div>
                    </div>
                `;
  } else {
    // Forecast card
    return `
                    <div class="weather-card rounded-xl p-6 text-left animate-float md:p-4" style="animation-delay: ${
                      index * 0.2
                    }s">
                        <h3 class="font-medium text-gray-700 mb-2">${formattedDate}</h3>
                        <dotlottie-player
                            src="${weatherIcon}"
                            background="transparent"
                            speed="0.7"
                            style="width: 60px; height: 60px; margin: 0 auto"
                            loop
                            autoplay
                        ></dotlottie-player>
                        <p class="text-gray-600 mt-2">Temp: ${tempCelsius}°C</p>
                        <p class="text-gray-600">Feels Like: ${feelsLike}°C</p>
                        <p class="text-gray-600">Min/Max: ${tempMin}°C / ${tempMax}°C</p>
                        <p class="text-gray-600">Pressure: ${pressure} hPa</p>
                        <p class="text-gray-600">Humidity: ${humidity}%</p>
                        <p class="text-gray-600">Clouds: ${cloudCover}%</p>
                        <p class="text-gray-600">Wind: ${windSpeed} m/s, ${windDeg}°</p>
                        <p class="text-gray-600">Visibility: ${visibility} km</p>
                        <p class="text-gray-600">Precip. Prob.: ${pop}%</p>
                        ${
                          rain > 0
                            ? `<p class="text-gray-600">Rain: ${rain} mm</p>`
                            : ""
                        }
                        ${
                          snow > 0
                            ? `<p class="text-gray-600">Snow: ${snow} mm</p>`
                            : ""
                        }
                    </div>
                `;
  }
};

const getWeatherDetails = (cityName, lon, lat) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

  // Show loading state
  currentWeatherDiv.innerHTML = `<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div><p class="mt-2 text-gray-600">Loading weather data...</p></div>`;
  forecastCardsDiv.innerHTML = "";

  fetch(WEATHER_API_URL)
    .then((response) => response.json())
    .then((data) => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      cityInput.value = "";
      currentWeatherDiv.innerHTML = "";
      forecastCardsDiv.innerHTML = "";

      fiveDaysForecast.forEach((weatherItem, index) => {
        const html = createWeatherCard(cityName, weatherItem, index);
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML("beforeend", html);
        } else {
          forecastCardsDiv.insertAdjacentHTML("beforeend", html);
        }
      });
    })
    .catch(() => {
      currentWeatherDiv.innerHTML = `<div class="text-center py-10 text-red-500">An error occurred while fetching the weather data. Please try again.</div>`;
    });
};

const getCityWeather = () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    // Simple alert for empty input
    alert("Please enter a city name.");
    return;
  }

  const GEO_API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}`;

  fetch(GEO_API)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        throw new Error("City not found");
      }
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lon, lat);
    })
    .catch(() => {
      currentWeatherDiv.innerHTML = `<div class="text-center py-10 text-red-500">City not found. Please try another location.</div>`;
    });
};

const getUserLocation = () => {
  if (!navigator.geolocation) {
    currentWeatherDiv.innerHTML = `<div class="text-center py-10 text-red-500">Geolocation is not supported by your browser.</div>`;
    return;
  }

  // Show loading state
  currentWeatherDiv.innerHTML = `<div class="text-center py-10"><div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div><p class="mt-2 text-gray-600">Detecting your location...</p></div>`;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      const GEO_API = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_key}`;

      fetch(GEO_API)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            throw new Error("Location not found");
          }
          const { name } = data[0];
          getWeatherDetails(name, lon, lat);
        })
        .catch(() => {
          currentWeatherDiv.innerHTML = `<div class="text-center py-10 text-red-500">An error occurred while fetching your location data.</div>`;
        });
    },
    (error) => {
      currentWeatherDiv.innerHTML = `<div class="text-center py-10 text-red-500">Location access denied. Please enable location services or search manually.</div>`;
    }
  );
};

// Event listeners
searchBtn.addEventListener("click", getCityWeather);
locationBtn.addEventListener("click", getUserLocation);

// Also search when pressing Enter in the input field
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getCityWeather();
  }
});

// Show Anand weather by default when page loads
document.addEventListener("DOMContentLoaded", showDefaultLocation);