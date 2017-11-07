import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SignupModal } from '../../components/home/SignupModal';
import mockData from '../../__mocks__/mockData';

describe('Create group modal', () => {
  const { signupModal } = mockData.componentData;
  const props = signupModal.props;
  it('should render without crashing', () => {
    const component = shallow(<SignupModal {...props} />);
    expect(component.node.type).toEqual('div');
  });
});
