import React, { useEffect, useState } from "react";
import axios from "axios";

const cities = ["Moscow", "Voronezh", "Vladivostok", "Saint Petersburg", "Sochi", "Khabarovsk", "Helsinki"];

const API_KEY = "ccbfa7ba6a40e6a55bb85f4eecfd7c1f";

const Footer = () => {
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        //  запросы к API для каждого города
      const response = await Promise.all(
          cities.map((city) => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`))
        );

        //  данные о погоде из ответов
        const weatherData = response.map((res) => res.data);

        // состояние с данными о погоде для каждого города
        setCurrentWeather(weatherData);
      } catch (error) {
        console.error(error);
      }
    };

    // для получения текущей погоды
    fetchCurrentWeather();
  }, []);

  return (
    <footer className="footer">
      <p className="headfot"> _______ M a i n ______ C i t i e s _______</p>
      <ul>
        {cities.map((city, index) => (
        <li key={city}>
        {city}: {currentWeather[index] ? currentWeather[index].main.temp + "°C" : "-"}
        </li>
    ))}
      </ul>
    </footer>
  );
};

export default Footer;
