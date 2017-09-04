import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { ResetPassword } from '../../components/resetPassword/ResetPassword';

describe('Reset Password component', () => {
  const props = {
    resetPassword: jest.fn(() => Promise.resolve())
  }
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
    const e = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    const submitRequestSpy = jest.spyOn(component.instance(), 'submitRequest');
    component.instance().submitRequest(e);
    expect(submitRequestSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method submitReset', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = shallow(<ResetPassword {...props}/>);
    const submitResetSpy = jest.spyOn(component.instance(), 'submitReset');
    component.instance().submitReset(e);
    expect(submitResetSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<ResetPassword {...props}/>);
    const componentWillMountSpy = jest.spyOn(component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(component.find('h4').text()).toBe('Forgot password?');
  });
});
