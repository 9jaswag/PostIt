import React from 'react';
import { mount, shallow } from 'enzyme';
import NotFound from '../../components/notFound/NotFound';

describe('404 Not Found component', () => {
  it('should render without crashing', () => {
    const component = shallow(<NotFound />);
    expect(component.node.type).toEqual('div');
  });
});
