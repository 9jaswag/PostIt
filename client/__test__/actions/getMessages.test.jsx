import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getMessages from '../../actions/getMessages';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('get message action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return an array of messages', () => {
    moxios.stubRequest('/api/user/signup', {
      status: 200,
      response: {
        success: true,
        message: 'Sign up succesful.',
        data: [
          {
            id: 9,
            title: 'true love',
            message: 'true lovers',
            priority: 'urgent',
            author: 'chuks',
            readby: [
              'chuks'
            ],
            createdAt: '2017-08-27T19:49:14.760Z',
            updatedAt: '2017-08-27T19:49:14.760Z',
            groupId: 1,
            userId: 1
          }
        ]
      }
    });
    const store = mockStore({});
    // console.log('=============>', store);
  });
});
