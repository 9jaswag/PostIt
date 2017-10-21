/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SignupForm } from '../../components/home/SignupForm.jsx';

describe('Signup form component test', () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<SignupForm {...props}/>);
    expect(component.node.type).toBe('form');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SignupForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'username', value: 'chuks'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SignupForm {...props}/>);
    component.setState({ phone: '12345678901',
      password: 'wertyuit',
      username: 'chuks',
      email: 'chuks@andela.com' });
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should return phone validation error', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SignupForm {...props}/>);
    component.setState({ phone: '1234567', password: 'wertyui' });
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({
      phone: 'Phone number must be 11 characters long'
    });
  });
  it('should return password validation error', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SignupForm {...props}/>);
    component.setState({ phone: '12345678901', password: 'werty' });
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({
      password: 'Password must be 6 characters or more'
    });
  });
});
