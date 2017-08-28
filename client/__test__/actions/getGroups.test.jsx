import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import getGroups from '../../actions/getGroups';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign up action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('sets users group when called', () => {
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
});
