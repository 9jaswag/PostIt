import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store'
import { DashboardPage } from '../../components/dashboard/DashboardPage';
import mockSessionStorage from '../mocks/mockSessionStorage';

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });


describe('Dashboard page Component', () => {
  let mountedComponent;
  let props;
  const dashboardPage = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<DashboardPage {...props}/>);
    }
    return mountedComponent;
  }
  beforeEach(() => {
    const props = {
      getGroups: jest.fn(),
      setGroupId: jest.fn(),
      getMessages: jest.fn()
    }
  });
  it('should render without crashing', () => {
    const component = dashboardPage();
    expect(component.node.type).toEqual('div');
  });
  it('sessionStorage should contain groupDetails', () => {
    const component = dashboardPage();
    // mockSessionStorage.setItem()
    // console.log('===========> component', component);
    // console.log('===========> session', sessionStorage);
  });
});