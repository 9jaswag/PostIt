/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MessagePage } from '../../components/group/MessagePage.jsx';

describe('Add user form Component', () => {
  const message = {
    title: 'Message Title',
    message: ' body',
    priority: 'normal',
    createdAt: '2017-08-19T16:37:06.603Z'
  };
  const props = {
    history: { push: jest.fn() }
  };
  it('should render without crashing', () => {
    const component = shallow(<MessagePage message={message} { ...props }/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method goBack', () => {
    const component = shallow(<MessagePage message={message} { ...props }/>);
    const goBackSpy = jest.spyOn(component.instance(), 'goBack');
    component.instance().goBack();
    expect(goBackSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<MessagePage message={message} { ...props }/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });
});
