import React from 'react';
import { shallow } from 'enzyme';
import { SignupForm } from '../../components/home/SignupForm';
import mockData from '../../__mocks__/mockData';

describe('Signup form component test', () => {
  const { signupForm } = mockData.componentData;
  const props = signupForm.props;
  const event = mockData.eventObject;
  it('should render without crashing', () => {
    const component = shallow(<SignupForm {...props} />);
    expect(component.node.type).toBe('form');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SignupForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(signupForm.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.submitState);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should return phone validation error', () => {
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.phoneErrorState);
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({
      phone: 'Phone number must be 11 characters long'
    });
  });
  it('should return password validation error', () => {
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.passwordErrorState);
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({
      password: 'Password must be 6 characters or more'
    });
  });
  it('should show username error', () => {
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.usernameError);
    component.instance().onSubmit(event);
    expect(component.find('.error').length).toBe(1);
  });
  it('should show email error', () => {
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.emailError);
    component.instance().onSubmit(event);
    expect(component.find('.error').length).toBe(1);
  });
  it('should have error on failed signup', () => {
    props.userSignupRequest = jest.fn(() => Promise.reject(
      signupForm.failedRequest));
    const component = shallow(<SignupForm {...props} />);
    component.setState(signupForm.submitState);
    component.instance().onSubmit(event);
    expect(component.instance().state.username).toEqual('chuks');
  });
});
