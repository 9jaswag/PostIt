[![Build Status](https://travis-ci.org/9jaswag/PostIt.svg?branch=master)](https://travis-ci.org/9jaswag/PostIt)
[![Code Climate](https://codeclimate.com/github/9jaswag/PostIt/badges/gpa.svg)](https://codeclimate.com/github/9jaswag/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/9jaswag/PostIt/badge.svg?branch=master)](https://coveralls.io/github/9jaswag/PostIt?branch=master)

# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. Users can post broadcast messages to groups and other group members will get notification based on the message priority.

# Features
PostIt allows users to do the following.
* Register and log into their accounts.
* Create broadcast groups and add other users to the groups
* Post messages to a group with message priority
  * Group members get in-app notifications for ```normal``` messages.
  * Group members get in-app and email notifications for ```urgent``` messages.
  * Group members get in-app, email and SMS notifications for ```critical``` messages.
* Retrieve all the messages posted to groups they belong to based on their ```read``` status when they are signed in.
---
# Folder structure

The **template** directory contains the UI template for the front-end in HTML/CSS

The **server** directory houses the back-end implementation in NodeJS-Express-Postgres

The **client** directory houses the front-end implementation in ReactJS (Redux)

# Technology Stack
* Front-end: React/Redux, SASS, Webpack
* Back-end: Node/Express, Sequelize/Postgres
* Nexmo: For sending SMS notifications
* Nodemailer: For sending email notifications

# Get Started
1. Clone the repository, navigate to the folder and run ```npm install``` to install dependencies.
2. Setup Postgres
3. Set up your database credentials in ```server/config/config.js```

```
example:

development: {
  username: 'database_user',
  password: 'user_password',
  database: 'database_name',
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres'
}
```
4. Run ```$ sequelize db:migrate``` to run database migrations
5. To start app, navigate to the root directory of the app and run ```node run start:dev``` in development ( This is start up the app with ```nodemon``` watching for changes )  or ```npm start``` in production.
6. To run server test run ```npm test```
7. To run client test run ```npm test:client```
8. To run client end-to-end test run ```npm run test:e2e```

# API documentation
You can find the Documentation for the PostIt Restful API [here](https://docs.postit11.apiary.io/).

# Deployment
1. Create a Heroku account and setup a [node application](https://www.heroku.com/nodejs)
2. Set up an online PostgreSQL database, [ElephantSQL](https://www.elephantsql.com/) is a great one
3. Create a Nexmo account and get your API details for SMS notification
4. Push the files to heroku and set up the enviroment variables in the .env file. The required environment variables are:
```
  TOKEN_SECRET=SecretToken
  EMAIL_ADDRESS=email@email.com
  PASSWORD=emailpassword
  API_KEY=nexmo-api-key
  API_SECRET=nexmo-api-secret
  DATABASE_URL_TEST=test-database-url
  DATABASE_URL_DEV=development-database-url
  DATABASE_URL=production-database-url
```
