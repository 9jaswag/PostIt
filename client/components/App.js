import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import DashboardPage from './dashboard/DashboardPage'
import GroupPage from './group/GroupPage';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/group" component={GroupPage} />
          <Route render={() => {
            return <p>404 Not Found!</p>;
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;