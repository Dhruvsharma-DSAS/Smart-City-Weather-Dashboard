import { getWeatherImage } from "../data/weatherImageMap";

export default function CurrentWeatherCard({ currentWeather }) {
  const iconUrl = getWeatherImage(currentWeather.weatherMain);

  return (
    <div className="current-weather">
      <div className="left-side">
        <img src={iconUrl} alt="weather" />
        <div className="temp-display">
          <span className="big-temp">{currentWeather.temp}</span>
          <span className="degree">°C</span>
        </div>
      </div>

      <div className="right-side">
        <h2>{currentWeather.city}</h2>
        <p>{currentWeather.description}</p>
        <div className="extra-info">
          <p>Humidity: {currentWeather.humidity}%</p>
          <p>Wind: {currentWeather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
