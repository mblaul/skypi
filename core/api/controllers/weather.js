var Weather = require("../models/Weather");

//Load input validation
const validateWeatherLogInput = require("../validation/weather/log");

module.exports.log_post = (req, res) => {
	const { errors, isValid } = validateWeatherLogInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newWeather = new Weather({
		source: req.body.source,
		device: req.body.device,
		temperature: req.body.temperature,
		humidity: req.body.humidity,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		pressure: req.body.pressure,
		wind: req.body.wind
	});

	newWeather
		.save()
		.then(log => {
			return res.json(log);
		})
		.catch(err => {
			console.log(err);
			errors.server = "An error occured, please try again";
			return res.status(500).json(errors);
		});
};
