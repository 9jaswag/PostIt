/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SearchPage } from '../../components/search/Searchpage.jsx';

describe('Search Page component', () => {
  const props = {
    searchUserAction: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<SearchPage {...props}/>);
    component.setState({ count: 5,
      limit: 2,
      users: [{
        username: 'chuks',
      }] });
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SearchPage {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'username', value: 'chuks'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should return username validation error', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SearchPage {...props}/>);
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toBe('Enter a username');
  });
  it('should contain the method onSubmit', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SearchPage {...props}/>);
    component.setState({ username: 'chuks' });
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method handlePagination', () => {
    const event = {
      target: { id: 3 }
    };
    const component = shallow(<SearchPage {...props}/>);
    const handlePaginationSpy = jest.spyOn(component.instance(), 'handlePagination');
    component.instance().handlePagination(event);
    expect(handlePaginationSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method searchUsers', () => {
    const component = shallow(<SearchPage {...props}/>);
    const searchUsersSpy = jest.spyOn(component.instance(), 'searchUsers');
    component.instance().searchUsers();
    expect(searchUsersSpy).toHaveBeenCalledTimes(1);
  });
});
