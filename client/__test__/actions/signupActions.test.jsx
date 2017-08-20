import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import userSignupRequest from '../../actions/signupActions';
import { SET_CURRENT_USER } from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign up a user', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates an action SET_CURRENT_USER on successful user update', () => {
    // nock('http://localhost:9000/')
    //   .post('/api/user/signup')
    //   .reply(200, { body: {
    //     success: true,
    //     message: 'Sign up succesful.',
    //     data: {
    //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJFbWFpbCI6ImNodWtzLm9waWFAYW5kZWxhLmNvbW0iLCJ1c2VyVXNlcm5hbWUiOiJjaHVrc3MiLCJ1c2VyUGhvbmUiOiIyMzQ3MDMzMTMwNDQwIiwiaWF0IjoxNTAzMDc1MDgwLCJleHAiOjE1MDMxNjE0ODB9.0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
    //     }
    //   } });
    // const expectedActions = [
    //   { type: SET_CURRENT_USER }
    // ];
    // const store = mockStore({ users: {} });
    // return store.dispatch(userSignupRequest()).then(() => {
    //   // return of async actions
    //   expect(store.getActions()).toEqual(expectedActions);
    // });
  });
});
