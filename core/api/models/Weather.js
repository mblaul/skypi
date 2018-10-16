const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  source: {
    type: String,
    required: true
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: 'devices'
  },
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  pressure: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  wind: {
    type: Number
  },
  winddirection: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Weather = mongoose.model('weather', WeatherSchema);
