import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import AlertModal from "./AlertModal";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alert, setAlert] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/weather/update"); // Update to your backend endpoint
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000); // Fetch data every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Monitoring System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.map((weather) => (
          <WeatherCard
            key={weather.city}
            weather={weather}
            setAlert={setAlert}
          />
        ))}
      </div>
      {alert && <AlertModal alert={alert} setAlert={setAlert} />}
    </div>
  );
};

export default WeatherDashboard;
