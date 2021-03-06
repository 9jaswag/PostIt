import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SearchForm from '../../components/search/SearchForm';
import mockData from '../../__mocks__/mockData';

describe('Search Form component', () => {
  const { searchForm } = mockData.componentData;
  const props = searchForm.props;
  it('should render without crashing', () => {
    const component = shallow(<SearchForm
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      state={props.state}
    />);
    expect(component.node.type).toEqual('form');
  });
  it('should display errors', () => {
    props.state.errors = 'User does not exist';
    const component = shallow(<SearchForm
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      state={props.state}
    />);
    expect(component.find('.error').length).toBe(1);
  });
});
