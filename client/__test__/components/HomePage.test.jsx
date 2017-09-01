import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store'
import { HomePage } from '../../components/home/HomePage';


describe('Homepage Component', () => {
  it('should render without crashing', () => {
    const props = {
      userSignupRequest: jest.fn(),
      addFlashMessage: jest.fn(),
      auth: {}
    }
    const component = shallow(<HomePage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
});