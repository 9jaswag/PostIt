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
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
