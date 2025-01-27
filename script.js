      // GSAP animations
      window.onload = function () {
        gsap.from(".title-dashboard h1", {
          duration: 1,
          y: -50,
          opacity: 0,
          ease: "bounce",
        });
        gsap.from(".weather-input input", {
          duration: 1,
          x: -100,
          opacity: 0,
          delay: 0.5,
        });
        gsap.from(".weather-input .search-btn", {
          duration: 1,
          x: 100,
          opacity: 0,
          delay: 0.7,
        });
        gsap.from(".weather-data", {
          duration: 1,
          scale: 0.9,
          opacity: 0,
          delay: 1,
        });
        gsap.from(".days-forecast", {
          duration: 1,
          y: 50,
          opacity: 0,
          delay: 1.2,
        });
      };
      const cityInput = document.querySelector("#city-input");
      const searchBtn = document.querySelector(".search-btn");
      const locationBtn = document.querySelector(".location-button");
      const currentWeatherDiv = document.querySelector(".current-weather");
      const weatherCardsDiv = document.querySelector(".weather-cards");

      const API_key = "5d73a99ff554352719be2118aab73699";

      const createWeatherCard = (cityName, weatherItem, index) => {
        if (index === 0) {
          return `<div class="details">
                            <h2>${cityName} : (${
            weatherItem.dt_txt.split(" ")[0]
          })</h2>
                            <h4>Temperature: ${(
                              weatherItem.main.temp - 273.15
                            ).toFixed(2)}°C</h4>
                            <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                        </div>
                        <div class="icon">
                            <dotlottie-player src="https://lottie.host/ecd831ba-ef29-43d3-a346-b4b1a96277bf/9YBlUd6sy1.json" 
                                background="transparent" speed="1" style="width: 100px; height: 100px;" loop autoplay>
                            </dotlottie-player>
                            <h4>${weatherItem.weather[0].description}</h4>
                        </div>`;
        } else {
          return `<li class="card">
                            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                            <div class="logo">
                                <img src="https://openweathermap.org/img/wn/${
                                  weatherItem.weather[0].icon
                                }@2x.png" alt="Weather Icon">
                            </div>
                            <h4>Temperature: ${(
                              weatherItem.main.temp - 273.15
                            ).toFixed(2)}°C</h4>
                            <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                        </li>`;
        }
      };

      const getWeatherDetails = (cityName, lon, lat) => {
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
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
            weatherCardsDiv.innerHTML = "";
            fiveDaysForecast.forEach((weatherItem, index) => {
              const html = createWeatherCard(cityName, weatherItem, index);
              if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
              } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
              }
            });
          })
          .catch(() => {
            alert("An error occurred while fetching the weather data.");
          });
      };

      const getCityWeather = () => {
        const cityName = cityInput.value.trim();
        if (!cityName) return;
        const GEO_API = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_key}`;
        fetch(GEO_API)
          .then((response) => response.json())
          .then((data) => {
            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lon, lat);
          })
          .catch(() => {
            alert("An error occurred while fetching the city's coordinates.");
          });
      };

      const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((response) => {
          const { latitude: lat, longitude: lon } = response.coords;
          const GEO_API = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_key}`;
          fetch(GEO_API)
            .then((response) => response.json())
            .then((data) => {
              const { name } = data[0];
              getWeatherDetails(name, lon, lat);
            })
            .catch(() => {
              alert("An error occurred while fetching the user's location.");
            });
        });
      };

      searchBtn.addEventListener("click", getCityWeather);
      locationBtn.addEventListener("click", getUserLocation);