/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import Login, { logout, setCurrentUser } from '../../actions/signinAction';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockSessionStorage from '../../__mocks__/mockSessionStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;
window.sessionStorage = mockSessionStorage;

describe('Sign in action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const userData = {
    username: 'chuks',
    password: 'password'
  };

  it('contains a logout function', () => {
    expect(logout()).toBeA('function');
  });
  it('contains a login function', () => {
    expect(Login()).toBeA('function');
  });
  it('should contain setCurrentUser object', () => {
    expect(setCurrentUser()).toBeA('object');
  });
  it('dispatches an action SET_CURRENT_USER on successful user sign up',
    (done) => {
      const store = mockStore({});
      moxios.stubRequest('/api/v1/user/signin', {
        status: 201,
        response: {
          success: true,
          message: 'Sign in succesful.',
          data: {
            token: '0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
          }
        }
      });
      const expectedActions = [
        { type: types.SET_CURRENT_USER }
      ];
      store.dispatch(Login(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  it('dispatches an action SET_CURRENT_USER on successful user logout', () => {
    const store = mockStore({});
    const expectedActions = [
      { type: types.SET_CURRENT_USER, user: {} }
    ];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
