import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/App';
import './styles/main.scss';


ReactDOM.render(<App />, document.getElementById('app'));