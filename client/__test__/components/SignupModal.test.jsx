/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { SignupModal } from '../../components/signup/SignupModal.jsx';

describe('Create group modal', () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  };
  it('should render without crashing', () => {
    const component = shallow(<SignupModal {...props}/>);
    expect(component.node.type).toEqual('div');
  });
});
