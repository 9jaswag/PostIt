import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import
{ ResetPassword } from '../../components/ResetPassword';
import mockData from '../../__mocks__/mockData';

describe('Reset Password component', () => {
  const { resetPassword } = mockData.componentData;
  const props = resetPassword.props;
  const event = mockData.eventObject;
  it('should render without crashing', () => {
    const component = shallow(<ResetPassword {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(resetPassword.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method submitRequest', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const submitRequestSpy = jest.spyOn(component.instance(), 'submitRequest');
    component.instance().submitRequest(event);
    expect(submitRequestSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method submitReset', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.requestState);
    const submitResetSpy = jest.spyOn(component.instance(), 'submitReset');
    component.instance().submitReset(event);
    expect(submitResetSpy).toHaveBeenCalledTimes(1);
  });
  it('should return error if passwords dont match', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.unmatchingPassword);
    component.instance().submitReset(event);
    expect(component.instance().state.error).toBe('Passwords do not match');
  });
  it('should return password validation error', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.shortPassword);
    component.instance().submitReset(event);
    expect(component.instance().state.error).toBe(
      'Password must be 6 characters or more');
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(component.find('h4').text()).toBe('Forgot password?');
  });
  it('should render the request form if initial state is false', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.secondaryState
    );
    expect(component.find('h4').text()).toBe('Reset password?');
  });
  it('should render the reset form if initial state is true', () => {
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.initialState);
    expect(component.find('h4').text()).toBe('Forgot password?');
  });
  it('should handle error on password reset', () => {
    props.resetPassword = jest.fn(() => Promise.reject(
      resetPassword.failedRequest));
    const component = shallow(<ResetPassword {...props}/>);
    component.setState(resetPassword.requestState);
    component.instance().submitReset(event);
    expect(component.instance().state.error).toEqual('');
  });
  it('should contain the method submitRequest', () => {
    props.resetPassword = jest.fn(() => Promise.reject(
      resetPassword.failedRequest));
    const component = shallow(<ResetPassword {...props}/>);
    component.instance().submitRequest(event);
    expect(component.instance().state.error).toEqual('');
  });
});
