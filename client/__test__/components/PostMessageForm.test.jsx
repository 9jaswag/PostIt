/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedPostMessageForm,
{ PostMessageForm } from '../../components/group/PostMessageForm.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { user: {} }
});

describe('Post message form component', () => {
  const props = {
    postMessage: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<PostMessageForm {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<PostMessageForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'priority', value: 'normal'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<PostMessageForm {...props}/>);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedPostMessageForm
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
  it('should have an empty state if message is not sent', () => {
    const event = {
      preventDefault: jest.fn()
    };
    props.postMessage = jest.fn(() => Promise.reject({
      status: 403,
      data: {
        success: false,
        message: 'No cant do'
      }
    }));
    const component = shallow(<PostMessageForm {...props}/>);
    component.instance().onSubmit(event);
    expect(component.instance().state.message).toEqual('');
  });
});
