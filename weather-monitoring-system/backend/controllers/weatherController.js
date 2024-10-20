const Weather = require("../models/Weather");
const { getWeatherData } = require("../services/weatherService");
const nodemailer = require("nodemailer");

// Email setup for alert notifications
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const weatherCities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

// Helper function to convert temperature from Kelvin to Celsius
const kelvinToCelsius = (kelvin) => kelvin - 273.15;

// Function to calculate daily weather summary
const calculateDailySummary = async (data) => {
  const date = new Date(data.dt * 1000).setHours(0, 0, 0, 0);
  const currentWeather = {
    temp: kelvinToCelsius(data.main.temp),
    feelsLike: kelvinToCelsius(data.main.feels_like),
    condition: data.weather[0].main,
  };

  let weatherSummary = await Weather.findOne({
    city: data.name,
    date: new Date(date),
  });

  if (!weatherSummary) {
    weatherSummary = new Weather({ city: data.name, date: new Date(date) });
  }

  // Update summary values
  weatherSummary.averageTemp =
    (weatherSummary.averageTemp + currentWeather.temp) / 2 ||
    currentWeather.temp;
  weatherSummary.maxTemp = Math.max(
    weatherSummary.maxTemp || currentWeather.temp,
    currentWeather.temp
  );
  weatherSummary.minTemp = Math.min(
    weatherSummary.minTemp || currentWeather.temp,
    currentWeather.temp
  );
  weatherSummary.dominantCondition = currentWeather.condition; // Replace this logic if needed

  await weatherSummary.save();
};

// Function to send alerts via email
const sendAlert = async (city, condition) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Weather Alert for ${city}`,
    text: `Alert! The weather condition in ${city} is now ${condition}.`,
  };

  await transporter.sendMail(mailOptions);
};

const fetchWeatherUpdates = async () => {
  for (const city of weatherCities) {
    try {
      const weatherData = await getWeatherData(city);
      await calculateDailySummary(weatherData);
      // Add alerting logic here based on conditions
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error.message);
    }
  }
};

module.exports = { fetchWeatherUpdates };
