import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import { AddUserForm } from '../../components/addUser/AddUserForm';

describe('Add user form Component', () => {
  const props = {
    findUser: jest.fn(() => Promise.resolve()),
    addUser: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<AddUserForm {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method resetState', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const resetStateSpy = jest.spyOn(component.instance(), 'resetState');
    component.instance().resetState();
    expect(resetStateSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method filterUser', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const filterUserSpy = jest.spyOn(component.instance(), 'filterUser');
    component.instance().filterUser('chuks', ['chuks', 'david']);
    expect(filterUserSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onChange', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: { name: 'username', value: 'troy34' }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const e = {
      preventDefault: jest.fn()
    };
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});