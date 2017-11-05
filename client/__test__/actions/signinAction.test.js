import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import Login, { logout } from '../../actions/signinAction';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;
window.sessionStorage = mockSessionStorage;

describe('Sign in action', () => {
  const { action } = mockData;
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches an action SET_CURRENT_USER on successful user sign up',
    (done) => {
      moxios.stubRequest('/api/v1/user/signin', {
        status: 201,
        response: action.signinResponse
      });
      const store = mockStore({});
      const expectedActions = action.signinAction;
      store.dispatch(Login(action.decodedToken)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  it('dispatches an action SET_CURRENT_USER on successful user logout', () => {
    const store = mockStore({});
    const expectedActions = action.logoutAction;
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
