import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import GroupCards from '../../components/group/GroupCards';
import mockData from '../../__mocks__/mockData';

describe('Group cards', () => {
  const { groupCard } = mockData.componentData;
  const props = groupCard.props;
  it('should render without crashing', () => {
    const component = shallow(
      <GroupCards onClick={props.onClick} group={props.group} />);
    expect(component.node.type).toEqual('div');
  });
  it('should render unread message count', () => {
    props.group.unreadCount = 5;
    const component = shallow(
      <GroupCards onClick={props.onClick} group={props.group} />);
    expect(component.find('.new').node.props.children).toEqual(5);
  });
});
