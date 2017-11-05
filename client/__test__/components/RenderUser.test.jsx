import React from 'react';
import { shallow } from 'enzyme';
import RenderUser from '../../components/search/RenderUser.jsx';
import mockData from '../../__mocks__/mockData';

describe('Render user component', () => {
  const { renderUser } = mockData.componentData;
  const props = renderUser.props;
  it('should render without crashing', () => {
    const component = shallow(<RenderUser user={ props.user } />);
    expect(component.node.type).toEqual('div');
  });
});
