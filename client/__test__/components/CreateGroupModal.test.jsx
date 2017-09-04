import React from 'react';
import { mount, shallow } from 'enzyme';
import CreateGroupModal from '../../components/modal/CreateGroupModal';

describe('Create group modal', () => {
  it('should render without crashing', () => {
    const component = shallow(<CreateGroupModal/>);
    expect(component.node.type).toEqual('div');
  });
});
