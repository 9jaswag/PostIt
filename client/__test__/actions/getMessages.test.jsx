/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getMessages from '../../actions/messageActions';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Get messages action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_MESSAGE action when called', (done) => {
    moxios.stubRequest('/api/v1/group/1/messages', {
      status: 200,
      response: {
        success: true,
        data: [{
          id: 1,
          title: 'Mwanzo of Awesomeness ',
          message: 'this is it',
          priority: 'urgent',
          author: 'chuks',
          readby: ['chuks']
        }]
      }
    });
    const store = mockStore({});
    const messages = [{
      id: 1,
      title: 'Mwanzo of Awesomeness ',
      message: 'this is it',
      priority: 'urgent',
      author: 'chuks',
      readby: ['chuks']
    }];
    const expectedActions = [
      { type: types.SET_MESSAGE, messages }
    ];
    store.dispatch(getMessages(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
