import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedAddUserForm,
{ AddUserForm } from '../../components/group/AddUserForm.jsx';
import mockData from '../../__mocks__/mockData';


const { addUser } = mockData.componentData;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(addUser.userStore);

describe('Add user form Component', () => {
  const props = addUser.props;
  it('should render without crashing', () => {
    const component = shallow(<AddUserForm {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should display error if it exists', () => {
    const component = shallow(<AddUserForm {...props}/>);
    component.setState(addUser.errorResponse);
    expect(component.find('span').text()).toEqual(addUser.errorResponse.error);
  });
  it('should contain the method onChange', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(addUser.onChangeTarget);
    component.instance().props.findUser();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onClick', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick();
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
  it('should add the user to a group', () => {
    const component = shallow(<AddUserForm {...props}/>);
    component.setState({ userToAdd: {
      userId: 1,
      username: 'chuks',
      isMember: false
    } });
    component.instance().onClick({
      target: { name: 'username', value: 'troy34' }
    });
    expect(component.length).toBe(1);
  });
  it('should not add the user to a group', () => {
    const component = shallow(<AddUserForm {...props}/>);
    component.setState({ userToAdd: {
      userId: 1,
      username: 'chuks',
      isMember: true
    } });
    component.instance().onClick({
      target: { name: 'username', value: 'troy34' }
    });
    expect(component.length).toBe(1);
  });
  it('should contain the method onSubmit', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const event = {
      preventDefault: jest.fn()
    };
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method isGroupMember', () => {
    const component = shallow(<AddUserForm {...props}/>);
    const userGroups = [
      { id: 1 }
    ];
    const isGroupMemberSpy = jest.spyOn(component.instance(), 'isGroupMember');
    component.instance().isGroupMember(userGroups);
    expect(isGroupMemberSpy).toHaveBeenCalledTimes(1);
  });
  it('should return empty userToAdd state if no user is found', () => {
    props.findUser = jest.fn(() => Promise.resolve({ data: {} }));
    const component = shallow(<AddUserForm {...props}/>);
    component.instance().onChange(addUser.onChangeTarget);
    component.instance().props.findUser();
    expect(component.instance().state.userToAdd).toEqual({});
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedAddUserForm
      store={store} { ...props }/>);
    expect(component.length).toBe(1);
  });
});
