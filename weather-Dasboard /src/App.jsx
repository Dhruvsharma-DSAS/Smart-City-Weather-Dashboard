import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WearSuggestions from "./components/WearSuggestions";
import ForecastGrid from "./components/ForecastGrid";
import { getWearSuggestions } from "./data/wearSuggestions";
import { fetchWeatherByCity } from "./services/weatherApi";




function mapCurrentWeather(data) {
  return {
    temp: Math.round(data.main.temp),
    city: data.name,
    weatherMain: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6)
  };
}

function mapForecast(data) {
  return data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .map((day) => ({
      dt: day.dt,
      dayName: new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      }),
      temp: Math.round(day.main.temp),
      weatherMain: day.weather[0].main,
      icon: day.weather[0].icon
    }));
}

export default function App() {
  const [cityInput, setCityInput] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!currentWeather) {
      document.body.className = "";
      return;
    }

    if (currentWeather.temp < 15) {
      document.body.className = "cold";
    } else if (currentWeather.temp > 30) {
      document.body.className = "hot";
    } else {
      document.body.className = "moderate";
    }
  }, [currentWeather]);

  async function loadCityWeather(city) {
    const trimmed = city.trim();
    if (!trimmed) return;

    try {
      const result = await fetchWeatherByCity(trimmed);
      setCurrentWeather(mapCurrentWeather(result.current));
      setForecast(mapForecast(result.forecast));
      localStorage.setItem("lastCity", trimmed);
    } catch (err) {
      console.log(err.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setCityInput(savedCity);
      loadCityWeather(savedCity);
    }
  }, []);

  const wearTips = currentWeather
    ? getWearSuggestions(currentWeather.temp, currentWeather.description)
    : [];

  return (
    <div className="container">
      <Header />

      <SearchBar
        cityInput={cityInput}
        onCityInputChange={setCityInput}
        onSearch={() => loadCityWeather(cityInput)}
      />

      {currentWeather && (
        <>
          <CurrentWeatherCard currentWeather={currentWeather} />
          <WearSuggestions tips={wearTips} />
          <ForecastGrid forecast={forecast} />
        </>
      )}
    </div>
  );
}
