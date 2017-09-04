import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store'
import { MessagePage } from '../../components/message/MessagePage';

describe('Add user form Component', () => {
  const message = {
    title: 'Message Title',
    message:" body",
    priority: "normal",
    createdAt: `2017-08-19T16:37:06.603Z`
  };
  it('should render without crashing', () => {
    const component = shallow(<MessagePage message={message}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method goBack', () => {
    const component = shallow(<MessagePage message={message}/>);
    const goBackSpy = jest.spyOn(component.instance(), 'goBack');
    component.instance().goBack();
    expect(goBackSpy).toHaveBeenCalledTimes(1);
  });
});
