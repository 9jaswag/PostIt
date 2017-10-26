/* global jest */
/* global expect */
/* global window */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import StatefulGroupPage,
{ GroupPage } from '../../components/group/GroupPage.jsx';
import { Sidebar } from '../../components/dashboard/Sidebar.jsx';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  groupDetails: [1],
  auth: { user: {} },
  groupMemberCount: 4,
  message: []
});

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });


describe('Group page Component', () => {
  const props = {
    groupDetails: [3, 'HNG'],
    getMessages: jest.fn(() => Promise.resolve()),
    passMessage: jest.fn(),
    updateReadBy: jest.fn(),
    getMemberCount: jest.fn(),
    user: {
      username: 'chuks'
    },
    messages: []
  };
  it('should render without crashing', () => {
    const component = shallow(<GroupPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should not show group name', () => {
    const prop = {
      groupDetails: [],
      getMessages: jest.fn(() => Promise.resolve()),
      passMessage: jest.fn(),
      updateReadBy: jest.fn(),
      getMemberCount: jest.fn(),
      user: {
        username: 'chuks'
      }
    };
    const component = shallow(<GroupPage {...prop}/>);
    expect(component.find('h5').text()).toBe(' ');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<GroupPage {...props}/>);
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method filterMessages', () => {
    const messages = [{
      id: 9,
      title: 'true love',
      message: 'true lovers',
      priority: 'urgent',
      author: 'chuks',
      readby: ['chuks'],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    }];
    const component = shallow(<GroupPage {...props}/>);
    const filterMessagesSpy = jest.spyOn(
      component.instance(), 'filterMessages');
    component.instance().filterMessages(messages);
    expect(filterMessagesSpy).toHaveBeenCalledTimes(1);
  });
  it('should display unread messages', () => {
    const messages = [{
      id: 9,
      title: 'true love',
      message: 'true lovers',
      priority: 'urgent',
      author: 'chuks',
      readby: ['chuks'],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    },
    {
      id: 1,
      title: 'Title fight',
      message: 'Title fighters',
      priority: 'urgent',
      author: 'chuks',
      readby: ['dave'],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    }];
    const component = shallow(<GroupPage {...props}/>);
    component.setState({ displayState: 'unread' });
    component.instance().filterMessages(messages);
    expect(
      component.instance().state.displayedMessage[0].title).toBe('Title fight');
  });
  it('should display archived messages', () => {
    const messages = [{
      id: 9,
      title: 'true love',
      message: 'true lovers',
      priority: 'urgent',
      author: 'chuks',
      readby: ['chuks'],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    },
    {
      id: 1,
      title: 'Title fight',
      message: 'Title fighters',
      priority: 'urgent',
      author: 'chuks',
      readby: ['dave'],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    }];
    const component = shallow(<GroupPage {...props}/>);
    component.setState({ displayState: 'archived' });
    component.instance().filterMessages(messages);
    expect(
      component.instance().state.displayedMessage[0].title).toBe('true love');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<GroupPage {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        value: 'unread', name: 'filter-message'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onClick', () => {
    const component = shallow(<GroupPage {...props}/>);
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick({
      target: {
        value: 'unread',
        name: 'filter-message',
        dataset: {
          readby: 'dave'
        }
      }
    });
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillReceiveProps', () => {
    const nextProps = {
      messages: [
        {
          id: 46,
          title: 'Hello World',
          message: 'from the other side',
          priority: 'normal',
          author: 'chuks',
          readby: ['chuks'],
          groupId: 1,
          userId: 2
        }
      ]
    };
    const component = shallow(<GroupPage {...props}/>);
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<StatefulGroupPage
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
});
