import { getWeatherImage } from "../data/weatherImageMap";

export default function ForecastGrid({ forecast }) {
  return (
    <div className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day) => (
          <div className="forecast-card" key={day.dt}>
            <p className="day">{day.dayName}</p>
            <img
              src={getWeatherImage(day.weatherMain)}
              alt="weather"
            />
            <p className="f-temp">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
