import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedPostMessageForm,
{ PostMessageForm } from '../../components/group/PostMessageForm';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { postMessage } = mockData.componentData;
const store = mockStore(postMessage.store);

describe('Post message form component', () => {
  const props = postMessage.props;
  it('should render without crashing', () => {
    const component = shallow(<PostMessageForm {...props} />);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<PostMessageForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(postMessage.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillReceiveProps', () => {
    const component = shallow(<PostMessageForm {...props} />);
    const componentWillReceivePropsSpy = jest
      .spyOn(component.instance(), 'componentWillReceiveProps');
    const nextProps = postMessage.nextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain empty message state', () => {
    const component = shallow(<PostMessageForm {...props} />);
    const nextProps = postMessage.errorNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(component.instance().state.message).toEqual('');
  });
  it('should contain the method onSubmit', () => {
    const event = mockData.eventObject;
    const component = shallow(<PostMessageForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedPostMessageForm
      store={store}
      {...props}
    />);
    expect(component.length).toBe(1);
  });
  it('should have an empty state if message is not sent', () => {
    const event = mockData.eventObject;
    props.postMessage = jest.fn(() => Promise.reject(
      postMessage.failedRequest));
    const component = shallow(<PostMessageForm {...props} />);
    component.instance().onSubmit(event);
    expect(component.instance().state.message).toEqual('');
  });
});
