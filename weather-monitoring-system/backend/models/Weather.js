const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  averageTemp: { type: Number },
  maxTemp: { type: Number },
  minTemp: { type: Number },
  dominantCondition: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Weather", WeatherSchema);
