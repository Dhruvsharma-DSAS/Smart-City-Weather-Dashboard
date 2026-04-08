import { getWeatherImage } from "../data/weatherImageMap";

export default function ForecastGrid({ days }) {
  return (
    <div className="forecast-section">
      <h3>Next 5 Days</h3>
      <div className="forecast-grid">
        {days.map((day) => (
          <div className="forecast-card" key={day.dt}>
            <p className="day">{day.dayName}</p>
            <img
              src={getWeatherImage(day.weatherMain)}
              alt="weathericon"
            />
            <p className="f-temp">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

