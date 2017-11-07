import React from 'react';
import { shallow } from 'enzyme';
import { SigninForm } from '../../components/home/SigninForm';
import mockData from '../../__mocks__/mockData';

describe('Sign in form component test', () => {
  const { signinForm } = mockData.componentData;
  const props = signinForm.props;
  it('should render without crashing', () => {
    const component = shallow(<SigninForm {...props} />);
    expect(component.node.type).toBe('form');
  });
  it('should display errors', () => {
    const component = shallow(<SigninForm {...props} />);
    component.setState(signinForm.errorState);
    expect(component.find('span').text()).toEqual('an error');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SigninForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(signinForm.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const event = mockData.eventObject;
    const component = shallow(<SigninForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    const link = component.find('Link');
    link.simulate('click');
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should return error for login', () => {
    const event = mockData.eventObject;
    props.Login = jest.fn(() => Promise.reject(signinForm.failedRequest));
    const component = shallow(<SigninForm {...props} />);
    component.instance().onSubmit(event);
    expect(component.instance().state.username).toEqual('');
  });
});
