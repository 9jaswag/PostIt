import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MessageContent from '../../components/group/MessageContent';
import mockData from '../../__mocks__/mockData';

describe('Create group modal', () => {
  const { messageContent } = mockData.componentData;
  const props = messageContent.props;
  it('should render without crashing', () => {
    const component = shallow(
      <MessageContent message={props.message} />);
    expect(component.node.type).toEqual('div');
  });
});
