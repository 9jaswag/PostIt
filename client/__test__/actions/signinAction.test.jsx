import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import Login from '../../actions/signinAction';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign in action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates an action SET_CURRENT_USER on successful user sign up', (done) => {
    moxios.stubRequest('/api/user/signup', {
      status: 201,
      response: {
        success: true,
        message: 'Sign in succesful.',
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJFbWFpbCI6ImNodWtzLm9waWFAYW5kZWxhLmNvbW0iLCJ1c2VyVXNlcm5hbWUiOiJjaHVrc3MiLCJ1c2VyUGhvbmUiOiIyMzQ3MDMzMTMwNDQwIiwiaWF0IjoxNTAzMDc1MDgwLCJleHAiOjE1MDMxNjE0ODB9.0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
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
      password: 'password'
    };
    const expectedActions = [
      { type: types.SET_CURRENT_USER, user: auth.user }
    ];
    store.dispatch(Login(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});