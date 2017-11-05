import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MessagePage, { MessagePage as MessageContainer }
  from '../../components/group/MessagePage.jsx';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { messagePage } = mockData.componentData;
const store = mockStore(messagePage.store);

describe('Add user form Component', () => {
  const message = messagePage.message;
  const props = messagePage.props;
  it('should render without crashing', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method goBack', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    const goBackSpy = jest.spyOn(component.instance(), 'goBack');
    component.instance().goBack();
    expect(goBackSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillMount', () => {
    const component = shallow(<MessageContainer
      message={message} { ...props }/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should redirect to group page if message not provided', () => {
    const component = shallow(<MessageContainer
      { ...props }/>);
    const componentWillMountSpy = jest.spyOn(
      component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
  });
});
