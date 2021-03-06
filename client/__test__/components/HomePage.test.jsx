import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedHomePage,
{ HomePage } from '../../components/home/HomePage';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { homePage } = mockData.componentData;
const store = mockStore(homePage.store);


describe('Homepage Component', () => {
  const props = homePage.props;
  it('should render without crashing', () => {
    const component = shallow(<HomePage {...props} />);
    expect(component.node.type).toEqual('div');
  });
  it('should contain the method componentDidMount', () => {
    const component = shallow(<HomePage {...props} />);
    const componentDidMountSpy = jest.spyOn(
      component.instance(), 'componentDidMount');
    component.instance().componentDidMount();
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
  it('should show signup button if user is not authenticated', () => {
    props.auth.isAuthenticated = false;
    const component = shallow(<HomePage {...props} />);
    expect(component.find('.signup-modal').node.props.children).toEqual(
      'Sign Up');
  });
  it('should show dashboard button if user is authenticated', () => {
    props.auth.isAuthenticated = true;
    const component = shallow(<HomePage {...props} />);
    expect(component.find('.dashboard').node.props.children).toEqual(
      'Dashboard');
  });
  it('should render the connected component', () => {
    const component = shallow(<ConnectedHomePage
      store={store}
      {...props}
    />);
    expect(component.length).toBe(1);
  });
});
