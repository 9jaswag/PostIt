import React, { Component } from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';
import HomePage from './home/HomePage';
import DashboardPage from './dashboard/DashboardPage';
import GroupPage from './group/GroupPage';

class App extends Component {
  render() {
    return(
        <BrowserRouter history={ browserHistory }>
          <div>
            <Route exact path="/" component={ HomePage } />
            <Route path="/dashboard" component={ DashboardPage} />
            <Route path="/group" component={ GroupPage } />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;