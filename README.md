# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications.
# Structure
PostIt has an API that allows do the following.
* Sign up and log into their accounts
* Create groups
* Add users to a group
* Post messages to a group with message priority
* Retrieve all the messages posted to groups they belong to

# Get Started
1. Clone the repository and run ```npm install``` to install dependencies.

# End Points
## Sign Up
```POST: api/user/signup```
## Parameters
```Username, Password & Email Address```
## Sign In
```POST: api/user/signin```
## Parameters
```Username & Password```
## Create New Group
```POST: api/group```
## Add Users To Group
```POST: api/group/<group id>/user```
## Post Message To Group
```POST /api/group/<group id>/message```
## Retrieve Message From Group
```GET: /api/group/<group id>/messages```