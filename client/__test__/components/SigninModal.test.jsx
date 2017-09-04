import React from 'react';
import { mount, shallow } from 'enzyme';
import SigninModal from '../../components/modal/SigninModal';

describe('Sign in modal', () => {
  it('should render without crashing', () => {
    const component = shallow(<SigninModal/>);
    expect(component.node.type).toEqual('div');
  });
});
