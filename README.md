[![Build Status](https://travis-ci.org/9jaswag/PostIt.svg?branch=master)](https://travis-ci.org/9jaswag/PostIt)

# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications.
Check out the live app [here](https://postiit.herokuapp.com/).
# Structure
PostIt has an API that allows do the following.
* Sign up and log into their accounts
* Create groups
* Add users to a group
* Post messages to a group with message priority
* Retrieve all the messages posted to groups they belong to.
---

The **template** directory contains the UI template for the front-end in HTML/CSS

The **server** directory houses the back-end implementation in NodeJS-Express-Postgres

The **client** directory houses the front-end implementation in ReactJS (Redux)

# Get Started
1. Clone the repository and run ```npm install``` to install dependencies.
2. Setup Postgres
3. Set up your database credentials in ```server/config/config.json```
4. Run ```$ sequelize db:migrate``` to run database migrations
5. To start app, navigate to the root directory of the app and run ```node run start:dev```. This is start up the app with ```nodemon``` watching for changes.

# End Points
## Sign Up
```POST: api/user/signup```
  #### Parameters
  ```Username, Password & Email Address```
## Sign In
```POST: api/user/signin```
  #### Parameters
  ```Username & Password```
## Create New Group
```POST: api/group```
  #### Parameters
  ```name & description```
## Add Users To Group
```POST: api/group/<group id>/user```
  #### Parameters
  ```userId and groupId```
## Post Message To Group
```POST /api/group/<group id>/message```
  #### Parameters
  ```message, priority, groupId```
## Retrieve Message From Group
```GET: /api/group/<group id>/messages```
  #### Parameters
  ```groupId```