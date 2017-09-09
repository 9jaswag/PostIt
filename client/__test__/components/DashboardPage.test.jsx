import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import { DashboardPage } from '../../components/dashboard/DashboardPage';
import mockSessionStorage from '../../__mocks__/mockSessionStorage.js';

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });


describe('Dashboard page Component', () => {
  const props = {
    getGroups: jest.fn(() => Promise.resolve()),
    setGroupId: jest.fn(),
    setGroupToStore: jest.fn(),
    getMessages: jest.fn(() => Promise.resolve()),
    groups: [
      {
        group: {
          id: 2,
          name: 'HNG',
          description: "A group for HNG's Factory product"
        },
        unreadCount: 0
      }
    ],
    history: { push: jest.fn() }
  };
  it('should render without crashing', () => {
    const component = shallow(<DashboardPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<DashboardPage {...props}/>);
    const componentDidMountSpy = jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onClick', () => {
    const component = shallow(<DashboardPage {...props}/>);
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick({
      target: {
        dataset: { id: 3 }
      }
    });
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});