import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import StatefulGroupPage,
{ GroupPage } from '../../components/group/GroupPage.jsx';
import { Sidebar } from '../../components/dashboard/Sidebar.jsx';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { groupPage } = mockData.componentData;
const store = mockStore(groupPage.store);

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });


describe('Group page Component', () => {
  const props = groupPage.props;
  it('should render without crashing', () => {
    const component = shallow(<GroupPage {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should not display group name', () => {
    props.groupDetails = [];
    const component = shallow(<GroupPage {...props}/>);
    expect(component.find('h5').text()).toBe(' ');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<GroupPage {...props}/>);
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method filterMessages', () => {
    const messages = groupPage.message;
    const component = shallow(<GroupPage {...props}/>);
    const filterMessagesSpy = jest.spyOn(
      component.instance(), 'filterMessages');
    component.instance().filterMessages(messages);
    expect(filterMessagesSpy).toHaveBeenCalledTimes(1);
  });
  it('should display unread messages', () => {
    const messages = groupPage.message;
    const component = shallow(<GroupPage {...props}/>);
    component.setState({ displayState: 'unread' });
    component.instance().filterMessages(messages);
    expect(
      component.instance().state.displayedMessage[0].title).toBe('Title fight');
  });
  it('should display archived messages', () => {
    const messages = groupPage.message;
    const component = shallow(<GroupPage {...props}/>);
    component.setState({ displayState: 'archived' });
    component.instance().filterMessages(messages);
    expect(
      component.instance().state.displayedMessage[0].title).toBe('true love');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<GroupPage {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(groupPage.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onClick', () => {
    const component = shallow(<GroupPage {...props}/>);
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick(groupPage.onClickEvent);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillReceiveProps', () => {
    const nextProps = groupPage.nextProps;
    const component = shallow(<GroupPage {...props}/>);
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const component = shallow(<StatefulGroupPage
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
  it('should have empty message state if group is not found', () => {
    props.getMessages = jest.fn(() => Promise.reject(groupPage.failedResponse));
    const component = shallow(<GroupPage {...props}/>);
    component.instance().componentDidMount();
    expect(component.instance().state.messages).toEqual([]);
  });
});
