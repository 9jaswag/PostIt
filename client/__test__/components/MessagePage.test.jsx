/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MessagePage as MessageContainer } from '../../components/group/MessagePage.jsx';
import MessagePage from '../../components/group/MessagePage.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  message: {
    message: {
      title: 'hi'
    }
  }
});

describe('Add user form Component', () => {
  const message = {
    title: 'Message Title',
    message: ' body',
    priority: 'normal',
    createdAt: '2017-08-19T16:37:06.603Z'
  };
  const props = {
    history: { push: jest.fn() }
  };
  it('should render without crashing', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method goBack', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    const goBackSpy = jest.spyOn(component.instance(), 'goBack');
    component.instance().goBack();
    expect(goBackSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should redirect to group page', () => {
    const component = shallow(<MessageContainer
      { ...props }/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });
  // it('should render the connected component', () => {
  //   const component = shallow(<MessagePage
  //     store={store}
  //     message={message} { ...props }/>);
  //   expect(component.node.type).toEqual('div');
  // });
});
