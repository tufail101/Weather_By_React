import { useContext, useState } from "react";
import "./App.css";
//import WeatherProvider from "./contexApi/WeatherProvider";
import weatherContex from "./contexApi/weatherContex";
import clear from "./assets/clear.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import cloud from "./assets/cloud.svg";
import drizzle from "./assets/drizzle.png";
import haze from "./assets/haze.svg";
import thunderstrom from "./assets/thunderstrom.png";
import foggy from "./assets/foggy.png";
import weather from "./assets/weather_app.png";

function App() {
  const { weather, fetchWeather, setcity } = useContext(weatherContex);
  const [icity, seticity] = useState("");

  const hanldeSearch = () => {
    if (icity) {
      fetchWeather(icity);
      setcity(icity);
    } else {
      seticity("Enter A Corect City Name ");
    }
  };
  const handleChange = (e) => {
    seticity(e.target.value);
  };
  const weatherImages = {
    Clear: clear,
    Rain: rain,
    Clouds: cloud,
    Snow: snow,
    Thunderstorm: thunderstrom,
    Drizzle: drizzle,
    Mist: mist,
    Haze: haze,
    Fog: foggy,
    default: weather,
  };
  const getWeatherImage = () => {
    if (weather && weather.weather && weather.weather[0]) {
      const condition = weather.weather[0].main;
      return weatherImages[condition] || weatherImages.default;
    }
    return weatherImages.default;
  };
  return (
    <>
      <div className="bg-lime-600 flex flex-col flex-wrap  min-h-96 min-w-28 px-4 my-11 rounded border-spacing-60">
        <div className="flex mx-2 my-3">
          <input
            type="text"
            value={icity}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={hanldeSearch}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded mx-5"
          >
            search
          </button>
        </div>
        {weather ? (
          <div className="mx-6 text-xl text-gray-50">
            <h1>
              <strong>Weather for</strong> {weather.name}
            </h1>
            <p>{weather.weather[0].description}</p>
            <img
              src={getWeatherImage()}
              alt={weather.weather[0].main}
              style={{ width: "300px", height: "200px" }}
            />
            <p>
              <strong>Temperature:</strong>{" "}
              {Math.round(weather.main.temp - 273.15)}°C
            </p>
            <p>
              <strong>Humidity: </strong>
              {weather.main.humidity}%
            </p>
          </div>
        ) : (
          <p>Enter a city to see the weather.</p>
        )}
      </div>
    </>
  );
}

export default App;
