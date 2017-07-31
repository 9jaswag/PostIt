import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import './styles/main.scss';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('app'));