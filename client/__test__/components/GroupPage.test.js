import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store'
import { GroupPage } from '../../components/group/GroupPage';
import mockSessionStorage from '../mocks/mockSessionStorage';

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });


describe('Group page Component', () => {
  let mountedComponent;
  let props;
  const groupPage = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<GroupPage {...props}/>);
    }
    return mountedComponent;
  }
  beforeEach(() => {
    const props = {
      groupDetails: jest.fn(),
      getMessages: jest.fn(),
      passMessage: jest.fn(),
      updateReadBy: jest.fn()
    }
  });
  it('should render without crashing', () => {
    const component = groupPage();
    expect(component.node.type).toEqual('div');
  });
  // it('sessionStorage should contain groupDetails', () => {
  //   const component = groupPage();
  //   mockSessionStorage.setItem()
  //   console.log('===========> component', component);
  //   console.log('===========> session', sessionStorage);
  // });
});