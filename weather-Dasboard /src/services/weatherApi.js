const API_KEY = "995a21f0a70af809ea2a26abc13746a7";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function parseResponse(response, errorMessage) {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchWeatherByCity(city) {
  const currentURL = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const forecastURL = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  const [currentRes, forecastRes] = await Promise.all([
    fetch(currentURL),
    fetch(forecastURL)
  ]);

  const [current, forecast] = await Promise.all([
    parseResponse(currentRes, "City not found"),
    parseResponse(forecastRes, "Forecast unavailable")
  ]);

  return { current, forecast };
}
