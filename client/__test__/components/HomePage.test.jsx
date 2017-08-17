import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HomePage from '../../components/home/HomePage.js';

describe('HomePage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        <Provider>
          ReactDOM.render(<HomePage/>, div);
        </Provider>
    });
});