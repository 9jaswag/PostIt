/* global expect */
/* global jest */
import React from 'react';
import { shallow } from 'enzyme';
import MessageContent from '../../components/group/MessageContent.jsx';

describe('Create group modal', () => {
  const props = {
    onClick: jest.fn(),
    message: {
      id: 9,
      title: 'true love',
      message: 'true lovers',
      priority: 'urgent',
      author: 'chuks',
      readby: [
        'chuks'
      ],
      createdAt: '2017-08-27T19:49:14.760Z',
      updatedAt: '2017-08-27T19:49:14.760Z',
      groupId: 1,
      userId: 1
    }
  };
  it('should render without crashing', () => {
    const component = shallow(
      <MessageContent message={ props.message } />);
    expect(component.node.type).toEqual('div');
  });
});
