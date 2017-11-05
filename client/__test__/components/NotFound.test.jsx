import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../components/NotFound';

describe('404 Not Found component', () => {
  it('should render without crashing', () => {
    const component = shallow(<NotFound />);
    expect(component.node.type).toEqual('div');
  });
});
