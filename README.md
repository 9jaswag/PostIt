[![Build Status](https://travis-ci.org/9jaswag/PostIt.svg?branch=master)](https://travis-ci.org/9jaswag/PostIt)
[![Code Climate](https://codeclimate.com/github/9jaswag/PostIt/badges/gpa.svg)](https://codeclimate.com/github/9jaswag/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/9jaswag/PostIt/badge.svg?branch=master)](https://coveralls.io/github/9jaswag/PostIt?branch=master)

## PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. Users can post broadcast messages to groups and other group members will get notification based on the message priority.

## Features
PostIt allows users to do the following.
* Register and log into their accounts.
* Create broadcast groups and add other users to the groups
* Post messages to a group with message priority
  * Group members get in-app notifications for ```normal``` messages.
  * Group members get in-app and email notifications for ```urgent``` messages.
  * Group members get in-app, email and SMS notifications for ```critical``` messages.
* Retrieve all the messages posted to groups they belong to based on their ```read``` status when they are signed in.
---
## Folder structure

The **template** directory contains the UI template for the front-end in HTML/CSS

The **server** directory houses the back-end implementation in NodeJS-Express-Postgres

The **client** directory houses the front-end implementation in ReactJS (Redux)

## Technology Stack
* Front-end: React/Redux, SASS, Webpack
* Back-end: Node/Express, Sequelize/Postgres
* Nexmo: For sending SMS notifications

## Get Started
1. Clone the repository, navigate to the folder and run ```npm install``` to install dependencies.
2. Setup [Postgres](http://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/)
3. Set up your database credentials in ```server/config/config.js```. See [sample file](https://github.com/9jaswag/PostIt/wiki/Sample-database-configuration-file)
4. Run ```$ sequelize db:migrate``` to run database migrations
5. Create a [Nexmo](https://nexmo.com) account and get your API details for SMS notification
6. Create a ```.env``` file in your root directory and follow the example pattern below to set up environment variables. See [sample file](https://github.com/9jaswag/PostIt/wiki/Sample-.env-file)
7. To start app, navigate to the root directory of the app and run ```node run start:dev``` in development ( This is start up the app with ```nodemon``` watching for changes )  or ```npm start``` in production.

## API documentation
You can find the Documentation for the PostIt Restful API [here](https://docs.postit11.apiary.io/).

## Test
This app uses ```Mocha```, ```Chai-Http``` for API tests, ```Jest```, ```Enzyme``` for frontend tests and ```Nightwatch``` for end-to-end tests
* Run ```npm i mocha -g``` to install [Mocha](https://mochajs.org/) globally and ```npm i nyc -g``` to install [nyc](https://github.com/istanbuljs/nyc) globally before running ```npm test``` to run the API tests
* Run ```npm i jest-cli -g``` to install [Jest](https://facebook.github.io/jest/) globally  before running ```npm run test:client``` to run the frontend tests
* Run ```npm i nightwatch -g``` to install [Nightwatch](http://nightwatchjs.org/) globally , ```npm run e2e-setup```. Then run ```npm run e2e-server``` in one terminal window to start the selenium server before running ```npm run test:e2e``` in the app directory in another terminal window to run the end-to-end tests

## Deployment
1. Setup a Node.js hosting account with any Node.js hosting platform of your choice.
2. Set up an online PostgreSQL database with any PostgreSQL platform of your choice.
3. Push the files to your hosting account and set up the enviroment variables in the .env file. See [sample file](https://github.com/9jaswag/PostIt/wiki/Sample-.env-file).

## Contributing
Fork it!
* Create your feature branch: ```git checkout -b awesome-feature```
* Commit your changes: ```git commit -m 'Add my awesome feature'```
* Push your branch online: ```git push origin awesome-feature```
* Submit a pull request to ```development``` branch :smile:

## FAQ
FInd the frequently asked questions about PostIT [here](https://github.com/9jaswag/PostIt/wiki/FAQ).

## Author
* Chuks Opia

## Acknowledgement
* [Andela](http://andela.com/) Talent Accelerator Team

## License
* This project is licensed under the terms of the MIT [License.](https://github.com/9jaswag/PostIt/blob/chore/implement-feedback/LICENSE)