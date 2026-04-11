import { getWeatherImage } from "../data/weatherImageMap";

export default function CurrentWeatherCard({ weather }) {
  const iconUrl = getWeatherImage(weather.weatherMain);

  return (
    <div className="current-weather">
      <div className="left-side">
        <img src={iconUrl} alt="weather" />
        <div className="temp-display">
          <span className="big-temp">{weather.temp}</span>
          <span className="degree">°C</span>
        </div>
      </div>

      <div className="right-side">
        <h2>{weather.city}</h2>
        <p>{weather.description}</p>
        <div className="extra-info">
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>💨 Wind: {weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

