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
  it('should render without crashing', () => {
    const props = {
      getGroups: jest.fn(),
      setGroupId: jest.fn(),
      getMessages: jest.fn()
    }
    const component = shallow(<DashboardPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('sessionStorage should contain groupDetails', () => {
    const props = {
      getGroups: jest.fn(),
      setGroupId: jest.fn(),
      getMessages: jest.fn()
    }
    const component = shallow(<DashboardPage {...props}/>);
    // mockSessionStorage.setItem()
    // console.log('===========> component', component);
    // console.log('===========> session', sessionStorage);
  });
});