const express = require("express");
const { fetchWeatherUpdates } = require("../controllers/weatherController");

const router = express.Router();

// Endpoint to manually trigger weather updates
router.get("/update", async (req, res) => {
  try {
    await fetchWeatherUpdates();
    res.status(200).json({ message: "Weather data updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating weather data", error: error.message });
  }
});

module.exports = router;
