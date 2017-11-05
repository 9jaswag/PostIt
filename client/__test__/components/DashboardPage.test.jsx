import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedDashboardPage,
{ DashboardPage } from '../../components/dashboard/DashboardPage.jsx';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';
import mockData from '../../__mocks__/mockData';

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { dashboardPage } = mockData.componentData;
const store = mockStore(dashboardPage.store);


describe('Dashboard page Component', () => {
  const props = dashboardPage.props;
  it('should render without crashing', () => {
    const component = shallow(<DashboardPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should not display any group', () => {
    props.groups = [];
    const component = shallow(<DashboardPage {...props}/>);
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
    component.instance().onClick(dashboardPage.onClickEvent);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedDashboardPage
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
});
