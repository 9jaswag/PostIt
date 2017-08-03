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
import App from './components/App';
import FlashMessagesList from './components/flash/FlashMessagesList'
import { setCurrentUser } from './actions/signinAction';
import setGroupId from './actions/groupIdAction';
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
if (sessionStorage.id){
  store.dispatch(setGroupId(sessionStorage.id));
}

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <FlashMessagesList />
      <App />
    </div>
  </Provider>, document.getElementById('app'));