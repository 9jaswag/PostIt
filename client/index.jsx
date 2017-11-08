import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import store from './store';
import setAuthToken from './utilities/setAuthToken';
import App from './components/App';
import { setCurrentUser } from './actions/signinAction';
import { setGroupDetail } from './actions/groupActions';
import './styles/main.scss';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (sessionStorage.groupDetails) {
  store.dispatch(setGroupDetail(sessionStorage.groupDetails.split(',')));
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>, document.getElementById('app'));
