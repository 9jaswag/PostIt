import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';

require('dotenv').config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(express.static('dist'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// get an instance of router
const router = express.Router();

// Require routes
routes(app);

// PathLocationStrategy for all GET requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// apply the routes to our application
app.use('/', router);

module.exports = app;
