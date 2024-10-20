const express = require("express");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api/weather", weatherRoutes);

// Start server and set interval for weather updates
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(fetchWeatherUpdates, 5 * 60 * 1000); // Call fetchWeatherUpdates every 5 minutes
});
