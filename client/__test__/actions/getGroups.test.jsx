import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getGroups, { getMemberCount } from '../../actions/getGroups';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Get groups action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should contain getGroups function', () => {
    expect(getGroups()).toBeA('function');
  });
  it('should contain getMemberCount function', () => {
    expect(getMemberCount()).toBeA('function');
  });
  it('it dispatches GET_USER_GROUPS action when getting user groups', () => {
    moxios.stubRequest('/api/users/one', {
      status: 200,
      response: {
        data: [
          {
            group: {
              id: 1,
              name: 'Factory',
              description: "A group for HNG's Factory product"
            },
            unreadCount: 4
          }
        ]
      }
    });
    const store = mockStore({});
    const groups = [
      {
        group: {
          id: 1,
          name: 'Factory',
          description: "A group for HNG's Factory product"
        },
        unreadCount: 4
      }
    ];
    const expectedActions = [
      { type: types.GET_USER_GROUPS, groups }
    ];
    store.dispatch(getGroups(groups)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('it dispatches SET_MEMBER_COUNT action when getting member count', () => {
    moxios.stubRequest('/api/v1/group/1/count', {
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
    store.dispatch(getMemberCount(count)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
