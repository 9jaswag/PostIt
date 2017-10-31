/* global sessionStorage */
/* global localStorage */
/* global document */
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import store from './store';
import setAuthToken from './utilities/setAuthToken';
import App from './components/App.jsx';
import { setCurrentUser } from './actions/signinAction';
import { setGroupDetail } from './actions/groupActions';
import { passMessage } from './actions/messageActions';
import './styles/main.scss';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (sessionStorage.groupDetails) {
  store.dispatch(setGroupDetail(sessionStorage.groupDetails.split(',')));
}
if (sessionStorage.message) {
  store.dispatch(passMessage(sessionStorage.message));
}

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <App />
    </div>
  </Provider>, document.getElementById('app'));
