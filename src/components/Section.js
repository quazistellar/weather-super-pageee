import React, { useState, useEffect } from "react";
import axios from "axios";

const Section = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [search, setSearch] = useState("");
  const [bgColor, setBgColor] = useState(null);
  const [bgOpacity, setBgOpacity] = useState(1);

  const API_KEY = "ccbfa7ba6a40e6a55bb85f4eecfd7c1f";

  useEffect(() => {
    getCurrentWeather();
  }, []);

const containerStyle = {
  width: '1100px',
  height: '250px',
  backgroundColor: bgColor,
  opacity: bgOpacity
};

  const getCurrentWeather = async () => {
    try {
      const response = await axios.get(
       `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`
      );
      setCurrentWeather(response.data);
      setBgColor(getBackgroundColor(response.data.weather[0].main));
      setBgOpacity(getBackgroundOpacity(response.data.weather[0].main)); // Установка непрозрачности фона
    } catch (error) {
      console.error("Error fetching current weather data:", error);
    }
  };

  const getForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${API_KEY}`
      );
      setForecast(response.data);
    } catch (error) {
      console.error("Error fetching weather forecast data:", error);
    }
  };

  const getBackgroundColor = (weather) => {
  switch (weather) {
    case "Clouds":
      return "#d3d3d3";
    case "Rain":
      return "#87ceeb";
    case "Clear":
      return "#f08080";
    case "Snow":
      return "#f0ffff";
    case "Thunderstorm":
      return "#808080";
    case "Drizzle":
      return "#b0c4de";
    case "Mist":
      return "#dcdcdc";
    case "Smoke":
      return "#708090";
    case "Haze":
      return "#e0ffff";
    case "Dust":
      return "#a9a9a9";
    case "Sand":
      return "#f5deb3";
    case "Ash":
      return "#696969";
    case "Squall":
      return "#000080";
    case "Tornado":
      return "#000000";
    default:
      return null;
  }
};

const getBackgroundOpacity = (weather) => {
  switch (weather) {
    case "Clouds":
      return 0.8;
    case "Rain":
      return 0.7;
    case "Clear":
      return 0.8;
    case "Snow":
      return 0.9;
    case "Thunderstorm":
      return 0.6;
    case "Drizzle":
      return 0.8;
    case "Mist":
      return 0.9;
    case "Smoke":
      return 0.7;
    case "Haze":
      return 0.8;
    case "Dust":
      return 0.7;
    case "Sand":
      return 0.8;
    case "Ash":
      return 0.7;
    case "Squall":
      return 0.6;
    case "Tornado":
      return 0.5;
    default:
      return null;
  }
};

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      getCurrentWeather();
      getForecast();
    } else {
      alert("введите город!!");
    }
  };

  return (

    <div className="container1" style={containerStyle}>
      <form onSubmit={handleSearch} className="form-container">
        <input placeholder="Enter ur city" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btnser" type="submit">Search</button>
      </form>
      {currentWeather && (
        <div className="weather-info">
          <p>Current weather in: {currentWeather.name}</p>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind speed: {currentWeather.wind.speed} km/h</p>
          <p>Weather description: {currentWeather.weather[0].description}</p>
          <p>
            Weather icon:{" "}
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </p>
        </div>
      )}

{forecast && (
  <div className="weather-forecast">
  {forecast.list.filter((day, index) => index % 8 === 0).slice(0, 7).map((day) => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-EN", { weekday: "long" });

      return (
        <div key={day.dt} className="weather-card">
          <p>{dayName}</p>
          <p>Temperature: {day.main.temp}°C</p>
          <p>Weather description: {day.weather[0].description}</p>
        </div>
      );
    })}
  </div>
)} </div>
);
};

export default Section;
