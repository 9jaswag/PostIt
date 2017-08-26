import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import setAuthToken from './utilities/setAuthToken';
import rootReducer from './rootReducer';
import App from './components/App.jsx';
import FlashMessagesList from './components/flash/FlashMessagesList.jsx'
import { setCurrentUser } from './actions/signinAction';
import setGroupId from './actions/groupIdAction';
import passMessage from './actions/passMessageAction';
import './styles/main.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
if (sessionStorage.groupDetails){
  store.dispatch(setGroupId(sessionStorage.groupDetails));
}
if (sessionStorage.message){
  store.dispatch(passMessage(sessionStorage.message));
}

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <FlashMessagesList />
      <App />
    </div>
  </Provider>, document.getElementById('app'));