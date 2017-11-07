import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MessageCard from '../../components/group/MessageCard';
import mockData from '../../__mocks__/mockData';

describe('Create group modal', () => {
  const { messageCard } = mockData.componentData;
  const props = messageCard.props;
  it('should render without crashing', () => {
    const component = shallow(
      <MessageCard onClick={props.onClick} message={props.message} />);
    expect(component.node.type).toEqual('div');
  });
});
