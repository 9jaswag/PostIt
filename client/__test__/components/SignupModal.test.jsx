import React from 'react';
import { mount, shallow } from 'enzyme';
import { SignupModal } from '../../components/modal/SignupModal';

describe('Create group modal', () => {
  it('should render without crashing', () => {
    const component = shallow(<SignupModal/>);
    expect(component.node.type).toEqual('div');
  });
});
