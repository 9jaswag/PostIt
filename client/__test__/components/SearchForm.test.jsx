import React from 'react';
import { mount, shallow } from 'enzyme';
import SearchForm from '../../components/search/SearchForm';

describe('Create group modal', () => {
  const props = {
    onClick: jest.fn(),
    onSubmit: jest.fn(),
    state: {
      group: {
        username: '',
        errors: '',
      }
    }
  };
  it('should render without crashing', () => {
    const component = shallow(<SearchForm onClick={ props.onClick } onSubmit={ props.onSubmit } state={ props.state } />);
    expect(component.node.type).toEqual('form');
  });
});
