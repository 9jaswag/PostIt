import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import setAuthToken from './utilities/setAuthToken';
import rootReducer from './rootReducer';
import App from './components/App';
import './styles/main.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

setAuthToken(localStorage.jwtToken);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('app'));