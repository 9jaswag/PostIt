/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import SigninModal from '../../components/home/SigninModal.jsx';

describe('Sign in modal', () => {
  it('should render without crashing', () => {
    const component = shallow(<SigninModal/>);
    expect(component.node.type).toEqual('div');
  });
});
