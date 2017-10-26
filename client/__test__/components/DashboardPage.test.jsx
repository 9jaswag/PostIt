/* global window */
/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedDashboardPage,
{ DashboardPage } from '../../components/dashboard/DashboardPage.jsx';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { user: {} },
  groups: []
});


describe('Dashboard page Component', () => {
  const props = {
    getGroups: jest.fn(() => Promise.resolve()),
    setGroupId: jest.fn(),
    setGroupToStore: jest.fn(),
    getMessages: jest.fn(() => Promise.resolve()),
    groups: [{
      group: {
        id: 2,
        name: 'HNG',
        description: "A group for HNG's Factory product"
      },
      unreadCount: 0
    }],
    history: { push: jest.fn() }
  };
  it('should render without crashing', () => {
    const component = shallow(<DashboardPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should not display any group', () => {
    const prop = {
      getGroups: jest.fn(() => Promise.resolve()),
      setGroupId: jest.fn(),
      setGroupToStore: jest.fn(),
      getMessages: jest.fn(() => Promise.resolve()),
      groups: [],
      history: { push: jest.fn() }
    };
    const component = shallow(<DashboardPage {...prop}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<DashboardPage {...props}/>);
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onClick', () => {
    const component = shallow(<DashboardPage {...props}/>);
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick({
      target: {
        dataset: { id: 3 }
      }
    });
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedDashboardPage
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
});
