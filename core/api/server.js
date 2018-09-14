var express = require("express");
var bodyparser = require("body-parser");
const passport = require("passport");
var mongoose = require("mongoose");

var db = require("./config/keys").mongoURI;

var app = express();

mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log("MongoDB connected!"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Set static directory to /public
app.use(express.static(__dirname + "/public"));

app.use("/static", express.static(__dirname + "/public"));

app.use(bodyparser.json()); // to support JSON-encoded bodies
app.use(bodyparser.urlencoded({ extended: true }));

app.use(require("./routes"));

// Error handling
app.use((req, res, next) => {
	var err = new Error("File not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send(`there was an error: ${err.message}\n code: ${err.status}`);
});

if (process.env.NODE_ENV === "production") {
	app.listen(80, () => {
		console.log("Express app listening on port 80");
	});
} else {
	app.listen(5000, () => {
		console.log("Express app listening on port 5000");
	});
}
