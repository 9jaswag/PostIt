import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedComponent,
{ SigninForm } from '../../components/home/SigninForm';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { signinForm } = mockData.componentData;
const store = mockStore(signinForm.store);

describe('Sign in form component test', () => {
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
  it('should contain the method componentWillReceiveProps', () => {
    const component = shallow(<SigninForm {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(component.instance(), 'componentWillReceiveProps');
    const nextProps = signinForm.nextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain errors in state', () => {
    const component = shallow(<SigninForm {...props} />);
    const nextProps = signinForm.errorNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(component.instance().state.errors.message)
      .toEqual('Incorrect Username/Password');
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
  it('should render the connected component', () => {
    const component = shallow(<ConnectedComponent
      store={store}
      {...props}
    />);
    expect(component.nodes.length).toBe(1);
  });
});
