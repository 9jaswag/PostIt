/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import
{ ResetPassword } from '../../components/resetPassword/ResetPassword.jsx';

describe('Reset Password component', () => {
  const props = {
    resetPassword: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<ResetPassword {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'email', value: 'chuks24ng@yahoo.co.uk'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method submitRequest', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    const submitRequestSpy = jest.spyOn(component.instance(), 'submitRequest');
    component.instance().submitRequest(event);
    expect(submitRequestSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method submitReset', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ password: 'newpass', confirmPassword: 'newpass' });
    const submitResetSpy = jest.spyOn(component.instance(), 'submitReset');
    component.instance().submitReset(event);
    expect(submitResetSpy).toHaveBeenCalledTimes(1);
  });
  it('should return error if passwords dont match', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ password: 'newpass', confirmPassword: 'strongpass' });
    component.instance().submitReset(event);
    expect(component.instance().state.error).toBe('Passwords do not match');
  });
  it('should return password validation error', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ password: 'stro', confirmPassword: 'stro' });
    component.instance().submitReset(event);
    expect(component.instance().state.error).toBe('Password must be 6 characters or more');
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(component.find('h4').text()).toBe('Forgot password?');
  });
  it('should render the request form if state.initial is true', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ initial: false, secondary: true });
    expect(component.find('h4').text()).toBe('Reset password?');
  });
  it('should render the reset form if state.initial is true', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ initial: true, secondary: false });
    expect(component.find('h4').text()).toBe('Forgot password?');
  });
  it('should handle error on password reset', () => {
    const event = {
      preventDefault: jest.fn()
    };
    props.resetPassword = jest.fn(() => Promise.reject({
      response: { data: { error: 'Email exists' } }
    }));
    const component = shallow(<ResetPassword {...props}/>);
    component.setState({ password: 'newpass', confirmPassword: 'newpass' });
    component.instance().submitReset(event);
    expect(component.instance().state.error).toEqual('');
  });
  it('should contain the method submitRequest', () => {
    const event = {
      preventDefault: jest.fn()
    };
    props.resetPassword = jest.fn(() => Promise.reject({
      response: { data: { error: 'Email exists' } }
    }));
    const component = shallow(<ResetPassword {...props}/>);
    component.instance().submitRequest(event);
    expect(component.instance().state.error).toEqual('');
  });
});
