import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.prod';
import apiRoutes from './routes';

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
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get an instance of router
const router = express.Router();

// Require routes
apiRoutes(app);

// PathLocationStrategy for all GET requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// apply the routes to our application
app.use('/', router);

module.exports = app;
