import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Ensure react-icons is installed
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "b30b3b3bfd2b46589ce41900252301"; // Replace with your WeatherAPI key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

    if (!query.trim()) {
      setError("Please enter a valid location!");
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("City not found!");
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition.includes("Clear")) return "☀";
    if (condition.includes("Cloud")) return "☁";
    if (condition.includes("Rain")) return "🌧";
    if (condition.includes("Drizzle")) return "🌦";
    if (condition.includes("Snow")) return "❄";
    return ""; // Default icon
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <p>Find current weather details for any City.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city (e.g., Coimbatore)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch onClick={fetchWeather} className="search-icon" />
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <div className="weather-icon">{getWeatherIcon(weatherData.current.condition.text)}</div>
          <h2>
            {weatherData.location.name}, {weatherData.location.region}
          </h2>
          <p>{weatherData.current.temp_c}°C</p>
          <div className="weather-details">
            <div className="weather-detail">
              <span>💧 Humidity:</span> {weatherData.current.humidity}%
            </div>
            <div className="weather-detail">
              <span>💨 Wind:</span> {weatherData.current.wind_kph} km/h
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;