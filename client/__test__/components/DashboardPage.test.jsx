import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store'
import { DashboardPage } from '../../components/dashboard/DashboardPage';


describe('Homepage Component', () => {
  it('should render without crashing', () => {
    const props = {
      getGroups: jest.fn(),
      setGroupId: jest.fn(),
      getMessages: jest.fn()
    }
    const component = shallow(<DashboardPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
});