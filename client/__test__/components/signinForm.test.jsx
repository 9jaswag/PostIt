import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SigninForm } from '../../components/signin/signinForm';

describe('Sign in form component test', () => {
  const props = {
    Login: jest.fn(() => Promise.resolve())
  }
  it('should render without crashing', () => {
    const component = shallow(<SigninForm {...props}/>);
    expect(component.node.type).toBe('form');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SigninForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'username', value: 'chuks'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const e = {
      preventDefault: jest.fn()
    }
    const component = shallow(<SigninForm {...props}/>);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
