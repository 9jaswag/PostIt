/* global jest */
/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store'
import { HomePage } from '../../components/home/HomePage';


describe('Homepage Component', () => {
  const props = {
    userSignupRequest: jest.fn(),
    auth: {
      isAuthenticated: true
    }
  };
  it('should render without crashing', () => {
    const component = shallow(<HomePage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<HomePage {...props}/>);
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should show signup button if user is not authenticated', () => {
    props.auth.isAuthenticated = false;
    const component = shallow(<HomePage {...props}/>);
    expect(component.find('.signup-modal').node.props.children).toEqual(
      'Sign Up');
  });
  it('should show dashboard button if user is authenticated', () => {
    props.auth.isAuthenticated = true;
    const component = shallow(<HomePage {...props}/>);
    expect(component.find('.dashboard').node.props.children).toEqual(
      'Dashboard');
  });
});
