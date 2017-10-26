/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedSidebar,
{ Sidebar } from '../../components/dashboard/Sidebar.jsx';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  auth: { user: {} },
  groups: []
});

describe('Sidebar', () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'chuks.opia@andela.com',
        username: 'chuks'
      }
    },
    logout: jest.fn(() => Promise.resolve()),
    createGroup: jest.fn(() => Promise.resolve())
  };
  const event = {
    preventDefault: jest.fn()
  };
  it('should render without crashing', () => {
    const component = shallow(<Sidebar {...props}/>);
    expect(component.node.type).toEqual('section');
  });
  it('should render without crashing', () => {
    const prop = {
      auth: {
        isAuthenticated: false,
        user: {}
      },
      logout: jest.fn(() => Promise.resolve()),
      createGroup: jest.fn(() => Promise.resolve())
    };
    const component = shallow(<Sidebar {...prop}/>);
    expect(component.node.type).toEqual('section');
  });
  it('should contain the method logout', () => {
    const component = shallow(<Sidebar {...props}/>);
    const logoutSpy = jest.spyOn(component.instance(), 'logout');
    component.instance().logout(event);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedSidebar
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
});
