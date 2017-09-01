import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import { Sidebar } from '../../components/sidebar/Sidebar';

describe('Sidebar', () => {
  const props = {
    auth:  {
      isAuthenticated: true,
      user: {
        userId: 1,
        userEmail: "chuks.opia@andela.com",
        userUsername: "chuks"
      }
    },
    logout: jest.fn(),
    createGroup: jest.fn(() => Promise.resolve()),
  };
  const e = {
    preventDefault: jest.fn()
  };
  it('should render without crashing', () => {
    const component = shallow(<Sidebar {...props}/>);
    expect(component.node.type).toEqual('section');
  });
  it('should contain the method logout', () => {
    const component = shallow(<Sidebar {...props}/>);
    const logoutSpy = jest.spyOn(component.instance(), 'logout');
    component.instance().logout(e);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
