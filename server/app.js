import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from '../webpack.config';

require('dotenv').config();

// Set up the express app
const app = express();
const compiler = webpack(config);

// Log requests to the console.
app.use(logger('dev'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get an instance of router
const router = express.Router();

// Require routes
require('./routes')(app);
// Setup a default catch-all route 
// that sends back a welcome message in JSON format.
// router.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning of nothingness. 404 Not Found',
// }));

// apply the routes to our application
app.use('/', router);

module.exports = app;
