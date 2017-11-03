/* global jest */
/* global expect */
import React from 'react';
import { mount, shallow } from 'enzyme';
import GroupCards from '../../components/group/GroupCards.jsx';

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
    const component = shallow(
      <GroupCards onClick={ props.onClick } group={ props.group } />);
    expect(component.node.type).toEqual('div');
  });
  it('should render unread message count', () => {
    const prop = {
      onClick: jest.fn(),
      group: {
        group: {
          id: 9,
          name: 'true love',
          description: 'a group description'
        },
        unreadCount: 5
      }
    };
    const component = shallow(
      <GroupCards onClick={ props.onClick } group={ prop.group } />);
    expect(component.find('.new').node.props.children).toEqual(5);
  });
});
