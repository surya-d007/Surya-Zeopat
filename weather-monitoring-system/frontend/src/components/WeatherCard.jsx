import React from "react";

const WeatherCard = ({ weather, setAlert }) => {
  const handleAlert = () => {
    if (weather.maxTemp > 35) {
      setAlert(`Alert! The temperature in ${weather.city} exceeded 35°C.`);
    }
  };

  React.useEffect(() => {
    handleAlert();
  }, [weather]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold">{weather.city}</h2>
      <p className="text-gray-700">
        Average Temp: {weather.averageTemp.toFixed(2)}°C
      </p>
      <p className="text-gray-700">Max Temp: {weather.maxTemp.toFixed(2)}°C</p>
      <p className="text-gray-700">Min Temp: {weather.minTemp.toFixed(2)}°C</p>
      <p className="text-gray-700">Condition: {weather.dominantCondition}</p>
    </div>
  );
};

export default WeatherCard;
