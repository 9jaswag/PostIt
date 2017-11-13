import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedComponent,
{ CreateGroupForm } from '../../components/group/CreateGroupForm';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { createGroupForm } = mockData.componentData;
const store = mockStore(createGroupForm.createGroupStore);

describe('Create group form', () => {
  const props = createGroupForm.props;
  const event = mockData.eventObject;
  it('should render without crashing', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    expect(component.node.type).toEqual('div');
  });
  it('should display an error if any exists', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    component.setState(createGroupForm.errorResponse);
    expect(component.find('span').text()).toEqual(
      createGroupForm.errorResponse.errors.group);
  });
  it('should contain the method onChange', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange(createGroupForm.onChangeTarget);
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method componentWillReceiveProps', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps');
    const nextProps = createGroupForm.nextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain error', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    const nextProps = createGroupForm.errorNextProps;
    component.instance().componentWillReceiveProps(nextProps);
    expect(component.instance().state.errors).toEqual('group not created');
  });
  it('should contain the method onSubmit', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain group description error in state', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    component.instance()
      .setState({ description: createGroupForm.longDescription });
    component.instance().onSubmit(event);
    expect(component.instance().state.errors.description)
      .toEqual('Group description must be 60 characters or less');
  });
  it('should have an empty error state if group is not created', () => {
    props.createGroup = jest.fn(() => Promise.reject(
      createGroupForm.failedRequest));
    const component = shallow(<CreateGroupForm {...props} />);
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({});
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedComponent
      store={store}
      {...props}
    />);
    expect(component.nodes.length).toBe(1);
  });
});
