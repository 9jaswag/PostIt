import React from 'react';
import { shallow } from 'enzyme';
import { CreateGroupForm } from '../../components/group/CreateGroupForm';
import mockData from '../../__mocks__/mockData';

describe('Create group form', () => {
  const { createGroupForm } = mockData.componentData;
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
  it('should contain the method onSubmit', () => {
    const component = shallow(<CreateGroupForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should have an empty error state if group is not created', () => {
    props.createGroup = jest.fn(() => Promise.reject(
      createGroupForm.failedRequest));
    const component = shallow(<CreateGroupForm {...props} />);
    component.instance().onSubmit(event);
    expect(component.instance().state.errors).toEqual({});
  });
});
