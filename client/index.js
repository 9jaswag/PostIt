import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
// import appRoutes from './components/appRoutes';
import App from './components/App';
import './styles/main.scss';


ReactDOM.render(<App />, document.getElementById('app'));