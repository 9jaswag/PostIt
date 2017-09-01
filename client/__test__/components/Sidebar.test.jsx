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
  // it('should contain the method onChange', () => {
  //   const component = shallow(<Sidebar {...props}/>);
  //   const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
  //   component.instance().onChange({
  //     target: {
  //       name: 'name', value: 'Andela'
  //     }
  //   });
  //   expect(onChangeSpy).toHaveBeenCalledTimes(1);
  // });
  it('should contain the method logout', () => {
    const component = shallow(<Sidebar {...props}/>);
    const logoutSpy = jest.spyOn(component.instance(), 'logout');
    component.instance().logout(e);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
  // it('should contain the method onSubmit', () => {
  //   const component = shallow(<Sidebar {...props}/>);
  //   const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
  //   component.instance().onSubmit(e);
  //   expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  // });
});
