/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import userSignupRequest, { setCurrentUser } from '../../actions/signupActions';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign up action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should contain userSignupRequest function', () => {
    expect(userSignupRequest()).toBeA('function');
  });
  it('should contain setCurrentUser object', () => {
    expect(setCurrentUser()).toBeA('object');
  });
  it('should dispatch an action', () => {
    const auth = {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'chuks',
        email: 'chuks@andela.com',
      }
    };
    const userData = {
      email: 'chuks@andela.com',
      id: 1,
      username: 'chuks'
    };
    const expectedAction = { type: types.SET_CURRENT_USER, user: auth.user };
    expect(setCurrentUser(userData)).toEqual(expectedAction);
  });
  it('creates an action SET_CURRENT_USER on successful user sign up',
    (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: {
          success: true,
          message: 'Sign up succesful.',
          data: {
            token: 'iSX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
          }
        }
      });
      const store = mockStore({});
      const auth = {
        isAuthenticated: true,
        user: {
          id: 1,
          username: 'chuks',
          email: 'chuks@andela.com',
        }
      };
      const userData = {
        username: 'chuks',
        email: 'chuks@andela.com',
        password: 'password',
        phone: '2347033130448'
      };
      const expectedActions = [
        { type: types.SET_CURRENT_USER, user: auth.user }
      ];
      store.dispatch(userSignupRequest(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
});
