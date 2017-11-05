import React from 'react';
import { mount, shallow } from 'enzyme';
import GroupCards from '../../components/group/GroupCards.jsx';
import mockData from '../../__mocks__/mockData';

describe('Group cards', () => {
  const { groupCard } = mockData.componentData;
  const props = groupCard.props;
  it('should render without crashing', () => {
    const component = shallow(
      <GroupCards onClick={ props.onClick } group={ props.group } />);
    expect(component.node.type).toEqual('div');
  });
  it('should render unread message count', () => {
    props.group.unreadCount = 5;
    const component = shallow(
      <GroupCards onClick={ props.onClick } group={ props.group } />);
    expect(component.find('.new').node.props.children).toEqual(5);
  });
});
