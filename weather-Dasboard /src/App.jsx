import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WearSuggestions from "./components/WearSuggestions";
import ForecastGrid from "./components/ForecastGrid";
import { getWearSuggestions } from "./data/wearSuggestions";
import { fetchWeatherByCity } from "./services/weatherApi";

function mapWeather(data) {
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
  const [isDark, setIsDark] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const root = document.body;
    root.className = isDark ? "dark" : "light";
    
    if (currentWeather) {
      if (currentWeather.temp < 15) root.classList.add("cold");
      else if (currentWeather.temp > 30) root.classList.add("hot");
      else root.classList.add("moderate");
    }
  }, [currentWeather, isDark]);

  async function loadCityWeather(city) {
    const q = city.trim();
    if (!q) return;

    try {
      const { current, forecast: foreData } = await fetchWeatherByCity(q);
      setCurrentWeather(mapWeather(current));
      setForecast(mapForecast(foreData));
      
      // Update history using HOFs
      setHistory(prev => {
        const filtered = prev.filter(item => item !== q);
        return [q, ...filtered].slice(0, 5);
      });

      localStorage.setItem("lastCity", q);
    } catch (err) {
      alert("City not found! Try something else.");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("lastCity");
    if (saved) {
      setCityInput(saved);
      loadCityWeather(saved);
    }
  }, []);

  const tips = currentWeather
    ? getWearSuggestions(currentWeather.temp, currentWeather.description)
    : [];

  return (
    <div className="container">
      <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      <SearchBar
        val={cityInput}
        onChange={setCityInput}
        onSearch={() => loadCityWeather(cityInput)}
      />

      {history.length > 0 && (
        <div className="history-chips">
          {history.map(city => (
            <button key={city} onClick={() => { setCityInput(city); loadCityWeather(city); }}>
              {city}
            </button>
          ))}
        </div>
      )}

      {currentWeather && (
        <div className="fade-in">
          <CurrentWeatherCard weather={currentWeather} />
          <WearSuggestions tips={tips} />
          <ForecastGrid days={forecast} />
        </div>
      )}
    </div>
  );
}

