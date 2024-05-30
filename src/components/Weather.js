import React, { useState, useEffect } from 'react';
import axios from "axios";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);

  const API_KEY = "ccbfa7ba6a40e6a55bb85f4eecfd7c1f";

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${API_KEY}`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error("Error fetching current weather data:", error);
      }
    };

    getCurrentWeather();
  }, []);

  return (
    <div>
      {currentWeather && (
        <div className="current">
  <h4 style={{ color: '#6A5ACD', textShadow: '-2px -2px 1 black, 2px -1px 1 black, -1px 1px 0 black, 1px 1px 0 black' }}>Weather in: {currentWeather.name}</h4>          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind speed: {currentWeather.wind.speed} км/ч</p>
          <p>
           {" "}
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
