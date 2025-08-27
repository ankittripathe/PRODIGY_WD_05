// ApiKey = ddcc8e1f7f025d45e354288d10477c26

const apiKey = "ddcc8e1f7f025d45e354288d10477c26"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".city").innerHTML = "City not found";
      document.querySelector(".temp").innerHTML = "-°C";
      document.querySelector(".humidity").innerHTML ="- %";
      document.querySelector(".wind").innerHTML = "- km/h";
      weatherIcon.src = "images/error.png"; // error icon
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


    // Change icon based on weather condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Trigger search when clicked on button.
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Trigger search when pressing Enter key.
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
