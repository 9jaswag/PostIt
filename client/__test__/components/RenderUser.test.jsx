import React from 'react';
import { mount, shallow } from 'enzyme';
import RenderUser from '../../components/search/RenderUser';

describe('Create group modal', () => {
  const props = {
    user: {
      group: {
        username: 'chuks',
        email: 'chuks@andela.com',
        Groups: [],
        phone: '2347033130449'
      }
    }
  };
  it('should render without crashing', () => {
    const component = shallow(<RenderUser user={ props.user } />);
    expect(component.node.type).toEqual('div');
  });
});
