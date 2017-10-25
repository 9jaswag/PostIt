/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { getGroups, getMemberCount } from '../../actions/groupActions';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Get groups action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_USER_GROUPS action', (done) => {
    moxios.stubRequest('/api/v1/users/one', {
      status: 200,
      response: {
        data: [{
          group: {
            id: 1,
            name: 'Andela',
            description: 'A group for Andela'
          },
          unreadCount: 4
        }]
      }
    });
    const store = mockStore({});
    const groups = [{
      group: {
        id: 1,
        name: 'Andela',
        description: 'A group for Andela',
      },
      unreadCount: 4
    }];
    const expectedActions = [
      { type: types.SET_USER_GROUPS, groups }
    ];
    store.dispatch(getGroups(groups)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
  it('should dispatch SET_MEMBER_COUNT action', (done) => {
    moxios.stubRequest('/api/v1/group/2/count', {
      status: 200,
      response: {
        success: true,
        data: 2
      }
    });
    const store = mockStore({});
    const count = 2;
    const expectedActions = [
      { type: types.SET_MEMBER_COUNT, count }
    ];
    store.dispatch(getMemberCount(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
