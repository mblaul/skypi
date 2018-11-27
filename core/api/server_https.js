var express = require('express');
var bodyparser = require('body-parser');
const passport = require('passport');
var mongoose = require('mongoose');
var helmet = require('helmet');

var db = require('./config/keys').mongoURI;

var app = express();

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

//Security module
app.use(helmet());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Set static directory to /public
app.use(express.static(__dirname + '/public'));

app.use('/static', express.static(__dirname + '/public'));

app.use(bodyparser.json()); // to support JSON-encoded bodies
app.use(bodyparser.urlencoded({ extended: true }));

app.use(require('./routes'));

// Error handling
app.use((req, res, next) => {
  var err = new Error('File not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`there was an error: ${err.message}\n code: ${err.status}`);
});

// Certificate
const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/yourdomain.com/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/yourdomain.com/cert.pem',
  'utf8'
);
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/yourdomain.com/chain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
