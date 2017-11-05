import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { SearchPage } from '../../components/search/Searchpage.jsx';
import mockData from '../../__mocks__/mockData';

describe('Search Page component', () => {
  const { searchPage } = mockData.componentData;
  const props = searchPage.props;
  it('should render without crashing', () => {
    const component = shallow(<SearchPage {...props}/>);
    component.setState(searchPage.searchResponse);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<SearchPage {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(searchPage.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const event = mockData.eventObject;
    const component = shallow(<SearchPage {...props}/>);
    component.setState({ username: 'chuks' });
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method handlePagination', () => {
    const event = searchPage.paginationEvent;
    const component = shallow(<SearchPage {...props}/>);
    const handlePaginationSpy = jest.spyOn(
      component.instance(), 'handlePagination');
    component.instance().handlePagination(event);
    expect(handlePaginationSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method searchUsers', () => {
    const component = shallow(<SearchPage {...props}/>);
    const searchUsersSpy = jest.spyOn(component.instance(), 'searchUsers');
    component.instance().searchUsers();
    expect(searchUsersSpy).toHaveBeenCalledTimes(1);
  });
  it('should have empty user state if no user is found', () => {
    props.searchUserAction = jest.fn(() => Promise.reject(
      searchPage.failedRequest));
    const component = shallow(<SearchPage {...props}/>);
    component.instance().searchUsers();
    expect(component.instance().state.users).toEqual([]);
  });
});
