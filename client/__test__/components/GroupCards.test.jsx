import React from 'react';
import { mount, shallow } from 'enzyme';
import GroupCards from '../../components/group/GroupCards';

describe('Group cards', () => {
  const props = {
    onClick: jest.fn(),
    group: {
      group: {
        id: 9,
        name: 'true love',
        description: 'a group description'
      }
    }
  };
  it('should render without crashing', () => {
    const component = shallow(<GroupCards onClick={ props.onClick } group={ props.group } />);
    expect(component.node.type).toEqual('div');
  });
});
