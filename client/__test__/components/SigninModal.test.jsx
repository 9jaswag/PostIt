import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SigninModal from '../../components/home/SigninModal';

describe('Sign in modal', () => {
  it('should render without crashing', () => {
    const component = shallow(<SigninModal />);
    expect(component.node.type).toEqual('div');
  });
});
