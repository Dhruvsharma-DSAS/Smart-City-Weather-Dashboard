const weatherImageMap = {
  Thunderstorm: "/Images/icons/thunderstorm.png",
  Drizzle: "/Images/icons/drizzle.png",
  Rain: "/Images/icons/rain.png",
  Snow: "/Images/icons/snow.png",
  Mist: "/Images/icons/mist.png",
  Smoke: "/Images/icons/mist.png",
  Haze: "/Images/icons/mist.png",
  Dust: "/Images/icons/mist.png",
  Fog: "/Images/icons/mist.png",
  Sand: "/Images/icons/mist.png",
  Ash: "/Images/icons/mist.png",
  Squall: "/Images/icons/mist.png",
  Tornado: "/Images/icons/mist.png",
  Clear: "/Images/icons/clear.png",
  Clouds: "/Images/icons/clouds.png"
};

export function getWeatherImage(weatherMain) {
  return weatherImageMap[weatherMain] || "/Images/icons/clouds.png";
}
