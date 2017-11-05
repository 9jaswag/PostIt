import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedSidebar,
{ Sidebar } from '../../components/dashboard/Sidebar.jsx';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { sidebar } = mockData.componentData;
const store = mockStore(sidebar.store);

describe('Sidebar', () => {
  const props = sidebar.props;
  const event = mockData.eventObject;
  it('should display welcome message', () => {
    const component = shallow(<Sidebar {...props}/>);
    expect(component.node.type).toEqual('section');
    expect(component.find('.chip').text()).toEqual('Welcome chuks');
  });
  it('should render without crashing', () => {
    props.auth.isAuthenticated = false;
    props.auth.user = {};
    const component = shallow(<Sidebar {...props}/>);
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
