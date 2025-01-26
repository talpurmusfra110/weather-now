const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const weatherField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");


form.addEventListener("submit", searchForLocation);

const API_KEY = "0a6234256e0a4ec1a3a155542251501";

const fetchWeather = async (targetLocation) => {
  try {
    
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch weather data");

    const data = await res.json();

    const locationName = data.location.name;
    const time = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

function updateDetails(temp, locationName, time, condition) {
  const [date, clockTime] = time.split(" ");
  const currentDay = getDayName(new Date(date).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateField.innerText = `${currentDay}, ${clockTime}`;
  weatherField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();
  if (target) fetchWeather(target);
}

function getDayName(dayNumber) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayNumber];
}

fetchWeather(target);
