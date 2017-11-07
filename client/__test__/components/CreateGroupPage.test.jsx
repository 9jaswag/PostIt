import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CreateGroupPage from '../../components/group/CreateGroupPage';

describe('create group page', () => {
  it('should render without crashing', () => {
    const component = shallow(<CreateGroupPage />);
    expect(component.node.type).toEqual('div');
  });
});
