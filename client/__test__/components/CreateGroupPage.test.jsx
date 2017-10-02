/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import CreateGroupPage from '../../components/group/CreateGroupPage';

describe('create group page', () => {
  it('should render without crashing', () => {
    const component = shallow(<CreateGroupPage />);
    expect(component.node.type).toEqual('div');
  });
});
