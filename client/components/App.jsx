/**
 * App parent component
 */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import DashboardPage from './dashboard/DashboardPage'
import GroupPage from './group/GroupPage';
import SearchPage from './search/Searchpage';
import MessagePage from './message/MessagePage';
import ResetPassword from './resetPassword/ResetPassword';
import requireAuth from '../utilities/requireAuth';

/**
 * @export
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @returns {component} returns a component that matches a provided path
   * @memberof App
   */
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/resetpassword" component={ ResetPassword } />
          <Route exact path="/dashboard" component={ requireAuth(DashboardPage) } />
          <Route exact path="/group" component={ requireAuth(GroupPage) } />
          <Route exact path="/search" component={ requireAuth(SearchPage) } />
          <Route exact path="/message" component={ requireAuth(MessagePage) } />
          <Route render={() => <p>404 Not Found!</p>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
