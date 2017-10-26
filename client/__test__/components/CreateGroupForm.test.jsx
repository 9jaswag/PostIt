/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { CreateGroupForm } from '../../components/group/CreateGroupForm';

describe('Create group form', () => {
  const props = {
    createGroup: jest.fn(() => Promise.resolve()),
  };
  const event = {
    preventDefault: jest.fn()
  };
  it('should render without crashing', () => {
    const component = shallow(<CreateGroupForm {...props}/>);
    expect(component.node.type).toEqual('div');
  });
  it('should display an error if any exists', () => {
    const component = shallow(<CreateGroupForm {...props}/>);
    component.setState({ errors: { group: 'group already exists' } });
    expect(component.find('span').text()).toEqual('group already exists');
  });
  it('should contain the method onChange', () => {
    const component = shallow(<CreateGroupForm {...props}/>);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: 'name', value: 'Andela'
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const component = shallow(<CreateGroupForm {...props}/>);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
